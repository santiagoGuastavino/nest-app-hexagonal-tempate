import { Request } from 'express';
import { User } from '../../../users/domain/user.entity';

export interface AuthenticatedRequest extends Request {
  user: User;
}
