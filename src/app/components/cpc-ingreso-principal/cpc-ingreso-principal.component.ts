import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaltaChilenaService } from 'src/app/services/palta-chilena.service';
import { CalibradoService } from 'src/app/services/calibrado.service';
import{ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

import {CpcPrincipal} from '../../models/cpcPrincipal';




@Component({
  selector: 'app-cpc-ingreso-principal',
  templateUrl: './cpc-ingreso-principal.component.html',
  styleUrls: ['./cpc-ingreso-principal.component.css']
})



export class CpcIngresoPrincipalComponent implements OnInit {

  @HostBinding('class') classes ='row';

//    ####    #####   ##   ##   #####   ######   ######   ##   ##    ####   ######    #####   ######
//   ##  ##  ##   ##  ###  ##  ##   ##  # ## #    ##  ##  ##   ##   ##  ##  # ## #   ##   ##   ##  ##
//  ##       ##   ##  #### ##  #          ##      ##  ##  ##   ##  ##         ##     ##   ##   ##  ##
//  ##       ##   ##  ## ####   #####     ##      #####   ##   ##  ##         ##     ##   ##   #####
//  ##       ##   ##  ##  ###       ##    ##      ## ##   ##   ##  ##         ##     ##   ##   ## ##
//   ##  ##  ##   ##  ##   ##  ##   ##    ##      ##  ##  ##   ##   ##  ##    ##     ##   ##   ##  ##
//    ####    #####   ##   ##   #####    ####    #### ##   #####     ####    ####     #####   #### ##

  constructor(
    private paltaChilenaService: PaltaChilenaService,
    private router:Router,
    private activedRoute: ActivatedRoute, 
    private toastr: ToastrService,
    private calibradoService: CalibradoService) { }

//  ##   ##    ##     ######    ####      ##     ######   ####     #######   #####
//  ##   ##   ####     ##  ##    ##      ####     ##  ##   ##       ##   #  ##   ##
//   ## ##   ##  ##    ##  ##    ##     ##  ##    ##  ##   ##       ## #    #
//   ## ##   ##  ##    #####     ##     ##  ##    #####    ##       ####     #####
//    ###    ######    ## ##     ##     ######    ##  ##   ##   #   ## #         ##
//    ###    ##  ##    ##  ##    ##     ##  ##    ##  ##   ##  ##   ##   #  ##   ##
//     #     ##  ##   #### ##   ####    ##  ##   ######   #######  #######   #####

    cpcPrincipal:CpcPrincipal = {
      id_cpc: 0,
      cliente_id: 0,
      fecha_ingreso: new Date,
      estado:'',
      impuesto:0,
    }


    clienteSelected:number = 0;
    clientes:any = [];
    buttonNext = "disable"
    resMain:any = {};


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
  }

//  ##   ##  #######  ######    #####   #####     #####    #####
//  ### ###   ##   #  # ## #   ##   ##   ## ##   ##   ##  ##   ##
//  #######   ## #      ##     ##   ##   ##  ##  ##   ##  #
//  #######   ####      ##     ##   ##   ##  ##  ##   ##   #####
//  ## # ##   ## #      ##     ##   ##   ##  ##  ##   ##       ##
//  ##   ##   ##   #    ##     ##   ##   ## ##   ##   ##  ##   ##
//  ##   ##  #######   ####     #####   #####     #####    #####

  InsertCpc(){ 
    delete this.cpcPrincipal.id_cpc;
    delete this.cpcPrincipal.fecha_ingreso;
    // this.Success();
    this.cpcPrincipal.estado = '1';
    this.cpcPrincipal.cliente_id = this.clienteSelected;
    this.AwaitFunction();
    this.paltaChilenaService.insertServicioCamiones(this.cpcPrincipal)
    .subscribe(
      res => {
        console.log(res);
        console.log(this.resMain.insertId,"dsadsadsa")
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
      console.log(this.resMain.insertId,"EL ID INGRESADO ES");
      console.log("hola")
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
