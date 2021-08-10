import { Component, OnInit } from '@angular/core';
import { CalibradoService } from 'src/app/services/calibrado.service';
import Swal from 'sweetalert2';

import {Clientes} from '../../models/clientes';

@Component({
  selector: 'app-ingreso-clientes',
  templateUrl: './ingreso-clientes.component.html',
  styleUrls: ['./ingreso-clientes.component.css']
})
export class IngresoClientesComponent implements OnInit {

  constructor(private calibradoService: CalibradoService) { }

  cliente:Clientes = {
    id_cliente:"",
    nombre:"",
    correo:"",
    telefono:"",
    direccion:"",
    fecha_ingreso:new Date,
    fecha_fin:new Date
  }

  ngOnInit(): void {
  }

  guardarCliente(){

    delete this.cliente.id_cliente;
    delete this.cliente.fecha_ingreso;
    delete this.cliente.fecha_fin;

    this.cliente.estado_cliente = '1';

    this.Success();

    this.calibradoService.saveCliente(this.cliente)
    .subscribe(
      
      res => {
        console.log(res);        
      },
      err => console.error(err)
    )   
  }

  Success(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cliente creado correctamente!',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
