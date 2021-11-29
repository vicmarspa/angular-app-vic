import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompraGeneralService } from 'src/app/services/compra-general.service';
import { CalibradoService } from 'src/app/services/calibrado.service';
import{ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

import {VentaGeneral} from '../../models/ventaGeneralPrincipal';


@Component({
  selector: 'app-venta-general-principal',
  templateUrl: './venta-general-principal.component.html',
  styleUrls: ['./venta-general-principal.component.css']
})
export class VentaGeneralPrincipalComponent implements OnInit {

  constructor(
    private compraGeneralService: CompraGeneralService,
    private router:Router,
    private activedRoute: ActivatedRoute, 
    private toastr: ToastrService,
    private calibradoService: CalibradoService
  ) { }


  ventaGeneral:VentaGeneral = {
    id_venta_general: '',
    cliente_id: 0,
    fecha_ingreso: new Date,
    tipo_pago:0,
    estado:0,
  }

  clienteSelected:number = 0;
  clientes:any = [];
  buttonNext = "disable"
  resMain:any = {};


  pagoSelected:number = 0;
  tipo_pago:any =[];

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




  InsertCpc(){ 
    delete this.ventaGeneral.id_venta_general;
    delete this.ventaGeneral.fecha_ingreso;
    
    this.ventaGeneral.estado = 1;
    this.ventaGeneral.cliente_id = this.clienteSelected;
    this.ventaGeneral.tipo_pago = this.pagoSelected;

    this.AwaitFunction();
    this.compraGeneralService.insertVentaGeneralPrincipal(this.ventaGeneral)
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
      window.location.replace("/venta-general/ingreso-final/"+this.resMain.insertId);
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
