import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  //Tarea: crear un nuevo guard para cuando intente entrar al home validar si estoy logueado
  
  loginForm: FormGroup;
  validation: any;
  errorMessage: string = "";


// Tarea: añadir las validacione al campo password
  validation_message = {
    email: [
      {
        type: "required", message: "El campo email es obligatorio."
      },
      {
        type: "email", message: "Email incorrecto."
      }
    ],

    password: [
      {
        type: "required", message: "El campo password es obligatorio."
      },
      {
        type: "email", message: "contraseña incorrecta incorrecto."
      },
      {
        type: "email", message: "Minimo seis caracteres."
      }
    ]
  }

  



  constructor(private formBuilder: FormBuilder, private authService: AuthService, private navCtrl: NavController, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
      Validators.compose([
        Validators.required, //campo obligatorio
        Validators.email // valida el correo electronico
      ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6) //cantidad minima de caracteres
        ])
      )
    });
   }

  ngOnInit() {
  }


  loginUser(credentials: any){
    console.log(credentials);
    this.authService.loginUser(credentials).then(res => {
      this.errorMessage = "";
      this.navCtrl.navigateForward("/menu/home")
    }).catch(error =>{
      this.errorMessage = error;
    })
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

}
