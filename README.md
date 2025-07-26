# 🧠 Notes Summarizer Backend – FastAPI

This is the backend for the **Notes Summarizer** project, built using **FastAPI**. It provides API endpoints for processing and summarizing uploaded notes or text.

---

## 🚀 How to Run the Backend

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo/backend
````

---

### 2. Set Up a Virtual Environment

#### For macOS / Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

#### For Windows:

```bash
python -m venv .venv
.venv\Scripts\activate
```

---

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

> If `requirements.txt` is missing, install packages manually:
>
> ```bash
> pip install fastapi uvicorn
> pip freeze > requirements.txt
> ```

---

### 4. Run the FastAPI Server

```bash
uvicorn app.main:app --reload
```

* `app.main:app` means:

  * `app/` is the folder
  * `main.py` is the file
  * `app = FastAPI()` is the app instance

> Adjust this if your file structure differs.

---

### 5. Access the API Docs

Once the server is running, open your browser and go to:

* Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
* ReDoc: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

## 📁 Project Structure

```
backend/
├── app/
│   └── main.py           # FastAPI app entry point
├── requirements.txt
└── README.md
```

---

## ⚙️ Environment Variables (Optional)

If you're using environment variables, create a `.env` file like this:

```
OPENAI_API_KEY=your-api-key
```

Use `python-dotenv` in your code to load it:

```python
from dotenv import load_dotenv
load_dotenv()
```

Install it via:

```bash
pip install python-dotenv
```

---

## 🧠 Features

* 📄 Upload and summarize notes
* 🔌 RESTful APIs using FastAPI
* 🧪 Interactive API testing with Swagger UI

---

## 🛠 Tech Stack

* **FastAPI**
* **Uvicorn**
* **Pydantic**
* **Python 3.8+**

---

```

---

✅ Paste this once into `backend/README.md` and you're done — click “Preview” in GitHub to see the full markdown beautifully rendered. Let me know if you want the frontend one next!
```
