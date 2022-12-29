//  SOBREESCRITA DO OBJETO - OVERRIDE

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
