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
    stockDetailDocument:any = [];
    inventoryAndStockDetail:any = [];
    id_cpc_Detail : any = '';
    total_kilogramos_inventario_Detail : any = ''; 
    total_kilogramos_stock_Detail : any = '';
    porcentaje_Detail : any = '';
    fechaActual = new Date();
    largeListForProm:number = 0;
    getDetailProductsSellsObject:any = [];

  ngOnInit(): void {
    this.paltaChilenaService.getStock()
    .subscribe(
      res => {
        this.compras = res;
        this.products = res;
        this.largeListForProm = this.compras.length;                           
        console.log(res);
        console.log(this.compras.length)
      },
      err => console.error(err)
    );
    this.paltaChilenaService.getStockDetailDocument()
    .subscribe(
      res => {
        this.stockDetailDocument = res;
        console.log(res);                          
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



  stockfunction(id_cpc:any, total_kilogramos_inventario:any, total_kilogramos_stock:any, porcentaje:any){
    this.id_cpc_Detail = id_cpc;
    this.total_kilogramos_inventario_Detail = total_kilogramos_inventario;
    this.total_kilogramos_stock_Detail = total_kilogramos_stock;
    this.porcentaje_Detail = porcentaje;
        this.paltaChilenaService.getCompraStockDetail(id_cpc)
        .subscribe(
          res => {
            this.inventoryAndStockDetail = res;
            console.log(res);
          },
          err => console.error(err)
        );
    this.getDetailProductsSells();
  }
  public kilogramosStockSum(){
    return this.compras.map(row => row.total_kilogramos_stock).reduce((a,b) => a+b, 0);
  }
  public kilogramosInventarioSum(){
    return this.compras.map(row => row.total_kilogramos_inventario).reduce((a,b) => a+b, 0);
  }

  public porcentajePromedioSum(){
    return this.compras.map(row => row.porcentaje).reduce((a,b) => a+b, 0);
  }


  getDetailProductsSells(){
    console.log("identificador", this.id_cpc_Detail)
    this.paltaChilenaService.getSellProductDetail(this.id_cpc_Detail)
    .subscribe(
      res => {
        console.log(res);
        this.getDetailProductsSellsObject = res;
      },
      err => console.log(err)
    )
  }

  public PrecioTotalSumDetailProductsSells(){
    return this.getDetailProductsSellsObject.map(entrada => entrada.precio_total).reduce((a,b) => a+b, 0);
  }
  
  public cantidadSumDetailProductsSells(){
    return this.getDetailProductsSellsObject.map(entrada => entrada.cantidad).reduce((a,b) => a+b, 0);
  }
  

  reportePDF(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.setFontSize(10);
  
    doc.text('Direcci??n: J.J Godoy 100, La Calera', 124, 8);
    doc.text('Contacto: contacto@vicmarspa.cl', 124, 12);
  
    var img = new Image()
    img.src = '/assets/image.jpg'
    doc.addImage(img, 'jpg', 185, 0, 18, 18)
    doc.line(5, 20, 204, 20);

    var total_kilogramos = document.getElementById("total_kilogramosStock");
    var total_kilogramoshtml = total_kilogramos?.innerHTML;
    var fechaActual = document.getElementById("fechaActual");
    var fechaActualhtml = fechaActual?.innerHTML;
  
  
    doc.text('Kilogramos en Stock: ', 80, 25);
    doc.text(total_kilogramoshtml,115, 25);
    doc.text('Fecha Actual: ', 10, 25);
    doc.text(fechaActualhtml,35, 25);

  
    doc.line(5, 30, 204, 30);
    doc.text('Detalles del Reporte', 80,35);
    doc.line(5, 40, 204, 40);

    doc.autoTable({ html: '#entrada',columnStyles: {

    
      0: {cellWidth: 15},
      1: {cellWidth: 20},
      2: {cellWidth: 25},
      3: {cellWidth: 25},
      4: {cellWidth: 25},
      5: {cellWidth: 22},

  
    },margin: {top: 45,right:35,left:35}, styles: {overflow: 'linebreak',
    fontSize: 8},didParseCell: function (data) {
  
      //data.table.body.splice(5);
      var rows = data.table.body;
  
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
      }} } )
  
    
  
    doc.output('dataurlnewwindow'); 
    
   
  }



















}
