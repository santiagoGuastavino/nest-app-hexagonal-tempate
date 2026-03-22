import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { UserDocument, UserModel } from './user.schema';

@Injectable()
export class UserMongoRepository implements IUserRepository {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  private toEntity(doc: UserDocument): User {
    return new User(
      doc._id.toString(),
      doc.firstName,
      doc.lastName,
      doc.document,
      doc.email,
      doc.password,
      doc.isPremium,
    );
  }

  async create(
    firstName: string,
    lastName: string,
    document: string,
    email: string,
    hashedPassword: string,
  ): Promise<User> {
    const doc = await this.userModel.create({
      firstName,
      lastName,
      document,
      email,
      password: hashedPassword,
    });
    return this.toEntity(doc);
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.userModel.findOne({ email }).exec();
    return doc ? this.toEntity(doc) : null;
  }
}
