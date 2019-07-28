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
  public isTeacher;
  public loading = true;

  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.setIsTeacher();

    this.authService.logInRefresh.subscribe(() => {
      console.log('Logged In');
      this.setIsTeacher();
    })
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

  setIsTeacher() {
    this.authService.getProfile().subscribe((response: any) => {
        this.isTeacher = response.user.role === 'teacher';

        this.loading = false;
      },
      err => {
        console.log(err);
        return false;
      });
  }
}
