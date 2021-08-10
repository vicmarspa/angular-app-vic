import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CalibradoService } from 'src/app/services/calibrado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';

import { Ventas } from '../../models/ventas';

@Component({
  selector: 'app-busqueda-ventas',
  templateUrl: './busqueda-ventas.component.html',
  styleUrls: ['./busqueda-ventas.component.css']
})
export class BusquedaVentasComponent implements OnInit {

  constructor(public calibradoService: CalibradoService,private router:Router,private activedRoute: ActivatedRoute) { }

  ventas:any = [];

  tbx1?:string='';

  idventa:string ='';


  venta:Ventas = {
    idventa:'',
    id_cliente:'',
    estado_venta:'',
    venta_creacion:new Date,
    venta_fin:new Date
  }

  ngOnInit(): void {
    this.calibradoService.getVentas()
      .subscribe(
        res => {
          this.ventas = res; 
                           
          console.log(res);
        },
        err => console.error(err)
      );
  }

  BorrarCompraPapelera(idcompra:string) {
    Swal.fire({
    title: 'Estas seguro?',
    text: "El proceso será enviado a la papelera!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borralo!'
  }).then((result) => {
    if (result.isConfirmed) {
      delete this.venta.idventa;
      delete this.venta.id_cliente;
      delete this.venta.venta_creacion;
      delete this.venta.venta_fin;
      

      this.venta.estado_venta = this.tbx1 = (<HTMLInputElement>document.getElementById('borrado')).value
      
      this.calibradoService.BorrarVentaPapelera(idcompra,this.venta)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Borrado!',
      'La venta seleccionada ha sido borrada.',
      'success'
      )
          
      }
    })
  }
  Search(){
    if(this.idventa == ""){
      this.ngOnInit();
    }
    else{
      this.ventas = this.ventas.filter(res => {
        return res.idventa.toString().match(this.idventa.toString());
      })
    }
  }

}
