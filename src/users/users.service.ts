import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class UsersService {
    
    constructor(@InjectModel(User) private userRepository: typeof User) {}
    
    async createUser(dto: CreateUserDto) {
        try {
            const user = await this.userRepository.create({
                username: dto.username,
                email: dto.email,
                password_hash: dto.password
            });
            return user;
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new HttpException(
                    'Email already exists',
                    HttpStatus.CONFLICT
                );
            }
            throw error;
        }
    }

    async banUser(id: number) {
        const user = await this.userRepository.findByPk(id);
        console.log("BAN USER SERVICE", user);
        if (user) {
            user.is_active = !user.is_active;
            await user.save();
            return user;
        }
    }

    async getUserByEmail(email: string) {
        const user = this.userRepository.findOne({where: {email: email}});
        return user;
    }

    async getUsers() {
        const users = this.userRepository.findAll();
        return users;
    }

    async getUserById(id: number) {
        const user = this.userRepository.findByPk(id);
        return user;
    }
}
