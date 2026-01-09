import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            console.log('Authorization Header:', authHeader);
            
            if (!authHeader) {
                throw new UnauthorizedException('No authorization header');
            }

            const [bearer, token] = authHeader.split(' ');
            console.log('Bearer:', bearer, 'Token:', token);
            
            if (bearer !== "Bearer" || !token) {
                throw new UnauthorizedException('Invalid authorization format. Expected: Bearer <token>');
            }

            const user = this.jwtService.verify(token, { secret: process.env.JWT_SECRET || 'SECRET_KEY' });
            console.log('Verified User:', user);
            req.user = user;
            return true;
        } catch (e) {
            console.error('Auth Error:', e.message);
            throw new UnauthorizedException({ message: "Unauthorized", error: e.message });
        }
    }
}