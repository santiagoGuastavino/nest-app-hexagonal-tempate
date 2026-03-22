import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './application/users.service';
import { USER_REPOSITORY } from './domain/user.repository';
import { UserMongoRepository } from './infrastructure/user.mongo.repository';
import { UserSchema, UserModel } from './infrastructure/user.schema';
import { UsersController } from './infrastructure/users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USER_REPOSITORY, // binds the token to the concrete adapter
      useClass: UserMongoRepository,
    },
  ],
  exports: [UsersService, USER_REPOSITORY],
})
export class UsersModule {}
