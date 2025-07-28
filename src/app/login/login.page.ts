import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  //Tarea: crear un nuevo guard para cuando intente entrar al home validar si estoy logueado: OK
  
  loginForm: FormGroup;
  validation: any;
  errorMessage: string = "";


// Tarea: añadir las validacione al campo password: OK
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
        type: "minlength", message: "Minimo seis caracteres."
      }
    ]
  }

  

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private navCtrl: NavController, 
    private router: Router,
    private storageService: StorageService
  ) {
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

  //login con datos del storage
  loginUser(credentials: any){
    console.log(credentials);
    
    this.authService.loginUser(credentials).then(res => {
      this.errorMessage = "";
      this.navCtrl.navigateForward("/menu/home")
    }).catch(error =>{
      this.errorMessage = error;
    })      
  }

  //login con la api
 loginUserApi(credentials: any) {
    console.log('Enviando credenciales:', credentials);

    this.authService.loginUser(credentials)
      .then(async res => {
        console.log('Login exitoso:', res);
        await this.storageService.set('user', res);
        this.errorMessage = "";
        console.log('Navegando a /menu/home');
        this.navCtrl.navigateForward("/menu/home")
      })
      .catch(error => {
        console.error('Login fallido:', error);
        console.error('Error en login:', error);
        this.errorMessage = "Credenciales inválidas o error de conexión";
      });
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

}
