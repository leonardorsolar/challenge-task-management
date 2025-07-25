from abc import ABC, abstractmethod
from app.modules.task.domain.entities.task import Task

class TaskRepositoryInterface(ABC):
    @abstractmethod
    def save(self, task: Task) -> dict:
        """Salva a tarefa e retorna dados persistidos"""
        pass
