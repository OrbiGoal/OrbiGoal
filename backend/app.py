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

def get_processed_data(season, collection_name):
    docs = db.collection(collection_name).stream()
    data = [doc.to_dict() for doc in docs]
    df = pd.DataFrame(data)
    df["season"] = season
    return df

@app.route('/get-teams-2223', methods=['GET'])
def get_teams_2223():
    df_2223 = get_processed_data("2223", teams2223collection)
    df_2122 = get_processed_data("2122", teams2223collection)

    # Process data
    df = pd.concat([df_2122, df_2223], ignore_index=True)
    df = df.sort_values(by="Squad")

    return jsonify(df.to_dict(orient="records"))

if __name__ == '__main__':
    app.run(debug=True)
