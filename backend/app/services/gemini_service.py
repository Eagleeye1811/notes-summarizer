import requests
from app.config import GEMINI_API_KEY

def get_summary(text):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
    prompt = f"""
    Summarize the following technical content into 4-6 bullet points or short paragraphs:

    {text}
    """

    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }

    headers = {"Content-Type": "application/json"}
    res = requests.post(url, headers=headers, json=payload)

    if res.status_code == 200:
        return res.json()['candidates'][0]['content']['parts'][0]['text'].strip()
    else:
        raise Exception(f"Gemini API failed: {res.text}")
