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
    id_cg:0,
    calibre:0,
    cantidad:0,
    tipo_fruto:0,
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

  }





  
}
