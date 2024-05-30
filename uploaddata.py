import firebase_admin
from firebase_admin import credentials, firestore
import json

# Initialize Firebase Admin SDK
cred = credentials.Certificate("/Users/lihanlin/Downloads/orbigoal-b4283-firebase-adminsdk-fr3wg-b51ec0940e.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# Read the JSON file into a Python dictionary
with open("/Users/lihanlin/Downloads/FootballTeamStats2021-2022.json", "r") as json_file:
    data = json.load(json_file)

# Define your Firestore collection name
collection_name = 'Football Team Stats 2021-2022'

# Upload data to Firestore
for index, row in enumerate(data, start=1):
    doc_id = f"{index:04d}"  # Use the index as document ID
    doc_ref = db.collection(collection_name).document(doc_id)
    doc_ref.set(row)

print(f"Uploaded {len(data)} documents to Firestore collection '{collection_name}'")