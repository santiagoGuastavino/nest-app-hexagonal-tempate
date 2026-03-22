import {
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthResponseDto } from './dto/auth-response.dto';
import type { AuthenticatedRequest } from './interfaces/authenticated-request.interface';
import { JwtUserDto } from './dto/jwt-user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthenticatedRequest): AuthResponseDto {
    const result = this.authService.login(req.user);
    return new AuthResponseDto(result);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Request() req: AuthenticatedRequest): JwtUserDto {
    return req.user;
  }
}
