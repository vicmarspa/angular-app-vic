import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { CalibradoService } from 'src/app/services/calibrado.service';
import Swal from 'sweetalert2';

import {Clientes} from '../../models/clientes';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css']
})
export class EditarClientesComponent implements OnInit {

  constructor(private calibradoService:CalibradoService,private router: Router,private activedRoute:ActivatedRoute) { }

  cliente1:Clientes = {
    id_cliente:"",
    nombre:"",
    correo:"",
    telefono:"",
    direccion:"",
    fecha_ingreso:new Date,
    fecha_fin:new Date,
    estado_cliente:""

  }

  edit:boolean = false;

  ngOnInit(): void {

    const params = this.activedRoute.snapshot.params;
    if (params.id_cliente) {
      this.calibradoService.getClienteEditar(params.id_cliente)
        .subscribe(
          res => {
            console.log(res);            
            this.cliente1 = res;
            this.edit=true;            
          },
          err => console.log(err)
        )
    }
  }

  updateCliente() {
    Swal.fire({
    title: 'Estas seguro(a)?',
    text: "El cliente será modificado!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, modificalo!'
  }).then((result) => {
    if (result.isConfirmed) {
      
      delete this.cliente1.fecha_fin;
      delete this.cliente1.fecha_ingreso;
            
      
      this.calibradoService.updateCliente(this.cliente1.id_cliente!,this.cliente1)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Modificado!',
      'El cliente seleccionado modificado.',
      'success'
      )
          
      }
    })
  }

}
