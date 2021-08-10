import { Component, OnInit } from '@angular/core';
import { CalibradoService } from 'src/app/services/calibrado.service';
import Swal from 'sweetalert2';
import { Tipo_Fruta } from '../../models/tipo_fruta';


@Component({
  selector: 'app-busqueda-fruta',
  templateUrl: './busqueda-fruta.component.html',
  styleUrls: ['./busqueda-fruta.component.css']
})
export class BusquedaFrutaComponent implements OnInit {

  constructor(public calibradoService: CalibradoService) { }
    
  fruta:any= [];

  tbx1?:string="";

  fruta1:Tipo_Fruta = {
    idtipo_fruta:"",
    tipo_fruta:"",
    estado_fruta:"",
    fruta_fin:new Date
  }

  ngOnInit(): void {
    this.calibradoService.getTipoFrutaBusqueda()
      .subscribe(
        res => {
          this.fruta = res;
          console.log(res);
        },
        err => console.error(err)
      );
  }

  BorrarFruta(idtipo_fruta:string) {
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
      delete this.fruta1.idtipo_fruta;
      delete this.fruta1.tipo_fruta;
      delete this.fruta1.fruta_fin;

      this.fruta1.estado_fruta = this.tbx1 = (<HTMLInputElement>document.getElementById('borrado')).value
      
      this.calibradoService.BorrarFrutaPapelera(idtipo_fruta,this.fruta1)
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
