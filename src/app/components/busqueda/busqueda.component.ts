import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CalibradoService } from 'src/app/services/calibrado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'

// import {jsPDF } from 'jspdf';
// import { autoTable, RowInput } from 'jspdf-autotable';

//Modelos
import { Calibrado } from '../../models/calibrado';
import { splitClasses } from '@angular/compiler';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  constructor(
    public calibradoService: CalibradoService,
    private router:Router,
    private activedRoute: ActivatedRoute,) { }


  selectNumeroProceso:any='';
  selectNombre:any='';
  selectFechaIngreso:any='';
  selectTipoProceso:any='';
  selectTipoFruta:any='';
  selectTotalBines:any='';
  selectTotalKg:any='';
  selectTotalPrecio:any='';
  selectedNombre:any;
  selectedTipoPago:any;
  selectedTipoFruta:any;
  selectedTipoServicio:any;
  products:any = [];  
  calibrado:any= [];
  ts = new Date();
  calibradoEntrada:any = [];
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
  countItemsList:any;
  countOfPages:number;
  ListoToPrint:any= [];
  positionInitList:any;
  ListWithCountOfGroups:any= [];
  validateActionPagination:boolean = false;
  RespaldoCalibrados:any= [];
  nullList:any= [];
  totalCountOfPageConstant:number;

  calibrado1:Calibrado = {
    numero_proceso:'',  
    id_cliente:'',
    valor_servicio:0,
    idtipo_pago:'',
    idtipo_fruta:'',
    fecha_ingreso:new Date,
    fecha_proceso:new Date,
    estado:''
  }

  selected!: {startDate: Moment, endDate: Moment};

  ngOnInit(){

    this.calibradoService.getCalibrados()
      .subscribe(
        res => {
          this.calibrado = res; 
          this.RespaldoCalibrados= this.calibrado;
          this.products = res;  
          this.countItemsList = this.calibrado.length
          this.obtenerCantidadDeGrupos();
          this.obtenerDatosPorGrupos(this.countOfPages);
          this.calibrado=this.ListoToPrint;
        },
        err => console.error(err)
      );

      this.calibradoService.getCalibradosEntrada()
      .subscribe(
        res => {
          this.calibradoEntrada = res;
        },
        err => console.error(err)
      );

    }

    obtenerCantidadDeGrupos() {
      //esta seccion lo que hace es contar cuantas paginas se van a requerir para ingresar todos los datos que se encuentran en la lista
      this.countOfPages = this.countItemsList/40;
      this.countOfPages = Math.ceil(this.countOfPages);
      console.log("Cantidad de paginas a crear:", this.countOfPages);
      this.totalCountOfPageConstant = this.countOfPages;
      for (let i = 0; i <= this.countOfPages-1; i++) {
        this.ListWithCountOfGroups[i] = i+1
      }
    }

    obtenerDatosPorGrupos(positionOfList:any) {
      //Esta seccion lo que hace es obtener los datos por grupos

      this.positionInitList = (((40*positionOfList)+1)-40);
      
      console.log("NUMERO",this.positionInitList);
      for (let i = 0; i <= 39; i++) {
        if( this.calibrado[this.positionInitList]!=null){
          this.ListoToPrint[i] = this.calibrado[this.positionInitList];
          console.log("NUMERO",this.positionInitList,"ITERACION:",i);

          this.positionInitList = this.positionInitList+1;
        }
      }
    }

    AccionPagination(pageObtained:any) {
      this.countOfPages = pageObtained;
      this.calibrado = this.RespaldoCalibrados;

      for (let i = 0; i <= 40; i++) {
          this.ListoToPrint.pop();
      }
      this.obtenerDatosPorGrupos(this.countOfPages);
      this.calibrado = this.ListoToPrint;
    }

    PaginationPreviousAction(){
      if(this.countOfPages-1 < 1){
        console.log("no hay mas paginas para mostrar",this.countOfPages);
        console.log("no hay mas paginas para mostrar");
      }else{
        this.AccionPagination(this.countOfPages-1);
      }
     
    }

    PaginationNextAction(){
      if(this.countOfPages+1 > this.totalCountOfPageConstant){
        console.log("no hay mas paginas para mostrar",this.countOfPages);
        console.log("no hay mas paginas para mostrar");
      }else{
        this.AccionPagination(this.countOfPages+1);
      }
    }

  deleteCalibrado(numero_proceso:string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: "No se podrá recuperar el proceso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
          this.calibradoService.deleteCalibrado(numero_proceso)
        .subscribe(
          res => {
            console.log(res);
            this.ngOnInit();
            
          },
          err => console.error(err)
        )
        Swal.fire(
          'Borrado!',
          'El proceso seleccionado ha sido borrado.',
          'success'
        )
        
      }
    })
  }

  BorrarCalibradoPapelera(numero_proceso:string) {
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
      delete this.calibrado1.numero_proceso;
      delete this.calibrado1.fecha_ingreso;
      delete this.calibrado1.fecha_proceso;
      delete this.calibrado1.idtipo_fruta;
      delete this.calibrado1.idtipo_pago;
      delete this.calibrado1.id_cliente;

      this.calibrado1.estado = this.tbx1 = (<HTMLInputElement>document.getElementById('borrado')).value
      
      this.calibradoService.BorrarCalibradoPapelera(numero_proceso,this.calibrado1)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Borrado!',
      'El proceso seleccionado ha sido borrado.',
      'success'
      )
          
      }
    })
  }
  
  Search(){
    if(this.numero_proceso == ""){
      this.ngOnInit();
    }
    else{
      this.calibrado = this.calibrado.filter(res => {
        return res.numero_proceso.toString().match(this.numero_proceso.toString());
      })
    }
  }

  public kilogramosEntradaSum(){
    return this.calibradoEntrada.map(row => row.kilogramos).reduce((a,b) => a+b, 0);
  }
  public cantidadbinsEntradaSum(){
    return this.calibradoEntrada.map(row => row.cantidad_bines).reduce((a,b) => a+b, 0);
  }
  public valorCalibrado(){
    return this.calibrado.map(valor => valor.valor_servicio).reduce((a,b) => a+b, 0);
  }
  public sumaKilogramosCalibrados(){
    return this.calibrado.map(row => row.total_kg).reduce((a,b) => a+b, 0);
  }
  public sumaPreciosCalibrados(){
    return this.calibrado.map(row => row.total_precio).reduce((a,b) => a+b, 0);
  }
  public sumaBinesCalibrados(){
    return this.calibrado.map(row => row.total_bines).reduce((a,b) => a+b, 0);
  }

  getTotal(val:Calibrado[]):number{
    let sum = 0;
    if(val!=undefined){
      val.forEach(element => {
        if(element.valor_servicio! != 0 ) sum+=element.valor_servicio!; 
      });   
    }
    return sum;
  }
  
  dateRangeCreated($event) {    
    this.calibrado = this.products; 
    this.ts = this.calibrado.fecha_ingreso;                       
    let startDate = $event[0].toJSON().split('T')[0];   
    let endDate = $event[1].toJSON().split('T')[0]; 
    this.calibrado = this.calibrado.filter(m => new Date(m.fecha_ingreso) >= new Date(startDate) && new Date(m.fecha_ingreso) <= new Date(endDate)        
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
      this.calibrado = this.calibrado.filter(res => {
        return res.nombre.toString().match(this.selectedNombre.toString());
      })
    }
  }

  SearchByPago(){
    if(this.selectedTipoPago == ""){
      this.ngOnInit();
    }
    else{
      this.calibrado = this.calibrado.filter(res => {
        return res.tipo_pago.toString().match(this.selectedTipoPago.toString());
      })
    }
  }

  SearchByFruta(){
    if(this.selectedTipoFruta == ""){
      this.ngOnInit();
    }
    else{
      this.calibrado = this.calibrado.filter(res => {
        return res.tipo_fruta.toString().match(this.selectedTipoFruta.toString());
      })
    }
  }

  SearchByService(){
    if(this.selectedTipoServicio == ""){
      this.ngOnInit();
    }
    else{
      this.calibrado = this.calibrado.filter(res => {
        return res.tipo_proceso.toString().match(this.selectedTipoServicio.toString());
      })
    }
  }

  refreshPageDirect()
  {
    window.location.reload;
  }





menuOpciones(selectNumeroProceso:any, selectNombre:any, selectFechaIngreso:any,selectTipoProceso:any,selectTipoFruta:any,selectTotalBine:any,selectTotalKg:any,selectTotalPrecio:any){
  this.selectNumeroProceso=selectNumeroProceso;
  this.selectNombre=selectNombre;
  this.selectFechaIngreso=selectFechaIngreso;
  this.selectTipoProceso=selectTipoProceso;
  this.selectTipoFruta=selectTipoFruta;
  this.selectTotalBines=selectTotalBine;
  this.selectTotalKg=selectTotalKg;
  this.selectTotalPrecio=selectTotalPrecio;
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

  var total_kilogramos = document.getElementById("total_kilogramos");
  var total_kilogramoshtml = total_kilogramos?.innerHTML;

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

  var selectedTipoPago = document.getElementById("selectedTipoPago");
  var selectedTipoPagohtml = selectedTipoPago?.innerHTML;

  var selectedTipoFruta = document.getElementById("selectedTipoFruta");
  var selectedTipoFrutahtml = selectedTipoFruta?.innerHTML;

  var selectedTipoServicio = document.getElementById("selectedTipoServicio");
  var selectedTipoServiciohtml = selectedTipoServicio?.innerHTML;

  doc.text('Fecha Actual: ', 10, 25);
  doc.text(fechaActualhtml,45, 25);
  doc.text('Rango de Busqueda: ', 10, 30);
  doc.text(startDateTexthtml,45, 30);
  doc.text(endDateTexthtml,68, 30);
  doc.text('Tipo de Pago: ', 10, 35);
  doc.text(selectedTipoPagohtml,45, 35);
  doc.text('Tipo de Fruta: ', 10, 40);
  doc.text(selectedTipoFrutahtml,45, 40);
  doc.text('Tipo de Servicio: ', 10, 45);
  doc.text(selectedTipoServiciohtml,45, 45);
  doc.text('Kilogramos Total: ', 95, 25);
  doc.text(total_kilogramoshtml,125, 25);
  doc.text('Precio Total: ', 95, 30);
  doc.text(total_preciohtml,125, 30);
  doc.text('Bins Total: ', 95, 35);
  doc.text(total_bineshtml,125, 35);
  doc.line(5, 50, 204, 50);
  doc.text('Detalles del Reporte', 80,55);
  doc.line(5, 60, 204, 60);
  doc.autoTable({ html: '#entrada',columnStyles: {
    0: {cellWidth: 15},
    1: {cellWidth: 20},
    2: {cellWidth: 18},
    3: {cellWidth: 18},
    4: {cellWidth: 18},
    5: {cellWidth: 22},
    6: {cellWidth: 15},
    7: {cellWidth: 15},
    8: {cellWidth: 10},
    9: {cellWidth: 20},
    10: {cellWidth: 20},
  },margin: {top: 65,right:35,left:10}, styles: {overflow: 'linebreak',
  fontSize: 8},didParseCell: function (data) {
    //data.table.body.splice(5);
    var rows = data.table.body;
    if (data.row.index === rows.length - 1) {
        data.cell.styles.fillColor = [138, 236, 247];
    }} } )
  doc.output('dataurlnewwindow'); 
}














































////////////
////////////
////////////
////////////
}
    
      
    

    
     


