import { Component, OnInit } from '@angular/core';
import { CalibradoService } from 'src/app/services/calibrado.service';
import Swal from 'sweetalert2';



import {Tipo_Fruta} from '../../models/tipo_fruta';

@Component({
  selector: 'app-ingreso-fruta',
  templateUrl: './ingreso-fruta.component.html',
  styleUrls: ['./ingreso-fruta.component.css']
})
export class IngresoFrutaComponent implements OnInit {

  constructor(private calibradoService: CalibradoService) { }

  tipofruta:Tipo_Fruta = {
    idtipo_fruta:"",
    tipo_fruta:"",
    fruta_fin: new Date,
    fruta_inicio:new Date,
    estado_fruta:""
  }

  ngOnInit(): void {
  }

  guardarFruta(){

    delete this.tipofruta.idtipo_fruta;
    delete this.tipofruta.fruta_fin;
    delete this.tipofruta.fruta_inicio;


    this.tipofruta.estado_fruta = '1';

    this.Success();

    this.calibradoService.saveFruta(this.tipofruta)
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
      title: 'Fruta creada correctamente!',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
