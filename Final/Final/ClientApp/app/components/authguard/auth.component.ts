import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../app/auth-service.provider";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService) {
            this.router.navigate(["/login"]);
            return false;
        } else {
            return true;
        }
    }
}