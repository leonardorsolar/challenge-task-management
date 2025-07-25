from app.modules.task.application.usecases.create_task_usecase import CreateTaskUseCase
from app.modules.task.infrastructure.repositories.task_repository import TaskRepository
from app.modules.task.presentation.controllers.create_task_controller import CreateTaskController

class TaskContainer:
    @staticmethod
    def create_task_controller() -> CreateTaskController:
        repository = TaskRepository()  # implementa a interface
        usecase = CreateTaskUseCase(repository)
        return CreateTaskController(usecase)
