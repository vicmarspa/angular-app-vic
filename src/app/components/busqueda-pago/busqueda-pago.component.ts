import { Component, OnInit } from '@angular/core';
import { CalibradoService } from 'src/app/services/calibrado.service';
import { Tipo_Pago } from '../../models/tipo_pago';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-busqueda-pago',
  templateUrl: './busqueda-pago.component.html',
  styleUrls: ['./busqueda-pago.component.css']
})
export class BusquedaPagoComponent implements OnInit {

  constructor(public calibradoService: CalibradoService) { }

  idtipo_pago:any;
  pago:any = [];

  tbx1?:string="";

  pago1:Tipo_Pago = {
    idtipo_pago:"",
    tipo_pago:"",
    estado_pago:"",
    pago_fin:new Date
  }

  ngOnInit(): void {
    this.calibradoService.getTipoPagoBusqueda()
      .subscribe(
        res => {
          this.pago = res;
          console.log(res);
        },
        err => console.error(err)
      );
  }

  BorrarPago(idtipo_pago:string) {
    Swal.fire({
    title: 'Estas seguro(a)?',
    text: "El pago será enviado a la papelera!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borralo!'
  }).then((result) => {
    if (result.isConfirmed) {
      delete this.pago1.idtipo_pago;
      delete this.pago1.tipo_pago;
      delete this.pago1.pago_fin;

      this.pago1.estado_pago = this.tbx1 = (<HTMLInputElement>document.getElementById('borrado')).value
      
      this.calibradoService.BorrarPagoPapelera(idtipo_pago,this.pago1)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Borrado!',
      'El pago seleccionado ha sido borrado.',
      'success'
      )
          
      }
    })
  }
  

}
