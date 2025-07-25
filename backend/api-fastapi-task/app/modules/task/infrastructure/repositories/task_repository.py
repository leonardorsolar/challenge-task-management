from app.modules.task.domain.irepositories.task_repository_interface import TaskRepositoryInterface
from app.modules.task.domain.entities.task import Task

class TaskRepository(TaskRepositoryInterface):
    def save(self, task: Task) -> dict:
        print("[TaskRepository] Simulando salvamento no banco...")
        return {
            "id": 1,
            "title": task.title,
            "description": task.description
        }
