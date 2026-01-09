import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'node_modules/bcryptjs';
import { ref } from 'process';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
        private jwtService: JwtService,
        private refreshTokenService: RefreshTokenService) { }

    async login(userDto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);
        if (!user)
            throw new HttpException("Email not found", HttpStatus.BAD_REQUEST);

        if (await bcrypt.compare(userDto.password, user.password_hash)) {
            const refresh_token = uuidv4();
            this.refreshTokenService.createToken({
                user_id: user.id,
                token: refresh_token,
            });
            return { accessToken: await this.generateToken(user), refreshToken: refresh_token, role: user.role };
        } else {
            throw new HttpException("Password not correct", HttpStatus.BAD_REQUEST);
        }
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);
        if (candidate)
            throw new HttpException("User is already registered!", HttpStatus.BAD_REQUEST);

        const password_hash = await bcrypt.hash(userDto.password, 5);
        
        try {
            const user = await this.usersService.createUser({ ...userDto, password: password_hash });

            const refresh_tokens = uuidv4();
            this.refreshTokenService.createToken({
                user_id: user.id,
                token: refresh_tokens,
            });

            return { accessToken: await this.generateToken(user), refreshToken: refresh_tokens, role: user.role };
        } catch (error) {
            if (error.status === HttpStatus.CONFLICT) {
                throw error;
            }
            throw new HttpException("Registration failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async logout(refreshToken: string) {
        const token = await this.refreshTokenService.getTokenByValue(refreshToken);
        if (token) {
            await this.refreshTokenService.deleteToken(token.id);
        }
    }

    async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.role };
        return this.jwtService.sign(payload);
    }

    async generateAndStoreRefreshToken(user: User) {
        const refreshTokenValue = uuidv4();

        await this.refreshTokenService.createToken({
            user_id: user.id,
            token: refreshTokenValue,
        });

        return refreshTokenValue;
    }

    async refresh(oldRefreshToken: string) {
        const tokenRecord = await this.refreshTokenService.getTokenByValue(oldRefreshToken);

        if (!tokenRecord) {
            throw new HttpException('Invalid or expired refresh token', HttpStatus.UNAUTHORIZED);
        }
        const user = await this.usersService.getUserById(tokenRecord.user_id);

        if (!user) {
            throw new HttpException('User associated with token not found', HttpStatus.UNAUTHORIZED);
        }

        if (!user.is_active) {
            throw new HttpException('User account is inactive', HttpStatus.UNAUTHORIZED);
        }

        await this.refreshTokenService.deleteToken(tokenRecord.id);

        const newRefreshToken = await this.generateAndStoreRefreshToken(user);
        const newAccessToken = await this.generateToken(user);

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }
}
