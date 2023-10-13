import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password! : string;
  errorMessage = 'Giriş Hatalı!';
  successMessage!: string;
  invalidLogin = false;
  loginSuccess = false;
  isLogout=false;


    constructor( private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthService,
      private snackbar:MatSnackBar)
    { }

    ngOnInit(){

      }



      handleLogin() {
        this.authenticationService.login(this.username, this.password).subscribe((result)=> {
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.successMessage = 'Login Successful.';
          this.router.navigate(['/menu']);
          this.snackbar.open('Giriş yaptınız!',undefined,{
            duration:1000
          })
        }, () => {
          this.invalidLogin = true;
          this.loginSuccess = false;
          this.snackbar.open('Girdiğiniz kullanıcı adı ve şifreyi kontrol ediniz!!!',undefined,{
            duration:2000
          })
        });
      }



}
