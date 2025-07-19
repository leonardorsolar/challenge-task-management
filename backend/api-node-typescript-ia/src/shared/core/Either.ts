export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};

// // Em shared/domain/Entity.ts
// export abstract class Entity<T> {
//   protected readonly _id: UniqueEntityID;
//   protected props: T;

//   constructor(props: T, id?: UniqueEntityID) {
//     this._id = id || new UniqueEntityID();
//     this.props = props;
//   }
// }

// // Em shared/domain/UniqueEntityID.ts
// import { v4 as uuidv4 } from 'uuid';

// export class UniqueEntityID {
//   private value: string;

//   constructor(id?: string) {
//     this.value = id || uuidv4();
//   }

//   toString(): string {
//     return this.value;
//   }

//   equals(id?: UniqueEntityID): boolean {
//     if (id === null || id === undefined) {
//       return false;
//     }
//     if (!(id instanceof UniqueEntityID)) {
//       return false;
//     }
//     return this.value === id.toString();
//   }
// }

// // Em shared/core/Guard.ts
// export interface IGuardResult {
//   succeeded: boolean;
//   message?: string;
// }

// export class Guard {
//   public static combine(guardResults: IGuardResult[]): IGuardResult {
//     for (let result of guardResults) {
//       if (!result.succeeded) return result;
//     }
//     return { succeeded: true };
//   }

//   public static againstNullOrUndefined(value: any, argumentName: string): IGuardResult {
//     if (value === null || value === undefined) {
//       return { succeeded: false, message: `${argumentName} is null or undefined` };
//     }
//     return { succeeded: true };
//   }

//   // Adicione outras validações conforme necessário
// }
