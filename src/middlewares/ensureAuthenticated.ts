import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../accounts/repositories/implementations/usersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing!", 401);
  }

  const [, token] = authHeader.split("");
  try {
    const { sub: user_id } = verify(token, "a2189386-b5b0-45d1-b115-5b14127ec031") as IPayload;

    const usersRepository = new UsersRepository.findById(user_id)

    if (!user) {
      throw new Error("User does not exists!", 401);
    }

    next();
  } catch {
    throw new Error("Invalid token", 401);
  }
}