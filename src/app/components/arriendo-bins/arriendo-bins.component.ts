import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArriendoBinsService } from 'src/app/services/arriendo-bins.service';
import{ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

import {Arriendo_Bins} from '../../models/arriendoBins';
import { CalibradoService } from 'src/app/services/calibrado.service';

@Component({
  selector: 'app-arriendo-bins',
  templateUrl: './arriendo-bins.component.html',
  styleUrls: ['./arriendo-bins.component.css']
})
export class ArriendoBinsComponent implements OnInit {

  constructor(private arriendoBinsService: ArriendoBinsService,private router:Router,private activedRoute: ActivatedRoute, private toastr: ToastrService, private calibradoService: CalibradoService) { }




  totalPrecioSelected:any=0;
  clientes:any = [];
  tipo_fruta:any = [];
  tipo_pago:any =[];



  arriendo_bins:Arriendo_Bins = {
    numero_proceso: 0,
    cliente: '',
    precio: 0,
    cantidad: 0,
    tipo_pago: '',
    fecha_inicio: new Date,
    fecha_termino: new Date,
    precio_total: 0

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

    this.suma();

  }

  suma(){
    this.totalPrecioSelected= this.arriendo_bins.precio*this.arriendo_bins.cantidad
    console.log(this.totalPrecioSelected+'esta es la suma')
  }




  guardarProceso(){ 
    this.arriendo_bins.precio_total  = this.arriendo_bins.precio * this.arriendo_bins.cantidad;
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
    this.arriendoBinsService.insertArriendoBins(this.arriendo_bins)
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
