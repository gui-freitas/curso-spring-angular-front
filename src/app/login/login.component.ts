import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  register: boolean;
  messageSuccess: string;
  errors: String[];

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit(){
    this.authService
          .tentarLogar(this.username, this.password)
          .subscribe(response => {
            console.log(response)
            this.router.navigate(['/home'])
          }, errorResponse => {
            this.errors = ['Usuário e/ou senha incorreto(s).']
          });
  }

  preparaCadastrar(event: any){
    event.preventDefault();
    this.register = true;
  }

  cancelaCadastro(){
    this.register = false;
    this.errors = [];
    this.username = '';
    this.password = '';
  }

  cadastrar(){
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService
      .salvar(usuario)
      .subscribe( response => {
        this.messageSuccess = "Cadastro realizado com sucesso! Efetue o login.";
        this.errors = [];
        this.register = false;
        this.username = '';
        this.password = '';
      }, errorResponse => {
        this.messageSuccess = "";
        this.errors = errorResponse.error.errors;
      })
  }
}
