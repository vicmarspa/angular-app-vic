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
  selector: 'app-pago-servicios',
  templateUrl: './pago-servicios.component.html',
  styleUrls: ['./pago-servicios.component.css'],
})
export class PagoServiciosComponent implements OnInit {



  constructor(
    public calibradoService: CalibradoService,
    public pagoServiciosService: PagoServiciosService,
    private router:Router,
    private activedRoute: ActivatedRoute,
    ) { }


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
  
    selectedNombre:any;
    selectedTipoPago:any;
    selectedTipoFruta:any;
    selectedTipoServicio:any;
    selectedAdeudado:any;
  
  
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



    pagos_servicios:Pagos_servicios = {
      numero_proceso: '',
      monto_pago: '',
      description:''

    }    


    payDetail:any=[];

    selected!: {startDate: Moment, endDate: Moment};





  ngOnInit(): void {
////////////////
////////////////
    
    this.pagoServiciosService.getPays()
      .subscribe(
        res => {
          this.calibrado = res;  
          this.products = res; 
          
          
          this.rellenarlista();


          console.log(res);
        },
        err => console.error(err)
      );

      this.calibradoService.getCalibradosEntrada()
      .subscribe(
        res => {
          this.calibradoEntrada = res;
          console.log(res);
        },
        err => console.error(err)
      );
///////////
///////////




//////////
//////////
  }

////////////
////////////
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


public adeudadoSum(){
  return this.calibrado.map(row => row.adeudado).reduce((a,b) => a+b, 0);
}

public pagadoSum(){
  return this.calibrado.map(row => row.total_pago).reduce((a,b) => a+b, 0);
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




SearchByDebt(){
  if(this.selectedAdeudado == ""){
    this.ngOnInit();
  }
  else{
    this.calibrado = this.calibrado.filter(res => {
      return res.variable.toString().match(this.selectedAdeudado);
    })
  }
}
 

rellenarlista(){
for(var i=0;i< this.calibrado.length; i++){
  if(this.calibrado[i].adeudado >= 1){
    this.calibrado[i].variable = '2';
  }else{
      this.calibrado[i].variable = '1';
  }
}
}



getPayDetail(a:any){
console.log('ingreso al metodo');
  this.pagoServiciosService.getPayDetail(a)
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







/////////////
/////////////
/////////////
/////////////


insertPay(dato:string, dato2: HTMLInputElement, dato3: HTMLInputElement){

  this.pagos_servicios.numero_proceso = dato;
  this.pagos_servicios.monto_pago = dato2.value;
  this.pagos_servicios.description = dato3.value;
  this.pagoServiciosService.insertPays(this.pagos_servicios)
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
      this.pagoServiciosService.insertPays(this.pagos_servicios)
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
  this.pagoServiciosService.insertPays(this.pagos_servicios)
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





























/////////////
/////////////
/////////////
/////////////





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


var total_adeudado = document.getElementById("total_adeudado");
var total_adeudadohtml = total_adeudado?.innerHTML;


var total_pagado = document.getElementById("total_pagado");
var total_pagadohtml = total_pagado?.innerHTML;


doc.text( 'Fecha Actual: ', 10, 25);
doc.text(fechaActualhtml,45, 25);

doc.text('Rango de Busqueda: ', 10, 30);
doc.text(startDateTexthtml, 45, 30);
doc.text(endDateTexthtml, 68, 30);


doc.text('Tipo de Pago: ', 10, 35);
doc.text(selectedTipoPagohtml, 45, 35);

doc.text('Tipo de Fruta: ', 10, 40);
doc.text(selectedTipoFrutahtml, 45, 40);

doc.text('Tipo de Servicio: ', 10, 45);
doc.text(selectedTipoServiciohtml, 45, 45);






doc.text('Kilogramos Total: ', 95, 25, );
doc.text(total_kilogramoshtml, 125, 25);
doc.text('Precio Total: ', 95, 30);
doc.text(total_preciohtml, 125, 30);
doc.text('Bins Total: ', 95, 35);
doc.text(total_bineshtml, 125, 35);
doc.text('Adeudado Total: ', 95, 40);
doc.text(total_adeudadohtml, 125, 40);
doc.text('Pagado Total: ', 95, 45);
doc.text(total_pagadohtml, 125, 45);



doc.line(5, 50, 204, 50);

doc.text('Detalles del Reporte', 80,55);

doc.line(5, 60, 204, 60);







(doc as jsPDF & { autoTable: autoTable } ).autoTable({ html: '#test', columnStyles: {

  
  0: {cellWidth: 15},
  1: {cellWidth: 20},
  2: {cellWidth: 18},
  3: {cellWidth: 20},
  4: {cellWidth: 18},
  5: {cellWidth: 18},
  6: {cellWidth: 15},
  7: {cellWidth: 20},
  8: {cellWidth: 20},
  9: {cellWidth: 15},
  10: {cellWidth: 18},






},margin: {top: 65,right:35,left:10}, styles: {overflow: 'linebreak',
fontSize: 8},didParseCell: function (data) {

  //data.table.body.splice(5);
  
  var rows = data.table.body;
  if (data.row.index === rows.length - 1) {
      data.cell.styles.fillColor = [138, 236, 247];
  }} } )



doc.output('dataurlnewwindow'); 




}






/////////////
/////////////
}





