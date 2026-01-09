import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("/registration")
    async registration(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
        const {accessToken, refreshToken} = await this.authService.registration(userDto);
        response.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        return { accessToken };
    }

    @Post("/login")
    async login(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
        const {accessToken, refreshToken, role} = await this.authService.login(userDto);
        response.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        return { accessToken, role};
    }

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    async logout(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        const refreshToken = request.cookies['refreshToken'];       
        await this.authService.logout(refreshToken);

        response.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        const oldRefreshToken = request.cookies['refreshToken'];

        if (!oldRefreshToken) {
            throw new HttpException('Refresh Token not provided', HttpStatus.UNAUTHORIZED);
        }

        const { accessToken, refreshToken: newRefreshToken } = await this.authService.refresh(oldRefreshToken);
        
        response.cookie('refreshToken', newRefreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7, 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict', 
        });

        return { accessToken };
    }
}
