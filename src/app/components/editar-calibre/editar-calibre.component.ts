import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { CalibradoService } from 'src/app/services/calibrado.service';
import Swal from 'sweetalert2';

import {Calibre} from '../../models/calibre';

@Component({
  selector: 'app-editar-calibre',
  templateUrl: './editar-calibre.component.html',
  styleUrls: ['./editar-calibre.component.css']
})
export class EditarCalibreComponent implements OnInit {

  constructor(private calibradoService:CalibradoService,private router: Router,private activedRoute:ActivatedRoute) { }

  
  calibre1:Calibre = {
    idcalibre:"",
    calibre:"",
    calibre_fin: new Date,
    calibre_inicio:new Date,
    estado_calibre:""
  }

  edit:boolean = false;

  ngOnInit(): void {

    const params = this.activedRoute.snapshot.params;
    if (params.idcalibre) {
      this.calibradoService.getCalibreEditar(params.idcalibre)
        .subscribe(
          res => {
            console.log(res);            
            this.calibre1 = res;
            this.edit=true;            
          },
          err => console.log(err)
        )
    }
  }

  updateCalibre() {
    Swal.fire({
    title: 'Estas seguro(a)?',
    text: "El proceso será modificado!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, modificalo!'
  }).then((result) => {
    if (result.isConfirmed) {
      
      delete this.calibre1.calibre_fin;
      delete this.calibre1.calibre_inicio;
            
      
      this.calibradoService.updateCalibre(this.calibre1.idcalibre!,this.calibre1)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Modificado!',
      'El calibre seleccionado modificado.',
      'success'
      )
          
      }
    })
  }

  

}
