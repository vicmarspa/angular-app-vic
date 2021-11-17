import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CalibradoService } from 'src/app/services/calibrado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'
import { PaltaChilenaService } from 'src/app/services/palta-chilena.service';

import {CpcPrincipal} from '../../models/cpcPrincipal';




@Component({
  selector: 'app-busqueda-cpc',
  templateUrl: './busqueda-cpc.component.html',
  styleUrls: ['./busqueda-cpc.component.css']
})
export class BusquedaCpcComponent implements OnInit {

  getAllBuys:any= [];
  getAllBuysRespaldo:any= [];
  selectIdCpc:any='';
  selectNombre:any='';
  selectedFechaIngreso:any='';
  selectedImpuesto:any='';
  selectedTotalCantidad:any='';
  selectTotalValor:any='';
  getDatosCompraEntrada:any = [];
  getDatosCompraSalida:any = [];
  getDetailProductsSellsObject:any = [];
  
  constructor(
    public calibradoService: CalibradoService,
    private router:Router,
    private activedRoute: ActivatedRoute,
    public paltaChilenaService: PaltaChilenaService

  ) { }




  cpcPrincipal:CpcPrincipal = {
    id_cpc: 0,
    cliente_id: 0,
    fecha_ingreso: new Date,
    estado:'',
    impuesto:0,
  }

  ngOnInit(): void {
    this.asignarVariableIniciales();
  }



  cargarDatosIniciales(_callbackCompra){
    this.paltaChilenaService.getAllBuys()
    .subscribe(
      res => {
        this.getAllBuys = res;
        this.getAllBuysRespaldo = this.getAllBuys;
        console.log(res);
        _callbackCompra();
      },
      err => console.error(err)
    );
  }


  asignarVariableIniciales(){
    this.cargarDatosIniciales(()=>{
      this.calcularIva();
      this.calcularIva2();
    });
  }



  menuOpciones(
    selectIdCpc:any,
    selectNombre:any,
    selectedFechaIngreso:any,
    selectedImpuesto:any,
    selectedTotalCantidad:any,
    selectTotalValor:any,
    ){
    this.selectIdCpc = selectIdCpc;
    this.selectNombre = selectNombre;
    this.selectedFechaIngreso = selectedFechaIngreso;
    this.selectedImpuesto = selectedImpuesto;
    this.selectedTotalCantidad = selectedTotalCantidad;
    this.selectTotalValor = selectTotalValor;
    this.obtenerDatosEntradaCompra();
    this.obtenerDatosSalidaCompre();
    this.getDetailProductsSells();
  }




  obtenerDatosEntradaCompra(){
    this.paltaChilenaService.getCompraEntrada(this.selectIdCpc)
    .subscribe(
      res => {
        console.log(res);
        this.getDatosCompraEntrada = res;
      },
      err => console.log(err)
    )
  }


  obtenerDatosSalidaCompre(){
    this.paltaChilenaService.getCompraSalida(this.selectIdCpc)
    .subscribe(
      res => {
        console.log(res);
        this.getDatosCompraSalida = res;
      },
      err => console.log(err)
    )
  }

  getDetailProductsSells(){
    this.paltaChilenaService.getSellProductDetail(this.selectIdCpc)
    .subscribe(
      res => {
        console.log(res);
        this.getDetailProductsSellsObject = res;
      },
      err => console.log(err)
    )
  }



  updateStatusBuyDelete(id_cpc:number){
    Swal.fire({
      title: '¿Estás Seguro?',
      text: "¿Desea Eliminar Esta Compra?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {   
    this.cpcPrincipal.id_cpc= id_cpc;
    this.cpcPrincipal.estado = '0';
    this.paltaChilenaService.changeBuyStatusDelete(this.cpcPrincipal)
    .subscribe(
      res => {
        location.reload()
      },
      err => console.error(err)
    );
    Swal.fire(
      'Compra Eliminada',
      'Se Ha Eliminado La Compra',
      'success'
        )
      }
    })
  }





  public kilogramosEntradaSum(){
    return this.getDatosCompraEntrada.map(entrada => entrada.cantidad).reduce((a,b) => a+b, 0);
  }

  public ValorTotalSum(){
    return this.getDatosCompraEntrada.map(entrada => entrada.valor_total).reduce((a,b) => a+b, 0);
  }

  public kilogramosSalidaSum(){
    return this.getDatosCompraSalida.map(entrada => entrada.cantidad).reduce((a,b) => a+b, 0);
  }

  public BinsSalidaSum(){
    return this.getDatosCompraSalida.map(entrada => entrada.bins).reduce((a,b) => a+b, 0);
  }

  public kilogramosTotalSum(){
    return this.getAllBuys.map(entrada => entrada.total_cantidad).reduce((a,b) => a+b, 0);
  }

  public PrecioTotalSum(){
    return this.getAllBuys.map(entrada => entrada.total_valor).reduce((a,b) => a+b, 0);
  }

  public PrecioTotalSumDetailProductsSells(){
    return this.getDetailProductsSellsObject.map(entrada => entrada.precio_total).reduce((a,b) => a+b, 0);
  }
  
  public cantidadSumDetailProductsSells(){
    return this.getDetailProductsSellsObject.map(entrada => entrada.cantidad).reduce((a,b) => a+b, 0);
  }
  
  id_cpc:any;

  Search(){
    this.getAllBuys = this.getAllBuysRespaldo;
    if(this.id_cpc == ""){
      this.ngOnInit();
    }
    else{
      this.getAllBuys = this.getAllBuys.filter(res => {
        return res.id_cpc.toString().match(this.id_cpc.toString());
      })
    }
  }



  nombre:any;
  
  SearchByClient(){
    this.getAllBuys = this.getAllBuysRespaldo;
    if(this.nombre == ""){
      this.ngOnInit();
    }
    else{
      this.getAllBuys = this.getAllBuys.filter(res => {
        return res.nombre.toString().match(this.nombre.toString());
      })
    }
  }



  ts = new Date();
  startDateText:any="";
  endDateText:any="";
  fechaActual = new Date();

  dateRangeCreated($event) {    
    this.getAllBuys = this.getAllBuysRespaldo; 
    this.ts = this.getAllBuys.fecha_ingreso;                       
    let startDate = $event[0].toJSON().split('T')[0];   
    let endDate = $event[1].toJSON().split('T')[0]; 
    this.getAllBuys = this.getAllBuys.filter(m => new Date(m.fecha_ingreso) >= new Date(startDate) && new Date(m.fecha_ingreso) <= new Date(endDate)        
    );  
    console.log(startDate);
    console.log(endDate);

    this.startDateText = startDate;
    this.endDateText = endDate;
    console.log('esta es la fecha de ingreso'+startDate);
    console.log('esta es la fecha de salida'+endDate);
  }


  countProces:number=0;
  sumaTotalPrecio:number=0;
  calcularIva(){
    for (var i = 0; i < this.getAllBuys.length; i++) {
      //cuenta cantidad de procesos
      this.countProces= this.countProces +1;
      this.sumaTotalPrecio = (this.sumaTotalPrecio) +  ( ( this.getAllBuys[i].total_valor )* ( ( ( this.getAllBuys[i].impuesto ) /100 )+1 ) ) ;
      console.log(this.sumaTotalPrecio);
    }
  }


  countProces2:number=0;
  sumaTotalPrecio2:number=0;
  calcularIva2(){
    for (var i = 0; i < this.getAllBuys.length; i++) {
      //cuenta cantidad de procesos
        this.countProces2= this.countProces2 +1;
        this.sumaTotalPrecio2 = (this.sumaTotalPrecio2) + ( ( this.getAllBuys[i].impuesto/100 ) * this.getAllBuys[i].total_valor ) ;
        console.log(this.sumaTotalPrecio2);

    }
    console.log("IVA FINAL", this.sumaTotalPrecio2);
  }


  reporteIndividualPDF(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.setFontSize(10);
  
    doc.text('Dirección: J.J Godoy 100, La Calera', 124, 8);
    doc.text('Contacto: contacto@vicmarspa.cl', 124, 12);
  
    var img = new Image()
    img.src = '/assets/image.jpg'
    doc.addImage(img, 'jpg', 185, 0, 18, 18)
  
    doc.line(5, 20, 204, 20);
  









  
    var selectIdCpc = document.getElementById("selectIdCpc");
    var selectIdCpchtml = selectIdCpc?.innerHTML;
    
    var selectNombre =  document.getElementById("selectNombre");
    var selectNombrehtml = selectNombre?.innerHTML;
    
    var selectedFechaIngreso =  document.getElementById("selectedFechaIngreso");
    var selectedFechaIngresohtml = selectedFechaIngreso?.innerHTML;
    
    var selectedImpuesto =  document.getElementById("selectedImpuesto");
    var selectedImpuestohtml = selectedImpuesto?.innerHTML;
    
    var selectedTotalCantidad =  document.getElementById("selectedTotalCantidad");
    var selectedTotalCantidadhtml = selectedTotalCantidad?.innerHTML;
    
    var selectTotalValor =  document.getElementById("selectTotalValor");
    var selectTotalValorhtml = selectTotalValor?.innerHTML;
    
    var selectTotalValor2 =  document.getElementById("selectTotalValor2");
    var selectTotalValor2html = selectTotalValor2?.innerHTML;

    var utilidadcompra =  document.getElementById("utilidadcompra");
    var utilidadcomprahtml = utilidadcompra?.innerHTML;



    doc.line(5, 15, 35, 15);

    

    doc.line(5, 6, 35, 6);

    doc.setFontType('bold');
    doc.setFontSize(14);
    doc.text('LOTE: ', 8, 12);
    doc.text(selectIdCpchtml, 25, 12); 
    doc.setFontType('normal');
    doc.setFontSize(10);


    doc.line(5, 15, 5, 6)

    doc.line(35, 15, 35, 6)


  
  

    doc.text('PROVEEDOR: ', 10, 25);
    doc.setFontType('bold');
    doc.text(selectNombrehtml, 55, 25); 
    doc.setFontType('normal');

    doc.text('FECHA DE INGRESO: ', 10, 30);
    doc.setFontType('bold');
    doc.text(selectedFechaIngresohtml, 55, 30); 
    doc.setFontType('normal');

    doc.text('IMPUESTOS: ', 10, 35);
    doc.setFontType('bold');
    doc.text(selectedImpuestohtml, 55, 35); 
    doc.setFontType('normal');

    doc.text('KILOGRAMOS: ', 10, 40);
    doc.setFontType('bold');
    doc.text(selectedTotalCantidadhtml, 55, 40); 
    doc.setFontType('normal');

    doc.text('PRECIO NETO: ', 10, 45); 
    doc.setFontType('bold');
    doc.text(selectTotalValorhtml, 55, 45); 
    doc.setFontType('normal');

    doc.text('PRECIO TOTAL: ', 10, 50); 
    doc.setFontType('bold');
    doc.text(selectTotalValor2html, 55, 50); 
    doc.setFontType('normal');

    doc.text('UTILIDAD: ', 10, 55); 
    doc.setFontType('bold');
    doc.text(utilidadcomprahtml, 55, 55); 
  
  
    doc.line(5, 60, 204, 60);
  
    doc.text('DETALLE DE COMPRA - PALTA CHILENA - DOCUMENTO FINAL', 50,65);
    
    doc.line(5, 70, 204, 70);
  
  
  
  
  
    doc.text('DETALLE DE ENTRADA', 45,75);

  
    // top: 65,right:35,left:10
    doc.autoTable({ html: '#datos_entrada',columnStyles: {
      0: {cellWidth: 16},
      1: {cellWidth: 18},
      2: {cellWidth: 16},
      3: {cellWidth: 20},
      4: {cellWidth: 24},
      5: {cellWidth: 24},

    },margin: {top: 80,right:35,left:5}, styles: {overflow: 'linebreak',
    fontSize: 10},didParseCell: function (data) {
  
      //data.table.body.splice(5);
      var rows = data.table.body;
  
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
      }} } )
  
    doc.text('DETALLE DE SALIDA', 140,75);

      doc.autoTable({ html: '#datos_salida', startY:80, columnStyles: {
        0: {cellWidth: 25},
        1: {cellWidth: 25},
        2: {cellWidth: 12},
        3: {cellWidth: 15},

      },margin: {top: 75,right:2,left:125}, styles: {overflow: 'linebreak',
      fontSize: 10},didParseCell: function (data) {
    
        //data.table.body.splice(5);
        var rows = data.table.body;
    
        if (data.row.index === rows.length - 1) {
            data.cell.styles.fillColor = [138, 236, 247];
        }} } )

        doc.autoTable({ html: '#datos_products_sell_detail', columnStyles: {
          0: {cellWidth: 25},
          1: {cellWidth: 25},
          2: {cellWidth: 25},
          3: {cellWidth: 25},
          4: {cellWidth: 25},

  
        },margin: {top: 75,right:2,left:40}, styles: {overflow: 'linebreak',
        fontSize: 10},didParseCell: function (data) {
      
          //data.table.body.splice(5);
          var rows = data.table.body;
      
          if (data.row.index === rows.length - 1) {
              data.cell.styles.fillColor = [138, 236, 247];
          }} } )


    doc.output('dataurlnewwindow'); 
  }







  reporteIndividualPreliminarPDF(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.setFontSize(10);
  
    doc.text('Dirección: J.J Godoy 100, La Calera', 124, 8);
    doc.text('Contacto: contacto@vicmarspa.cl', 124, 12);
  
    var img = new Image()
    img.src = '/assets/image.jpg'
    doc.addImage(img, 'jpg', 185, 0, 18, 18)
  
    doc.line(5, 20, 204, 20);
  









  
    var selectIdCpc = document.getElementById("selectIdCpc");
    var selectIdCpchtml = selectIdCpc?.innerHTML;
    
    var selectNombre =  document.getElementById("selectNombre");
    var selectNombrehtml = selectNombre?.innerHTML;
    
    var selectedFechaIngreso =  document.getElementById("selectedFechaIngreso");
    var selectedFechaIngresohtml = selectedFechaIngreso?.innerHTML;
    
    var selectedImpuesto =  document.getElementById("selectedImpuesto");
    var selectedImpuestohtml = selectedImpuesto?.innerHTML;
    
    var selectedTotalCantidad =  document.getElementById("selectedTotalCantidad");
    var selectedTotalCantidadhtml = selectedTotalCantidad?.innerHTML;
    
    var selectTotalValor =  document.getElementById("selectTotalValor");
    var selectTotalValorhtml = selectTotalValor?.innerHTML;
    
    var selectTotalValor2 =  document.getElementById("selectTotalValor2");
    var selectTotalValor2html = selectTotalValor2?.innerHTML;




    doc.line(5, 15, 35, 15);

    

    doc.line(5, 6, 35, 6);

    doc.setFontType('bold');
    doc.setFontSize(14);
    doc.text('LOTE: ', 8, 12);
    doc.text(selectIdCpchtml, 25, 12); 
    doc.setFontType('normal');
    doc.setFontSize(10);


    doc.line(5, 15, 5, 6)

    doc.line(35, 15, 35, 6)


  
  

    doc.text('PROVEEDOR: ', 10, 25);
    doc.setFontType('bold');
    doc.text(selectNombrehtml, 55, 25); 
    doc.setFontType('normal');

    doc.text('FECHA DE INGRESO: ', 10, 30);
    doc.setFontType('bold');
    doc.text(selectedFechaIngresohtml, 55, 30); 
    doc.setFontType('normal');

    doc.text('IMPUESTOS: ', 10, 35);
    doc.setFontType('bold');
    doc.text(selectedImpuestohtml, 55, 35); 
    doc.setFontType('normal');

    doc.text('KILOGRAMOS: ', 10, 40);
    doc.setFontType('bold');
    doc.text(selectedTotalCantidadhtml, 55, 40); 
    doc.setFontType('normal');

    doc.text('PRECIO NETO: ', 10, 45); 
    doc.setFontType('bold');
    doc.text(selectTotalValorhtml, 55, 45);
    doc.setFontType('normal');

    doc.text('PRECIO TOTAL: ', 10, 50); 
    doc.setFontType('bold');
    doc.text(selectTotalValor2html, 55, 50); 
   
  
  
  
    doc.line(5, 55, 204, 55);
  
    doc.text('DETALLE DE COMPRA - PALTA CHILENA - DOCUMENTO PRELIMINAR', 50,60);
    
    doc.line(5, 65, 204, 65);
  
  
  
  
  
    doc.text('DETALLE DE ENTRADA', 85,70);

  
    // top: 65,right:35,left:10
    doc.autoTable({ html: '#datos_entrada',columnStyles: {
      0: {cellWidth: 25},
      1: {cellWidth: 20},
      2: {cellWidth: 18},
      3: {cellWidth: 25},
      4: {cellWidth: 25},
      5: {cellWidth: 25},
    },margin: {top: 75,right:35,left:35}, styles: {overflow: 'linebreak',
    fontSize: 10},didParseCell: function (data) {
  
      //data.table.body.splice(5);
      var rows = data.table.body;
  
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
      }} } )
  

    doc.output('dataurlnewwindow'); 
  }




  reporteGeneralPDF(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.setFontSize(10);
  
    doc.text('Dirección: J.J Godoy 100, La Calera', 124, 8);
    doc.text('Contacto: contacto@vicmarspa.cl', 124, 12);
  
    var img = new Image()
    img.src = '/assets/image.jpg'
    doc.addImage(img, 'jpg', 185, 0, 18, 18)
  
    doc.line(5, 15, 204, 15);
  









  
    var fechaActual = document.getElementById("fechaActual");
    var fechaActualhtml = fechaActual?.innerHTML;
    
    var total_kilogramos =  document.getElementById("total_kilogramos");
    var total_kilogramoshtml = total_kilogramos?.innerHTML;
    
    var total_precio =  document.getElementById("total_precio");
    var total_preciohtml = total_precio?.innerHTML;
    
    var startDateText =  document.getElementById("startDateText");
    var startDateTexthtml = startDateText?.innerHTML;

    var endDateText =  document.getElementById("endDateText");
    var endDateTexthtml = endDateText?.innerHTML;
    
    var nombre =  document.getElementById("nombre");
    var nombrehtml = nombre?.innerHTML;

    var total_precio_iva =  document.getElementById("total_precio_iva");
    var total_precio_ivahtml = total_precio_iva?.innerHTML;

    var total_iva =  document.getElementById("total_iva");
    var total_ivahtml = total_iva?.innerHTML;
    
    

    doc.text('FECHA ACTUAL: ', 10, 20);
    doc.setFontType('bold');
    doc.text(fechaActualhtml, 55, 20);
    doc.setFontType('normal');

    doc.text('RANGO DE BUSQUEDA: ', 10, 25);
    doc.setFontType('bold');
    doc.text(' - ',75, 25);
    doc.text(startDateTexthtml, 55, 25);
    doc.text(endDateTexthtml, 80, 25); 
    doc.setFontType('normal');

    doc.text('PROVEEDOR: ', 10, 30);
    doc.setFontType('bold');
    doc.text(nombrehtml, 55, 30); 
    doc.setFontType('normal');

    doc.text('KILOGRAMOS: ', 10, 35); 
    doc.setFontType('bold');
    doc.text(total_kilogramoshtml, 55, 35);
    doc.setFontType('normal');

     
    doc.text('PRECIO NETO: ', 10, 40);
    doc.setFontType('bold');
    doc.text(total_preciohtml, 55, 40); 
    doc.setFontType('normal');

    doc.text('IVA TOTAL: ', 10, 45);
    doc.setFontType('bold');
    doc.text(total_ivahtml, 55, 45); 
    doc.setFontType('normal');

    doc.text('PRECIO TOTAL: ', 10, 50);
    doc.setFontType('bold');
    doc.text(total_precio_ivahtml, 55, 50); 


  


   
  
  
  
    doc.line(5, 55, 204, 55);
  
    doc.text('DETALLE DE COMPRA - PALTA CHILENA', 70, 60);
    
    doc.line(5, 65, 204, 65);
  
  
  
  
  
    doc.text('DETALLE DE REPORTE', 85,70);

  
    // top: 65,right:35,left:10
    doc.autoTable({ html: '#tabla_principal',columnStyles: {
      0: {cellWidth: 15},
      1: {cellWidth: 45},
      2: {cellWidth: 22},
      3: {cellWidth: 25},
      4: {cellWidth: 15},
      5: {cellWidth: 25},
      6: {cellWidth: 25},
      7: {cellWidth: 25},



    },margin: {top: 75,right:35,left:5}, styles: {overflow: 'linebreak',
    fontSize: 10},didParseCell: function (data) {
  
      //data.table.body.splice(5);
      var rows = data.table.body;
  
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
      }} } )
  

    doc.output('dataurlnewwindow'); 
  }



















}
