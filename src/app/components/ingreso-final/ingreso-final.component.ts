import { Component, OnInit,AfterViewInit, AfterContentInit } from '@angular/core';
import { CalibradoService } from 'src/app/services/calibrado.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

//Modelos
import {Calibrado} from '../../models/calibrado';
import {CalibradoEntrada} from '../../models/calibradoEntrada';
import {CalibradoSalida} from '../../models/calibradoSalida';


import{ToastrService} from 'ngx-toastr';


import  {Pagos_servicios} from '../../models/pagos_servicios'
import { PagoServiciosService} from '../../../app/services/pago-servicios.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-ingreso-final',
  templateUrl: './ingreso-final.component.html',
  styleUrls: ['./ingreso-final.component.css']
})
export class IngresoFinalComponent implements OnInit{

  constructor(
    private calibradoService: CalibradoService,
    private router:Router,
    private activedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public pagoServiciosService: PagoServiciosService
    ) {
    
  }
  total:number = 0;
  calibre:string ='';

  calibreSelected:string = '';

  getEntrada:any = [];
  getSalida:any = [];
  getUltimo:any = [];
  getcalibre:any = [];
  
  
  correlativoCliente:any = [];
  selectedCorrelativo:string='';
  correlativeResult:any = [];
  totalProcesosCliente:any = 0;
  correlativoProceso:any = 0;
  nombreCliente:string ='';


  resta:number=0;
  visibilidad:string = 'invisible';

  calibrado2:Calibrado = {
    numero_proceso:'',
    id_cliente:'',
    valor_servicio:0,
    idtipo_pago:'',
    idtipo_fruta:'',
    tipo_proceso:'',
    fecha_ingreso:new Date,
    fecha_proceso:new Date
  }
  calibradoEntrada:CalibradoEntrada = {
    id_entrada:'',
    kilogramos:0,
    cantidad_bines:0, 
    numero_proceso:'',  
    fecha_ingreso:new Date,
    fecha_proceso:new Date
  }  
  calibradoSalida: CalibradoSalida = {
    id_salida:'',
    kilogramos:0,
    cantidad_bines_s:0,
    idcalibre:'',
    numero_proceso:'',
    fecha_ingreso:new Date
  }

   
    
  estado='';
  
  
  pagos_servicios:Pagos_servicios = {
    numero_proceso: '',
    monto_pago: '',

  }    
  
  ngOnInit() {

    this.calibradoService.getCalibrados()
      .subscribe(
        res => {
          this.correlativoCliente = res;
          console.log(this.correlativoCliente);        
          console.log(res);
        },
        err => console.error(err)
      );

    const params = this.activedRoute.snapshot.params;
    if(params.numero_proceso){
      this.calibradoService.getFinalEntrada(params.numero_proceso)
      .subscribe(
        res => {
          console.log(res);
          this.getEntrada = res;
        },
        err => console.log(err)
      )
    }
    this.calibradoService.getFinalSalida(params.numero_proceso)
      .subscribe(
        res => {
          console.log(res);
          this.getSalida = res;
        },
        err => console.log(err)
      )

    //Se obtiene el ??ltimo dato de tabla calibrado al iniciar el componente
    this.calibradoService.getCalibradoUno().subscribe(
      res => {
        
        this.getUltimo = res;  
        this.nombreCliente =this.getUltimo.nombre;
        this.correlativoFuncion(this.nombreCliente);
        console.log(this.getUltimo);              
        console.log(res);

        console.log('tipo de proceso'+this.getUltimo.tipo_proceso);
    ////////////////////////////////////////////////////
        if(this.getUltimo.tipo_proceso == 'DESVERDIZADO'){
          this.visibilidad = 'visible';
        }
        
      },
      err => console.error(err)
    )
    this.calibradoService.getCalibre()
      .subscribe(
        res => {
          console.log(res);
          this.getcalibre = res;
        },
        err => console.log(err)
      )

      
        
  }     

  edit_entrada:number=0;

  //Guardar dato en tabla proceso_entrada
  guardarCalibradoEntrada(numero_proceso:string){ 
    

    this.CaputarValor();
    
    this.toastr.success("ENTRADA INGRESADA");

    console.log(this.resta+'esta es la resta')

    if(this.resta  != 0){
    this.edit_entrada =this.calibradoEntrada.kilogramos-(this.resta-43);
    console.log(this.edit_entrada+'ESTE ES EL RESULTADO')
    this.calibradoEntrada.kilogramos = this.edit_entrada;
    this.resta=0;

    delete this.calibradoEntrada.id_entrada;
    delete this.calibradoEntrada.fecha_ingreso;
    delete this.calibradoEntrada.fecha_proceso;    
    this.calibradoService.saveCalibradoEntrada(numero_proceso,this.calibradoEntrada)
    .subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
        
      },
      err => console.error(err)
    )

    }else{   

      delete this.calibradoEntrada.id_entrada;
      delete this.calibradoEntrada.fecha_ingreso;
      delete this.calibradoEntrada.fecha_proceso;    
      this.calibradoService.saveCalibradoEntrada(numero_proceso,this.calibradoEntrada)
      .subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
          
        },
        err => console.error(err)
      )
    }


    
  }

  //Guardar dato en tabla proceso_salida
  guardarCalibradoSalida(numero_proceso:string){ 

    this.CaputarValor();   
    this.toastr.success("SALIDA INGRESADA");

    this.calibradoSalida.idcalibre = this.calibreSelected;

    delete this.calibradoSalida.id_salida;
    delete this.calibradoSalida.fecha_ingreso;
    this.calibradoService.saveCalibradoSalida(numero_proceso,this.calibradoSalida)
    .subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
        
        
      },
      err => console.error(err)
    )
    
  }

  //Se vincula el textbox con el dato PK a los FK de proceso_entrada y proceso_salida
  CaputarValor(){
    this.calibradoEntrada.numero_proceso  = (<HTMLInputElement>document.getElementById('tbx1')).value;
    this.calibradoSalida.numero_proceso = (<HTMLInputElement>document.getElementById('tbx1')).value;      
    if(this.calibradoEntrada.numero_proceso  = (<HTMLInputElement>document.getElementById('tbx1')).value){
      if(this.calibradoSalida.numero_proceso = (<HTMLInputElement>document.getElementById('tbx1')).value){
        console.log("Listo");
        this.estado='Ya puede ingresar datos'
      }      
    }
    else{
      console.log("No listo");
      this.estado='No puede ingresar datos '
    }    
    
  } 
  public kilogramosEntradaSum(){
    return this.getEntrada.map(entrada => entrada.kilogramos).reduce((a,b) => a+b, 0);
  }
  public cantidadbinsEntradaSum(){
    return this.getEntrada.map(entrada => entrada.cantidad_bines).reduce((a,b) => a+b, 0);
  }
  public kilogramosSalidaSum(){
    return this.getSalida.map(salida => salida.kilogramos).reduce((a,b) => a+b, 0);
  }
  public cantidadbinsSalidaSum(){
    return this.getSalida.map(salida => salida.cantidad_bines_s).reduce((a,b) => a+b, 0);
  }
  
  
  BorrarEntrada(numero_proceso:string,id_entrada: string){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No se podr?? recuperar esta entrada!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrala!'
    }).then((result) => {
      if (result.isConfirmed) {
        
      this.calibradoService.deleteCalibradoEntrada(numero_proceso,id_entrada)
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
          'success'
        )
        
      }
    })
  }

  BorrarSalida(numero_proceso:string,id_salida: string){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No se podr?? recuperar esta salida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrala!'
    }).then((result) => {
      if (result.isConfirmed) {
        
      this.calibradoService.deleteCalibradoSalida(numero_proceso,id_salida)
      .subscribe(
        res => {
          console.log(res);          
          this.ngOnInit();
        },
        err => console.error(err)
      )
    
        Swal.fire(
          'Borrada!',
          'La salida seleccionada ha sido borrada.',
          'success'
        )
        
      }
    })
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
    console.log('NUMERO DE PROCESO',this.getUltimo.numero_proceso)
    console.log('posici??n en el arreglo',i+1)

    if(this.getUltimo.numero_proceso==this.correlativeResult[i].numero_proceso){
      console.log('FUUUUNCIIIONA es el',i+1);
      this.correlativoProceso = i+1;
      this.correlativoProceso;
        console.log('Correlativo valor final',this.correlativoProceso+1);

    }
  }
}






//////////////////////////
//////////////////////////



insertPay(dato:string, dato2: HTMLInputElement){

  console.log('imprime el dato'+dato);
  console.log('input element'+dato2.value);
  this.pagos_servicios.numero_proceso = dato;
  this.pagos_servicios.monto_pago = '0';
  this.pagoServiciosService.insertPays(this.pagos_servicios)
  .subscribe(
    res => {
    console.log(res);        
    },
    err => console.error(err)
  ) 

  this.Success();

}



Success(){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Datos Guardados.',
    showConfirmButton: false,
    timer: 1500
  })
}







///////////////////////////
///////////////////////////









}
