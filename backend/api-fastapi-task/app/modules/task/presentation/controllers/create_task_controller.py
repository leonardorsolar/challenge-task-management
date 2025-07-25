from app.modules.task.application.usecases.create_task_usecase import CreateTaskUseCase

class CreateTaskController:
    def __init__(self, usecase: CreateTaskUseCase):
        self.usecase = usecase

    def handle(self):
        print("[CreateTaskController] Recebendo requisição...")

        data = {
            "title": "Nova tarefa",
            "description": "Descrição da tarefa"
        }

        result = self.usecase.execute(data)
        return {"message": "Tarefa criada com sucesso", "data": result}
