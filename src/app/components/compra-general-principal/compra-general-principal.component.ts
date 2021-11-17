import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompraGeneralService } from 'src/app/services/compra-general.service';
import { CalibradoService } from 'src/app/services/calibrado.service';
import{ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

import {CompraGeneralPrincipal} from '../../models/compraGeneralPrincipal';


@Component({
  selector: 'app-compra-general-principal',
  templateUrl: './compra-general-principal.component.html',
  styleUrls: ['./compra-general-principal.component.css']
})
export class CompraGeneralPrincipalComponent implements OnInit {

  constructor(
    private compraGeneralService: CompraGeneralService,
    private router:Router,
    private activedRoute: ActivatedRoute, 
    private toastr: ToastrService,
    private calibradoService: CalibradoService
  ) { }



//  ##   ##    ##     ######    ####      ##     ######   ####     #######   #####
//  ##   ##   ####     ##  ##    ##      ####     ##  ##   ##       ##   #  ##   ##
//   ## ##   ##  ##    ##  ##    ##     ##  ##    ##  ##   ##       ## #    #
//   ## ##   ##  ##    #####     ##     ##  ##    #####    ##       ####     #####
//    ###    ######    ## ##     ##     ######    ##  ##   ##   #   ## #         ##
//    ###    ##  ##    ##  ##    ##     ##  ##    ##  ##   ##  ##   ##   #  ##   ##
//     #     ##  ##   #### ##   ####    ##  ##   ######   #######  #######   #####

compraGeneralPrincipal:CompraGeneralPrincipal = {
  id_cg: 0,
  fecha_factura: new Date,
  fecha_ingreso: new Date,
  cliente_id: 0,
  tipo_pago: 0,
  numero_factura: 0,
  estado: 0,
  impuestos: 0,
}


clienteSelected:number = 0;
clientes:any = [];
buttonNext = "disable"
resMain:any = {};

tipo_pago:any =[];
pagoSelected:string = '';


// ####    ##   ##   ####    ######
//  ##     ###  ##    ##     # ## #
//  ##     #### ##    ##       ##
//  ##     ## ####    ##       ##
//  ##     ##  ###    ##       ##
//  ##     ##   ##    ##       ##
// ####    ##   ##   ####     ####





  ngOnInit(): void {
    this.calibradoService.getClientesIngreso().subscribe(
      res => {
        this.clientes = res;
        console.log(res)
        this.clienteSelected;
      },
      err => console.error(err)
    );
    this.calibradoService.getTipoPago().subscribe(
      res => {
        this.tipo_pago = res;
        console.log(res)
        this.pagoSelected;
      },
      err => console.error(err)
    );
  }




//  ##   ##  #######  ######    #####   #####     #####    #####
//  ### ###   ##   #  # ## #   ##   ##   ## ##   ##   ##  ##   ##
//  #######   ## #      ##     ##   ##   ##  ##  ##   ##  #
//  #######   ####      ##     ##   ##   ##  ##  ##   ##   #####
//  ## # ##   ## #      ##     ##   ##   ##  ##  ##   ##       ##
//  ##   ##   ##   #    ##     ##   ##   ## ##   ##   ##  ##   ##
//  ##   ##  #######   ####     #####   #####     #####    #####

InsertCpc(){ 
  delete this.compraGeneralPrincipal.id_cg;
  delete this.compraGeneralPrincipal.fecha_ingreso;
  // this.Success();
  this.compraGeneralPrincipal.estado = 1;
  this.compraGeneralPrincipal.cliente_id = this.clienteSelected;
  this.AwaitFunction();
  this.compraGeneralService.insertCompraGeneral(this.compraGeneralPrincipal)
  .subscribe(
    res => {
        this.resMain=res;
        this.ngOnInit();
        this.Success();
    },
    err => console.error(err)
  )    
}

Success(){
  Swal.fire({
    //position: 'top-end',
    icon: 'success',
    title: 'Compra Ingresada Exitosamente',
    html: 'Estamos Redireccionando.',
    showConfirmButton: false,
    timer: 2000,
  }).then((result) => {
    /* Read more about handling dismissals below */
    window.location.replace("/cpc/ingreso-final/"+this.resMain.insertId);
  })
}

AwaitFunction(){
  let timerInterval
  Swal.fire({
    title: 'Espere un Momento.',
    html: 'Se Está Ingresando la Compra.',
    //timer: 8000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
}












}
