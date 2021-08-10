import { Component, OnInit } from '@angular/core';
import { CalibradoService } from 'src/app/services/calibrado.service';
import{ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

import {Tipo_Pago} from '../../models/tipo_pago';

@Component({
  selector: 'app-ingreso-pago',
  templateUrl: './ingreso-pago.component.html',
  styleUrls: ['./ingreso-pago.component.css']
})
export class IngresoPagoComponent implements OnInit {

  constructor(private calibradoService: CalibradoService,private toastr: ToastrService) { }

  tipopago:Tipo_Pago = {
    idtipo_pago:"",
    tipo_pago:"",
    pago_fin: new Date,
    pago_inicio:new Date,
    estado_pago:""
  }

  ngOnInit(): void {
  }

  guardarPago(){

    delete this.tipopago.idtipo_pago;
    delete this.tipopago.pago_fin;
    delete this.tipopago.pago_inicio

    this.tipopago.estado_pago = '1';

    this.Success();

    this.calibradoService.savePago(this.tipopago)
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
      title: 'Pago creado correctamente!',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
