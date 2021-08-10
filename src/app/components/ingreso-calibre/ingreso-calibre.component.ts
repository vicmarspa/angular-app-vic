import { Component, OnInit } from '@angular/core';
import { CalibradoService } from 'src/app/services/calibrado.service';
import Swal from 'sweetalert2';

import {Calibre} from '../../models/calibre';

@Component({
  selector: 'app-ingreso-calibre',
  templateUrl: './ingreso-calibre.component.html',
  styleUrls: ['./ingreso-calibre.component.css']
})
export class IngresoCalibreComponent implements OnInit {

  constructor(private calibradoService: CalibradoService) { }

  calibre:Calibre = {
    idcalibre:"",
    calibre:"",
    calibre_fin: new Date,
    calibre_inicio:new Date,
    estado_calibre:""
  }

  
  ngOnInit(): void {
  }

  guardarCalibre(){

    delete this.calibre.idcalibre;
    delete this.calibre.calibre_fin;
    delete this.calibre.calibre_inicio;    

    this.Success();

    this.calibre.estado_calibre = '1';

    this.calibradoService.saveCalibre(this.calibre)
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
      title: 'Calibre creado correctamente!',
      showConfirmButton: false,
      timer: 1500
    })
  }
}