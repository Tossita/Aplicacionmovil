import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  isIn : boolean = false;
  usuarios: any[] = [
    {
      rut: '11.111.111-1',
      nom_completo: 'Satan',
      fecha_nac: '1990-03-24',
      semestre: 1,
      password: 'satan123',
      email: 'satan123@email.com',
      tipo_usuario: 'administrador'
    },
    {
      rut: '11.111.111-3',
      nom_completo: 'Leviathan',
      fecha_nac: '1990-03-24',
      semestre: 1,
      password: 'than123',
      email: 'than123@email.com',
      tipo_usuario: 'profesor'
    },
    {
      rut: '11.111.111-2',
      nom_completo: 'Asmodeus',
      fecha_nac: '1990-03-24',
      semestre: 1,
      password: 'asmodeus123',
      email: 'asmodeus@email.com',
      tipo_usuario: 'alumno'
    }
  ];

  constructor() { }

  //métodos del CRUD:
  agregarUsuario(usuario): boolean{
    var registrado : boolean = false;
    if (this.obtenerUsuario(usuario.rut) == undefined) {
      this.usuarios.push(usuario);
      registrado = true;
      return registrado ; 
    }
    return registrado;
  }
  eliminarUsuario(rut){
    
    this.usuarios.forEach((usu, index) => {
      if(usu.rut == rut) {
        this.usuarios.splice(index, 1);
      }
      
    });

  }

  modificarUsuario(usuario){

    var index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    this.usuarios[index] = usuario;
    console.log('a');

  }

  obtenerUsuario(rut){
    return this.usuarios.find(usuario => usuario.rut == rut);
  }
  obtenerUsuarios(){
    return this.usuarios;
  }


  //Metodo customer
  //validar rut y contraseña: método que recibe rut y password y me entrega un JSON de un usuario
  validarEmailPassword(email, pass){
    return this.usuarios.find(u => u.email == email && u.password == pass);
  }

  validarEmail(email){
    return this.usuarios.find(u => u.email == email);
    
    //return this.usuarios.find(u => u.email == email);
  }


  edad_sol: any;
  mostrar_edad: any;

  calcularEdad(nac){
    if(nac){
      const convertAge = new Date(nac);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.mostrar_edad = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      this.edad_sol = this.mostrar_edad;
      console.log(this.edad_sol);
      return this.edad_sol;
    }else{
      console.log('no entre')
    }
  }

}
