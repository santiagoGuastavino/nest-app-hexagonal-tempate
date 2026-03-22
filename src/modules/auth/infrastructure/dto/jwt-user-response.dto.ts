import { Expose } from 'class-transformer';

export class JwtUserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  constructor(partial: Partial<JwtUserDto>) {
    Object.assign(this, partial);
  }
}
