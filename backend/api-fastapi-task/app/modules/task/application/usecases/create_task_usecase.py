from app.modules.task.domain.entities.task import Task
from app.modules.task.domain.irepositories.task_repository_interface import TaskRepositoryInterface

class CreateTaskUseCase:
    def __init__(self, repository: TaskRepositoryInterface):
        self.repository = repository  # injeção da dependência por interface

    def execute(self, data: dict) -> dict:
        print("[CreateTaskUseCase] Executando lógica...")
        task = Task(title=data["title"], description=data["description"])
        return self.repository.save(task)
