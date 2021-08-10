import { Component, OnInit } from '@angular/core';
import { CalibradoService } from 'src/app/services/calibrado.service';
import Swal from 'sweetalert2';
import { Clientes } from '../../models/clientes';

@Component({
  selector: 'app-busqueda-clientes',
  templateUrl: './busqueda-clientes.component.html',
  styleUrls: ['./busqueda-clientes.component.css']
})
export class BusquedaClientesComponent implements OnInit {

  constructor(public calibradoService: CalibradoService) { }

  cliente:any=[];
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

  tbx1?:string = '';

  ngOnInit(): void {

    this.calibradoService.getClientesBusqueda()
      .subscribe(
        res => {
          this.cliente = res;
          console.log(res);
        },
        err => console.error(err)
      );
  }

  BorrarCliente(id_cliente:string) {
    Swal.fire({
    title: 'Estas seguro(a)?',
    text: "El cliente será enviado a la papelera!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borralo!'
  }).then((result) => {
    if (result.isConfirmed) { 
      delete this.cliente1.nombre;
      delete this.cliente1.correo;
      delete this.cliente1.direccion;
      delete this.cliente1.telefono;
      delete this.cliente1.id_cliente;     
      delete this.cliente1.fecha_ingreso;
      delete this.cliente1.fecha_fin;

      this.cliente1.estado_cliente = this.tbx1 = (<HTMLInputElement>document.getElementById('borrado')).value
      
      this.calibradoService.BorrarClientePapelera(id_cliente,this.cliente1)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Borrado!',
      'El cliente seleccionado ha sido borrado.',
      'success'
      )
          
      }
    })
  }

}
