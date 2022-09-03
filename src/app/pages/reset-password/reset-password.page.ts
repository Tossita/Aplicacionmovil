import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email: string;

  constructor(private toastController: ToastController, private router: Router, 
    private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  emailChequear(){
    var usuarioEmail = this.usuarioService.validarEmail(this.email);
    if (usuarioEmail != undefined) {
      alert('a');
      console.log(usuarioEmail.email);
    }else{
      alert('s');
      console.log(usuarioEmail.email);
    }
  }

}
