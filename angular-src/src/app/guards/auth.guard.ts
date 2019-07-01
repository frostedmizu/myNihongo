import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGaurd implements CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    if(this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
