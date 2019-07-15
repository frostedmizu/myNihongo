import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe((profile: any) => {
        this.user = profile.user;
      },
      err => {
        console.log(err);
        return false;
      });
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessagesService.show('You are logged out', {
      cssClass:'alert-success',
      timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }

  isTeacher() {
    if(!this.authService.isLoggedIn()) {
      return false;
    } else {
      if(!this.user) {
        return false;
      } else {
        if(this.user.role === 'teacher') {
          return true;
        }
      }
    }
  }
}
