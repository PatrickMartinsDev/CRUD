import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./createUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, phone, address } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase)

    await createUserUseCase.execute({
      name,
      password,
      email,
      phone,
      address
    });

    return response.status(200).send();
  }
}

export { CreateUserController };