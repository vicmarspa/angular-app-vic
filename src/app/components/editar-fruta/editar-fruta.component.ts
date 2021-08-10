import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { CalibradoService } from 'src/app/services/calibrado.service';
import Swal from 'sweetalert2';

import {Tipo_Fruta} from '../../models/tipo_fruta';

@Component({
  selector: 'app-editar-fruta',
  templateUrl: './editar-fruta.component.html',
  styleUrls: ['./editar-fruta.component.css']
})
export class EditarFrutaComponent implements OnInit {

  constructor(private calibradoService:CalibradoService,private router: Router,private activedRoute:ActivatedRoute) { }

  fruta1:Tipo_Fruta = {
    idtipo_fruta:"",
    tipo_fruta:"",
    fruta_fin: new Date,
    fruta_inicio:new Date,
    estado_fruta:""
  }

  edit:boolean = false;
  ngOnInit(): void {

    const params = this.activedRoute.snapshot.params;
    if (params.idtipo_fruta) {
      this.calibradoService.getFrutaEditar(params.idtipo_fruta)
        .subscribe(
          res => {
            console.log(res);            
            this.fruta1 = res;
            this.edit=true;            
          },
          err => console.log(err)
        )
    }
  }

  updateFruta() {
    Swal.fire({
    title: 'Estas seguro(a)?',
    text: "La Fruta será modificada!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, modificala!'
  }).then((result) => {
    if (result.isConfirmed) {
      
      delete this.fruta1.fruta_fin;
      delete this.fruta1.fruta_inicio;
            
      
      this.calibradoService.updateFruta(this.fruta1.idtipo_fruta!,this.fruta1)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Modificada!',
      'La fruta seleccionada modificada.',
      'success'
      )
          
      }
    })
  }


}
