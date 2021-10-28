import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ClientesService } from '../../clientes.service';
import { Cliente } from '../cliente'

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.cliente = new Cliente();
   }

  ngOnInit(): void {
    let params: Params = this.activatedRoute.params;
    if(params && params.value && params.value.id){
      this.id = params.value.id;
      this.service
      .getClienteById(this.id)
    .subscribe(
      response => this.cliente = response,
      errorResponse => this.cliente = new Cliente()
      )
    }
  }

  onSubmit(){
    if(this.id){
      this.service
      .atualizar(this.cliente)
      .subscribe(response => {
        this.success = true;
        this.errors = [];
      }, errorResponse => {
        this.success = false;
        this.errors = ['Erro ao atualizar o clienet.'];
      });
    }
    else {    
      this.service
      .salvar(this.cliente)
      .subscribe(response => {
        this.success = true;
        this.errors = [];
        this.cliente = response;
      }, errorResponse => {
        this.success;
        this.errors = errorResponse.error.errors;
      });
    }
  }

  voltarParaLista(){
    this.router.navigate(['/clientes-lista']);
  }
}
