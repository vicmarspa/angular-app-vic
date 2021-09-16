import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ServicioGruasService } from 'src/app/services/servicio-gruas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'



import {Servicio_Gruas} from '../../models/servicio_gruas';
import { splitClasses } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-ver-servicio-gruas',
  templateUrl: './ver-servicio-gruas.component.html',
  styleUrls: ['./ver-servicio-gruas.component.css']
})
export class VerServicioGruasComponent implements OnInit {

  constructor(private servicioGruasService: ServicioGruasService, private router:Router, private activedRoute: ActivatedRoute) { }


  servicio_Gruas:any=[];
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
  selectCantidad:any='';
  selectTipoPago:any='';
  selectTipoFruta:any='';
  procesos_camaras2:any=[];






  ngOnInit(): void {

    this.servicioGruasService.getProcesosServicioGruas()
    .subscribe(
      res => {
        this.servicio_Gruas = res;                 
        console.log(res);
      },
      err => console.error(err)
    );

  }





  public sumaPrecios(){
    return this.servicio_Gruas.map(row => row.precio_total).reduce((a,b) => a+b, 0);
  }



  Search(){
    if(this.numero_proceso == ""){
      this.ngOnInit();
    }
    else{
      this.servicio_Gruas = this.servicio_Gruas.filter(res => {
        return res.numero_proceso.toString().match(this.numero_proceso.toString());
      })
    }
  }

  SearchByClient(){
    if(this.selectedNombre == ""){
      this.ngOnInit();
    }
    else{
      this.servicio_Gruas = this.servicio_Gruas.filter(res => {
        return res.nombre.toString().match(this.selectedNombre.toString());
      })
    }
  }

  dateRangeCreated($event) {    
    this.servicio_Gruas = this.servicio_Gruas; 
    this.ts = this.servicio_Gruas.fecha_recepcion;                       
    let startDate = $event[0].toJSON().split('T')[0];   
    let endDate = $event[1].toJSON().split('T')[0]; 
    this.servicio_Gruas = this.servicio_Gruas.filter(m => new Date(m.fecha_recepcion) >= new Date(startDate) && new Date(m.fecha_recepcion) <= new Date(endDate)        
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
      this.servicio_Gruas = this.servicio_Gruas.filter(res => {
        return res.tipo_fruta.toString().match(this.selectedTipoFruta.toString());
      })
    }
  }



  SearchByPago(){
    if(this.selectedTipoPago == ""){
      this.ngOnInit();
    }
    else{
      this.servicio_Gruas = this.servicio_Gruas.filter(res => {
        return res.tipo_pago.toString().match(this.selectedTipoPago.toString());
      })
    }
  }


  SearchByService(){
    if(this.selectedTipoServicio == ""){
      this.ngOnInit();
    }
    else{
      this.servicio_Gruas = this.servicio_Gruas.filter(res => {
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
    doc.text('Detalles del Reporte - Servicio de Gruas', 74,55);
    doc.line(5, 60, 204, 60);
  
  
    doc.autoTable({ html: '#entrada2',columnStyles: {
  
      
      0: {cellWidth: 15},
      1: {cellWidth: 18},
      2: {cellWidth: 18},
      3: {cellWidth: 15},
      4: {cellWidth: 15},
      5: {cellWidth: 18},
      6: {cellWidth: 18},
      7: {cellWidth: 18},


  
    },margin: {top: 65,right:35,left:10}, styles: {overflow: 'linebreak',
    fontSize: 8},didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
      }} } )
  
    
    doc.output('dataurlnewwindow'); 
  }



  menuOpciones(selectNumeroProceso:any, selectNombre:any, selectFechaIngreso:any, selectPrecio:any, selectPrecioTotal:any, selectCantidad:any, selectTipoPago:any, selectTipoFruta:any){
    
    

    this.selectNumeroProceso = selectNumeroProceso;
    this.selectNombre = selectNombre;
    this.selectFechaIngreso = selectFechaIngreso;
    this.selectPrecio = selectPrecio;
    this.selectPrecioTotal = selectPrecioTotal;
    this.selectCantidad = selectCantidad;
    this.selectTipoPago = selectTipoPago;
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
    this.procesos_camaras2=this.servicio_Gruas;
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






  BorrarProcesoCamaras(numero_proceso: string){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No se podrá recuperar este pago",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrala!'
    }).then((result) => {
      if (result.isConfirmed) {
      this.servicioGruasService.deleteProcesoServicioGruas(numero_proceso)
      .subscribe(
        res => {
          console.log(res);          
          this.ngOnInit();
        },
        err => console.error(err)
      )
        window.location.reload();
      }
    })
  
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

;

    var tipopago = document.getElementById("detailselectTipoPago");
    var tipopagohtml = tipopago?.innerHTML;



    doc.text('Dirección: J.J Godoy 100, La Calera', 124, 8);
    doc.text('Contacto: contacto@vicmarspa.cl', 124, 12);
    doc.line(5, 20, 204, 20);

    var img = new Image()
    img.src = '/assets/image.jpg'
    doc.addImage(img, 'jpg', 185, 0, 18, 18)

    doc.text('Detalle de Servicio de Grúas', 75, 30);
    doc.text('Numero de Proceso: ', 50,40);
    doc.text(procesohtml,100,40);
    doc.text('Correlativo del Cliente: ', 50,45);
    doc.text(correlativoProcesohtml,100,45);
    doc.text('Nombre: ', 50,50);
    doc.text(nombrehtml,100,50);
    doc.text('Fecha Recepción: ', 50,55);
    doc.text(fechaingresohtml,100,55);
    doc.text('Tipo Fruta: ', 50,60);
    doc.text(tipofrutahtml,100,60);
    doc.text('Precio: ', 50,65);
    doc.text(preciohtml,100,65);
    doc.text('Cantidad: ', 50,70);
    doc.text(cantidadhtml,100,70);
    doc.text('Precio Total: ', 50,75);
    doc.text(preciototalhtml,100,75);
    doc.text('Tipo Pago: ', 50,80);
    doc.text(tipopagohtml,100,80);
    
    doc.line(5, 35, 204, 35 );
    doc.line(5, 85, 204, 85);

 
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
  
    var tipopago = document.getElementById("detailselectTipoPago");
    var tipopagohtml = tipopago?.innerHTML;





    doc.text('Dirección: J.J Godoy 100, La Calera', 124, 8);
    doc.text('Contacto: contacto@vicmarspa.cl', 124, 12);
    doc.line(5, 20, 204, 20);


    var img = new Image()
    img.src = '/assets/image.jpg'
    doc.addImage(img, 'jpg', 185, 0, 18, 18)

    doc.text('Detalle de Servicio de Grúas', 75, 30);
    doc.text('Nombre: ', 50,50);
    doc.text(nombrehtml,100,50);
    doc.text('Fecha Recepción: ', 50,55);
    doc.text(fechaingresohtml,100,55);
    doc.text('Tipo Fruta: ', 50,60);
    doc.text(tipofrutahtml,100,60);
    doc.text('Precio: ', 50,65);
    doc.text(preciohtml,100,65);
    doc.text('Cantidad: ', 50,70);
    doc.text(cantidadhtml,100,70);
    doc.text('Precio Total: ', 50,75);
    doc.text(preciototalhtml,100,75);
    doc.text('Tipo Pago: ', 50,80);
    doc.text(tipopagohtml,100,80);
    



    
    doc.line(5, 35, 204, 35 );
    doc.line(5, 95, 204, 95);

 
    doc.line(5, 15, 22, 15);

    

    doc.line(5, 6, 22, 6);


    doc.line(5, 15, 5, 6)

    doc.line(22, 15, 22, 6)

    doc.setFontSize(28);
   
    doc.text(correlativoProcesohtml,10, 14);
    
    doc.output('dataurlnewwindow'); 
      
   
  }
























}
