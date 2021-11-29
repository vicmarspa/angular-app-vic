import { Component, OnInit } from '@angular/core';
import { CompraGeneralService } from 'src/app/services/compra-general.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import{ToastrService} from 'ngx-toastr';
import {DetalleCompraGeneral} from '../../models/detalleCompraGeneral';
import {DetalleSalidaCompraGeneral} from '../../models/detalleSalidaCompraGeneral';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CalibradoService } from 'src/app/services/calibrado.service';

@Component({
  selector: 'app-compra-general-final',
  templateUrl: './compra-general-final.component.html',
  styleUrls: ['./compra-general-final.component.css']
})
export class CompraGeneralFinalComponent implements OnInit {

  constructor(
    private router:Router,
    private activedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private compraGeneralService: CompraGeneralService,
    private calibradoService: CalibradoService,
  ) { }
  detalleCompraGeneral:DetalleCompraGeneral = {
    id_cg:0,
    cantidad:0,
    calibre:0,
    precio:0,
    formato:'',
    cantidad_formato:0,
    tipo_producto:0,
  } 
  detalleSalidaCompraGeneral:DetalleSalidaCompraGeneral = {
    id_cg:'',
    calibre:0,
    cantidad:0,
    tipo_fruto:0,
    bins:0,
  }

  getDatosCompra:any = [];
  getDatosCompraEntrada:any = [];
  getDatosCompraSalida:any = [];
  getcalibre:any = [];
  tipo_fruto:any = [];
  kilogramosEntrada:number=0;
  kilogramosSalida:number=0;
  descuentoEntrada:number=0;
  descuentoSalida:number=0;



  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    this.compraGeneralService.getCompra(params.id_cg)
      .subscribe(
        res => {
          console.log(res);
          this.getDatosCompra = res;
        },
        err => console.log(err)
      )

    this.compraGeneralService.getCompraEntrada(params.id_cg)
      .subscribe(
        res => {
          console.log(res);
          this.getDatosCompraEntrada = res;
        },
        err => console.log(err)
      )

    this.compraGeneralService.getCompraSalida(params.id_cg)
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

    this.calibradoService.getTipoFruta().subscribe(
      res => {
        this.tipo_fruto = res;
        console.log(res)
      },
      err => console.error(err)
    );

  }











  InsertCantidadEntrada(_callback){
    this.detalleCompraGeneral.id_cg = this.getDatosCompra.id_cg;
    var localvar1 = this.kilogramosEntrada;
    var localvar2 = this.descuentoEntrada;
    this.detalleCompraGeneral.cantidad = localvar1 - localvar2
    this.detalleCompraGeneral.valor_total = (localvar1 - localvar2) * this.detalleCompraGeneral.precio;
    _callback();
  }
  guardarEntrada(){ 
    this.InsertCantidadEntrada(()=>{
      if(this.detalleCompraGeneral.tipo_producto !=0){
        if(this.detalleCompraGeneral.cantidad !=0){
          if(this.detalleCompraGeneral.calibre !=0){
            if(this.detalleCompraGeneral.precio !=0){
              if(this.detalleCompraGeneral.formato !=''){
                this.compraGeneralService.insertEntradaCompraPaltaChilena(this.detalleCompraGeneral)
                .subscribe(
                  res => {
                    console.log(res);
                    this.detalleCompraGeneral.cantidad = 0;
                    this.detalleCompraGeneral.calibre = 0;
                    this.detalleCompraGeneral.precio = 0;
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
      }else{
        this.toastr.warning("DEBE INGRESAR TIPO DE FRUTO");
      }
    });
  }
  InsertCantidadSalida(_callback){
    this.detalleSalidaCompraGeneral.id_cg = this.getDatosCompra.id_cg;
    var localvar1 = this.kilogramosSalida;
    var localvar2 = this.descuentoSalida;
    this.detalleSalidaCompraGeneral.cantidad = localvar1 - localvar2
    _callback();
  }
  guardarSalida(){


    this.InsertCantidadSalida(()=>{
      if(this.detalleSalidaCompraGeneral.calibre !=0){
        if(this.detalleSalidaCompraGeneral.cantidad !=0){
          if(this.detalleSalidaCompraGeneral.bins !=0){
            this.compraGeneralService.insertSalidaCompraPaltaChilena(this.detalleSalidaCompraGeneral)
            .subscribe(
              res => {
                console.log(res);
                this.detalleSalidaCompraGeneral.cantidad = 0,
                this.detalleSalidaCompraGeneral.bins = 0,
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
  BorrarEntrada(id_cg:string,id_detalle_cg: string){
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
        
      this.compraGeneralService.BorrarEntrada(id_cg,id_detalle_cg)
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
  BorrarSalida(id_cg:string,id_detalle_salida_cg: string){
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
      this.compraGeneralService.BorrarSalida(id_cg,id_detalle_salida_cg)
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
