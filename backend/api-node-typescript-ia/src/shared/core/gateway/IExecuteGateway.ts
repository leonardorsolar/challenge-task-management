// src/shared/core/gateway/IExecuteGateway.ts
export default interface IExecuteGateway {
  execute(request?: any): Promise<any>;
}

// export default interface IExecuteGateway<TRequest = any, TResponse = any> {
//   execute(request?: TRequest): Promise<TResponse>;
// }
