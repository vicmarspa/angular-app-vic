import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { CalibradoService } from 'src/app/services/calibrado.service';
import Swal from 'sweetalert2';

import {Calibrado} from '../../models/calibrado';

@Component({
  selector: 'app-editar-proceso',
  templateUrl: './editar-proceso.component.html',
  styleUrls: ['./editar-proceso.component.css']
})
export class EditarProcesoComponent implements OnInit {

  constructor(private calibradoService:CalibradoService,private router: Router,private activedRoute:ActivatedRoute) { }

  calibrado1:Calibrado = {
    numero_proceso:'',  
    id_cliente:'',
    valor_servicio:0,
    idtipo_pago:'',
    idtipo_fruta:'',
    fecha_ingreso:new Date,
    fecha_proceso:new Date
  }
  calibrado:any = [];
  calibrado2:any = [];
  calibrado1Entrada:any = [];
  calibrado1Salida:any = [];  
  fruta1:any=[];
  pago1:any=[];
  cliente1:any=[];
  

  edit:boolean = false;

  frutaSelected:string = '';
  pagoSelected:string = ''; 
  clienteSelected:string = ''; 

  

  ngOnInit(): void {

    this.calibrado1.numero_proceso = this.calibrado1Entrada.numero_proceso;
    this.calibrado1.numero_proceso = this.calibrado1Salida.numero_proceso;
    const params = this.activedRoute.snapshot.params;
    if (params.numero_proceso) {
      this.calibradoService.getCalibrado(params.numero_proceso)
        .subscribe(
          res => {
            console.log(res);            
            this.calibrado = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
    this.calibradoService.getCalibrado1Editar(params.numero_proceso)
        .subscribe(
          res => {
            console.log(res);
            this.calibrado1 = res;
            this.calibrado2 = res;            
            this.edit = true;
          },
          err => console.log(err)
        )
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
    this.calibradoService.getFrutaEditarProceso()
    .subscribe(
      res => {
        console.log(res);
        this.fruta1 = res;
        this.edit = true;
      },
      err => console.log(err)
    )
    this.calibradoService.getPagoEditarProceso()
    .subscribe(
      res => {
        console.log(res);
        this.pago1 = res;
        this.edit = true;
      },
      err => console.log(err)
    )

    this.calibradoService.getClientesEditarProceso()
    .subscribe(
      res => {
        console.log(res);
        this.cliente1 = res;
        this.edit = true;
      },
      err => console.log(err)
    )
    
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
  
  updateCalibrado() {
    Swal.fire({
    title: 'Estas seguro(a)?',
    text: "El proceso será modificado!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, modificalo!'
  }).then((result) => {
    if (result.isConfirmed) {
      
      delete this.calibrado1.fecha_ingreso;
      delete this.calibrado1.fecha_proceso;
      delete this.calibrado1.id_cliente;

      this.calibrado1.idtipo_fruta = this.frutaSelected;
      this.calibrado1.idtipo_pago = this.pagoSelected;
      this.calibrado1.id_cliente = this.clienteSelected;
      
      this.calibradoService.updateCalibrado(this.calibrado1.numero_proceso!,this.calibrado1)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Modificado!',
      'El proceso seleccionado modificado.',
      'success'
      )
          
      }
    })
  }
  

}
