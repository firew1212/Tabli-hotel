import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

import { Permissions } from './decorators/permissions.decorator';
import { PermissionsGuard } from './guards/permissions.guard';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  // =====================
  // LOGIN
  // =====================
@Public()
@Post('login')
login(@Body() dto: LoginDto) {
  return this.authService.login(dto);
}

  // =====================
  // GET CURRENT USER
  // =====================
  @Get('me')
  
  getProfile(@CurrentUser() user: any) {
    return user;
  }

  // =====================
  // ROLE BASED TEST
  // =====================
  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  adminOnly() {
    return {
      message: 'Admin access granted',
    };
  }

  // =====================
  // PERMISSION BASED TEST
  // =====================
  @Get('manage-users')
  @UseGuards( PermissionsGuard)
  @Permissions('manage_users')
  manageUsers() {
    return {
      message: 'You have manage_users permission',
    };
  }
}