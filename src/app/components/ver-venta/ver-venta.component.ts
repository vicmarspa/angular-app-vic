import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { CalibradoService } from 'src/app/services/calibrado.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'





// import {jsPDF } from 'jspdf';
// import { autoTable, RowInput } from 'jspdf-autotable';

@Component({
  selector: 'app-ver-venta',
  templateUrl: './ver-venta.component.html',
  styleUrls: ['./ver-venta.component.css']
})
export class VerVentaComponent implements OnInit {

  constructor(private calibradoService:CalibradoService,private router: Router,private activedRoute:ActivatedRoute) { }

  prodsxventa:any = [];
  venta:any = [];
  idventa:string ='';

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    this.calibradoService.getProductosxVenta(params.idventa)
    .subscribe(
      res => {
        console.log(res);
        this.prodsxventa = res;
        
      },
      err => console.log(err)
    )
    this.calibradoService.getVenta(params.idventa)
    .subscribe(
      res => {
        console.log(res);
        this.venta = res;        
      },
      err => console.log(err)
    )
  }

  public ProductosSum(){
    return this.prodsxventa.map(productos => productos.valortotal_prodxventa).reduce((a,b) => a+b, 0);
  }
  nuevoPDF(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    var venta = document.getElementById("venta");
    var ventahtml = venta?.innerHTML;
    var fecha = document.getElementById("fecha");
    var fechahtml = fecha?.innerHTML;
    var montoneto = document.getElementById("montoneto");
    var totalingresohtml = montoneto?.innerHTML;
    var iva = document.getElementById("iva");
    var ivahtml = iva?.innerHTML;
    var valortotal = document.getElementById("valortotal");
    var valortotalhtml = valortotal?.innerHTML;
    var merma = document.getElementById("merma");
    var mermahtml = merma?.innerHTML;
    var cliente = document.getElementById("cliente");
    var clientehtml = cliente?.innerHTML;
    var fruta = document.getElementById("fruta");
    var frutahtml = fruta?.innerHTML;
    var valor = document.getElementById("valor");
    var valorhtml = valor?.innerHTML;
    var pago = document.getElementById("pago");
    var pagohtml = pago?.innerHTML;



    doc.text('NUMERO VENTA: ', 10, 10);
    doc.text(ventahtml,58, 10);
    doc.text('FECHA: ', 10, 20);
    doc.text(fechahtml,33, 20);
    doc.text('CLIENTE: ', 10, 30);
    doc.text(clientehtml,38, 30);
    doc.text('TOTAL: ', 10, 40);
    doc.text(totalingresohtml,31,40);    
    doc.text('CORREO: ', 90, 40);
    doc.text(valorhtml,117, 40);
    doc.text('DIRECCION: ', 90, 50);
    doc.text(valortotalhtml,125,50);   
    doc.text('TELEFONO: ', 90, 60);
    doc.text(pagohtml,123, 60);

    doc.line(5, 33, 204, 33);
    doc.line(5, 75, 204, 75);    
    

    doc.autoTable({ html: '#entrada',columnStyles: {
      0: {cellWidth: 28},
      1: {cellWidth: 25},
      2: {cellWidth: 22},
      3: {cellWidth: 32},
      4: {cellWidth: 22},
      
    },margin: {top: 90,right:35,left:5},didParseCell: function (data) {
    } } )   
    
    doc.output('dataurlnewwindow'); 
      
   
  }

  


}

