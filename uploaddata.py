import firebase_admin
from firebase_admin import credentials, firestore
import json

# Initialize Firebase Admin SDK
cred = credentials.Certificate("path/to/your_firebasesdk.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# Read the JSON file into a Python dictionary
with open("path/to/your_json.json", "r") as json_file:
    data = json.load(json_file)

# Define your Firestore collection name
collection_name = 'your_collection_name'

# Upload data to Firestore
for index, row in enumerate(data, start=1):
    doc_id = f"{index:04d}"  # Use the index as document ID
    doc_ref = db.collection(collection_name).document(doc_id)
    doc_ref.set(row)

print(f"Uploaded {len(data)} documents to Firestore collection '{collection_name}'")
