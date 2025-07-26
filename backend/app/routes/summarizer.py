from fastapi import APIRouter, UploadFile, File
from app.services import pdf_service, gemini_service, chromadb_service, tts_service

router = APIRouter()

@router.post("/pdf")
async def summarize_pdf(file: UploadFile = File(...)):
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as f:
        f.write(await file.read())

    chunks = pdf_service.extract_chunks(file_path)
    embeddings = pdf_service.get_embeddings(chunks)
    chromadb_service.store_chunks(chunks, embeddings, "WebRTC")

    combined = chromadb_service.fetch_combined("WebRTC")
    summary = gemini_service.get_summary(combined)
    chromadb_service.store_summary(summary, "WebRTC_combined_summary")

    audio_path = f"audio/{file.filename.replace('.pdf', '')}_summary.mp3"
    await tts_service.generate_audio(summary, audio_path)

    return {
        "summary": summary,
        "audio_path": audio_path
    }


