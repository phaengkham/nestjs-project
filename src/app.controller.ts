import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from './common/decorator/auth.decorator';
import { CurrentUser } from './common/decorator/user.decoretor';
import { UserOrmEntity } from './common/infrastructure/database/typeorms/entities/user.orm';
import { CreateUserDto } from './modules/user/dto/create.dto';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly _authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Public()
  @Post('login')
  async login(@Body() body: any): Promise<string> {
    return await this._authService.login(body);
  }

  @Get('user')
  async getUser(@CurrentUser() user: any): Promise<any> {
    return await this.appService.getUser(user);
  }

  @Get('users')
  async getUsers(): Promise<UserOrmEntity[]> {
    return await this.appService.getUsers();
  }

  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<UserOrmEntity> {
    return await this._authService.register(body);
  }
}
