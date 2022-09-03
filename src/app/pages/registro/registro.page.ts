import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Animation, AnimationController} from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  today: any;
  fecha_naci: any;
  

  alumno = new FormGroup({
    rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(duoc|duocuc|profesor.duoc)\.([c]{1}[l]{1})')]),
    tipo_usuario: new FormControl('alumno')
  });

  verificar_password: string;
  message: string = 'aaaaaaaaaaaaaaaaaaa';
  validoFecha: boolean = false;
  mensaje:any;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.getDate();
  }

  getDate() { const date = new Date(); this.today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2); console.log(this.today); }

  registrar(){
    var validarEdad = this.usuarioService.calcularEdad(this.alumno.value.fecha_nac);
    var validarFecha = this.alumno.value.fecha_nac;
    if (this.alumno.controls.password.value != this.verificar_password) {
      alert('Las contraseñas no coinciden!');  
    }else if (this.today <= validarFecha ) {
      this.mensaje = this.message;
      this.validoFecha = true;
      console.log('entro');
      alert('la fecha no puede ');      
    
    }else if (validarEdad <= 16) {
      alert('Edad no puede ser menor a 17 años!');
    
    }else{
      alert('no entra')
      this.usuarioService.agregarUsuario(this.alumno.value);
      alert('Alumno registrado con exito!');
      console.log('no entro')
      console.log(validarFecha)
      this.router.navigate(['/login']);
      return;
    }


    
    //this.alumno.reset();
    //this.verificar_password = '';
  }

  

  
}
