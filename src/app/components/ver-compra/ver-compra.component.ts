import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { CalibradoService } from 'src/app/services/calibrado.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'


// import {jsPDF } from 'jspdf';
// import { autoTable, RowInput } from 'jspdf-autotable';




@Component({
  selector: 'app-ver-compra',
  templateUrl: './ver-compra.component.html',
  styleUrls: ['./ver-compra.component.css']
})
export class VerCompraComponent implements OnInit {

  constructor(private calibradoService:CalibradoService,private router: Router,private activedRoute:ActivatedRoute) { }

  compra:any = [];
  producto:any = [];
  procesos_camaras2:any=[];
  selectNombre:any='';
  selectNumeroProceso:any='';


  compras2:any = [];
  products2:any = [];

  
  ngOnInit(): void {



    this.calibradoService.getCompras()
      .subscribe(
        res => {
          this.compras2 = res;
          this.products2 = res;                 

                           
          console.log(res);



        },
        err => console.error(err)
      );
  


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

            this.correlativoFuncion();
            console.log(this.correlativoFuncion());
          },
          err => console.log(err)
        )  
    }



  }

  public ProductosSum(){
    return this.producto.map(productos => productos.valortotal).reduce((a,b) => a+b, 0);
  }

  public BinsSum(){
    return this.producto.map(productos => productos.lote_bines).reduce((a,b) => a+b, 0);
  }
  public CantidadKilogramosSum(){
    return this.producto.map(productos => productos.cantidad).reduce((a,b) => a+b, 0);
  }

  countProces:number=0;
  countProces2:number=-1;
  countProcesFinal:number=0;
  countProcesCorrelative:number=0;


  correlativoFuncion()
  {
    this.countProces=0;
    this.procesos_camaras2=this.compras2;
    this.selectNombre = this.compra.nombre;
    this.selectNumeroProceso = this.compra.idcompra;
    for (var i =0; i< this.procesos_camaras2.length ; i++) {
      //cuenta cantidad de procesos
      if(this.procesos_camaras2[i].nombre == this.selectNombre){
        this.countProces=this.countProces+1
      }
    }
    this.countProces2 = -1;
    this.countProcesFinal= 0;
    for (var i =0; i< this.procesos_camaras2.length ; i++) {
      //cuenta cantidad de procesos
      if(this.procesos_camaras2[i].nombre == this.selectNombre){
        this.countProces2=this.countProces2+1
        this.countProcesFinal=this.countProces-this.countProces2;
        if(this.procesos_camaras2[i].idcompra == this.selectNumeroProceso){
          this.countProcesCorrelative=this.countProcesFinal;
        }
      }
    }
  }






  nuevoPDF(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.setFontSize(10);

    doc.text('Compra', 95, 25);


    var compra = document.getElementById("compra");
    var comprahtml = compra?.innerHTML;
    var correlativecliente = document.getElementById("correlativecliente");
    var correlativeclientehtml = correlativecliente?.innerHTML;
    var fecha_factura = document.getElementById("fecha_factura");
    var fecha_facturahtml = fecha_factura?.innerHTML;
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
    var cantidad_kilogramos = document.getElementById("cantidad_kilogramos");
    var cantidad_kilogramoshtml = cantidad_kilogramos?.innerHTML;
    var cantidad_bins = document.getElementById("cantidad_bins");
    var cantidad_binshtml = cantidad_bins?.innerHTML;
    var tipo_pago = document.getElementById("tipo_pago");
    var tipo_pagohtml = tipo_pago?.innerHTML;
    var fruta = document.getElementById("fruta");
    var frutahtml = fruta?.innerHTML;
    var numero_factura = document.getElementById("numero_factura");
    var numero_facturahtml = numero_factura?.innerHTML;
    var pago = document.getElementById("pago");
    var pagohtml = pago?.innerHTML;


    





    doc.text('Dirección: J.J Godoy 100, La Calera', 124, 8);
    doc.text('Contacto: contacto@vicmarspa.cl', 124, 12);
    doc.line(5, 20, 204, 20);


    var img = new Image()
    img.src = '/assets/image.jpg'
    doc.addImage(img, 'jpg', 185, 0, 18, 18)



    doc.line(5, 15, 22, 15);

    

    doc.line(5, 6, 22, 6);


    doc.line(5, 15, 5, 6)

    doc.line(22, 15, 22, 6)

    doc.setFontSize(28);




    doc.text(correlativeclientehtml,10, 14);


    doc.setFontSize(10);







    doc.text('NUMERO COMPRA: ', 10, 35);
    doc.text(comprahtml,55, 35);
    doc.text('FECHA FACTURA:', 10, 40);
    doc.text(fecha_facturahtml,55, 40);
    doc.text('FECHA: ', 10, 45);
    doc.text(fechahtml,55, 45);
    doc.text('TELEFONO: ', 10, 50);
    doc.text(pagohtml,55, 50);
    doc.text('MONTO NETO: ', 10, 55);
    doc.text(totalingresohtml,55,55);

    doc.text('TOTAL KILOGRAMOS: ', 10, 60);
    doc.text(cantidad_kilogramoshtml,55, 60);
    
    doc.text('TOTAL BINS: ', 10, 65);
    doc.text(cantidad_binshtml,55, 65);

    doc.text('CLIENTE: ', 10, 70);
    doc.text(clientehtml,55, 70);




    doc.text('IVA: ', 100, 35);
    doc.text(ivahtml,145, 35);
    doc.text('IMPUESTO ADICIONAL: ', 100, 40);
    doc.text(frutahtml,145, 40);
    doc.text('NUMERO FACTURA: ', 100, 45);
    doc.text(numero_facturahtml,145, 45);
    doc.text('DIRECCION: ', 100, 50);
    doc.text(valortotalhtml,145,50);
    doc.text('TOTAL: ', 100, 55);
    doc.text(mermahtml,145,55);
    doc.text('TIPO PAGO: ', 100, 60);
    doc.text(tipo_pagohtml,145, 60);




    doc.line(5, 30, 204, 30);
    doc.line(5, 75, 204, 75);

    doc.text('Detalle de Compra' ,85,80);

    
    doc.line(5, 85, 204, 85);

    
    

    doc.autoTable({ html: '#entrada', startY:90, columnStyles: {
      0: {cellWidth: 26},
      1: {cellWidth: 22},
      2: {cellWidth: 22},
      3: {cellWidth: 32},
      4: {cellWidth: 22},
      
    },margin: {top: 90,right:35,left:40},styles: {overflow: 'linebreak',
    fontSize: 8},didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
        }} } )
    doc.output('dataurlnewwindow'); 
      
   
  }

}
