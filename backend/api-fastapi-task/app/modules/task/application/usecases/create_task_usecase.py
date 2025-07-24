

def execute(data: dict, repository):
    print("[CreateTaskUseCase] Executando lógica de criação de tarefa...")
    
    # Regras de negócio podem ser adicionadas aqui (ex: validações)
    task = repository.save(data)
    return task
