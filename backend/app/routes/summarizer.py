from fastapi import APIRouter, UploadFile, File
from app.services import pdf_service, gemini_service, chromadb_service, tts_service
import os

router = APIRouter()

@router.post("/pdf")
async def summarize_pdf(file: UploadFile = File(...)):
    # Save the uploaded file locally
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Extract filename without extension for dynamic ID
    base_id = os.path.splitext(file.filename)[0]

    # Extract text chunks and embeddings
    chunks = pdf_service.extract_chunks(file_path)
    embeddings = pdf_service.get_embeddings(chunks)

    # Store chunks with dynamic collection name (optional) or use fixed
    chromadb_service.store_chunks(chunks, embeddings, base_id)

    # Fetch combined content from the collection
    combined = chromadb_service.fetch_combined(base_id)

    # Generate summary
    summary = gemini_service.get_summary(combined)

    # Store summary with dynamic ID
    chromadb_service.store_summary(summary, collection_name=f"{base_id}_summary", pdf_filename=file.filename)

    # Generate audio summary
    audio_path = f"audio/{base_id}_summary.mp3"
    await tts_service.generate_audio(summary, audio_path)

    return {
        "summary": summary,
        "audio_path": audio_path
    }