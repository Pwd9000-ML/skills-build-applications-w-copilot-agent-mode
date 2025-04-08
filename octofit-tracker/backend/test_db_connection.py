"""
This is a test file to verify that we can connect to the MongoDB database.
"""
import pymongo

def test_connection():
    try:
        client = pymongo.MongoClient("localhost", 27017)
        db = client["octofit_db"]
        print("Successfully connected to MongoDB!")
        
        # List all collections in the database
        collections = db.list_collection_names()
        print(f"Collections in octofit_db: {collections}")
        
        return True
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        return False

if __name__ == "__main__":
    test_connection()
