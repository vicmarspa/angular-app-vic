import { Component, OnInit } from '@angular/core';
import { CalibradoService } from 'src/app/services/calibrado.service';
import { ActivatedRoute, Router } from '@angular/router';

import {Calibrado} from '../../models/calibrado';
import {CalibradoEntrada} from '../../models/calibradoEntrada';
import {CalibradoSalida} from '../../models/calibradoSalida';

import Swal from 'sweetalert2';

import{ToastrService} from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-continuar-proceso',
  templateUrl: './continuar-proceso.component.html',
  styleUrls: ['./continuar-proceso.component.css']
})
export class ContinuarProcesoComponent implements OnInit {

  constructor(private calibradoService: CalibradoService,private activedRoute: ActivatedRoute,private toastr: ToastrService) { }

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
  

  ngOnInit(): void {

    this.calibradoService.getCalibrados()
      .subscribe(
        res => {
          this.correlativoCliente = res;
          console.log(this.correlativoCliente)              
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

    //Se obtiene el último dato de tabla calibrado al iniciar el componente
    this.calibradoService.getContinuarCalibrado(params.numero_proceso).subscribe(
      res => {
        this.getUltimo = res;
        this.nombreCliente =this.getUltimo.nombre;
        this.correlativoFuncion(this.nombreCliente);
        console.log(res)
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

  guardarCalibradoEntrada(numero_proceso:string){ 
    

    this.CaputarValor();
    
    this.toastr.success("ENTRADA INGRESADA");

    delete this.calibradoEntrada.id_entrada;
    delete this.calibradoEntrada.fecha_ingreso;
    delete this.calibradoEntrada.fecha_proceso; 
  
    this.calibradoService.saveContinuarEntrada(numero_proceso,this.calibradoEntrada)
    .subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      err => console.error(err)
    )
    
    
  }

  guardarCalibradoSalida(numero_proceso:string){ 

    this.CaputarValor();   
    this.toastr.success("SALIDA INGRESADA");

    this.calibradoSalida.idcalibre = this.calibreSelected;

    delete this.calibradoSalida.id_salida;
    delete this.calibradoSalida.fecha_ingreso;
    this.calibradoService.saveContinuarSalida(numero_proceso,this.calibradoSalida)
    .subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
        
        
      },
      err => console.error(err)
    )
    
  }

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
      text: "No se podrá recuperar esta entrada!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrala!'
    }).then((result) => {
      if (result.isConfirmed) {
        
      this.calibradoService.deleteContinuarEntrada(numero_proceso,id_entrada)
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
      text: "No se podrá recuperar esta salida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrala!'
    }).then((result) => {
      if (result.isConfirmed) {
        
      this.calibradoService.deleteContinuarSalida(numero_proceso,id_salida)
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
    console.log('posición en el arreglo',i+1)

    if(this.getUltimo.numero_proceso==this.correlativeResult[i].numero_proceso){
      console.log('FUUUUNCIIIONA es el',i+1);
      this.correlativoProceso = i+1;
      this.correlativoProceso;
        console.log('Correlativo valor final',this.correlativoProceso+1);

    }
  }
  }


  refreshPageDirect()
  {
    const params = this.activedRoute.snapshot.params;
    console.log('numero de proceso'+ params.numero_proceso)
    window.location.href='/continuar/'+ params.numero_proceso ;
  }

}