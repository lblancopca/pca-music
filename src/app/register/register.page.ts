import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  validation: any;
  errorMessage: string = "";

  validation_message = {
    name: [
      { type: "required", message: "El campo nombre es obligatorio." },
      { type: "minlength", message: "El nombre debe tener al menos 3 caracteres." }
    ],
    last_name: [
      { type: "required", message: "El campo apellido es obligatorio." },
      { type: "minlength", message: "El apellido debe tener al menos 3 caracteres." }
    ],
    email: [
      { type: "required", message: "El campo email es obligatorio." },
      { type: "email", message: "Email incorrecto." }
    ],
    password: [
      { type: "required", message: "El campo password es obligatorio." },
      { type: "minlength", message: "La contraseña debe tener al menos 6 caracteres." }
    ],
    password_confirmation: [
      { type: "required", message: "El campo es obligatorio." },
      { type: "minlength", message: "La contraseña debe tener al menos 6 caracteres." }
    ]
  };


  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router) { 
    this.registerForm = this.formBuilder.group({
      
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      ),
      password_confirmation: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      ),
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])
      ),
      last_name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])
      )
    });
  }

  ngOnInit() {
  }

  /*
  registerUser(dataUser: any) {
    console.log(dataUser);
    this.registerService.registerUser(dataUser).then(res => {
      this.errorMessage = "";
      this.router.navigate(['/login']);
    }).catch(error => {
      this.errorMessage = error;
    });
  }
    */

  registerUser(dataUser: any) {
    console.log(dataUser);
    this.registerService.registerUserByApi(dataUser).then(res => {
      this.errorMessage = "";
      this.router.navigate(['/login']);
    }).catch(error => {
      this.errorMessage = error;
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
