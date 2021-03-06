import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioCamionesService } from 'src/app/services/servicio-camiones.service';
import{ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

import {Servicio_Camiones} from '../../models/servicioCamiones';
import { CalibradoService } from 'src/app/services/calibrado.service';

@Component({
  selector: 'app-servicio-camiones',
  templateUrl: './servicio-camiones.component.html',
  styleUrls: ['./servicio-camiones.component.css']
})
export class ServicioCamionesComponent implements OnInit {


  @HostBinding('class') classes ='row';  



  constructor(private servicioCamionesService: ServicioCamionesService, private router:Router, private activedRoute: ActivatedRoute, private toastr: ToastrService, private calibradoService: CalibradoService) { }



  totalPrecioSelected:any=0;
  clientes:any = [];

  servicio_Camiones:Servicio_Camiones = {

    origen:'',//
    destino:'',//
    formato:'',//
    cantidad:0,//
    cliente:'',//
    numero_guia:0,
    chofer:'',
    valor_neto:0,
    iva:0,
    total:0,
    report:'',
    fecha_guia: new Date

  }  



  ngOnInit(): void {
    
    this.calibradoService.getClientesIngreso().subscribe(
      res => {
        this.clientes = res;
        console.log(res)
      },
      err => console.error(err)
    );
    
  }



  suma(){
    this.totalPrecioSelected= this.servicio_Camiones.valor_neto*(((this.servicio_Camiones.iva)/19)+1)
    console.log(this.totalPrecioSelected+'esta es la suma')
  }





  guardarProceso(){ 
    this.servicio_Camiones.total  = this.servicio_Camiones.valor_neto * (((this.servicio_Camiones.iva)/100)+1);



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



    this.servicioCamionesService.insertServicioCamiones(this.servicio_Camiones)
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
