import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { CalibradoService } from 'src/app/services/calibrado.service';
import Swal from 'sweetalert2';

import {Tipo_Pago} from '../../models/tipo_pago';

@Component({
  selector: 'app-editar-pago',
  templateUrl: './editar-pago.component.html',
  styleUrls: ['./editar-pago.component.css']
})
export class EditarPagoComponent implements OnInit {

  constructor(private calibradoService:CalibradoService,private router: Router,private activedRoute:ActivatedRoute) { }

  pago1:Tipo_Pago = {
    idtipo_pago:"",
    tipo_pago:"",
    pago_fin: new Date,
    pago_inicio:new Date,
    estado_pago:""
  }

  edit:boolean = false;

  ngOnInit(): void {

    const params = this.activedRoute.snapshot.params;
    if (params.idtipo_pago) {
      this.calibradoService.getPagoEditar(params.idtipo_pago)
        .subscribe(
          res => {
            console.log(res);            
            this.pago1 = res;
            this.edit=true;            
          },
          err => console.log(err)
        )
    }
  }

  updatePago() {
    Swal.fire({
    title: 'Estas seguro(a)?',
    text: "El pago será modificado!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, modificalo!'
  }).then((result) => {
    if (result.isConfirmed) {
      
      delete this.pago1.pago_fin;
      delete this.pago1.pago_inicio;
            
      
      this.calibradoService.updatePago(this.pago1.idtipo_pago!,this.pago1)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Modificado!',
      'El pago seleccionado modificado.',
      'success'
      )
          
      }
    })
  }

}
