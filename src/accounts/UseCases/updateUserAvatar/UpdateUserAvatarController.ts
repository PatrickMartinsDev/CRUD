import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./updateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    console.log(id);

    const avatar_File = request.file;
    if (!avatar_File) {
      throw new Error(`Avatar doesn't exists`)
    }

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ user_id: id, avatar_File: avatar_File.filename })

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };