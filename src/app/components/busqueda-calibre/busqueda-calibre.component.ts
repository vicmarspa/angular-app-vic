import { Component, OnInit } from '@angular/core';
import { CalibradoService } from 'src/app/services/calibrado.service';
import Swal from 'sweetalert2';

//Modelos
import {Calibre} from '../../models/calibre';

@Component({
  selector: 'app-busqueda-calibre',
  templateUrl: './busqueda-calibre.component.html',
  styleUrls: ['./busqueda-calibre.component.css']
})
export class BusquedaCalibreComponent implements OnInit {

  constructor(public calibradoService: CalibradoService) { }

  
  calibre:any= [];

  tbx1?:string='';

  calibre1:Calibre = {
    idcalibre:"",
    calibre:"",
    estado_calibre:""
  }

  ngOnInit(): void {
    this.calibradoService.getCalibreBusqueda()
      .subscribe(
        res => {
          this.calibre = res;
          console.log(res);
        },
        err => console.error(err)
      );
  }

  BorrarCalibre(idcalibre:string) {
    Swal.fire({
    title: 'Estas seguro?',
    text: "El calibre será enviado a la papelera!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borralo!'
  }).then((result) => {
    if (result.isConfirmed) {
      delete this.calibre1.idcalibre;
      delete this.calibre1.calibre;

      this.calibre1.estado_calibre = this.tbx1 = (<HTMLInputElement>document.getElementById('borrado')).value
      
      this.calibradoService.BorrarCalibrePapelera(idcalibre,this.calibre1)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Borrado!',
      'El calibre seleccionado ha sido borrado.',
      'success'
      )
          
      }
    })
  }
  

}
