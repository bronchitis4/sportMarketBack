import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshTokens } from './refresh-token.model';
import { RefreshTokenController } from './refresh-token.controller';
import { RefreshTokenService } from './refresh-token.service';

@Module({
    controllers: [RefreshTokenController],
    providers: [RefreshTokenService],
    imports: [
        SequelizeModule.forFeature([RefreshTokens])
    ],
    exports: [RefreshTokenService]
})
export class RefreshTokenModule {}
