import { type ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateClientUseCase {
  constructor(
    @inject('ClientsRepository')
    private readonly clientsRepository: IClientsRepository,
  ) {}

  async execute({
    username,
    email,
    password,
    cpf,
    phone,
    birth_date,
    address_id,
  }: ICreateClientDTO): Promise<void> {
    const clientAlreadyExists = await this.clientsRepository.findByEmail(email);

    if (clientAlreadyExists) {
      throw new Error('Client already exists');
    }

    const passwordHash = await hash(password, 8);

    await this.clientsRepository.create({
      username,
      email,
      password: passwordHash,
      cpf,
      phone,
      birth_date,
      address_id,
    });
  }
}

export { CreateClientUseCase };