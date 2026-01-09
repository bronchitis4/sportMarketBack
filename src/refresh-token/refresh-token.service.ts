import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RefreshTokens } from './refresh-token.model';
import { CreateRefreshTokenDto } from './dto/CreateRefreshTokenDto';

@Injectable()
export class RefreshTokenService {
    constructor(@InjectModel(RefreshTokens) private refreshTokensRepository: typeof RefreshTokens) {}

    async createToken(refreshTokenDto: CreateRefreshTokenDto) {
        await this.refreshTokensRepository.destroy({ where: { user_id: refreshTokenDto.user_id } });
        const token = await this.refreshTokensRepository.create(refreshTokenDto);
        return token;
    }
    
    async getTokenByValue(tokenValue: string) {
        const token = await this.refreshTokensRepository.findOne({ where: { token: tokenValue } });
        return token;
    }

    async deleteToken(token_id: number) {
        await this.refreshTokensRepository.destroy({ where: { id: token_id } });
    }
}
