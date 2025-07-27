from pydantic import BaseModel
from typing import List, Optional

class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    answer: str

class SummarizeResponse(BaseModel):
    summary: str
    audio_path: str
    quiz: List[QuizQuestion]
    summary_id: Optional[str] = None
    quiz_id: Optional[str] = None
