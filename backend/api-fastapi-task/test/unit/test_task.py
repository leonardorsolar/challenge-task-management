import pytest
from app.modules.task.domain.entities.task import Task

def test_task_creation():
    task = Task(title="Estudar FastAPI", description="Aprender sobre injeção de dependência")
    
    assert task.title == "Estudar FastAPI"
    assert task.description == "Aprender sobre injeção de dependência"
