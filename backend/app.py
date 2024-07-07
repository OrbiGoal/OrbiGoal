from flask import Flask, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd
import pickle
import os
import datetime

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate('../service_account_key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

teams2122collection = 'Football Team Stats 2021-2022'
teams2223collection = 'Football Team Stats 2022-2023'
players2122collection = 'Football Player Stats 2021-2022'
players2223collection = 'Football Player Stats 2022-2023'

# Function to map the team to the url of its logo
def generate_logo(squad_name, season):
    base_url = f"https://raw.githubusercontent.com/brianxlim/football-logos/master/logos/{season}/"
    filename = squad_to_filename[squad_name]
    return f"{base_url}{filename}" if filename else None


# General function to get the dataframe from Firestore database
def get_from_collection(collection_name):
    docs = db.collection(collection_name).stream()
    data = [doc.to_dict() for doc in docs]
    df = pd.DataFrame(data)
    return df


# Global flags to check if data has been fetched. Fetch data if haven't been loaded
teams_data_fetched = False
players_data_fetched = False

# Define paths to cache files
CACHE_DIR = 'cache'
teams_2122_cache = os.path.join(CACHE_DIR, 'teams_2122.pkl')
teams_2223_cache = os.path.join(CACHE_DIR, 'teams_2223.pkl')
players_2122_cache = os.path.join(CACHE_DIR, 'players_2122.pkl')
players_2223_cache = os.path.join(CACHE_DIR, 'players_2223.pkl')

# Initialise expiry date on cached data so it doesn't use old cached data
cache_timestamp_file = os.path.join(CACHE_DIR, 'cache_timestamp.txt')
CACHE_EXPIRATION_DAYS = 1

def is_cache_valid():
    if not os.path.exists(cache_timestamp_file):
        return False

    with open(cache_timestamp_file, 'r') as f:
        timestamp_str = f.read().strip()
    last_cache_date = datetime.datetime.strptime(timestamp_str, '%Y-%m-%d').date()
    current_date = datetime.date.today()
    return (current_date - last_cache_date).days < CACHE_EXPIRATION_DAYS


def update_cache_timestamp():
    with open(cache_timestamp_file, 'w') as f:
        f.write(datetime.date.today().strftime('%Y-%m-%d'))


def fetch_data():
    global teams_data_fetched, players_data_fetched
    global df_teams_2122, df_teams_2223, df_players_2122, df_players_2223

    os.makedirs(CACHE_DIR, exist_ok=True)

    if not is_cache_valid():
        # Clear the cache by removing cache files if the cache is outdated
        if os.path.exists(teams_2122_cache):
            os.remove(teams_2122_cache)
        if os.path.exists(teams_2223_cache):
            os.remove(teams_2223_cache)
        if os.path.exists(players_2122_cache):
            os.remove(players_2122_cache)
        if os.path.exists(players_2223_cache):
            os.remove(players_2223_cache)
        update_cache_timestamp()
        teams_data_fetched = False
        players_data_fetched = False

    if not teams_data_fetched:
        if os.path.exists(teams_2122_cache) and os.path.exists(teams_2223_cache):
            with open(teams_2122_cache, 'rb') as f:
                df_teams_2122 = pickle.load(f)
            with open(teams_2223_cache, 'rb') as f:
                df_teams_2223 = pickle.load(f)
            print('Loaded Teams data from cache')
        else:
            df_teams_2122 = get_from_collection(teams2122collection)
            df_teams_2122['season'] = '2122'
            df_teams_2223 = get_from_collection(teams2223collection)
            df_teams_2223['season'] = '2223'
            with open(teams_2122_cache, 'wb') as f:
                pickle.dump(df_teams_2122, f)
            with open(teams_2223_cache, 'wb') as f:
                pickle.dump(df_teams_2223, f)
            print('Loaded Teams data from API and cached it')
        teams_data_fetched = True

    if not players_data_fetched:
        if os.path.exists(players_2122_cache) and os.path.exists(players_2223_cache):
            with open(players_2122_cache, 'rb') as f:
                df_players_2122 = pickle.load(f)
            with open(players_2223_cache, 'rb') as f:
                df_players_2223 = pickle.load(f)
            print('Loaded Players data from cache')
        else:
            df_players_2122 = get_from_collection(players2122collection)
            df_players_2122['season'] = '2122'
            df_players_2223 = get_from_collection(players2223collection)
            df_players_2223['season'] = '2223'
            with open(players_2122_cache, 'wb') as f:
                pickle.dump(df_players_2122, f)
            with open(players_2223_cache, 'wb') as f:
                pickle.dump(df_players_2223, f)
            print('Loaded Players data from API and cached it')
        players_data_fetched = True


def get_team_names_df():

    fetch_data()

    all_teams = pd.concat([df_teams_2122[['Squad', 'team_id']], df_teams_2223[['Squad', 'team_id']]]).drop_duplicates().reset_index(drop=True)

    # Map URL to logo and map full name to squad
    team_names_2021 = df_teams_2122[["team_id", "Squad", "Country", 'season']].copy()
    team_names_2022 = df_teams_2223[["team_id", "Squad", "Country", 'season']].copy()
    team_names_2021['Logo'] = df_teams_2122['Squad'].apply(generate_logo, season="2021-22")
    team_names_2022['Logo'] = df_teams_2223['Squad'].apply(generate_logo, season="2022-23")

    # Match its squad to its full name Format the name correctly 
    squad_to_full_name = {k: v.split('/')[-1].replace('%20', ' ').replace('.png', '') for k, v in squad_to_filename.items()} # Get full name of squad
    team_names_2021['full_name'] = team_names_2021['Squad'].map(squad_to_full_name)
    team_names_2022['full_name'] = team_names_2022['Squad'].map(squad_to_full_name)

    # Merge 2021 data into all_teams
    new_all_teams = all_teams.merge(team_names_2021[['team_id', 'Logo', 'full_name', 'Country', 'season']], on='team_id', how='left')
    new_all_teams = new_all_teams.set_index('team_id')

    # Update with 2022 data, overwriting existing values if they exist in the 2022 data
    new_all_teams.update(team_names_2022[['team_id', 'Logo', 'full_name', 'Country', 'season']].set_index('team_id'))
    new_all_teams = new_all_teams.reset_index()

    return new_all_teams


def get_teams_detailed_df():
    all_team_names = get_team_names_df()

    # Process data
    df = pd.concat([df_teams_2122, df_teams_2223], ignore_index=True)
    df = df.sort_values(by=["Squad", "season"])
    df['Pts/G'] = round(df['Pts'].astype(int) / df['MP'].astype(int), 2)
    df = df.drop(['Pts/MP'], axis=1)
    df = df.sort_values(by='team_id')
    df = df.merge(all_team_names[['team_id', 'Logo', 'full_name']], on='team_id', how='left')

    return df


@app.route('/get-teams-detailed', methods=['GET'])
def get_teams_detailed():
    teams_detailed_df = get_teams_detailed_df()

    return jsonify(teams_detailed_df.to_dict(orient="records"))


@app.route('/get-team-details/<teamID>', methods=['GET'])
def get_team_details(teamID):

    teams_detailed_df = get_teams_detailed_df()

    # Filter the dataframe to get details for the specific team
    team_details = teams_detailed_df[teams_detailed_df['team_id'] == int(teamID)]

    # Data transformation
    team_details["Top Team Scorer"] = team_details["Top Team Scorer"].apply(
        lambda topScorer: f"{topScorer.split(' - ')[0]} ({topScorer.split(' - ')[1]})" if topScorer else ""
    )
    team_details["Record"] = team_details["W"] + "/" + team_details["D"] + "/" + team_details["L"]
    team_details["xG/90"] = round(team_details["xG"].astype(float) / team_details["MP"].astype(int), 2)

    if team_details.empty:
        return jsonify({"error": "Team not found"}), 404

    return jsonify(team_details.to_dict(orient='records'))


@app.route('/get-team-names', methods=['GET'])
def get_team_names():
    all_team_names = get_team_names_df()

    # Return the JSON array
    return jsonify(all_team_names.to_dict(orient="records"))


@app.route('/get-players-detailed')
def get_players_detailed():

    fetch_data()

    # Process data
    df = pd.concat([df_players_2122, df_players_2223], ignore_index=True)
    df = df.sort_values(by="Player")
    
    return jsonify(df.to_dict(orient="records"))


# Map squad to logo file
squad_to_filename = {
    'Ajaccio': 'FR1/AC%20Ajaccio.png',
    'Almería': 'ES1/UD%20Almería.png',
    'Angers': 'FR1/Angers%20SCO.png',
    'Arsenal': 'GB1/Arsenal%20FC.png',
    'Aston Villa': 'GB1/Aston%20Villa.png',
    'Atalanta': 'IT1/Atalanta%20BC.png',
    'Athletic Club': 'ES1/Athletic%20Bilbao.png',
    'Atlético Madrid': 'ES1/Atlético%20de%20Madrid.png',
    'Augsburg': 'L1/FC%20Augsburg.png',
    'Auxerre': 'FR1/AJ%20Auxerre.png',
    'Barcelona': 'ES1/FC%20Barcelona.png',
    'Bayern Munich': 'L1/Bayern%20Munich.png',
    'Betis': 'ES1/Real%20Betis%20Balompié.png',
    'Bochum': 'L1/VfL%20Bochum.png',
    'Bologna': 'IT1/Bologna%20FC%201909.png',
    'Bournemouth': 'GB1/AFC%20Bournemouth.png',
    'Brentford': 'GB1/Brentford%20FC.png',
    'Brest': 'FR1/Stade%20Brestois%2029.png',
    'Brighton': 'GB1/Brighton%20&%20Hove%20Albion.png',
    'Celta Vigo': 'ES1/Celta%20de%20Vigo.png',
    'Chelsea': 'GB1/Chelsea%20FC.png',
    'Clermont Foot': 'FR1/Clermont%20Foot%2063.png',
    'Cremonese': 'IT1/US%20Cremonese.png',
    'Crystal Palace': 'GB1/Crystal%20Palace.png',
    'Cádiz': 'ES1/Cádiz%20CF.png',
    'Dortmund': 'L1/Borussia%20Dortmund.png',
    'Eint Frankfurt': 'L1/Eintracht%20Frankfurt.png',
    'Elche': 'ES1/Elche%20CF.png',
    'Empoli': 'IT1/FC%20Empoli.png',
    'Espanyol': 'ES1/RCD%20Espanyol%20Barcelona.png',
    'Everton': 'GB1/Everton%20FC.png',
    'Fiorentina': 'IT1/ACF%20Fiorentina.png',
    'Freiburg': 'L1/SC%20Freiburg.png',
    'Fulham': 'GB1/Fulham%20FC.png',
    'Getafe': 'ES1/Getafe%20CF.png',
    'Girona': 'ES1/Girona%20FC.png',
    'Hellas Verona': 'IT1/Hellas%20Verona.png',
    'Hertha BSC': 'L1/Hertha%20BSC.png',
    'Hoffenheim': 'L1/TSG%201899%20Hoffenheim.png',
    'Inter': 'IT1/Inter%20Milan.png',
    'Juventus': 'IT1/Juventus%20FC.png',
    'Köln': 'L1/1.%20FC%20Köln.png',
    'Lazio': 'IT1/SS%20Lazio.png',
    'Lecce': 'IT1/US%20Lecce.png',
    'Leeds United': 'GB1/Leeds%20United.png',
    'Leicester City': 'GB1/Leicester%20City.png',
    'Lens': 'FR1/RC%20Lens.png',
    'Leverkusen': 'L1/Bayer%2004%20Leverkusen.png',
    'Lille': 'FR1/LOSC%20Lille.png',
    'Liverpool': 'GB1/Liverpool%20FC.png',
    'Lorient': 'FR1/FC%20Lorient.png',
    'Lyon': 'FR1/Olympique%20Lyon.png',
    'M\'Gladbach': 'L1/Borussia%20Mönchengladbach.png',
    'Mainz 05': 'L1/1.FSV%20Mainz%2005.png',
    'Mallorca': 'ES1/RCD%20Mallorca.png',
    'Manchester City': 'GB1/Manchester%20City.png',
    'Manchester Utd': 'GB1/Manchester%20United.png',
    'Marseille': 'FR1/Olympique%20Marseille.png',
    'Milan': 'IT1/AC%20Milan.png',
    'Monaco': 'FR1/AS%20Monaco.png',
    'Montpellier': 'FR1/Montpellier%20HSC.png',
    'Monza': 'IT1/AC%20Monza.png',
    'Nantes': 'FR1/FC%20Nantes.png',
    'Napoli': 'IT1/SSC%20Napoli.png',
    'Newcastle Utd': 'GB1/Newcastle%20United.png',
    'Nice': 'FR1/OGC%20Nice.png',
    'Nott\'ham Forest': 'GB1/Nottingham%20Forest.png',
    'Osasuna': 'ES1/CA%20Osasuna.png',
    'Paris S-G': 'FR1/Paris%20Saint-Germain.png',
    'RB Leipzig': 'L1/RB%20Leipzig.png',
    'Rayo Vallecano': 'ES1/Rayo%20Vallecano.png',
    'Real Madrid': 'ES1/Real%20Madrid.png',
    'Real Sociedad': 'ES1/Real%20Sociedad.png',
    'Reims': 'FR1/Stade%20Reims.png',
    'Rennes': 'FR1/Stade%20Rennais%20FC.png',
    'Roma': 'IT1/AS%20Roma.png',
    'Salernitana': 'IT1/US%20Salernitana%201919.png',
    'Sampdoria': 'IT1/UC%20Sampdoria.png',
    'Sassuolo': 'IT1/US%20Sassuolo.png',
    'Schalke 04': 'L1/FC%20Schalke%2004.png',
    'Sevilla': 'ES1/Sevilla%20FC.png',
    'Southampton': 'GB1/Southampton%20FC.png',
    'Spezia': 'IT1/Spezia%20Calcio.png',
    'Strasbourg': 'FR1/RC%20Strasbourg%20Alsace.png',
    'Stuttgart': 'L1/VfB%20Stuttgart.png',
    'Torino': 'IT1/Torino%20FC.png',
    'Tottenham': 'GB1/Tottenham%20Hotspur.png',
    'Toulouse': 'FR1/FC%20Toulouse.png',
    'Troyes': 'FR1/ESTAC%20Troyes.png',
    'Udinese': 'IT1/Udinese%20Calcio.png',
    'Union Berlin': 'L1/1.FC%20Union%20Berlin.png',
    'Valencia': 'ES1/Valencia%20CF.png',
    'Valladolid': 'ES1/Real%20Valladolid%20CF.png',
    'Villarreal': 'ES1/Villarreal%20CF.png',
    'Werder Bremen': 'L1/SV%20Werder%20Bremen.png',
    'West Ham': 'GB1/West%20Ham%20United.png',
    'Wolfsburg': 'L1/VfL%20Wolfsburg.png',
    'Wolves': 'GB1/Wolverhampton%20Wanderers.png',
    'Alavés': 'ES1/Alavés.png',
    'Arminia': 'L1/Arminia%20Bielefeld.png',
    'Bordeaux': 'FR1/G.%20Bordeaux.png',
    'Burnley': 'GB1/Burnley.png',
    'Cagliari': 'IT1/Cagliari%20Calcio.png',
    'Genoa': 'IT1/Genoa%20CFC.png',
    'Granada': 'ES1/Granada%20CF.png',
    'Greuther Fürth': 'L1/Greuther%20Fürth.png',
    'Levante': 'ES1/Levante%20UD.png',
    'Metz': 'FR1/FC%20Metz.png',
    'Norwich City': 'GB1/Norwich.png',
    'Saint-Étienne': 'FR1/AS%20Saint-Étienne.png',
    'Venezia': 'IT1/Venezia.png',
    'Watford': 'GB1/Watford%20FC.png'
}

if __name__ == '__main__':
    app.run(debug=True)
