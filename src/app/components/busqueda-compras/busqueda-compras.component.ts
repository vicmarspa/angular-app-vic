import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CalibradoService } from 'src/app/services/calibrado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment, unix } from 'moment';

import { Compras } from '../../models/compras';

@Component({
  selector: 'app-busqueda-compras',
  templateUrl: './busqueda-compras.component.html',
  styleUrls: ['./busqueda-compras.component.css']
})
export class BusquedaComprasComponent implements OnInit {

  constructor(public calibradoService: CalibradoService,private router:Router,private activedRoute: ActivatedRoute) { }

  compras:any = [];
  products:any = [];

  ts = new Date();

  tbx1?:string='';

  idcompra:any;

  ngOnInit(): void {
    this.calibradoService.getCompras()
      .subscribe(
        res => {
          this.compras = res;  
                           
          console.log(res);
        },
        err => console.error(err)
      );
  }

  compra:Compras = {
    idcompra:'',
    id_cliente:'',
    estado_compra:'',
    compra_inicio:new Date,
    compra_fin:new Date
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
      delete this.compra.idcompra;
      delete this.compra.id_cliente;
      delete this.compra.compra_inicio;
      delete this.compra.compra_fin;
      

      this.compra.estado_compra = this.tbx1 = (<HTMLInputElement>document.getElementById('borrado')).value
      
      this.calibradoService.BorrarComprasPapelera(idcompra,this.compra)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Borrado!',
      'La compra seleccionada ha sido borrada.',
      'success'
      )
          
      }
    })
  }

  Search(){
    if(this.idcompra == ""){
      this.ngOnInit();
    }
    else{
      this.compras = this.compras.filter(res => {
        return res.idcompra.toString().match(this.idcompra.toString());
      })
    }
  }

  

}
