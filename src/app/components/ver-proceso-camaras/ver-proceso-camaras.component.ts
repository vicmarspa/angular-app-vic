import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IngresoCamarasService } from 'src/app/services/ingreso-camaras.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'



import { Proceso_Camaras } from '../../models/proceso_camaras';
import { splitClasses } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-ver-proceso-camaras',
  templateUrl: './ver-proceso-camaras.component.html',
  styleUrls: ['./ver-proceso-camaras.component.css']
})
export class VerProcesoCamarasComponent implements OnInit {

  constructor(private ingresoCamarasService: IngresoCamarasService, private router:Router, private activedRoute: ActivatedRoute) { }


  procesos_camaras:any=[];
  fechaActual = new Date();
  numero_proceso:any;
  selectedNombre:any;
  ts = new Date();
  startDateText:any="";
  endDateText:any="";
  selectedTipoFruta:any;
  selectedTipoPago:any;
  selectedTipoServicio:any;
  selectNumeroProceso:any='';
  selectNombre:any='';
  selectFechaIngreso:any='';
  selectTotalBines:any='';
  selectPrecio:any='';
  selectPrecioTotal:any='';
  selectFormato:any='';
  selectCantidad:any='';
  selectTipoPago:any='';
  selectFechaInicio:any='';
  selectFechaTermino:any='';
  selectTipoFruta:any='';

  procesos_camaras2:any=[];





  ngOnInit(): void {

    this.ingresoCamarasService.getProcesosCamaras()
    .subscribe(
      res => {
        this.procesos_camaras = res;                 
        console.log(res);
      },
      err => console.error(err)
    );

  }



  public sumaPrecios(){
    return this.procesos_camaras.map(row => row.precio_total).reduce((a,b) => a+b, 0);
  }



  Search(){
    if(this.numero_proceso == ""){
      this.ngOnInit();
    }
    else{
      this.procesos_camaras = this.procesos_camaras.filter(res => {
        return res.numero_proceso.toString().match(this.numero_proceso.toString());
      })
    }
  }

  SearchByClient(){
    if(this.selectedNombre == ""){
      this.ngOnInit();
    }
    else{
      this.procesos_camaras = this.procesos_camaras.filter(res => {
        return res.nombre.toString().match(this.selectedNombre.toString());
      })
    }
  }

  dateRangeCreated($event) {    
    this.procesos_camaras = this.procesos_camaras; 
    this.ts = this.procesos_camaras.fecha_recepcion;                       
    let startDate = $event[0].toJSON().split('T')[0];   
    let endDate = $event[1].toJSON().split('T')[0]; 
    this.procesos_camaras = this.procesos_camaras.filter(m => new Date(m.fecha_recepcion) >= new Date(startDate) && new Date(m.fecha_recepcion) <= new Date(endDate)        
    );  
    console.log(startDate);
    console.log(endDate);

    this.startDateText = startDate;
    this.endDateText = endDate;
    console.log('esta es la fecha de ingreso'+startDate);
    console.log('esta es la fecha de salida'+endDate);
  }


  SearchByFruta(){
    if(this.selectedTipoFruta == ""){
      this.ngOnInit();
    }
    else{
      this.procesos_camaras = this.procesos_camaras.filter(res => {
        return res.tipo_fruta.toString().match(this.selectedTipoFruta.toString());
      })
    }
  }



  SearchByPago(){
    if(this.selectedTipoPago == ""){
      this.ngOnInit();
    }
    else{
      this.procesos_camaras = this.procesos_camaras.filter(res => {
        return res.tipo_pago.toString().match(this.selectedTipoPago.toString());
      })
    }
  }


  SearchByService(){
    if(this.selectedTipoServicio == ""){
      this.ngOnInit();
    }
    else{
      this.procesos_camaras = this.procesos_camaras.filter(res => {
        return res.tipo_proceso.toString().match(this.selectedTipoServicio.toString());
      })
    }
  }

  refreshPageDirect()
  {
    window.location.reload;
  }


  reportePDF(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.setFontSize(10);
  
    doc.text('Dirección: J.J Godoy 100, La Calera', 124, 8);
    doc.text('Contacto: contacto@vicmarspa.cl', 124, 12);
  
    var img = new Image()
    img.src = '/assets/image.jpg'
    doc.addImage(img, 'jpg', 185, 0, 18, 18)
    doc.line(5, 20, 204, 20);
  
    var total_precio = document.getElementById("total_precio");
    var total_preciohtml = total_precio?.innerHTML;
    var fechaActual = document.getElementById("fechaActual");
    var fechaActualhtml = fechaActual?.innerHTML;
    var startDateText = document.getElementById("startDateText");
    var startDateTexthtml = startDateText?.innerHTML;
    var endDateText = document.getElementById("endDateText");
    var endDateTexthtml = endDateText?.innerHTML;
    var selectedTipoPago = document.getElementById("selectedTipoPago");
    var selectedTipoPagohtml = selectedTipoPago?.innerHTML;
    var selectedTipoFruta = document.getElementById("selectedTipoFruta");
    var selectedTipoFrutahtml = selectedTipoFruta?.innerHTML;
    
  
    doc.text('Fecha Actual: ', 10, 25);
    doc.text(fechaActualhtml,45, 25);
    doc.text('Rango de Busqueda: ', 10, 30);
    doc.text(startDateTexthtml,45, 30);
    doc.text(endDateTexthtml,68, 30);
    doc.text('Tipo de Pago: ', 10, 35);
    doc.text(selectedTipoPagohtml,45, 35);
    doc.text('Tipo de Fruta: ', 10, 40);
    doc.text(selectedTipoFrutahtml,45, 40);
    doc.text('Precio Total: ', 95, 25);
    doc.text(total_preciohtml,125, 25);

  
    doc.line(5, 50, 204, 50);
    doc.text('Detalles del Reporte', 80,55);
    doc.line(5, 60, 204, 60);
  
  
    doc.autoTable({ html: '#entrada2',columnStyles: {
  
      
      0: {cellWidth: 10},
      1: {cellWidth: 18},
      2: {cellWidth: 18},
      3: {cellWidth: 15},
      4: {cellWidth: 15},
      5: {cellWidth: 18},
      6: {cellWidth: 18},
      7: {cellWidth: 18},
      8: {cellWidth: 20},
      9: {cellWidth: 15},
      10: {cellWidth: 20},
      11: {cellWidth: 10},

  
    },margin: {top: 65,right:35,left:10}, styles: {overflow: 'linebreak',
    fontSize: 8},didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
      }} } )
  
    
    doc.output('dataurlnewwindow'); 
  }



  menuOpciones(selectNumeroProceso:any, selectNombre:any, selectFechaIngreso:any, selectPrecio:any, selectPrecioTotal:any, selectFormato:any, selectCantidad:any, selectTipoPago:any, selectFechaInicio:any, selectFechaTermino:any, selectTipoFruta:any){
    
    

    this.selectNumeroProceso = selectNumeroProceso;
    this.selectNombre = selectNombre;
    this.selectFechaIngreso = selectFechaIngreso;
    this.selectPrecio = selectPrecio;
    this.selectPrecioTotal = selectPrecioTotal;
    this.selectFormato = selectFormato;
    this.selectCantidad = selectCantidad;
    this.selectTipoPago = selectTipoPago;
    this.selectFechaInicio = selectFechaInicio;
    this.selectFechaTermino = selectFechaTermino;
    this.selectTipoFruta = selectTipoFruta;

this.correlativoFuncion();
  }
  

countProces:number=0;
countProces2:number=-1;
countProcesFinal:number=0;
countProcesCorrelative:number=0;

  correlativoFuncion()
  {
    this.countProces=0;
    this.procesos_camaras2=this.procesos_camaras;
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
        if(this.procesos_camaras2[i].numero_proceso == this.selectNumeroProceso){
          this.countProcesCorrelative=this.countProcesFinal;
        }

      }
    }
  }







  generatePDF(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();



    doc.setFontSize(10);
    

 


    var proceso = document.getElementById("detailselectNumeroProceso");
    var procesohtml = proceso?.innerHTML;

    //correlativoProceso
    var correlativoProceso = document.getElementById("detailcountProcesCorrelative");
    var correlativoProcesohtml = correlativoProceso?.innerHTML;

    var nombre = document.getElementById("detailselectNombre");
    var nombrehtml = nombre?.innerHTML;

    var fechaingreso = document.getElementById("detailselectFechaIngreso");
    var fechaingresohtml = fechaingreso?.innerHTML;

    var tipofruta = document.getElementById("detailselectTipoFruta");
    var tipofrutahtml = tipofruta?.innerHTML;

    var cantidad = document.getElementById("detailselectCantidad");
    var cantidadhtml = cantidad?.innerHTML;

    var precio = document.getElementById("detailselectPrecio");
    var preciohtml = precio?.innerHTML;

    var preciototal = document.getElementById("detailselectPrecioTotal");
    var preciototalhtml = preciototal?.innerHTML;

    var formato = document.getElementById("detailselectFormato");
    var formatohtml = formato?.innerHTML;

    var tipopago = document.getElementById("detailselectTipoPago");
    var tipopagohtml = tipopago?.innerHTML;

    var fechainicio = document.getElementById("detailselectFechaInicio");
    var fechainiciohtml = fechainicio?.innerHTML;

    var fechatermino = document.getElementById("detailselectFechaTermino");
    var fechaterminohtml = fechatermino?.innerHTML;

    doc.text('Dirección: J.J Godoy 100, La Calera', 124, 8);
    doc.text('Contacto: contacto@vicmarspa.cl', 124, 12);
    doc.line(5, 20, 204, 20);

    var img = new Image()
    img.src = '/assets/image.jpg'
    doc.addImage(img, 'jpg', 185, 0, 18, 18)

    doc.text('Detalle de Servicio', 85, 30);

    doc.text('Numero de Proceso: ', 50,40);
    doc.text(procesohtml,100,40);
    doc.text('Correlativo del Cliente: ', 50,45);
    doc.text(correlativoProcesohtml,100,45);
    doc.text('Nombre: ', 50,50);
    doc.text(nombrehtml,100,50);
    doc.text('Formato: ', 50,55);
    doc.text(formatohtml,100,55);
    doc.text('Fecha Recepción: ', 50,60);
    doc.text(fechaingresohtml,100,60);
    doc.text('Fecha Inicio: ', 50,65);
    doc.text(fechainiciohtml,100,65);
    doc.text('Fecha Termino: ', 50,70);
    doc.text(fechaterminohtml,100,70);
    doc.text('Tipo Fruta: ', 50,75);
    doc.text(tipofrutahtml,100,75);
    doc.text('Precio: ', 50,80);
    doc.text(preciohtml,100,80);
    doc.text('Cantidad: ', 50,85);
    doc.text(cantidadhtml,100,85);
    doc.text('Precio Total: ', 50,90);
    doc.text(preciototalhtml,100,90);
    doc.text('Tipo Pago: ', 50,95);
    doc.text(tipopagohtml,100,95);
    
    doc.line(5, 35, 204, 35 );
    doc.line(5, 100, 204, 100);

 
    doc.line(5, 15, 22, 15);

    

    doc.line(5, 6, 22, 6);


    doc.line(5, 15, 5, 6)

    doc.line(22, 15, 22, 6)

    doc.setFontSize(28);
   
    doc.text(correlativoProcesohtml,10, 14);
    
    doc.output('dataurlnewwindow'); 
      
   
  }




  generateClientPDF(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();



    doc.setFontSize(10);
    

 


    var proceso = document.getElementById("detailselectNumeroProceso");
    var procesohtml = proceso?.innerHTML;

    //correlativoProceso
    var correlativoProceso = document.getElementById("detailcountProcesCorrelative");
    var correlativoProcesohtml = correlativoProceso?.innerHTML;

    var nombre = document.getElementById("detailselectNombre");
    var nombrehtml = nombre?.innerHTML;

    var fechaingreso = document.getElementById("detailselectFechaIngreso");
    var fechaingresohtml = fechaingreso?.innerHTML;

    var tipofruta = document.getElementById("detailselectTipoFruta");
    var tipofrutahtml = tipofruta?.innerHTML;

    var cantidad = document.getElementById("detailselectCantidad");
    var cantidadhtml = cantidad?.innerHTML;

    var precio = document.getElementById("detailselectPrecio");
    var preciohtml = precio?.innerHTML;

    var preciototal = document.getElementById("detailselectPrecioTotal");
    var preciototalhtml = preciototal?.innerHTML;

    var formato = document.getElementById("detailselectFormato");
    var formatohtml = formato?.innerHTML;

    var tipopago = document.getElementById("detailselectTipoPago");
    var tipopagohtml = tipopago?.innerHTML;

    var fechainicio = document.getElementById("detailselectFechaInicio");
    var fechainiciohtml = fechainicio?.innerHTML;

    var fechatermino = document.getElementById("detailselectFechaTermino");
    var fechaterminohtml = fechatermino?.innerHTML;

    doc.text('Dirección: J.J Godoy 100, La Calera', 124, 8);
    doc.text('Contacto: contacto@vicmarspa.cl', 124, 12);
    doc.line(5, 20, 204, 20);


    var img = new Image()
    img.src = '/assets/image.jpg'
    doc.addImage(img, 'jpg', 185, 0, 18, 18)

    doc.text('Detalle de Servicio de Cámaras', 85, 30);


    doc.text('Nombre: ', 50,50);
    doc.text(nombrehtml,100,50);
    doc.text('Formato: ', 50,55);
    doc.text(formatohtml,100,55);
    doc.text('Fecha Recepción: ', 50,60);
    doc.text(fechaingresohtml,100,60);
    doc.text('Fecha Inicio: ', 50,65);
    doc.text(fechainiciohtml,100,65);
    doc.text('Fecha Termino: ', 50,70);
    doc.text(fechaterminohtml,100,70);
    doc.text('Tipo Fruta: ', 50,75);
    doc.text(tipofrutahtml,100,75);
    doc.text('Precio: ', 50,80);
    doc.text(preciohtml,100,80);
    doc.text('Cantidad: ', 50,85);
    doc.text(cantidadhtml,100,85);
    doc.text('Precio Total: ', 50,90);
    doc.text(preciototalhtml,100,90);
    doc.text('Tipo Pago: ', 50,95);
    doc.text(tipopagohtml,100,95);
    



    
    doc.line(5, 35, 204, 35 );
    doc.line(5, 110, 204, 110);

 
    doc.line(5, 15, 22, 15);

    

    doc.line(5, 6, 22, 6);


    doc.line(5, 15, 5, 6)

    doc.line(22, 15, 22, 6)

    doc.setFontSize(28);
   
    doc.text(correlativoProcesohtml,10, 14);
    
    doc.output('dataurlnewwindow'); 
      
   
  }
































}
