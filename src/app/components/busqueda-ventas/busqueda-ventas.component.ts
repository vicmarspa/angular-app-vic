import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CalibradoService } from 'src/app/services/calibrado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'

import { Ventas } from '../../models/ventas';

@Component({
  selector: 'app-busqueda-ventas',
  templateUrl: './busqueda-ventas.component.html',
  styleUrls: ['./busqueda-ventas.component.css']
})
export class BusquedaVentasComponent implements OnInit {

  constructor(public calibradoService: CalibradoService,private router:Router,private activedRoute: ActivatedRoute) { }

  ventas:any = [];

  tbx1?:string='';

  idventa:string ='';


  venta:Ventas = {
    idventa:'',
    id_cliente:'',
    estado_venta:'',
    venta_creacion:new Date,
    venta_fin:new Date,
    valor_total:'',
    cantidad_kilogramos:''
  }



  fechaActual = new Date();
  products:any = [];
  ts = new Date();
  startDateText:any="";
  endDateText:any="";
  selectedNombre:any;


  ngOnInit(): void {
    this.calibradoService.getVentas()
      .subscribe(
        res => {
          this.ventas = res;
          this.products = res;                 
                           
          console.log(res);
        },
        err => console.error(err)
      );
  }



  public cantidadKilogramosProductos(){
    return this.ventas.map(row => row.cantidad_kilogramos).reduce((a,b) => a+b, 0);
  }

  public sumaNetos(){
    return this.ventas.map(row => row.valor_total).reduce((a,b) => a+b, 0);
  }






  BorrarVentaPapelera(idcompra:string) {
    Swal.fire({
    title: 'Estas seguro?',
    text: "El proceso será enviado a la papelera!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borralo!'
  }).then((result) => {
    if (result.isConfirmed) {
      delete this.venta.idventa;
      delete this.venta.id_cliente;
      delete this.venta.venta_creacion;
      delete this.venta.venta_fin;
      delete this.venta.valor_total;
      delete this.venta.cantidad_kilogramos;

      

      this.venta.estado_venta = this.tbx1 = (<HTMLInputElement>document.getElementById('borrado')).value
      
      this.calibradoService.BorrarVentaPapelera(idcompra,this.venta)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Borrado!',
      'La venta seleccionada ha sido borrada.',
      'success'
      )
          
      }
    })
  }
  Search(){
    if(this.idventa == ""){
      this.ngOnInit();
    }
    else{
      this.ventas = this.ventas.filter(res => {
        return res.idventa.toString().match(this.idventa.toString());
      })
    }
  }



  dateRangeCreated($event) 
  {    
      this.ventas = this.products; 
      this.ts = this.ventas.venta_creacion;                       
      let startDate = $event[0].toJSON().split('T')[0];   
      let endDate = $event[1].toJSON().split('T')[0]; 
      this.ventas = this.ventas .filter(m => new Date(m.venta_creacion) >= new Date(startDate) && new Date(m.venta_creacion) <= new Date(endDate)        
    );  

      console.log(startDate);
      console.log(endDate);
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
      this.ventas = this.ventas.filter(res => {
        return res.nombre.toString().match(this.selectedNombre.toString());
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
  
  
  


    var fechaActual = document.getElementById("fechaActual");
    var fechaActualhtml = fechaActual?.innerHTML;

    var startDateText = document.getElementById("startDateText");
    var startDateTexthtml = startDateText?.innerHTML;
  
    var endDateText = document.getElementById("endDateText");
    var endDateTexthtml = endDateText?.innerHTML;


    var selectedTotalKilogramos = document.getElementById("total_kilogramos");
    var selectedTotalKilogramoshtml = selectedTotalKilogramos?.innerHTML;

    var selectedTotalNeto = document.getElementById("total_neto");
    var selectedTotalNetohtml = selectedTotalNeto?.innerHTML;
 



  
    doc.text('Fecha Actual: ', 10, 25);
    doc.text(fechaActualhtml,45, 25);
  
    doc.text('Rango de Busqueda: ', 10, 30);
    doc.text(startDateTexthtml,45, 30);
    doc.text(endDateTexthtml,68, 30);
  
    
    doc.text('Total Kilogramos: ', 10, 35);
    doc.text(selectedTotalKilogramoshtml,45, 35);
  
    doc.text('Total Neto: ', 10, 40);
    doc.text(selectedTotalNetohtml,45, 40);
   


  
  
  
    doc.line(5, 45, 204, 45);
  
    doc.text('Detalles del Reporte - Compras', 80,50);
    
    doc.line(5, 55, 204, 55);
  
  
  
  
  
  
  
  
    doc.autoTable({ html: '#entrada2',columnStyles: {
  
      
      0: {cellWidth: 15},
      1: {cellWidth: 40},
      2: {cellWidth: 18},
      3: {cellWidth: 25},
      4: {cellWidth: 25},


    },margin: {top: 60,right:5,left:40}, styles: {overflow: 'linebreak',
    fontSize: 8},didParseCell: function (data) {
  
      //data.table.body.splice(5);
      var rows = data.table.body;
  
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
      }} } )
  
    
  
    doc.output('dataurlnewwindow'); 
    
   
  
  
  }






}
