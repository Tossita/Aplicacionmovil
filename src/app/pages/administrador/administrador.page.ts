import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  isModalOpen = false;

  /*setOpen(isOpen: boolean) {
    
  }*/

  alumno = new FormGroup({
    rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tipo_usuario: new FormControl('alumno')
  });

  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  usuarios: any[] = [];
  verificar_password: string;
  isClicked : boolean = false;
  usuarios_mostrar: any[] = [];
  mostrar_lista_profesores: boolean=false;
  mostrar_lista_alumnos:boolean=false;
  mostrar_lista_administradores:boolean=false;
  buscar_usuario: boolean = false;
  chequeo: boolean = false;


  constructor(private modalCtrl: ModalController,private usuarioService: UsuarioService, private router: Router, public modalController: ModalController) { }

  ngOnInit(): void {
    this.usuarios = this.usuarioService.obtenerUsuarios();
    this.usuarios_mostrar = this.usuarios.filter(x => x.tipo_usuario == 'administrador')
    console.log(this.usuarios)
  }

  //método del formulario
  registrar(){
    if (this.alumno.controls.password.value != this.verificar_password) {
      alert('CONTRASEÑAS NO COINCIDEN!');
      return;
    }
    
    var registrado:boolean = this.usuarioService.agregarUsuario(this.alumno.value);
    if (!registrado) {
      alert('USUARIO YA EXISTE!')
      return;
    }


    alert('ALUMNO REGISTRADO!');
    //this.router.navigate(['/login']);
    this.alumno.reset();
    this.verificar_password = '';
  }


  eliminar(rutEliminar){

    this.usuarioService.eliminarUsuario(rutEliminar);

  }

  buscar(rutBuscar, isOpen: boolean){
    this.isClicked = true;
    this.buscar_usuario = true;
    var alumnoEncontrado = this.usuarioService.obtenerUsuario(rutBuscar);
    this.isModalOpen = isOpen;

    if (this.buscar_usuario == true && alumnoEncontrado != undefined && this.isModalOpen  == true) {
      this.chequeo = true;
      this.alumno.setValue(alumnoEncontrado);
      this.verificar_password = alumnoEncontrado.password;
      
    }
    

   

  }

  close_bd(isOpen: boolean){

    this.isModalOpen = isOpen;

  }

  modificar(){
    //alert(this.alumno.value);
    //console.log(this.alumno.value);
    this.usuarioService.modificarUsuario(this.alumno.value);
    this.limpiar();
  }


  limpiar(){
    this.alumno.reset();
    this.verificar_password='';
  }

  listar_profesores(){
    this.isClicked = true;
    this.mostrar_listas('mostrar_lista_profesores');   
  }
  
  listar_administradores(){
    this.isClicked = true;
    this.mostrar_listas('mostrar_lista_administradores');   
  }
  listar_alumnos(){
    this.isClicked = true;
    this.mostrar_listas('mostrar_lista_alumnos');   
  }


  mostrar_listas(valor:string){

    switch (valor) {
      case 'mostrar_lista_profesores':
        this.mostrar_lista_profesores= true;
        this.mostrar_lista_alumnos=false;
        this.mostrar_lista_administradores = false;
        break;
      case 'mostrar_lista_alumnos':
        this.mostrar_lista_profesores= false;
        this.mostrar_lista_alumnos=true;
        this.mostrar_lista_administradores = false;
        break;
      case 'mostrar_lista_administradores':
        this.mostrar_lista_profesores= false;
        this.mostrar_lista_alumnos=false;
        this.mostrar_lista_administradores = true;
        break;
      default:
        //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
        break;
    }
  
  }
//
enableBackdropDismiss = false;
showBackdrop = false;
shouldPropagate = false;



}

