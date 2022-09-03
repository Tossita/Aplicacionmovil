import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  password: string;
  email: string;

  constructor(private toastController: ToastController, private router: Router, 
    private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  login(){
    var usuarioLogin = this.usuarioService.validarEmailPassword(this.email, this.password);

    //validar que al ingresar admin admin en el formulario, me diga hola:
    if (usuarioLogin != undefined) {
      if (usuarioLogin.tipo_usuario == 'administrador') {
        this.router.navigate(['/administrador']);
      } else if (usuarioLogin.tipo_usuario == 'alumno'){
        this.router.navigate(['/alumno']);
      } else if (usuarioLogin.tipo_usuario == 'profesor'){
        this.router.navigate(['/profesor']);
      }
    }else{
      this.tostadaError();
      console.log(this.email, this.password)
    }
  }

  //toast
  async tostadaError() {
    const toast = await this.toastController.create({
      message: 'Usuario o contraseña incorrectos!!!',
      duration: 3000
    });
    toast.present();
  }



}
