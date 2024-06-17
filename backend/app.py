from flask import Flask, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate('../firebase/service_account_key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

teams2122collection = 'Football Team Stats 2021-2022'
teams2223collection = 'Football Team Stats 2022-2023'
players2122collection = 'Football Player Stats 2021-2022'
players2223collection = 'Football Player Stats 2022-2023'

# Function to map the team to the url of its logo
def generate_logo(squad_name):
    base_url = "https://raw.githubusercontent.com/brianxlim/football-logos/master/logos/2022-23/"
    filename = squad_to_filename.get(squad_name, "").replace(" ", "%20")
    return f"{base_url}{filename}" if filename else None


def get_processed_data(season, collection_name):
    docs = db.collection(collection_name).stream()
    data = [doc.to_dict() for doc in docs]
    df = pd.DataFrame(data)
    df["season"] = season
    return df


@app.route('/get-teams-detailed', methods=['GET'])
def get_teams_detailed():
    df_2122 = get_processed_data("2122", teams2122collection)
    df_2223 = get_processed_data("2223", teams2223collection)

    # Process data
    df = pd.concat([df_2122, df_2223], ignore_index=True)
    df = df.sort_values(by="Squad")

    return jsonify(df.to_dict(orient="records"))


@app.route('/get-team-names', methods=['GET'])
def get_team_names():
    df = get_processed_data("2223", teams2223collection)
    df = df.sort_values(by="Squad")

    df = df.copy()
    df = df[["Squad", "Country"]]
    df['Logo'] = df['Squad'].apply(generate_logo)
    squad_to_full_name = {k: v.split('/')[-1].replace('%20', ' ').replace('.png', '') for k, v in squad_to_filename.items()} # Get full name of squad
    df['full_name'] = df['Squad'].map(squad_to_full_name)

    return jsonify(df.to_dict(orient="records"))


@app.route('/get-players-detailed')
def get_players_detailed():
    df_2122 = get_processed_data("2122", players2122collection)
    df_2223 = get_processed_data("2223", players2223collection)

    # Process data
    df = pd.concat([df_2122, df_2223], ignore_index=True)
    df = df.sort_values(by="Player")
    
    return jsonify(df.to_dict(orient="records"))


@app.route('/get-player-names')
def get_player_names():
     df = get_processed_data("2233", players2223collection)
     df_url = pd.read_excel("")
     
     # Process data
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
    'Wolves': 'GB1/Wolverhampton%20Wanderers.png'
}

if __name__ == '__main__':
    app.run(debug=True)
