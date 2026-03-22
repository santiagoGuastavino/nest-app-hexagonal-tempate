import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { USER_REPOSITORY } from '../domain/user.repository';
import type { IUserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { CreateUserDto } from '../infrastructure/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already in use');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.userRepository.create(
      dto.firstName,
      dto.lastName,
      dto.document,
      dto.email,
      hashedPassword,
    );
  }
}
