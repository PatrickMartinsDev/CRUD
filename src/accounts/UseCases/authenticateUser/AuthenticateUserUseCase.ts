import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  },
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }
  async execute({ email, password }: IRequest): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error(`Email or password incorrect`);
    }
    // It verifies if the user exists in the database

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error(`Email or password incorrect`);
    }
    // It verifies if the user password corresponds to the password in the database

    const token = sign({}, "a2189386-b5b0-45d1-b115-5b14127ec031", {
      subject: user.id,
      expiresIn: "id"
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }
    return tokenReturn;
  }
}
export { AuthenticateUserUseCase };