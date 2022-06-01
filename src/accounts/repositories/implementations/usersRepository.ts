import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User)
  }

  async create({ name, password, email, phone, address }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      phone,
      address,
    });
    await this.repository.save(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneOrFail({ email });
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOneOrFail(id);
    return user;
  }
}

export { UsersRepository };