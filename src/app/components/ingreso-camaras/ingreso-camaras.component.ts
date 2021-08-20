import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngresoCamarasService } from 'src/app/services/ingreso-camaras.service';
import{ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

import {Proceso_Camaras} from '../../models/proceso_camaras';
import { CalibradoService } from 'src/app/services/calibrado.service';

@Component({
  selector: 'app-ingreso-camaras',
  templateUrl: './ingreso-camaras.component.html',
  styleUrls: ['./ingreso-camaras.component.css']
})
export class IngresoCamarasComponent implements OnInit {

  @HostBinding('class') classes ='row';  



  constructor(private ingresoCamarasService: IngresoCamarasService,private router:Router,private activedRoute: ActivatedRoute, private toastr: ToastrService, private calibradoService: CalibradoService) { }


  totalPrecioSelected:any=0;
  clientes:any = [];
  tipo_fruta:any = [];
  tipo_pago:any =[];



  proceso_Camaras:Proceso_Camaras = {
    numero_proceso: 0,
    cliente: '',
    precio: 0,
    formato: '',
    cantidad: 0,
    tipo_pago: '',
    fecha_inicio: new Date,
    fecha_termino: new Date,
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
    this.totalPrecioSelected= this.proceso_Camaras.precio*this.proceso_Camaras.cantidad
    console.log(this.totalPrecioSelected+'esta es la suma')
  }




  guardarProceso(){ 
    this.proceso_Camaras.precio_total  = this.proceso_Camaras.precio * this.proceso_Camaras.cantidad;
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
    this.ingresoCamarasService.insertProcesoCamaras(this.proceso_Camaras)
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
