import { Component, OnInit } from '@angular/core';
import { PaltaChilenaService } from 'src/app/services/palta-chilena.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import{ToastrService} from 'ngx-toastr';
import {CpcDetailInput} from '../../models/cpcDetailInput';
import {CpcDetailOutput} from '../../models/cpcDetailOutput';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CalibradoService } from 'src/app/services/calibrado.service';

@Component({
  selector: 'app-cpc-ingreso-final',
  templateUrl: './cpc-ingreso-final.component.html',
  styleUrls: ['./cpc-ingreso-final.component.css']
})
export class CpcIngresoFinalComponent implements OnInit {
  constructor(
    private router:Router,
    private activedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private paltaChilenaService: PaltaChilenaService,
    private calibradoService: CalibradoService,
  ) { }
  cpcDetailInput:CpcDetailInput = {
    id_cpc:'',
    cantidad:0, 
    calibre:0,
    precio:0,
    formato:'',    
  } 
  cpcDetailOutput:CpcDetailOutput = {
    id_cpc:'',
    calibre:0,
    cantidad:0,
    bins:0,
  }
  getDatosCompra:any = [];
  getDatosCompraEntrada:any = [];
  getDatosCompraSalida:any = [];
  getcalibre:any = [];
  kilogramosEntrada:number=0;
  kilogramosSalida:number=0;
  descuentoEntrada:number=0;
  descuentoSalida:number=0;
  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    console.log("IDENTIFICADOR", params.id_cpc)
    this.paltaChilenaService.getCompra(params.id_cpc)
      .subscribe(
        res => {
          console.log(res);
          this.getDatosCompra = res;
        },
        err => console.log(err)
      )
    console.log("IDENTIFICADOR", params.id_cpc)
    this.paltaChilenaService.getCompraEntrada(params.id_cpc)
      .subscribe(
        res => {
          console.log(res);
          this.getDatosCompraEntrada = res;
        },
        err => console.log(err)
      )
    console.log("IDENTIFICADOR", params.id_cpc)
    this.paltaChilenaService.getCompraSalida(params.id_cpc)
      .subscribe(
        res => {
          console.log(res);
          this.getDatosCompraSalida = res;
        },
        err => console.log(err)
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
  InsertCantidadEntrada(_callback){
    this.cpcDetailInput.id_cpc = this.getDatosCompra.id_cpc;
    var localvar1 = this.kilogramosEntrada;
    var localvar2 = this.descuentoEntrada;
    this.cpcDetailInput.cantidad = localvar1 - localvar2
    this.cpcDetailInput.valor_total = (localvar1 - localvar2) * this.cpcDetailInput.precio;
    _callback();
  }
  guardarEntrada(){ 
    this.InsertCantidadEntrada(()=>{
      if(this.cpcDetailInput.cantidad !=0){
        if(this.cpcDetailInput.calibre !=0){
          if(this.cpcDetailInput.precio !=0){
            if(this.cpcDetailInput.formato !=''){
              this.paltaChilenaService.insertEntradaCompraPaltaChilena(this.cpcDetailInput)
              .subscribe(
                res => {
                  console.log(res);
                  this.cpcDetailInput.cantidad = 0;
                  this.cpcDetailInput.calibre = 0;
                  this.cpcDetailInput.precio = 0;
                  this.kilogramosEntrada = 0;
                  this.descuentoEntrada = 0;
                  this.toastr.success("ENTRADA INGRESADA");
                  this.ngOnInit();
                },
                err => console.error(err)
              )
            }else{
              this.toastr.warning("DEBE INGRESAR FORMATO");
            }
          }else{
            this.toastr.warning("DEBE INGESAR PRECIO");
          }
        }else{
          this.toastr.warning("DEBE INGRESAR CALIBRE");
        }
      }else{
        this.toastr.warning("DEBE INGRESAR KILOGRAMOS");
      }
    });
  }
  InsertCantidadSalida(_callback){
    this.cpcDetailOutput.id_cpc = this.getDatosCompra.id_cpc;
    var localvar1 = this.kilogramosSalida;
    var localvar2 = this.descuentoSalida;
    this.cpcDetailOutput.cantidad = localvar1 - localvar2
    _callback();
  }
  guardarSalida(){


    this.InsertCantidadSalida(()=>{
      if(this.cpcDetailOutput.calibre !=0){
        if(this.cpcDetailOutput.cantidad !=0){
          if(this.cpcDetailOutput.bins !=0){
            this.paltaChilenaService.insertSalidaCompraPaltaChilena(this.cpcDetailOutput)
            .subscribe(
              res => {
                console.log(res);
                this.cpcDetailOutput.cantidad = 0,
                this.cpcDetailOutput.bins = 0,
                this.kilogramosSalida = 0,
                this.descuentoSalida = 0,
                this.toastr.success("ENTRADA INGRESADA");
                this.ngOnInit();
              },
              err => console.error(err)
            )
          }else{
            this.toastr.warning("DEBE INGRESAR BINS");
          }
        }else{
          this.toastr.warning("DEBE INGRESAR KILOGRAMOS");
        }
      }else{
        this.toastr.warning("DEBE INGRESAR CALIBRE");
      }
    });



  }
  public kilogramosEntradaSum(){
    return this.getDatosCompraEntrada.map(entrada => entrada.cantidad).reduce((a,b) => a+b, 0);
  }
  public kilogramosSalidaSum(){
    return this.getDatosCompraSalida.map(entrada => entrada.cantidad).reduce((a,b) => a+b, 0);
  }
  public ValorTotalSum(){
    return this.getDatosCompraEntrada.map(entrada => entrada.valor_total).reduce((a,b) => a+b, 0);
  }
  public BinsSalidaSum(){
    return this.getDatosCompraSalida.map(entrada => entrada.bins).reduce((a,b) => a+b, 0);
  }
  BorrarEntrada(id_cpc:string,id_detalle_cpc: string){
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
        
      this.paltaChilenaService.BorrarEntrada(id_cpc,id_detalle_cpc)
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
  BorrarSalida(id_cpc:string,id_detalle_salida_cpc: string){
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
      this.paltaChilenaService.BorrarSalida(id_cpc,id_detalle_salida_cpc)
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




}
