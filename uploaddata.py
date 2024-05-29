import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd

# Initialize Firebase Admin SDK
cred = credentials.Certificate("/path/to/your/project/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# Load your Kaggle dataset
df = pd.read_csv('path/to/your/kaggle-dataset', encoding='ISO-8859-1')

# Reset the index to start from 1
df.index = range(1, len(df) + 1)

# Function to upload data to Firestore
def upload_to_firestore(df, collection_name):
    max_id_length = len(str(len(df)))  # Calculate the maximum length of the document ID
    for index, row in df.iterrows():
        doc_id = str(index).zfill(max_id_length)  # Pad the document ID with leading zeros
        doc_ref = db.collection(collection_name).document(doc_id)
        doc_ref.set(row.to_dict())

# Define your Firestore collection name
collection_name = 'Your collection name'

# Upload data to Firestore
upload_to_firestore(df, collection_name)

print(f"Uploaded {len(df)} documents to Firestore collection '{collection_name}'")
