import { Component, OnInit,HostBinding } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { CalibradoService } from 'src/app/services/calibrado.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'




import {Calibrado} from '../../models/calibrado';
import {CalibradoEntrada} from '../../models/calibradoEntrada';
import {CalibradoSalida} from '../../models/calibradoSalida';
import { HtmlTagDefinition } from '@angular/compiler';



@Component({
  selector: 'app-ver-proceso',
  templateUrl: './ver-proceso.component.html',
  styleUrls: ['./ver-proceso.component.css']
})
export class VerProcesoComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  correlativoCliente:any = [];
  selectedCorrelativo:string='';
  correlativeResult:any = [];
  totalProcesosCliente:any = 0;
  correlativoProceso:any = 0;
  nombreCliente:string ='';
  
  calibrado1:Calibrado = {
    numero_proceso:'',  
    id_cliente:'',
    valor_servicio:0,
    idtipo_pago:'',
    idtipo_fruta:'',
    tipo_proceso:'',
    fecha_ingreso:new Date,
    fecha_proceso:new Date
  }
  calibrado:any = [];
  calibrado1Entrada:any = [];
  calibrado1Salida:any = [];  
  fruta1:any=[];
  salidaUna:any = [];
  
  edit:boolean = false;

  constructor(private calibradoService:CalibradoService,private router: Router,private activedRoute:ActivatedRoute) { }


  tbx1?:string ='';
  ngOnInit() {

    this.calibradoService.getCalibrados()
      .subscribe(
        res => {
          this.correlativoCliente = res;
          console.log(res);
        },
        err => console.error(err)
      );


    this.calibrado1.numero_proceso = this.calibrado1Entrada.numero_proceso;
    this.calibrado1.numero_proceso = this.calibrado1Salida.numero_proceso;
    const params = this.activedRoute.snapshot.params;
    if (params.numero_proceso) {
      this.calibradoService.getCalibrado(params.numero_proceso)
        .subscribe(
          res => {
            console.log(res);
            this.calibrado1 = res;
            this.calibrado = res;

            this.correlativoFuncion(this.calibrado.nombre)


            this.edit = true;
          },
          err => console.log(err)
        )
    }


    this.calibradoService.getEntrada(params.numero_proceso)
    .subscribe(
      res => {
        console.log(res);
        this.calibrado1Entrada = res;
        this.edit = true;
      },
      err => console.log(err)
    )


    this.calibradoService.getSalida(params.numero_proceso)
    .subscribe(
      res => {
        console.log(res);
        this.calibrado1Salida = res;
        this.edit = true;
      },
      err => console.log(err)
    )


    this.calibradoService.getSalidaUna(params.numero_proceso)
    .subscribe(
      res => {
        console.log(res);
        this.salidaUna = res;
        this.edit = true;
      },
      err => console.log(err)
    )


  }  
  

  correlativoFuncion(id:string)
  {
    //ALMACENAR ESTA VARIABLE
    this.selectedCorrelativo = id;
    //almacena el nombre del cliente en la variable this.selectedCorrelativo
    var correlativeFunction = this.correlativoCliente
    .filter(function(nombre){
    return nombre.nombre === id;
    })
    this.correlativeResult = correlativeFunction;

    //almacena el largo de la lista a una varibale
    this.totalProcesosCliente=this.correlativeResult.length;

   for (var i = 0; i < this.correlativeResult.length; i++) {

    console.log('NUMERO DE PROCESO CORRELATIVO',this.correlativeResult[i].numero_proceso)
    console.log('NUMERO DE PROCESO',this.calibrado1.numero_proceso)
    console.log('posición en el arreglo',i+1)

    if(this.calibrado1.numero_proceso==this.correlativeResult[i].numero_proceso){
      console.log('FUUUUNCIIIONA es el',i+1);
      this.correlativoProceso = i+1;
        console.log('Correlativo valor final',this.correlativoProceso+1);
    }
  }
}

////////
////
////refrescar en el caso de que el identificador sea igual a 1
////////
refreshPage(id:any)
{
  if(id==0){
    console.log('identificador',id);

    setTimeout(function(){ location.reload(); }, 1000);
    console.log('se recarga');  

  }else{
    console.log('ACA SE DEBE PONER EL TOAST');
  }
}

refreshPageDirect()
{
  location.reload();
}



  public kilogramosEntradaSum(){
    return this.calibrado1Entrada.map(row => row.kilogramos).reduce((a,b) => a+b, 0);
  }
  public cantidadbinsEntradaSum(){
    return this.calibrado1Entrada.map(row => row.cantidad_bines).reduce((a,b) => a+b, 0);
  }
  public kilogramosSalidaSum(){
    return this.calibrado1Salida.map(rows => rows.kilogramos).reduce((a,b) => a+b, 0);
  }
  public cantidadbinsSalidaSum(){
    return this.calibrado1Salida.map(rows => rows.cantidad_bines_s).reduce((a,b) => a+b, 0);
  }
  






















  
  nuevoPDF(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();



    doc.setFontSize(10);
    

 


    var proceso = document.getElementById("proceso");
    var procesohtml = proceso?.innerHTML;

    //correlativoProceso
    var correlativoProceso = document.getElementById("correlativoProceso");
    var correlativoProcesohtml = correlativoProceso?.innerHTML;
    var fecha = document.getElementById("fecha");
    var fechahtml = fecha?.innerHTML;
    var totalingreso = document.getElementById("totalingreso");
    var totalingresohtml = totalingreso?.innerHTML;
    var bins = document.getElementById("bins");
    var binshtml = bins?.innerHTML;
    var binsSalida = document.getElementById("binsSalida");
    var binsSalidahtml = binsSalida?.innerHTML;
    var valortotal = document.getElementById("valortotal");
    var valortotalhtml = valortotal?.innerHTML;
    var merma = document.getElementById("merma");
    var mermahtml = merma?.innerHTML;
    var cliente = document.getElementById("cliente");
    var clientehtml = cliente?.innerHTML;
    var fruta = document.getElementById("fruta");
    var frutahtml = fruta?.innerHTML;
    var valor = document.getElementById("valor");
    var valorhtml = valor?.innerHTML;
    var pago = document.getElementById("pago");
    var pagohtml = pago?.innerHTML;
    var fechasalida = document.getElementById("fechasalida");
    var fechasalidahtml = fechasalida?.innerHTML;

    var startingPage = doc.internal.getCurrentPageInfo().pageNumber;
    doc.setPage(startingPage);

    doc.text(128, 8, 'Dirección: José Joaquín Godoy 100');
    doc.text(145, 12, 'Artificio, La Calera ');


    var img = new Image()
    img.src = '/assets/image.jpg'
    doc.addImage(img, 'jpg', 185, 0, 18, 18)


    doc.text(10, 20, 'Numero de Proceso: ');
    doc.text(procesohtml,48, 20);


    doc.text(100, 20, 'Correlativo del Cliente: ');
    doc.text(correlativoProcesohtml,138, 20);


    doc.text(10, 25, 'Fecha de Recepción: ');
    doc.text(fechahtml,48, 25);
    doc.text(93,25, '-');
    doc.text(100,25, 'Fecha de Salida:');
    doc.text(fechasalidahtml,130, 25);
    doc.text(10, 30, 'Cliente: ');
    doc.text(clientehtml,28, 30);
    doc.text(10, 40, 'Kilogramos Ingresados: ');
    doc.text(totalingresohtml,50,40);
    doc.text(10, 45, 'Bins Ingresados: ');
    doc.text(binshtml,40,45);
    doc.text(10, 50, 'Tipo de Fruta: ');
    doc.text(frutahtml,35, 50);
    doc.text(100, 40, 'Valor del Servicio: ');
    doc.text(valorhtml,130, 40);
    doc.text(100, 50, 'Valor Total: ');
    doc.text(valortotalhtml,120,50);
    doc.text(100, 45, 'Bins Salida: ');
    doc.text(binsSalidahtml,120,45);
    doc.text(10, 55, 'Merma: ');
    doc.text(mermahtml,25,55);
    doc.text(100, 55, 'Tipo de Pago: ');
    doc.text(pagohtml,125, 55);
    
    doc.line(5, 33, 204, 33);
    doc.line(5, 60, 204, 60);

    doc.text(5,68,'Proceso de Entrada');
 


 




    doc.autoTable({ html: '#entrada',columnStyles: {

      0: {cellWidth: 22},
      1: {cellWidth: 25},
      2: {cellWidth: 22},
      
    },margin: {top: 70,right:35,left:5}, styles: {overflow: 'linebreak',
    fontSize: 8},didParseCell: function (data) {

      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
        
          data.cell.styles.fillColor = [138, 236, 247];
      }} } )

      doc.text(78,68,'Proceso de Salida');

    doc.autoTable({ html: '#salida',startY:70,columnStyles: {
  

      0: {cellWidth: 22},
      1: {cellWidth: 25},
      2: {cellWidth: 25},
      3: {cellWidth: 25},
      4: {cellWidth: 29},
      
    },margin:{top: 70,right:2,left:78}, styles: {overflow: 'linebreak',
    fontSize: 8},didParseCell: function (data) {

      var rows = data.table.body;
     
      if (data.row.index === rows.length - 1) {
        
          data.cell.styles.fillColor = [138, 236, 247];
      }} })  
    
    
    doc.output('dataurlnewwindow'); 
      
   
  }


  



  copiaClientePDF(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.setFontSize(10);
    
    var correlativoProceso = document.getElementById("correlativoProceso");
    var correlativoProcesohtml = correlativoProceso?.innerHTML;
    var fecha = document.getElementById("fecha");
    var fechahtml = fecha?.innerHTML;
    var totalingreso = document.getElementById("totalingreso");
    var totalingresohtml = totalingreso?.innerHTML;
    var bins = document.getElementById("bins");
    var binshtml = bins?.innerHTML;
    var binsSalida = document.getElementById("binsSalida");
    var binsSalidahtml = binsSalida?.innerHTML;
    var valortotal = document.getElementById("valortotal");
    var valortotalhtml = valortotal?.innerHTML;
    var merma = document.getElementById("merma");
    var mermahtml = merma?.innerHTML;
    var cliente = document.getElementById("cliente");
    var clientehtml = cliente?.innerHTML;
    var fruta = document.getElementById("fruta");
    var frutahtml = fruta?.innerHTML;
    var valor = document.getElementById("valor");
    var valorhtml = valor?.innerHTML;
    var pago = document.getElementById("pago");
    var pagohtml = pago?.innerHTML;
    var fechasalida = document.getElementById("fechasalida");
    var fechasalidahtml = fechasalida?.innerHTML;

    var startingPage = doc.internal.getCurrentPageInfo().pageNumber;
    doc.setPage(startingPage);

    doc.text(128, 8, 'Dirección: José Joaquín Godoy 100');
    doc.text(145, 12, 'Artificio, La Calera ');


    var img = new Image()
    img.src = '/assets/image.jpg'
    doc.addImage(img, 'jpg', 185, 0, 18, 18)




    doc.text(10, 20, 'Numero de Proceso: ');
    doc.text(correlativoProcesohtml,48, 20);


    doc.text(10, 25, 'Fecha de Recepción: ');
    doc.text(fechahtml,48, 25);
    doc.text(93,25, '-');
    doc.text(100,25, 'Fecha de Salida:');
    doc.text(fechasalidahtml,130, 25);
    doc.text(10, 30, 'Cliente: ');
    doc.text(clientehtml,28, 30);
    doc.text(10, 40, 'Kilogramos Ingresados: ');
    doc.text(totalingresohtml,50,40);
    doc.text(10, 45, 'Bins Ingresados: ');
    doc.text(binshtml,40,45);
    doc.text(10, 50, 'Tipo de Fruta: ');
    doc.text(frutahtml,35, 50);
    doc.text(100, 40, 'Valor del Servicio: ');
    doc.text(valorhtml,130, 40);
    doc.text(100, 45, 'Bins Salida: ');
    doc.text(binsSalidahtml,120,45);
    doc.text(100, 50, 'Valor Total: ');
    doc.text(valortotalhtml,120,50);
    doc.text(10, 55, 'Merma: ');
    doc.text(mermahtml,25,55);
    /*
    doc.text(100, 50, 'Tipo de Pago: ');
    doc.text(pagohtml,125, 50);
    */
    doc.line(5, 33, 204, 33);
    doc.line(5, 60, 204, 60);

    doc.text(5,68,'´Proceso de Entrada');


 


    

    doc.autoTable({ html: '#entrada',columnStyles: {
      0: {cellWidth: 22},
      1: {cellWidth: 25},
      2: {cellWidth: 22},
      
    },margin: {top: 70,right:35,left:5}, styles: {overflow: 'linebreak',
    fontSize: 8},didParseCell: function (data) {
      var rows = data.table.body;

      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
      }} } )

    doc.text(78,68,'Proceso de Salida');

    doc.autoTable({ html: '#salida',startY:70,columnStyles: {
      0: {cellWidth: 22},
      1: {cellWidth: 25},
      2: {cellWidth: 25},
      3: {cellWidth: 25},
      4: {cellWidth: 29},
      
    },margin:{top: 70,right:2,left:78}, styles: {overflow: 'linebreak',
    fontSize: 8},didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
      }} })  
    
    
    doc.output('dataurlnewwindow'); 
      
   
  }


































}

  
    

  



