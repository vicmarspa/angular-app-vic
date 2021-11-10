import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CalibradoService } from 'src/app/services/calibrado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'
import { PaltaChilenaService } from 'src/app/services/palta-chilena.service';
import{ToastrService} from 'ngx-toastr';


import {CpcPrincipal} from '../../models/cpcPrincipal';
import {VpcPrincipal} from '../../models/vpcPrincipal';

@Component({
  selector: 'app-busqueda-vpc',
  templateUrl: './busqueda-vpc.component.html',
  styleUrls: ['./busqueda-vpc.component.css']
})
export class BusquedaVpcComponent implements OnInit {

  getAllSells:any= [];
  getAllSellsRespaldo:any= [];
  fechaActual = new Date();
  tipo_pago_list:any =[];


  vpcPrincipal:VpcPrincipal = {
    id_vpc: 0,
    cliente_id: 0,
    fecha_ingreso: new Date,
    tipo_pago: 0,
    estado: 0,
  }

  constructor(
    public calibradoService: CalibradoService,
    private router:Router,
    private activedRoute: ActivatedRoute,
    public paltaChilenaService: PaltaChilenaService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {

    this.paltaChilenaService.getAllSells()
    .subscribe(
      res => {
        this.getAllSells = res;
        this.getAllSellsRespaldo = this.getAllSells;
        this.totalPagado();

        console.log(res);
      },
      err => console.error(err)
    );

    this.calibradoService.getTipoPago().subscribe(
      res => {
        this.tipo_pago_list = res;
        console.log(res)
      },
      err => console.error(err)
    );
  }

  public kilogramosTotalSum(){
    return this.getAllSells.map(entrada => entrada.total_cantidad).reduce((a,b) => a+b, 0);
  }

  public precioNetoSum(){
    return this.getAllSells.map(entrada => entrada.precio_productos).reduce((a,b) => a+b, 0);
  }

  public precioAdicionalSum(){
    return this.getAllSells.map(entrada => entrada.costos_adicionales).reduce((a,b) => a+b, 0);
  }

  public detalleVentaBinsSum(){
    return this.getSellDetail.map(entrada => entrada.cantidad_bins).reduce((a,b) => a+b, 0);
  }
  public detalleVentaCantidadSum(){
    return this.getSellDetail.map(entrada => entrada.cantidad).reduce((a,b) => a+b, 0);
  }

  public detalleVentaAdicionalCantidadSum(){
    return this.aditionalCost.map(entrada => entrada.cantidad).reduce((a,b) => a+b, 0);
  }


  id_vpc:any;

  Search(){
    // this.getAllSells = this.getAllSellsRespaldo;
    if(this.id_vpc == ""){
      this.ngOnInit();
    }
    else{
      this.getAllSells = this.getAllSells.filter(res => {
        return res.id_vpc.toString().match(this.id_vpc.toString());
      })
    }
  }

  nombre:any;

  SearchByClient(){
    // this.getAllSells = this.getAllSellsRespaldo;
    if(this.nombre == ""){
      this.ngOnInit();
    }
    else{
      this.getAllSells = this.getAllSells.filter(res => {
        return res.nombre.toString().match(this.nombre.toString());
      })
    }
  }


  ts = new Date();
  startDateText:any="";
  endDateText:any="";

  dateRangeCreated($event) {    
    // this.getAllSells = this.getAllSellsRespaldo; 
    this.ts = this.getAllSells.fecha_ingreso;                       
    let startDate = $event[0].toJSON().split('T')[0];   
    let endDate = $event[1].toJSON().split('T')[0]; 
    this.getAllSells = this.getAllSells.filter(m => new Date(m.fecha_ingreso) >= new Date(startDate) && new Date(m.fecha_ingreso) <= new Date(endDate)        
    );  
    console.log(startDate);
    console.log(endDate);
    this.startDateText = startDate;
    this.endDateText = endDate;
  }

  tipo_pago:any;

  SearchByTipoPago(){
    // this.getAllSells = this.getAllSellsRespaldo;
    if(this.tipo_pago == ""){
      this.ngOnInit();
    }
    else{
      this.getAllSells = this.getAllSells.filter(res => {
        return res.tipo_pago.toString().match(this.tipo_pago.toString());
      })
    }
  }


  volverBuscar(){
    this.getAllSells = this.getAllSellsRespaldo;
  }

  totalPagadoValue:number=0;

  totalPagado(){
    for (var i = 0; i < this.getAllSells.length; i++) {
      if(this.getAllSells[i].tipo_pago == "EFECTIVO" || this.getAllSells[i].tipo_pago == "TRANSFERENCIA" || this.getAllSells[i].tipo_pago == "PAGADO"){
        console.log(this.getAllSells[i].tipo_pago);
        this.totalPagadoValue = this.totalPagadoValue + this.getAllSells[i].precio_productos + this.getAllSells[i].costos_adicionales;
      }
      console.log("valor total",this.totalPagadoValue)
    }
  }



  selectedIdVpc:any;
  selectedNombre:any;
  selectedFechaIngreso:any;
  selectedTipoPago:any;
  selectedTotalCantidad:any;
  selectedPrecioProductos:any;
  selectedCostosAdicionales:any;

  menuOpciones(
    id_vpc:any,
    nombre:any,
    fecha_ingreso:any,
    tipo_pago:any,
    total_cantidad:any,
    precio_productos:any,
    costos_adicionales:any,
    ){
      this.selectedIdVpc = id_vpc;
      this.selectedNombre = nombre;
      this.selectedFechaIngreso = fecha_ingreso;
      this.selectedTipoPago = tipo_pago;
      this.selectedTotalCantidad = total_cantidad;
      this.selectedPrecioProductos = precio_productos;
      this.selectedCostosAdicionales = costos_adicionales;

    this.obtenerDatos();
    this.obtenerDatosAdicionales();
    this.correlativoFuncion();
  }

  aditionalCost:any = [];
  getSellDetail:any = [];

  obtenerDatos(){
    this.paltaChilenaService.getSellDetail(this.selectedIdVpc)
    .subscribe(
      res => {
        console.log(res);
        this.getSellDetail = res;
      },
      err => console.log(err)
    )
  }


  obtenerDatosAdicionales(){
    this.paltaChilenaService.getSellAditionalCost(this.selectedIdVpc)
    .subscribe(
      res => {
        console.log(res);
        this.aditionalCost = res;
      },
      err => console.log(err)
    )
  }



  countProces:number=0;
  countProces2:number=-1;
  countProcesFinal:number=0;
  countProcesCorrelative:number=0;
  ventaPaltaChilenaCorrelativo:any=[];

  correlativoFuncion()
  {
    this.countProces=0;
    this.ventaPaltaChilenaCorrelativo=this.getAllSellsRespaldo;
    for (var i =0; i< this.ventaPaltaChilenaCorrelativo.length ; i++) {
      //cuenta cantidad de procesos
      if(this.ventaPaltaChilenaCorrelativo[i].nombre == this.selectedNombre){
        this.countProces=this.countProces+1
      }
    }
    this.countProces2 = 0;
    this.countProcesFinal = 0;
    for (var i =0; i< this.ventaPaltaChilenaCorrelativo.length ; i++) {
      //cuenta cantidad de procesos
      if(this.ventaPaltaChilenaCorrelativo[i].nombre == this.selectedNombre){
        this.countProces2=this.countProces2+1
        this.countProcesFinal=this.countProces-this.countProces2;
        if(this.ventaPaltaChilenaCorrelativo[i].id_vpc == this.selectedIdVpc){
          this.countProcesCorrelative=this.countProcesFinal+1;
        }
      }
    }
  }



////////
////////
////////
////////
////////funcion para acoplar datos utilizar en venta de limones
////////
////////
////////
////////
  getSellDetailDatosAcoplamiento:any = [];
  datosNoRepetidos:any = [];
  sumaPrecioTotalAcoplados:any = 0;
  getSellDetailDatosAcoplados:any = [];
  contador:number=0;
  acoplarDatos(){
    //carga una nueva lista para utilizar
    this.getSellDetailDatosAcoplamiento = this.getSellDetail;
    const setObj = new Set();
    //selecciona solo los objetas que cumplan con el requisito de tener el mismo calibre
    const unicos = this.getSellDetailDatosAcoplamiento.reduce((acc, acoplado) => {
      if (!setObj.has(acoplado.calibre)){
        setObj.add(acoplado.calibre)
        acc.push(acoplado)
      }
      return acc;
    },[]);
    //asigna las variables de los objetos no repetidos a un objeto que solo contiene variables diferentes
    this.datosNoRepetidos = unicos;
    //recorre el objeto en base a los datos no repetidos
    for (var i =0; i< this.datosNoRepetidos.length ; i++) {
      //recorre la lista suma totales 
      for (var j =0; j< this.getSellDetailDatosAcoplamiento.length ; j++) {
        if(this.getSellDetailDatosAcoplamiento[j].calibre == this.datosNoRepetidos[i].calibre){
          console.log(this.getSellDetailDatosAcoplamiento[j].precio_total);
          this.sumaPrecioTotalAcoplados = this.sumaPrecioTotalAcoplados + this.getSellDetailDatosAcoplamiento[j].precio_total;
        }
      }
      //se declara el objeto que se agregará a la lista
      var objeto = {
        calibre: this.datosNoRepetidos[i].calibre,
        precio_total: this.sumaPrecioTotalAcoplados
      }
      //se incursta el objeto a la lista que se utilizará lista la cual incluye solo los valores únicos
      this.getSellDetailDatosAcoplados.push(objeto);
      this.sumaPrecioTotalAcoplados = 0;
    }
    console.log(this.getSellDetailDatosAcoplados);
  }
////////
////////
////////
////////
////////
////////
////////
////////
////////










tipo_pago2:number;


ActualizarTipoPago(id_vpc:number){
  this.vpcPrincipal.id_vpc = id_vpc;
  this.vpcPrincipal.tipo_pago = this.tipo_pago2;
  Swal.fire({
    title: '¿Estás Seguro?',
    text: "¿Desea Cambiar El Estado De Este Pago?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result) => {
    if (result.isConfirmed) { 
    this.paltaChilenaService.updateVentaTipoPago(this.vpcPrincipal)
    .subscribe(
      res => {
        console.log(res);
        this.vpcPrincipal.id_vpc = 0;
        this.vpcPrincipal.tipo_pago = 0;
        this.toastr.success("ACTUALIZADO.");
      },
      err => console.error(err)
    )
    Swal.fire(
      {
        //position: 'top-end',
        icon: 'success',
        title: 'Pago Actualizado',
        html: 'Estamos Redireccionando.',
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
        /* Read more about handling dismissals below */
        location.reload();
      }
        )
      }
    })
}



ActualizarEstado(id_vpc:number,kilogramos:number,adicional:number){
  this.vpcPrincipal.id_vpc = id_vpc;
  this.vpcPrincipal.estado = 0;
  if(kilogramos==0 && adicional==0){
    Swal.fire({
      title: '¿Estás Seguro Que Desea Eliminar Esta venta?',
      text: "Recuerde Eliminar Definitivamente En La Sección De Registros Borrados Si Desea Reestablecer El Inventario",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) { 
      this.paltaChilenaService.updateVentaEstado(this.vpcPrincipal)
      .subscribe(
        res => {
          console.log(res);
          this.vpcPrincipal.id_vpc = 0;
          this.vpcPrincipal.tipo_pago = 0;
          this.toastr.success("VENTA ELIMINADA.");
        },
        err => console.error(err)
      )
      Swal.fire(
        {
          //position: 'top-end',
          icon: 'success',
          title: 'Venta Eliminada',
          html: 'Estamos Redireccionando.',
          showConfirmButton: false,
          timer: 2000,
        }).then((result) => {
          /* Read more about handling dismissals below */
          location.reload();
        }
          )
        }
      })
  }else{
    Swal.fire(
      {
        //position: 'top-end',
        icon: 'error',
        title: 'No Se Realizó La Operación',
        html: 'Para Eliminar Esta Venta Debe Ir A La Sección Modificar Y Eliminar El Detalle De La Venta',
        showConfirmButton: false,
        timer: 5000,
      }).then((result) => {
        /* Read more about handling dismissals below */
        location.reload();
      }
        )
    console.log("no se puede borrar")
  }












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
    
    var precio_neto =  document.getElementById("precio_neto");
    var precio_netohtml = precio_neto?.innerHTML;
    
    var precio_adicional =  document.getElementById("precio_adicional");
    var precio_adicionalhtml = precio_adicional?.innerHTML;
    
    var neto_adicional =  document.getElementById("neto_adicional");
    var neto_adicionalhtml = neto_adicional?.innerHTML;
    
    var startDateText =  document.getElementById("startDateText");
    var startDateTexthtml = startDateText?.innerHTML;
    
    var endDateText =  document.getElementById("endDateText");
    var endDateTexthtml = endDateText?.innerHTML;

    var nombre =  document.getElementById("nombre");
    var nombrehtml = nombre?.innerHTML;
    
    var tipo_pago =  document.getElementById("tipo_pago");
    var tipo_pagohtml = tipo_pago?.innerHTML;
    
    
    doc.text('FECHA ACTUAL: ', 10, 20);
    doc.setFontType('bold');
    doc.text(fechaActualhtml, 55, 20);
    doc.setFontType('normal');

     
    doc.text('KILOGRAMOS: ', 10, 25);
    doc.setFontType('bold'); 
    doc.text(total_kilogramoshtml, 55, 25);
    doc.setFontType('normal');

     
    doc.text('PRECIO NETO: ', 10, 30);
    doc.setFontType('bold');
    doc.text(precio_netohtml, 55, 30);
    doc.setFontType('normal');

     
    doc.text('PRECIO ADICIONAL: ', 10, 35);
    doc.setFontType('bold');
    doc.text(precio_adicionalhtml, 55, 35);
    doc.setFontType('normal');

     
    doc.text('PRECIO TOTAL: ', 10, 40);
    doc.setFontType('bold'); 
    doc.text(neto_adicionalhtml, 55, 40);
    doc.setFontType('normal');

     
    doc.text('RANGO DE BUSQUEDA: ', 10, 45);
    doc.setFontType('bold');
    doc.text(' - ',75, 45);
    doc.text(startDateTexthtml, 55, 45);
    doc.text(endDateTexthtml, 80, 45); 
    doc.setFontType('normal');

     
    doc.text('NOMBRE BUSQUEDA: ', 10, 50);
    doc.setFontType('bold');
    doc.text(nombrehtml, 55, 50);
    doc.setFontType('normal');

     
    doc.text('TIPO PAGO BUSQUEDA: ', 10, 55);
    doc.setFontType('bold');
    doc.text(tipo_pagohtml, 55, 55);


  
  
    doc.line(5, 60, 204, 60);
  
    doc.text('DETALLE DE VENTA - PALTA CHILENA', 70, 65);
    
    doc.line(5, 70, 204, 70);
  
  
    doc.text('DETALLE DE REPORTE', 85,75);

  
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



    },margin: {top: 80,right:35,left:5}, styles: {overflow: 'linebreak',
    fontSize: 10},didParseCell: function (data) {
  
      //data.table.body.splice(5);
      var rows = data.table.body;
  
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
      }} } )
  

    doc.output('dataurlnewwindow'); 
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
  



    var detailSelectedselectedIdVpc2 = document.getElementById("detailSelectedselectedIdVpc2");
    var detailSelectedselectedIdVpc2html = detailSelectedselectedIdVpc2?.innerHTML;

    var detailSelectedselectedIdVpc = document.getElementById("detailSelectedselectedIdVpc");
    var detailSelectedselectedIdVpchtml = detailSelectedselectedIdVpc?.innerHTML;
    
    var detailSelectedselectedNombre =  document.getElementById("detailSelectedselectedNombre");
    var detailSelectedselectedNombrehtml = detailSelectedselectedNombre?.innerHTML;
    
    var detailSelectedselectedFechaIngreso =  document.getElementById("detailSelectedselectedFechaIngreso");
    var detailSelectedselectedFechaIngresohtml = detailSelectedselectedFechaIngreso?.innerHTML;
    
    var detailSelectedselectedTipoPago =  document.getElementById("detailSelectedselectedTipoPago");
    var detailSelectedselectedTipoPagohtml = detailSelectedselectedTipoPago?.innerHTML;
    
    var detailSelectedselectedTotalCantidad =  document.getElementById("detailSelectedselectedTotalCantidad");
    var detailSelectedselectedTotalCantidadhtml = detailSelectedselectedTotalCantidad?.innerHTML;
    
    var detailSelectedselectedPrecioProductos =  document.getElementById("detailSelectedselectedPrecioProductos");
    var detailSelectedselectedPrecioProductoshtml = detailSelectedselectedPrecioProductos?.innerHTML;
    
    var detailSelectedselectedCostosAdicionales =  document.getElementById("detailSelectedselectedCostosAdicionales");
    var detailSelectedselectedCostosAdicionaleshtml = detailSelectedselectedCostosAdicionales?.innerHTML;
    
    var detailSelectedselectedPrecioProductos2 =  document.getElementById("detailSelectedselectedPrecioProductos2");
    var detailSelectedselectedPrecioProductos2html = detailSelectedselectedPrecioProductos2?.innerHTML;

    







  






    doc.line(5, 15, 35, 15);

    

    doc.line(5, 6, 35, 6);

    doc.setFontType('bold');
    doc.setFontSize(14);
    doc.text('VENTA: ', 8, 12);
    doc.text(detailSelectedselectedIdVpchtml, 28, 12); 
    doc.setFontType('normal');
    doc.setFontSize(10);


    doc.line(5, 15, 5, 6)

    doc.line(35, 15, 35, 6)


  
    doc.text('IDENTIFICADOR: ', 10, 25); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedIdVpc2html, 55, 25); 
    doc.setFontType('normal');

    doc.text('NOMBRE: ', 10, 30); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedNombrehtml, 55, 30); 
    doc.setFontType('normal');

    doc.text('FECHA: ', 10, 35); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedFechaIngresohtml, 55, 35); 
    doc.setFontType('normal');

    doc.text('TIPO DE PAGO: ', 10, 40); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedTipoPagohtml, 55, 40); 
    doc.setFontType('normal');

    doc.text('CANTIDAD: ', 10, 45); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedTotalCantidadhtml, 55, 45); 
    doc.setFontType('normal');

    doc.text('PRECIO: ', 10, 50); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedPrecioProductoshtml, 55, 50); 
    doc.setFontType('normal');

    doc.text('COSTOS ADICIONALES: ', 10, 55); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedCostosAdicionaleshtml, 55, 55); 
    doc.setFontType('normal');

    doc.text('PRECIO TOTAL: ', 10, 60); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedPrecioProductos2html, 55, 60); 
   


  
  
    doc.line(5, 65, 204, 65);
  
    doc.text('DETALLE VENTA DE PALTA', 85,70);
    
    doc.line(5, 75, 204, 75);
  
  
  
  
  

  
    // top: 65,right:35,left:10
    doc.autoTable({ html: '#datos_entrada',columnStyles: {
      0: {cellWidth: 25},
      1: {cellWidth: 18},
      2: {cellWidth: 20},
      3: {cellWidth: 15},
      4: {cellWidth: 24},
      5: {cellWidth: 24},
      6: {cellWidth: 24},


    },margin: {top: 80,right:35,left:30}, styles: {overflow: 'linebreak',
    fontSize: 10},didParseCell: function (data) {
  
      //data.table.body.splice(5);
      var rows = data.table.body;
  
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
      }} } )
  

      doc.autoTable({ html: '#datos_salida', columnStyles: {

        0: {cellWidth: 25},
        1: {cellWidth: 40},
        2: {cellWidth: 20},
        3: {cellWidth: 20},

      },margin: {top: 75,right:2,left:30}, styles: {overflow: 'linebreak',
      fontSize: 10},didParseCell: function (data) {
    
        //data.table.body.splice(5);
        var rows = data.table.body;
    
        if (data.row.index === rows.length - 1) {
            data.cell.styles.fillColor = [138, 236, 247];
        }} } )
    doc.output('dataurlnewwindow'); 
  }



  reporteIndividualPDF2(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.setFontSize(10);
  
    doc.text('Dirección: J.J Godoy 100, La Calera', 124, 8);
    doc.text('Contacto: contacto@vicmarspa.cl', 124, 12);
  
    var img = new Image()
    img.src = '/assets/image.jpg'
    doc.addImage(img, 'jpg', 185, 0, 18, 18)
  
    doc.line(5, 20, 204, 20);
  



    var detailSelectedselectedIdVpc2 = document.getElementById("detailSelectedselectedIdVpc2");
    var detailSelectedselectedIdVpc2html = detailSelectedselectedIdVpc2?.innerHTML;

    var detailSelectedselectedIdVpc = document.getElementById("detailSelectedselectedIdVpc");
    var detailSelectedselectedIdVpchtml = detailSelectedselectedIdVpc?.innerHTML;
    
    var detailSelectedselectedNombre =  document.getElementById("detailSelectedselectedNombre");
    var detailSelectedselectedNombrehtml = detailSelectedselectedNombre?.innerHTML;
    
    var detailSelectedselectedFechaIngreso =  document.getElementById("detailSelectedselectedFechaIngreso");
    var detailSelectedselectedFechaIngresohtml = detailSelectedselectedFechaIngreso?.innerHTML;
    
    var detailSelectedselectedTipoPago =  document.getElementById("detailSelectedselectedTipoPago");
    var detailSelectedselectedTipoPagohtml = detailSelectedselectedTipoPago?.innerHTML;
    
    var detailSelectedselectedTotalCantidad =  document.getElementById("detailSelectedselectedTotalCantidad");
    var detailSelectedselectedTotalCantidadhtml = detailSelectedselectedTotalCantidad?.innerHTML;
    
    var detailSelectedselectedPrecioProductos =  document.getElementById("detailSelectedselectedPrecioProductos");
    var detailSelectedselectedPrecioProductoshtml = detailSelectedselectedPrecioProductos?.innerHTML;
    
    var detailSelectedselectedCostosAdicionales =  document.getElementById("detailSelectedselectedCostosAdicionales");
    var detailSelectedselectedCostosAdicionaleshtml = detailSelectedselectedCostosAdicionales?.innerHTML;
    
    var detailSelectedselectedPrecioProductos2 =  document.getElementById("detailSelectedselectedPrecioProductos2");
    var detailSelectedselectedPrecioProductos2html = detailSelectedselectedPrecioProductos2?.innerHTML;

    







  






    doc.line(5, 15, 35, 15);

    

    doc.line(5, 6, 35, 6);

    doc.setFontType('bold');
    doc.setFontSize(14);
    doc.text('VENTA: ', 8, 12);
    doc.text(detailSelectedselectedIdVpchtml, 28, 12); 
    doc.setFontType('normal');
    doc.setFontSize(10);


    doc.line(5, 15, 5, 6)

    doc.line(35, 15, 35, 6)


  


    doc.text('NOMBRE: ', 10, 25); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedNombrehtml, 55, 25); 
    doc.setFontType('normal');

    doc.text('FECHA: ', 10, 30); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedFechaIngresohtml, 55, 30); 
    doc.setFontType('normal');


    doc.text('CANTIDAD: ', 10, 35); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedTotalCantidadhtml, 55, 35); 
    doc.setFontType('normal');

    doc.text('PRECIO: ', 10, 40); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedPrecioProductoshtml, 55, 40); 
    doc.setFontType('normal');

    doc.text('COSTOS ADICIONALES: ', 10, 45); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedCostosAdicionaleshtml, 55, 45); 
    doc.setFontType('normal');

    doc.text('PRECIO TOTAL: ', 10, 50); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedPrecioProductos2html, 55, 50); 
   


  
  
    doc.line(5, 55, 204, 55);
  
    doc.text('DETALLE VENTA DE PALTA', 85,60);
    
    doc.line(5, 65, 204, 65);
  
  
  
  
  

  
    // top: 65,right:35,left:10
    doc.autoTable({ html: '#datos_entrada',columnStyles: {
      0: {cellWidth: 25},
      1: {cellWidth: 18},
      2: {cellWidth: 20},
      3: {cellWidth: 15},
      4: {cellWidth: 24},
      5: {cellWidth: 24},
      6: {cellWidth: 24},


    },margin: {top: 70,right:35,left:30}, styles: {overflow: 'linebreak',
    fontSize: 10},didParseCell: function (data) {
  
      //data.table.body.splice(5);
      var rows = data.table.body;
  
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
      }} } )
  

      doc.autoTable({ html: '#datos_salida', columnStyles: {

        0: {cellWidth: 25},
        1: {cellWidth: 40},
        2: {cellWidth: 20},
        3: {cellWidth: 20},

      },margin: {top: 75,right:2,left:30}, styles: {overflow: 'linebreak',
      fontSize: 10},didParseCell: function (data) {
    
        //data.table.body.splice(5);
        var rows = data.table.body;
    
        if (data.row.index === rows.length - 1) {
            data.cell.styles.fillColor = [138, 236, 247];
        }} } )
    doc.output('dataurlnewwindow'); 
  }






  reporteIndividualPDF3(){
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.setFontSize(10);
  
    doc.text('Dirección: J.J Godoy 100, La Calera', 124, 8);
    doc.text('Contacto: contacto@vicmarspa.cl', 124, 12);
  
    var img = new Image()
    img.src = '/assets/image.jpg'
    doc.addImage(img, 'jpg', 185, 0, 18, 18)
  
    doc.line(5, 20, 204, 20);
  



    var detailSelectedselectedIdVpc2 = document.getElementById("detailSelectedselectedIdVpc2");
    var detailSelectedselectedIdVpc2html = detailSelectedselectedIdVpc2?.innerHTML;

    var detailSelectedselectedIdVpc = document.getElementById("detailSelectedselectedIdVpc");
    var detailSelectedselectedIdVpchtml = detailSelectedselectedIdVpc?.innerHTML;
    
    var detailSelectedselectedNombre =  document.getElementById("detailSelectedselectedNombre");
    var detailSelectedselectedNombrehtml = detailSelectedselectedNombre?.innerHTML;
    
    var detailSelectedselectedFechaIngreso =  document.getElementById("detailSelectedselectedFechaIngreso");
    var detailSelectedselectedFechaIngresohtml = detailSelectedselectedFechaIngreso?.innerHTML;
    
    var detailSelectedselectedTipoPago =  document.getElementById("detailSelectedselectedTipoPago");
    var detailSelectedselectedTipoPagohtml = detailSelectedselectedTipoPago?.innerHTML;
    
    var detailSelectedselectedTotalCantidad =  document.getElementById("detailSelectedselectedTotalCantidad");
    var detailSelectedselectedTotalCantidadhtml = detailSelectedselectedTotalCantidad?.innerHTML;
    
    var detailSelectedselectedPrecioProductos =  document.getElementById("detailSelectedselectedPrecioProductos");
    var detailSelectedselectedPrecioProductoshtml = detailSelectedselectedPrecioProductos?.innerHTML;
    
    var detailSelectedselectedCostosAdicionales =  document.getElementById("detailSelectedselectedCostosAdicionales");
    var detailSelectedselectedCostosAdicionaleshtml = detailSelectedselectedCostosAdicionales?.innerHTML;
    
    var detailSelectedselectedPrecioProductos2 =  document.getElementById("detailSelectedselectedPrecioProductos2");
    var detailSelectedselectedPrecioProductos2html = detailSelectedselectedPrecioProductos2?.innerHTML;

    







  






    doc.line(5, 15, 35, 15);

    

    doc.line(5, 6, 35, 6);

    doc.setFontType('bold');
    doc.setFontSize(14);
    doc.text('VENTA: ', 8, 12);
    doc.text(detailSelectedselectedIdVpchtml, 28, 12); 
    doc.setFontType('normal');
    doc.setFontSize(10);


    doc.line(5, 15, 5, 6)

    doc.line(35, 15, 35, 6)


  


    doc.text('NOMBRE: ', 10, 25); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedNombrehtml, 55, 25); 
    doc.setFontType('normal');

    doc.text('FECHA: ', 10, 30); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedFechaIngresohtml, 55, 30); 
    doc.setFontType('normal');


    doc.text('CANTIDAD: ', 10, 35); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedTotalCantidadhtml, 55, 35); 
    doc.setFontType('normal');

    doc.text('PRECIO: ', 10, 40); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedPrecioProductoshtml, 55, 40); 
    doc.setFontType('normal');

    doc.text('COSTOS ADICIONALES: ', 10, 45); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedCostosAdicionaleshtml, 55, 45); 
    doc.setFontType('normal');

    doc.text('PRECIO TOTAL: ', 10, 50); 
    doc.setFontType('bold');
    doc.text(detailSelectedselectedPrecioProductos2html, 55, 50); 
   


  
  
    doc.line(5, 55, 204, 55);
  
    doc.text('DETALLE VENTA DE PALTA', 85,60);
    
    doc.line(5, 65, 204, 65);
  
  
  
  
  

  
    // top: 65,right:35,left:10
    doc.autoTable({ html: '#datos_entrada',columnStyles: {
      0: {cellWidth: 25},
      1: {cellWidth: 18},
      2: {cellWidth: 20},
      3: {cellWidth: 15},
      4: {cellWidth: 24},
      5: {cellWidth: 24},
      6: {cellWidth: 24},


    },margin: {top: 70,right:35,left:30}, styles: {overflow: 'linebreak',
    fontSize: 10},didParseCell: function (data) {
  
      //data.table.body.splice(5);
      var rows = data.table.body;
  
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fillColor = [138, 236, 247];
      }} } )
  

    doc.output('dataurlnewwindow'); 
  }













}
