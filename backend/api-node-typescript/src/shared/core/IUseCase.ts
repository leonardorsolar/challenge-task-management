export interface IUseCase {
  execute(request?: any): Promise<any>;
  //execute(request?: any, item?: any): Promise<any>;
}

// src/shared/core/IUseCase.ts (já existe em sua estrutura)
// export interface IUseCase<TRequest, TResponse> {
//   execute(request: TRequest): Promise<TResponse>;
// }
