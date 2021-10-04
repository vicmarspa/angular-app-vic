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
  procesos_camaras2:any=[];


  selectNombre:any='';
  selectNumeroProceso:any='';
  ventas2:any = [];
  products:any = [];



  ngOnInit(): void {

    this.calibradoService.getVentas()
      .subscribe(
        res => {
          this.ventas2 = res;
          this.products = res;                 
                           
          console.log(res);
        },
        err => console.error(err)
      );

    const params = this.activedRoute.snapshot.params;
    this.calibradoService.getProductosxVenta(params.idventa)
    .subscribe(
      res => {
        console.log(res);
        this.prodsxventa = res;
        this.correlativoFuncion()

        
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

  public KilogramosSum(){
    return this.prodsxventa.map(productos => productos.cantidad_producto).reduce((a,b) => a+b, 0);
  }

  public BinsSum(){
    return this.prodsxventa.map(productos => productos.cantidad_bins).reduce((a,b) => a+b, 0);
  }


  countProces:number=0;
  countProces2:number=-1;
  countProcesFinal:number=0;
  countProcesCorrelative:number=0;


  correlativoFuncion()
  {
    this.countProces=0;
    this.procesos_camaras2=this.ventas2;
    this.selectNombre = this.venta.nombre;
    this.selectNumeroProceso = this.venta.idventa;
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
        if(this.procesos_camaras2[i].idventa == this.selectNumeroProceso){
          this.countProcesCorrelative=this.countProcesFinal;
          console.log("este es el correlativo", this.countProcesCorrelative)
        }
      }
    }
  }









  nuevoPDF(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();

    doc.setFontSize(10);

    doc.text('Venta', 95, 25);


    var numero_venta = document.getElementById("numero_venta");
    var numero_ventahtml = numero_venta?.innerHTML;
    
    var correlativo_cliente =  document.getElementById("correlativo_cliente");
    var correlativo_clientehtml = correlativo_cliente?.innerHTML;
    
    var fecha =  document.getElementById("fecha");
    var fechahtml = fecha?.innerHTML;
    
    var cliente =  document.getElementById("cliente");
    var clientehtml = cliente?.innerHTML;
    
    var total_venta =  document.getElementById("total_venta");
    var total_ventahtml = total_venta?.innerHTML;
    
    var correo =  document.getElementById("correo");
    var correohtml = correo?.innerHTML;
    
    var direccion =  document.getElementById("direccion");
    var direccionhtml = direccion?.innerHTML;
    
    var telefono =  document.getElementById("telefono");
    var telefonohtml = telefono?.innerHTML;
    
    var kilogramos =  document.getElementById("kilogramos");
    var kilogramoshtml = kilogramos?.innerHTML;
    
    var bins =  document.getElementById("bins");
    var binshtml = bins?.innerHTML;
    
    var kilogramos =  document.getElementById("kilogramos");
    var kilogramoshtml = kilogramos?.innerHTML;
    
    var kilogramos =  document.getElementById("kilogramos");
    var kilogramoshtml = kilogramos?.innerHTML;



    





    







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




    doc.text(correlativo_clientehtml,10, 14);


    doc.setFontSize(10);



    doc.text('NUMERO VENTA: ', 10, 35);
    doc.text(numero_ventahtml, 55, 35);
    
    doc.text('TOTAL: ', 10, 40);
    doc.text(total_ventahtml, 55, 40);
    
    doc.text('FECHA: ', 10, 45);
    doc.text(fechahtml, 55, 45);
    
    doc.text('DIRECCIÓN: ', 10, 50);
    doc.text(direccionhtml, 55, 50);
    
    doc.text('CLIENTE: ', 10, 55);
    doc.text(clientehtml, 55, 55);
    
    doc.text('CORREO: ', 10, 60);
    doc.text(correohtml, 55, 60);
    
    doc.text('TELEFONO: ', 10, 65);
    doc.text(telefonohtml, 55, 65);
    
    doc.text('KILOGRAMOS: ', 100, 35);
    doc.text(kilogramoshtml, 145, 35);
    
    doc.text('BINS: ', 100, 40);
    doc.text(binshtml, 145, 40);
    













    doc.line(5, 30, 204, 30);
    doc.line(5, 70, 204, 70);

    doc.text('Detalle de Venta' ,85,75);

    doc.line(5, 80, 204, 80);


    doc.autoTable({ html: '#entrada',columnStyles: {
      0: {cellWidth: 15},
      1: {cellWidth: 24},
      2: {cellWidth: 22},
      3: {cellWidth: 15},
      4: {cellWidth: 18},
      5: {cellWidth: 15},
      6: {cellWidth: 30},
      7: {cellWidth: 30},
      
    },margin: {top: 85,right:35,left:20},styles: {overflow: 'linebreak',
    fontSize: 8},didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
        }

    } } )   
    
    doc.output('dataurlnewwindow'); 
      
   
  }

  





  nuevoPDF2(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();

    doc.setFontSize(10);

    doc.text('Venta', 95, 25);
    
    var correlativo_cliente =  document.getElementById("correlativo_cliente");
    var correlativo_clientehtml = correlativo_cliente?.innerHTML;
    
    var fecha =  document.getElementById("fecha");
    var fechahtml = fecha?.innerHTML;
    
    var cliente =  document.getElementById("cliente");
    var clientehtml = cliente?.innerHTML;
    
    var total_venta =  document.getElementById("total_venta");
    var total_ventahtml = total_venta?.innerHTML;
    
    var correo =  document.getElementById("correo");
    var correohtml = correo?.innerHTML;
    
    var direccion =  document.getElementById("direccion");
    var direccionhtml = direccion?.innerHTML;
    
    var telefono =  document.getElementById("telefono");
    var telefonohtml = telefono?.innerHTML;
    
    var kilogramos =  document.getElementById("kilogramos");
    var kilogramoshtml = kilogramos?.innerHTML;
    
    var bins =  document.getElementById("bins");
    var binshtml = bins?.innerHTML;
    
    var kilogramos =  document.getElementById("kilogramos");
    var kilogramoshtml = kilogramos?.innerHTML;
    
    var kilogramos =  document.getElementById("kilogramos");
    var kilogramoshtml = kilogramos?.innerHTML;



    





    







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




    doc.text(correlativo_clientehtml,10, 14);


    doc.setFontSize(10);


    
    doc.text('TOTAL: ', 10, 35);
    doc.text(total_ventahtml, 55, 35);
    
    doc.text('FECHA: ', 10, 40);
    doc.text(fechahtml, 55, 40);
    
    doc.text('DIRECCIÓN: ', 10, 45);
    doc.text(direccionhtml, 55, 45);
    
    doc.text('CLIENTE: ', 10, 50);
    doc.text(clientehtml, 55, 50);
    
    doc.text('CORREO: ', 10, 55);
    doc.text(correohtml, 55, 55);
    
    doc.text('TELEFONO: ', 10, 60);
    doc.text(telefonohtml, 55, 60);
    
    doc.text('KILOGRAMOS: ', 100, 35);
    doc.text(kilogramoshtml, 145, 35);
    
    doc.text('BINS: ', 100, 40);
    doc.text(binshtml, 145, 40);
    













    doc.line(5, 30, 204, 30);
    doc.line(5, 65, 204, 65);

    doc.text('Detalle de Venta' ,85,70);

    doc.line(5, 75, 204, 75);


    doc.autoTable({ html: '#entrada2',columnStyles: {
      0: {cellWidth: 15},
      1: {cellWidth: 24},
      2: {cellWidth: 22},
      3: {cellWidth: 18},
      4: {cellWidth: 18},
      5: {cellWidth: 30},
      6: {cellWidth: 30},

      
    },margin: {top: 80,right:35,left:28},styles: {overflow: 'linebreak',
    fontSize: 8},didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
        }

    } } )   
    
    doc.output('dataurlnewwindow'); 
      
   
  }





























}

