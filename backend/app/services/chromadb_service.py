import chromadb
from app.config import CHROMA_API_KEY, TENANT_ID, DB_NAME

client = chromadb.CloudClient(api_key=CHROMA_API_KEY, tenant=TENANT_ID, database=DB_NAME)

def store_chunks(chunks, embeddings, collection_name):
    collection = client.get_or_create_collection(name=collection_name)
    for idx, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
        collection.add(
            documents=[chunk],
            embeddings=[embedding],
            ids=[f"chunk-{idx}"]
        )

def fetch_combined(collection_name):
    collection = client.get_collection(name=collection_name)
    docs = []
    offset, limit = 0, 100
    while True:
        result = collection.get(include=["documents"], offset=offset, limit=limit)
        docs += result["documents"]
        if len(result["documents"]) < limit:
            break
        offset += limit
    return "\n\n".join(docs)

def store_summary(summary_text, collection_name):
    collection = client.get_or_create_collection(name=collection_name)
    collection.add(
        documents=[summary_text],
        ids=["webrtc_full_summary"]
    )
