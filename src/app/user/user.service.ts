import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneOrFail(id: string) {
    try {
      const options = { where: { id } };
      return await this.userRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateUserDto) {
    return await this.userRepository.save(data);
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOneOrFail(id);

    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async deleteById(id: string) {
    await this.findOneOrFail(id);
    await this.userRepository.softDelete(id);
  }
}
