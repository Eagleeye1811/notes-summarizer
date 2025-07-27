from fastapi import APIRouter, UploadFile, File
from app.services import pdf_service, gemini_service, chromadb_service, tts_service
from app.models.schemas import SummarizeResponse, QuizQuestion
import os
import json

router = APIRouter()

@router.post("/pdf", response_model=SummarizeResponse)
async def summarize_pdf(file: UploadFile = File(...)):
    # Save uploaded file locally
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Base ID without extension
    base_id = os.path.splitext(file.filename)[0]

    # Extract chunks and embeddings
    chunks = pdf_service.extract_chunks(file_path)
    embeddings = pdf_service.get_embeddings(chunks)

    # Store in ChromaDB
    chromadb_service.store_chunks(chunks, embeddings, base_id)

    # Fetch combined content
    combined = chromadb_service.fetch_combined(base_id)

    # Generate summary
    summary = gemini_service.get_summary(combined)

    # Store summary
    chromadb_service.store_summary(summary, collection_name=f"{base_id}_summary", pdf_filename=file.filename)

    # Generate audio
    audio_path = f"audio/{base_id}_summary.mp3"
    await tts_service.generate_audio(summary, audio_path)

    # Generate quiz
    try:
        quiz_data = gemini_service.get_quiz(combined)
        print("📘 Combined input for quiz:", combined[:500])
        print("🧠 Raw quiz:", quiz_data)

        # quiz_data is already a list of dictionaries, no need for json.loads()
        quiz = [QuizQuestion(**q) for q in quiz_data]

    except Exception as e:
        print("⚠️ Quiz generation failed:", e)
        quiz = []

    return SummarizeResponse(
        summary=summary,
        audio_path=audio_path,
        quiz=quiz
    )
