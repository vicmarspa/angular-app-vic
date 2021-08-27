import { Component, OnInit, HostBinding  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioGruasService } from 'src/app/services/servicio-gruas.service';
import{ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

import {Servicio_Gruas} from '../../models/servicio_gruas';
import { CalibradoService } from 'src/app/services/calibrado.service';

@Component({
  selector: 'app-servicio-gruas',
  templateUrl: './servicio-gruas.component.html',
  styleUrls: ['./servicio-gruas.component.css']
})
export class ServicioGruasComponent implements OnInit {

  @HostBinding('class') classes ='row';  



  constructor(private servicioGruasService: ServicioGruasService, private router:Router, private activedRoute: ActivatedRoute, private toastr: ToastrService, private calibradoService: CalibradoService) { }


  totalPrecioSelected:any=0;
  clientes:any = [];
  tipo_fruta:any = [];
  tipo_pago:any =[];

  servicio_Gruas:Servicio_Gruas = {
    numero_proceso: 0,
    cliente: '',
    precio: 0,
    cantidad: 0,
    tipo_pago: '',
    precio_total: 0,
    tipo_fruta: ''

  }  

  ngOnInit(): void {
    this.calibradoService.getClientesIngreso().subscribe(
      res => {
        this.clientes = res;
        console.log(res)
      },
      err => console.error(err)
    );

    this.calibradoService.getTipoPago().subscribe(
      res => {
        this.tipo_pago = res;
        console.log(res)
      },
      err => console.error(err)
    );

    this.calibradoService.getTipoFruta().subscribe(
      res => {
        this.tipo_fruta = res;
        console.log(res)
      },
      err => console.error(err)
    );

    this.suma();
  }







  suma(){
    this.totalPrecioSelected= this.servicio_Gruas.precio*this.servicio_Gruas.cantidad
    console.log(this.totalPrecioSelected+'esta es la suma')
  }




  guardarProceso(){ 
    this.servicio_Gruas.precio_total  = this.servicio_Gruas.precio * this.servicio_Gruas.cantidad;
    Swal.fire({
      title: 'Estás Seguro',
      text: "Desea Ingresar Este Servicio de Cámaras",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {   
    this.servicioGruasService.insertServicioGruas(this.servicio_Gruas)
    .subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      err => console.error(err)
    )
    Swal.fire(
      'Servicio Ingresado',
      'Se Ha Ingresado Correctamente',
      'success'
    )
  }
})
    
  }








}
