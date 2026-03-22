import { Expose } from 'class-transformer';

export class AuthResponseDto {
  @Expose()
  accessToken: string;

  constructor(partial: Partial<AuthResponseDto>) {
    Object.assign(this, partial);
  }
}
