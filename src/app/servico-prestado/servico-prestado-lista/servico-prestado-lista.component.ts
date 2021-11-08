import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoService } from '../../servico-prestado.service';
import { ServicoPrestadoBusca } from './servicoPrestadoBusca';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

  nome: string;
  mes: number;
  meses: number[];
  listaServicoPrestado: ServicoPrestadoBusca[];
  mensagem: string;

  constructor(
    private servicePrestadoService: ServicoPrestadoService
  ) {
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12];
   }

  ngOnInit(): void {
  }

  consultar(){
    this.servicePrestadoService
    .consultar(this.nome, this.mes)
    .subscribe(response => {
      this.listaServicoPrestado = response;
      if(this.listaServicoPrestado.length <= 0){
        this.mensagem = "Nenhum registro encontrado.";
      }else{
        this.mensagem = "";
      }
    });
  }
}
