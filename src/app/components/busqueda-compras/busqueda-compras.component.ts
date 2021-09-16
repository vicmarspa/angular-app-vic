import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CalibradoService } from 'src/app/services/calibrado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment, unix } from 'moment';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'

import { Compras } from '../../models/compras';

@Component({
  selector: 'app-busqueda-compras',
  templateUrl: './busqueda-compras.component.html',
  styleUrls: ['./busqueda-compras.component.css']
})
export class BusquedaComprasComponent implements OnInit {

  constructor(public calibradoService: CalibradoService,private router:Router,private activedRoute: ActivatedRoute) { }

  compras:any = [];
  products:any = [];

  ts = new Date();

  tbx1?:string='';

  idcompra:any;

  fechaActual = new Date();
  startDateText:any="";
  endDateText:any="";
  selectedNombre:any;

  ngOnInit(): void {
    this.calibradoService.getCompras()
      .subscribe(
        res => {
          this.compras = res;
          this.products = res;                 

                           
          console.log(res);
        },
        err => console.error(err)
      );
  }

  compra:Compras = {
    idcompra:'',
    id_cliente:'',
    estado_compra:'',
    compra_inicio:new Date,
    compra_fin:new Date
  } 
  

  BorrarCompraPapelera(idcompra:string) {
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
      delete this.compra.idcompra;
      delete this.compra.id_cliente;
      delete this.compra.compra_inicio;
      delete this.compra.compra_fin;
      

      this.compra.estado_compra = this.tbx1 = (<HTMLInputElement>document.getElementById('borrado')).value
      
      this.calibradoService.BorrarComprasPapelera(idcompra,this.compra)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Borrado!',
      'La compra seleccionada ha sido borrada.',
      'success'
      )
          
      }
    })
  }

  Search(){
    if(this.idcompra == ""){
      this.ngOnInit();
    }
    else{
      this.compras = this.compras.filter(res => {
        return res.idcompra.toString().match(this.idcompra.toString());
      })
    }
  }



  dateRangeCreated($event) 
  {    
      this.compras = this.products; 
      this.ts = this.compras.compra_inicio;                       
      let startDate = $event[0].toJSON().split('T')[0];   
      let endDate = $event[1].toJSON().split('T')[0]; 
      this.compras = this.compras .filter(m => new Date(m.compra_inicio) >= new Date(startDate) && new Date(m.compra_inicio) <= new Date(endDate)        
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
      this.compras = this.compras.filter(res => {
        return res.nombre.toString().match(this.selectedNombre.toString());
      })
    }
  }

  


  public cantidadKilogramosProductos(){
    return this.compras.map(row => row.cantidad).reduce((a,b) => a+b, 0);
  }

  public sumaNetos(){
    return this.compras.map(row => row.neto).reduce((a,b) => a+b, 0);
  }

  public sumaTotalIva(){
    return this.compras.map(row => row.valor_iva).reduce((a,b) => a+b, 0);
  }

  public sumaValorTotal(){
    return this.compras.map(row => row.valor_total).reduce((a,b) => a+b, 0);
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

    var selectedTotalIva = document.getElementById("tota_iva");
    var selectedTotalIvahtml = selectedTotalIva?.innerHTML;

    var selectedTotalCompras = document.getElementById("total_compras");
    var selectedTotalComprashtml = selectedTotalCompras?.innerHTML;  
  
    doc.text('Fecha Actual: ', 10, 25);
    doc.text(fechaActualhtml,45, 25);
  
    doc.text('Rango de Busqueda: ', 10, 30);
    doc.text(startDateTexthtml,45, 30);
    doc.text(endDateTexthtml,68, 30);
  
    
    doc.text('Total Kilogramos: ', 10, 35);
    doc.text(selectedTotalKilogramoshtml,45, 35);
  
    doc.text('Total Neto: ', 10, 40);
    doc.text(selectedTotalNetohtml,45, 40);
   
    doc.text('Total Iva: ', 10, 45);
    doc.text(selectedTotalIvahtml,45, 45);
  
    doc.text('Total: ', 10, 50);
    doc.text(selectedTotalComprashtml,45, 50);

  
  
  
    doc.line(5, 55, 204, 55);
  
    doc.text('Detalles del Reporte - Compras', 80,60);
    
    doc.line(5, 65, 204, 65);
  
  
  
  
  
  
  
  
    doc.autoTable({ html: '#entrada2',columnStyles: {
  
      
      0: {cellWidth: 15},
      1: {cellWidth: 40},
      2: {cellWidth: 18},
      3: {cellWidth: 18},
      4: {cellWidth: 15},
      6: {cellWidth: 15},
      7: {cellWidth: 25},

    },margin: {top: 70,right:5,left:5}, styles: {overflow: 'linebreak',
    fontSize: 8},didParseCell: function (data) {
  
      //data.table.body.splice(5);
      var rows = data.table.body;
  
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
      }} } )
  
    
  
    doc.output('dataurlnewwindow'); 
    
   
  
  
  }


















}
