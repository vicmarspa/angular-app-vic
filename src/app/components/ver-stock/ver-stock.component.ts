import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PaltaChilenaService } from 'src/app/services/palta-chilena.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment, unix } from 'moment';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'

import {CpcDetailOutput} from '../../models/cpcDetailOutput';
@Component({
  selector: 'app-ver-stock',
  templateUrl: './ver-stock.component.html',
  styleUrls: ['./ver-stock.component.css']
})
export class VerStockComponent implements OnInit {

  constructor(
    public paltaChilenaService: PaltaChilenaService,
    private router:Router,
    private activedRoute: ActivatedRoute) { }

    compras:any = [];
    products:any = [];

  ngOnInit(): void {
    this.paltaChilenaService.getStock()
    .subscribe(
      res => {
        this.compras = res;
        this.products = res;                            
        console.log(res);
        console.log(this.compras.length)
      },
      err => console.error(err)
    );
  }


// correlativoFuncion()
// {
//   this.countProces=0;
//   this.procesos_camaras2=this.compras2;
//   this.selectNombre = this.compra.nombre;
//   this.selectNumeroProceso = this.compra.idcompra;
//   for (var i =0; i< this.procesos_camaras2.length ; i++) {
//     //cuenta cantidad de procesos
//     if(this.procesos_camaras2[i].nombre == this.selectNombre){
//       this.countProces=this.countProces+1
//     }
//   }
//   this.countProces2 = -1;
//   this.countProcesFinal= 0;
//   for (var i =0; i< this.procesos_camaras2.length ; i++) {
//     //cuenta cantidad de procesos
//     if(this.procesos_camaras2[i].nombre == this.selectNombre){
//       this.countProces2=this.countProces2+1
//       this.countProcesFinal=this.countProces-this.countProces2;
//       if(this.procesos_camaras2[i].idcompra == this.selectNumeroProceso){
//         this.countProcesCorrelative=this.countProcesFinal;
//       }
//     }
//   }
// }





}
