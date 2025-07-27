from pymongo import MongoClient
from app.config import MONGODB_URI
from datetime import datetime
import os

# Initialize MongoDB client
client = MongoClient(MONGODB_URI)
db = client["notes_summarizer"]

def store_summary(summary_text, pdf_filename, audio_path):
    """Store summary in MongoDB"""
    summaries_collection = db["summaries"]
    
    # Create summary document
    summary_doc = {
        "filename": pdf_filename,
        "base_id": os.path.splitext(os.path.basename(pdf_filename))[0],
        "summary": summary_text,
        "audio_path": audio_path,
        "created_at": datetime.now()
    }
    
    # Insert document and return ID
    result = summaries_collection.insert_one(summary_doc)
    return str(result.inserted_id)

def store_quiz(quiz_data, pdf_filename, summary_id):
    """Store quiz in MongoDB"""
    quizzes_collection = db["quizzes"]
    
    # Create quiz document
    quiz_doc = {
        "filename": pdf_filename,
        "base_id": os.path.splitext(os.path.basename(pdf_filename))[0],
        "summary_id": summary_id,
        "questions": quiz_data,
        "created_at": datetime.now()
    }
    
    # Insert document and return ID
    result = quizzes_collection.insert_one(quiz_doc)
    return str(result.inserted_id)

def get_summaries():
    """Get all summaries"""
    summaries_collection = db["summaries"]
    return list(summaries_collection.find({}, {"summary": 1, "filename": 1, "audio_path": 1, "created_at": 1})
                .sort("created_at", -1))

def get_quiz_by_summary_id(summary_id):
    """Get quiz for a specific summary"""
    quizzes_collection = db["quizzes"]
    return quizzes_collection.find_one({"summary_id": summary_id})