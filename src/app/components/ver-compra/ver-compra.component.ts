import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { CalibradoService } from 'src/app/services/calibrado.service';
// import * as jsPDF from 'jspdf';
// import 'jspdf-autotable'


import {jsPDF } from 'jspdf';
import { autoTable, RowInput } from 'jspdf-autotable';




@Component({
  selector: 'app-ver-compra',
  templateUrl: './ver-compra.component.html',
  styleUrls: ['./ver-compra.component.css']
})
export class VerCompraComponent implements OnInit {

  constructor(private calibradoService:CalibradoService,private router: Router,private activedRoute:ActivatedRoute) { }

  compra:any = [];
  producto:any = [];

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if (params.idcompra) {
      this.calibradoService.getCompra(params.idcompra)
        .subscribe(
          res => {
            console.log(res);
            this.compra = res;
            
            
          },
          err => console.log(err)
        )
        this.calibradoService.getProducto(params.idcompra)
        .subscribe(
          res => {
            console.log(res);
            this.producto = res;
            
            
          },
          err => console.log(err)
        )  
    }
  }

  public ProductosSum(){
    return this.producto.map(productos => productos.valortotal).reduce((a,b) => a+b, 0);
  }

  nuevoPDF(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    var compra = document.getElementById("compra");
    var comprahtml = compra?.innerHTML;
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



    doc.text('NUMERO COMPRA: ', 10, 10);
    doc.text(comprahtml,65, 10);
    doc.text('FECHA: ', 10, 20);
    doc.text(fechahtml,33, 20);
    doc.text('CLIENTE: ', 10, 30);
    doc.text(clientehtml,38, 30);
    doc.text('MONTO NETO: ', 10, 40);
    doc.text(totalingresohtml,52,40);
    doc.text('IVA?: ', 10, 50);
    doc.text(ivahtml,25,50);
    doc.text('IMPUESTO ADICIONAL: ', 10, 60);
    doc.text(frutahtml,75, 60);
    doc.text('CORREO: ', 90, 40);
    doc.text(valorhtml,117, 40);
    doc.text('DIRECCION: ', 90, 50);
    doc.text(valortotalhtml,125,50);
    doc.text('TOTAL: ', 10, 70);
    doc.text(mermahtml,34,70);
    doc.text('TELEFONO: ', 90, 60);
    doc.text(pagohtml,123, 60);

    doc.line(5, 33, 204, 33);
    doc.line(5, 75, 204, 75);

    

    
    

    (doc as jsPDF & { autoTable: autoTable }).autoTable({ html: '#entrada',columnStyles: {
      0: {cellWidth: 26},
      1: {cellWidth: 22},
      2: {cellWidth: 22},
      3: {cellWidth: 32},
      4: {cellWidth: 22},
      
    },margin: {top: 90,right:35,left:5},didParseCell: function (data) {
    } } )
    
    
    
    doc.output('dataurlnewwindow'); 
      
   
  }

}
