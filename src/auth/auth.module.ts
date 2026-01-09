import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { RefreshTokens } from 'src/refresh-token/refresh-token.model';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  imports: [
    forwardRef(() => UsersModule),
    RefreshTokenModule,
    SequelizeModule.forFeature([RefreshTokens,User]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET_KEY',
      signOptions: {
        expiresIn: "24h"
      }
    })
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
