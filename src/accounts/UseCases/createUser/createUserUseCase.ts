import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs"

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";


@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository) { };

  async execute({ name, email, phone, address, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new Error(`User ${name} already exists!`);
    }
    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({
      name,
      email,
      phone,
      address,
      password: passwordHash
    });
  }
}

export { CreateUserUseCase };