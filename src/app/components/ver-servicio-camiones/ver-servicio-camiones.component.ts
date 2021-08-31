import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ServicioCamionesService } from 'src/app/services/servicio-camiones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'

@Component({
  selector: 'app-ver-servicio-camiones',
  templateUrl: './ver-servicio-camiones.component.html',
  styleUrls: ['./ver-servicio-camiones.component.css']
})
export class VerServicioCamionesComponent implements OnInit {

  constructor(private servicioCamionesService: ServicioCamionesService, private router:Router, private activedRoute: ActivatedRoute) { }


  servicio_camiones:any=[];
  fechaActual = new Date();
  numero_proceso:any;
  selectedNombre:any;
  selectedNombreChofer:any;
  ts = new Date();
  startDateText:any="";
  endDateText:any="";
  selectNumeroProceso:any='';
  selectFechaIngreso:any='';
  selectedOrigen:any='';
  selectedDestino:any='';
  selectedFormato:any='';
  selectCantidad:any='';
  selectedCliente:any='';
  selectedNumeroGuia:any='';
  selectedChofer:any='';
  selectedValorNeto:any='';
  selectedIva:any='';
  selectedTotal:any='';
  selectedReport:any='';


  procesos_camaras2:any=[];









  ngOnInit(): void {
    

    
    this.servicioCamionesService.getServicioCamiones()
    .subscribe(
      res => {
        this.servicio_camiones = res;                 
        console.log(res);
      },
      err => console.error(err)
    );

}

menuOpciones(

  selectNumeroProceso:any,
  selectFechaIngreso:any,
  selectedOrigen:any,
  selectedDestino:any,
  selectedFormato:any,
  selectCantidad:any,
  selectedCliente:any,
  selectedNumeroGuia:any,
  selectedChofer:any,
  selectedValorNeto:any,
  selectedIva:any,
  selecetedTotal:any,
  selectedReport:any

  ){
    

  this.selectNumeroProceso = selectNumeroProceso;
  this.selectFechaIngreso = selectFechaIngreso;
  this.selectedOrigen = selectedOrigen;
  this.selectedDestino = selectedDestino;
  this.selectedFormato = selectedFormato;
  this.selectCantidad = selectCantidad;
  this.selectedCliente = selectedCliente;
  this.selectedNumeroGuia = selectedNumeroGuia;
  this.selectedChofer = selectedChofer;
  this.selectedValorNeto = selectedValorNeto;
  this.selectedIva = selectedIva;
  this.selectedTotal = selecetedTotal;
  this.selectedReport = selectedReport;

  this.correlativoFuncion();
}



countProces:number=0;
countProces2:number=-1;
countProcesFinal:number=0;
countProcesCorrelative:number=0;

correlativoFuncion()
{
  this.countProces=0;
  this.procesos_camaras2=this.servicio_camiones;
  for (var i =0; i< this.procesos_camaras2.length ; i++) {
    //cuenta cantidad de procesos
    if(this.procesos_camaras2[i].nombre == this.selectedCliente){
      this.countProces=this.countProces+1
    }
  }
  this.countProces2 = -1;
  this.countProcesFinal= 0;
  for (var i =0; i< this.procesos_camaras2.length ; i++) {
    //cuenta cantidad de procesos
    if(this.procesos_camaras2[i].nombre == this.selectedCliente){
      this.countProces2=this.countProces2+1
      this.countProcesFinal=this.countProces-this.countProces2;
      if(this.procesos_camaras2[i].numero_proceso == this.selectNumeroProceso){
        this.countProcesCorrelative=this.countProcesFinal;
      }

    }
  }
}





  public sumaPrecios(){
    return this.servicio_camiones.map(row => row.total).reduce((a,b) => a+b, 0);
  }

  Search(){
    if(this.numero_proceso == ""){
      this.ngOnInit();
    }
    else{
      this.servicio_camiones = this.servicio_camiones.filter(res => {
        return res.numero_proceso.toString().match(this.numero_proceso.toString());
      })
    }
  }

  SearchByClient(){
    if(this.selectedNombre == ""){
      this.ngOnInit();
    }
    else{
      this.servicio_camiones = this.servicio_camiones.filter(res => {
        return res.nombre.toString().match(this.selectedNombre.toString());
      })
    }
  }


  dateRangeCreated($event) {    
    this.servicio_camiones = this.servicio_camiones; 
    this.ts = this.servicio_camiones.fecha_recepcion;                       
    let startDate = $event[0].toJSON().split('T')[0];   
    let endDate = $event[1].toJSON().split('T')[0]; 
    this.servicio_camiones = this.servicio_camiones.filter(m => new Date(m.fecha_recepcion) >= new Date(startDate) && new Date(m.fecha_recepcion) <= new Date(endDate)        
    );  
    console.log(startDate);
    console.log(endDate);

    this.startDateText = startDate;
    this.endDateText = endDate;
    console.log('esta es la fecha de ingreso'+startDate);
    console.log('esta es la fecha de salida'+endDate);
  }


  SearchByChofer(){
    if(this.selectedNombreChofer == ""){
      this.ngOnInit();
    }
    else{
      this.servicio_camiones = this.servicio_camiones.filter(res => {
        return res.chofer.toString().match(this.selectedNombreChofer.toString());
      })
    }
  }

  
  BorrarProcesoCamiones(numero_proceso: string){
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
      this.servicioCamionesService.deleteServicioCamiones(numero_proceso)
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

    
  
    doc.text('Fecha Actual: ', 10, 25);
    doc.text(fechaActualhtml,45, 25);
    doc.text('Rango de Busqueda: ', 10, 30);
    doc.text(startDateTexthtml,45, 30);
    doc.text(endDateTexthtml,68, 30);

    doc.text('Precio Total: ', 95, 25);
    doc.text(total_preciohtml,125, 25);

  
    doc.line(5, 50, 204, 50);
    doc.text('Detalles del Reporte - Servicio de Cámaras', 75,55);
    doc.line(5, 60, 204, 60);
  
  
    doc.autoTable({ html: '#entrada2',columnStyles: {
  
      
      0: {cellWidth: 10},
      1: {cellWidth: 15},
      2: {cellWidth: 18},
      3: {cellWidth: 14},
      4: {cellWidth: 14},
      5: {cellWidth: 18},
      6: {cellWidth: 18},
      7: {cellWidth: 18},
      8: {cellWidth: 15},
      9: {cellWidth: 15},
      10: {cellWidth: 15},
      11: {cellWidth: 8},
      12: {cellWidth: 18},


  
    },margin: {top: 65,right:35,left:10}, styles: {overflow: 'linebreak',
    fontSize: 8},didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
      }} } )
  
    
    doc.output('dataurlnewwindow'); 
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

    var iva = document.getElementById("detailselectedIva");
    var ivahtml = iva?.innerHTML;

    var cantidad = document.getElementById("detailselectCantidad");
    var cantidadhtml = cantidad?.innerHTML;

    var precio = document.getElementById("detailselectedValorNeto");
    var preciohtml = precio?.innerHTML;

    var preciototal = document.getElementById("detailselectedTotal");
    var preciototalhtml = preciototal?.innerHTML;

    var formato = document.getElementById("detailselectFormato");
    var formatohtml = formato?.innerHTML;

    var origen = document.getElementById("detailselectedOrigen");
    var origenhtml = origen?.innerHTML;

    var destino = document.getElementById("detailselectedDestino");
    var destinohtml = destino?.innerHTML;

    var chofer = document.getElementById("detailselectedChofer");
    var choferhtml = chofer?.innerHTML;

    var report = document.getElementById("detailselectedReport");
    var reporthtml = report?.innerHTML;

    doc.text('Dirección: J.J Godoy 100, La Calera', 124, 8);
    doc.text('Contacto: contacto@vicmarspa.cl', 124, 12);
    doc.line(5, 20, 204, 20);

    var img = new Image()
    img.src = '/assets/image.jpg'
    doc.addImage(img, 'jpg', 185, 0, 18, 18)

    doc.text('Detalle de Servicio de Camiones', 75, 30);

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
    doc.text('Origen: ', 50,65);
    doc.text(origenhtml,100,65);
    doc.text('Destino: ', 50,70);
    doc.text(destinohtml,100,70);
    doc.text('IVA: ', 50,75);
    doc.text(ivahtml,100,75);
    doc.text('Precio: ', 50,80);
    doc.text(preciohtml,100,80);
    doc.text('Cantidad: ', 50,85);
    doc.text(cantidadhtml,100,85);
    doc.text('Precio Total: ', 50,90);
    doc.text(preciototalhtml,100,90);
    doc.text('Chofer: ', 50,95);
    doc.text(choferhtml,100,95);
    doc.text('Report: ', 50,100);
    doc.text(reporthtml,100,100);
    
    doc.line(5, 35, 204, 35 );
    doc.line(5, 105, 204, 105);

 
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
    

    //correlativoProceso
    var correlativoProceso = document.getElementById("detailcountProcesCorrelative");
    var correlativoProcesohtml = correlativoProceso?.innerHTML;

    var nombre = document.getElementById("detailselectNombre");
    var nombrehtml = nombre?.innerHTML;

    var fechaingreso = document.getElementById("detailselectFechaIngreso");
    var fechaingresohtml = fechaingreso?.innerHTML;

    var iva = document.getElementById("detailselectedIva");
    var ivahtml = iva?.innerHTML;

    var cantidad = document.getElementById("detailselectCantidad");
    var cantidadhtml = cantidad?.innerHTML;

    var precio = document.getElementById("detailselectedValorNeto");
    var preciohtml = precio?.innerHTML;

    var preciototal = document.getElementById("detailselectedTotal");
    var preciototalhtml = preciototal?.innerHTML;

    var formato = document.getElementById("detailselectFormato");
    var formatohtml = formato?.innerHTML;

    var origen = document.getElementById("detailselectedOrigen");
    var origenhtml = origen?.innerHTML;

    var destino = document.getElementById("detailselectedDestino");
    var destinohtml = destino?.innerHTML;

    var chofer = document.getElementById("detailselectedChofer");
    var choferhtml = chofer?.innerHTML;

    var report = document.getElementById("detailselectedReport");
    var reporthtml = report?.innerHTML;

    doc.text('Dirección: J.J Godoy 100, La Calera', 124, 8);
    doc.text('Contacto: contacto@vicmarspa.cl', 124, 12);
    doc.line(5, 20, 204, 20);

    var img = new Image()
    img.src = '/assets/image.jpg'
    doc.addImage(img, 'jpg', 185, 0, 18, 18)

    doc.text('Detalle de Servicio de Camiones', 75, 30);


    doc.text('Correlativo del Cliente: ', 50,40);
    doc.text(correlativoProcesohtml,100,40);
    doc.text('Nombre: ', 50,45);
    doc.text(nombrehtml,100,45);
    doc.text('Formato: ', 50,50);
    doc.text(formatohtml,100,50);
    doc.text('Fecha Recepción: ', 50,55);
    doc.text(fechaingresohtml,100,55);
    doc.text('Origen: ', 50,60);
    doc.text(origenhtml,100,60);
    doc.text('Destino: ', 50,65);
    doc.text(destinohtml,100,65);
    doc.text('IVA: ', 50,70);
    doc.text(ivahtml,100,70);
    doc.text('Precio: ', 50,75);
    doc.text(preciohtml,100,75);
    doc.text('Cantidad: ', 50,80);
    doc.text(cantidadhtml,100,80);
    doc.text('Precio Total: ', 50,85);
    doc.text(preciototalhtml,100,85);
    doc.text('Chofer: ', 50,90);
    doc.text(choferhtml,100,90);
    doc.text('Report: ', 50,95);
    doc.text(reporthtml,100,95);
    
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






}