import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Roles, ROLES_KEY } from "./roles-auth.decorator";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
            context.getHandler(), 
            context.getClass(),
        ]);
        
        if (!requiredRoles) {
            return true;
        }
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader?.split(' ') ?? [];
           console.log("Bearer:",bearer,"Token:",token);
            if(bearer != "Bearer" || token=="" ) {
                throw new UnauthorizedException({ message: "Unauthorization" })
            }

            const user = this.jwtService.verify(token, {secret: process.env.JWT_SECRET || 'SECRET_KEY'});
            console.log("USER:",user);
            console.log(user)
            req.user = user;
            return user.role.some((role: string) => requiredRoles.includes(role));
        } catch (e) {
            throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
        } 
    }
}