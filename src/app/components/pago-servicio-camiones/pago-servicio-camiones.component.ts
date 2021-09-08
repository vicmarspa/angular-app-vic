import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CalibradoService } from 'src/app/services/calibrado.service';
import { PagoServiciosService} from '../../../app/services/pago-servicios.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import { autoTable, Cell, RowInput } from 'jspdf-autotable';
import  { Calibrado } from '../../models/calibrado';
import  { Pagos_servicios } from '../../models/pagos_servicios';
import  { splitClasses } from '@angular/compiler';

@Component({
  selector: 'app-pago-servicio-camiones',
  templateUrl: './pago-servicio-camiones.component.html',
  styleUrls: ['./pago-servicio-camiones.component.css']
})
export class PagoServicioCamionesComponent implements OnInit {

  constructor(
    public calibradoService: CalibradoService,
    public pagoServiciosService: PagoServiciosService,
    private router:Router,
    private activedRoute: ActivatedRoute,
  ) { }


  products:any = [];  
  primaryList:any= [];

  ts = new Date();
  


  fecha_ingreso:any;
  numero_proceso:any;
  tbx1?:string='';
  estado:string = '0';
  fromdate:any='';
  todate:any='';
  searchresult:any='';


  fechaActual = new Date();
  startDateText:any="";
  endDateText:any="";

  selectedNombre:any;
  selectedTipoPago:any;
  selectedTipoFruta:any;
  selectedTipoServicio:any;
  selectedAdeudado:any;


  selectedDetailNumeroProceso:any; 
  selectedDetailNombre:any; 
  selectedDetailFecha_recepcion:any; 
  selectedDetailFormato:any; 
  selectedDetailPrecio:any; 
  selectedDetailCantidad:any; 
  selectedDetailFecha_inicio:any; 
  selectedDetailFecha_termino:any; 
  selectedDetailTipo_fruta:any; 
  selectedDetailPrecio_total:any; 
  selectedDetailTotal_pago:any; 
  selectedDetailAdeudado:any
  selectedDetailReport : any;
  selectedDetailOrigen : any;
  selectedDetailDestino : any;
  selectedDetailNumeroGuia : any;
  selectedDetailChofer : any;
  selectedDetailValorNeto : any;
  selectedDetailIva : any;
  selectedDetailTotal : any;


  pagos_servicios:Pagos_servicios = {
    numero_proceso: '',
    monto_pago: '',
    description:''

  }    


  payDetail:any=[];

  selected!: {startDate: Moment, endDate: Moment};





  ngOnInit(): void {

    this.pagoServiciosService.getPaysCamiones()
    .subscribe(
      res => {
        this.primaryList = res;
        this.rellenarlista();   
        console.log(res);
      },
      err => console.error(err)
    );

  }




  Search(){
    if(this.numero_proceso == ""){
      this.ngOnInit();
    }
    else{
      this.primaryList = this.primaryList.filter(res => {
        return res.numero_proceso.toString().match(this.numero_proceso.toString());
      })
    }
  }
  
  
  public SumaTotalPagado(){
    return this.primaryList.map(row => row.total_pago).reduce((a,b) => a+b, 0);
  }


  
  public sumaPrecios(){
    return this.primaryList.map(row => row.total).reduce((a,b) => a+b, 0);
  }
  public sumaCantidad(){
    return this.primaryList.map(row => row.cantidad).reduce((a,b) => a+b, 0);
  }
  
  
  public adeudadoSum(){
    return this.primaryList.map(row => row.adeudado).reduce((a,b) => a+b, 0);
  }
  
  public pagadoSum(){
    return this.primaryList.map(row => row.total_pago).reduce((a,b) => a+b, 0);
  }
  


  dateRangeCreated($event) {    
                      
    let startDate = $event[0].toJSON().split('T')[0];   
    let endDate = $event[1].toJSON().split('T')[0]; 
    this.primaryList = this.primaryList.filter(m => new Date(m.fecha_recepcion) >= new Date(startDate) && new Date(m.fecha_recepcion) <= new Date(endDate)        
    );  
    this.startDateText = startDate;
    this.endDateText = endDate;
    console.log('esta es la fecha de ingreso'+startDate);
    console.log('esta es la fecha de salida'+endDate);
  }
  

  SearchByClient(){
    if(this.selectedNombre == ""){
      this.ngOnInit();
    }
    else{
      this.primaryList = this.primaryList.filter(res => {
        return res.nombre.toString().match(this.selectedNombre.toString());
      })
    }
  }
  

  SearchByDebt(){
    if(this.selectedAdeudado == ""){
      this.ngOnInit();
    }
    else{
      this.primaryList = this.primaryList.filter(res => {
        return res.variable.toString().match(this.selectedAdeudado);
      })
    }
  }


  rellenarlista(){
    for(var i=0;i< this.primaryList.length; i++){
      if(this.primaryList[i].adeudado >= 1){
        this.primaryList[i].variable = '2';
      }else{
          this.primaryList[i].variable = '1';
      }
    }
    }





    getPayDetail(a:any, report: any, fecha_recepcion:any, Origen:any, Destino:any, formato:any, cantidad:any, nombre:any, numero_guia:any, chofer:any,  valor_neto:any, iva:any, total:any, total_pago:any, adeudado:any){

      this.selectedDetailNumeroProceso = a;
      this.selectedDetailReport = report;
      this.selectedDetailFecha_recepcion = fecha_recepcion;
      this.selectedDetailOrigen = Origen;
      this.selectedDetailDestino = Destino;
      this.selectedDetailFormato = formato;
      this.selectedDetailCantidad = cantidad;
      this.selectedDetailNombre = nombre;
      this.selectedDetailNumeroGuia = numero_guia;
      this.selectedDetailChofer = chofer;
      this.selectedDetailValorNeto = valor_neto;
      this.selectedDetailIva = iva;
      this.selectedDetailTotal = total;
      this.selectedDetailTotal_pago = total_pago;
      this.selectedDetailAdeudado = adeudado;

    console.log('ingreso al metodo');

    console.log('este es el chofer'+this.selectedDetailChofer)
      this.pagoServiciosService.getPayDetailCamiones(a)
      .subscribe(
        res => {
          this.payDetail = res;
          console.log(res);
        },
        err => console.error(err)
      );
  
    }
    
    
    
    
    refreshPageDirect()
    {
      location.reload();
    }
    




    insertPay(dato:string, dato2: HTMLInputElement, dato3: HTMLInputElement){
  
      this.pagos_servicios.numero_proceso = dato;
      this.pagos_servicios.monto_pago = dato2.value;
      this.pagos_servicios.description = dato3.value;
      this.pagoServiciosService.insertPaysCamiones(this.pagos_servicios)
      .subscribe(
        res => {
        console.log(res);        
        },
        err => console.error(err)
      )
    
    }



    insertPay2(dato:string, dato2: HTMLInputElement, dato3: HTMLInputElement){
      this.pagos_servicios.numero_proceso = dato;
      this.pagos_servicios.monto_pago = dato2.value;
      this.pagos_servicios.description = dato3.value;
    
      Swal.fire({
        title: 'Estas seguro?',
        text: "Desea Ingresar Un Abono $"+this.pagos_servicios.monto_pago,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          this.pagoServiciosService.insertPaysCamiones(this.pagos_servicios)
          .subscribe(
            res => {
            this.ngOnInit();
            console.log(res);        
            },
            err => console.error(err)
          )   
      
          Swal.fire(
            'Pago Ingresado',
            'Se Ha Ingresado Un Pago Por El Monto De $'+this.pagos_servicios.monto_pago,
            'success'
          )
        }
      })
    }


  
    insertTotalPay(dato:string, total_adeudado:string){
  
      this.pagos_servicios.numero_proceso = dato;
      this.pagos_servicios.monto_pago = total_adeudado;
      Swal.fire({
        title: 'Estas seguro?',
        text: "Desea Ingresar Un Abono $"+this.pagos_servicios.monto_pago,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed){
      this.pagoServiciosService.insertPaysCamiones(this.pagos_servicios)
      .subscribe(
        res => {
        this.ngOnInit();
        console.log(res);       
        },
        err => console.error(err)
      )   
      Swal.fire(
        'Pago Ingresado',
        'Se Ha Ingresado Un Pago Por El Monto De $'+this.pagos_servicios.monto_pago,
        'success'
      )
    }
    })
    }
  
    

    BorrarPago(id_pago: string){
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
          
        this.pagoServiciosService.deletePagoServicioCamiones(id_pago)
        .subscribe(
          res => {
            console.log(res);          
            this.ngOnInit();
          },
          err => console.error(err)
        )
      
          Swal.fire(
            'Borrada!',
            'La entrada seleccionada ha sido borrada.',
            'success',
            
          )
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
      var total_bines = document.getElementById("total_bines");
      var total_bineshtml = total_bines?.innerHTML;
      var fechaActual = document.getElementById("fechaActual");
      var fechaActualhtml = fechaActual?.innerHTML;
      var startDateText = document.getElementById("startDateText");
      var startDateTexthtml = startDateText?.innerHTML;
      var endDateText = document.getElementById("endDateText");
      var endDateTexthtml = endDateText?.innerHTML;
      var selectedTipoFruta = document.getElementById("selectedTipoFruta");
      var selectedTipoFrutahtml = selectedTipoFruta?.innerHTML;
      var total_adeudado = document.getElementById("total_adeudado");
      var total_adeudadohtml = total_adeudado?.innerHTML;
      var total_pagado = document.getElementById("total_pagado");
      var total_pagadohtml = total_pagado?.innerHTML;
      var selectedAdeudado = document.getElementById("selectedAdeudado");
      var selectedAdeudadohtml = selectedAdeudado?.innerHTML;
      var selectedNombre = document.getElementById("selectedNombre");
      var selectedNombrehtml = selectedNombre?.innerHTML;
      
      
      doc.text( 'Fecha Actual: ', 10, 25);
      doc.text(fechaActualhtml,45, 25);
      doc.text('Rango de Busqueda: ', 10, 30);
      doc.text(startDateTexthtml, 45, 30);
      doc.text(endDateTexthtml, 68, 30);
      doc.text('Cliente: ', 10, 35);
      doc.text(selectedNombrehtml, 45, 35);
      doc.text('Total Adeudado: ', 10, 40);
      doc.text(selectedAdeudadohtml, 45, 40);
      doc.text('Precio Total: ', 95, 25);
      doc.text(total_preciohtml, 125, 25);
      doc.text('Bins Total: ', 95, 30);
      doc.text(total_bineshtml, 125, 30);
      doc.text('Adeudado Total: ', 95, 35);
      doc.text(total_adeudadohtml, 125, 35);
      doc.text('Pagado Total: ', 95, 40);
      doc.text(total_pagadohtml, 125, 40);
      
      
      
      doc.line(5, 50, 204, 50);
      
      doc.text('Detalles del Reporte - Servicio de Camiones', 75,55);
      
      doc.line(5, 60, 204, 60);
      
      
      
      
      
      
      
      (doc as jsPDF & { autoTable: autoTable } ).autoTable({ html: '#test', columnStyles: {
      
        
        0: {cellWidth: 8},
        1: {cellWidth: 15},
        2: {cellWidth: 18},
        3: {cellWidth: 18},
        4: {cellWidth: 18},
        5: {cellWidth: 15},
        6: {cellWidth: 10},
        7: {cellWidth: 15},
        8: {cellWidth: 12},
        9: {cellWidth: 15},
        10: {cellWidth: 18},
        11: {cellWidth: 18},
        12: {cellWidth: 18},
        13: {cellWidth: 18},
        14: {cellWidth: 18},

    
      
      
      
      
      
      
      },margin: {top: 65,right:35,left:10}, styles: {overflow: 'linebreak',
      fontSize: 8},didParseCell: function (data) {
      
        //data.table.body.splice(5);
        
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
        
    
     
    
    
        var proceso = document.getElementById("detailselectedDetailNumeroProceso");
        var procesohtml = proceso?.innerHTML;
    
        //correlativoProceso
        var nombre = document.getElementById("detailselectedDetailNombre");
        var nombrehtml = nombre?.innerHTML;
    
        var fechaingreso = document.getElementById("detailselectedDetailFecha_recepcion");
        var fechaingresohtml = fechaingreso?.innerHTML;
    

    
        var cantidad = document.getElementById("detailselectedDetailCantidad");
        var cantidadhtml = cantidad?.innerHTML;
    
        var valorneto = document.getElementById("detailselectedDetailValorNeto");
        var valornetohtml = valorneto?.innerHTML;
    
        var preciototal = document.getElementById("detailselectedDetailTotal");
        var preciototalhtml = preciototal?.innerHTML;
    
        var formato = document.getElementById("detailselectedDetailFormato");
        var formatohtml = formato?.innerHTML;







        var report = document.getElementById("detailselectedDetailReport");
        var reporthtml = report?.innerHTML;
        var origen = document.getElementById("detailselectedDetailOrigen");
        var origenhtml = origen?.innerHTML;
        var destino = document.getElementById("detailselectedDetailDestino");
        var destinohtml = destino?.innerHTML;
        var numeroguia = document.getElementById("detailselectedDetailNumeroGuia");
        var numeroguiahtml = numeroguia?.innerHTML;
        var chofer = document.getElementById("detailselectedDetailChofer");
        var choferhtml = chofer?.innerHTML;
        var iva = document.getElementById("detailselectedDetailIva");
        var ivahtml = iva?.innerHTML;





    

    
        var totalPago = document.getElementById("detailselectedDetailTotal_pago");
        var totalPagohtml = totalPago?.innerHTML;
    
        var adeudado = document.getElementById("detailselectedDetailAdeudado");
        var adeudadohtml = adeudado?.innerHTML;
    
        doc.text('Dirección: J.J Godoy 100, La Calera', 124, 8);
        doc.text('Contacto: contacto@vicmarspa.cl', 124, 12);
        doc.line(5, 20, 204, 20);
    
        var img = new Image()
        img.src = '/assets/image.jpg'
        doc.addImage(img, 'jpg', 185, 0, 18, 18)
    
        doc.text('Detalle de Servicio de Camiones', 75, 30);
    
        doc.text('Numero de Proceso: ', 50,40);
        doc.text(procesohtml,100,40);
        doc.text('Nombre: ', 50,45);
        doc.text(nombrehtml,100,45);
        doc.text('Formato: ', 50,50);
        doc.text(formatohtml,100,50);
        doc.text('Fecha Recepción: ', 50,55);
        doc.text(fechaingresohtml,100,55);



        doc.text('Report: ', 50,60);
        doc.text(reporthtml,100,60);
        doc.text('Origen: ', 50,65);
        doc.text(origenhtml,100,65);
        doc.text('Destino: ', 50,70);
        doc.text(destinohtml,100,70);



        doc.text('Valor Neto: ', 50,75);
        doc.text(valornetohtml,100,75);
        doc.text('Cantidad: ', 50,80);
        doc.text(cantidadhtml,100,80);
        doc.text('Precio Total: ', 50,85);
        doc.text(preciototalhtml,100,85);
        doc.text('Total Pago: ', 50,90);
        doc.text(totalPagohtml,100,90);
        doc.text('Adeudado: ', 50,95);
        doc.text(adeudadohtml,100,95);




        doc.text('Numero Guía: ', 50,100);
        doc.text(numeroguiahtml,100,100);
        doc.text('Chofer: ', 50,105);
        doc.text(choferhtml,100,105);

        doc.text('Iva: ', 50,110);
        doc.text(ivahtml,100,110);
    
        doc.line(5, 35, 204, 35 );
        doc.line(5, 115, 204, 115);
        
     
    
    
        doc.setFontSize(28);
       
        
        doc.output('dataurlnewwindow'); 
          
       
      }
    
    
    









}
