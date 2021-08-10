import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalibradoService } from 'src/app/services/calibrado.service';
import{ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

//Modelos
import {Ventas} from '../../models/ventas';

@Component({
  selector: 'app-ingreso-venta',
  templateUrl: './ingreso-venta.component.html',
  styleUrls: ['./ingreso-venta.component.css']
})
export class IngresoVentaComponent implements OnInit {

  constructor(private calibradoService: CalibradoService,private router:Router,private activedRoute: ActivatedRoute, private toastr: ToastrService) { }

  ventaUltima:any = [];
  cliente:any = [];
  

  clienteSelected:string = '';

  venta:Ventas = {
    idventa:'',
    id_cliente:'',
    estado_venta:'',
    venta_creacion: new Date,
    venta_fin: new Date
  }

  ngOnInit(): void {
    this.calibradoService.getClientesIngreso().subscribe(
      res => {
        this.cliente = res;
        console.log(res)
        this.clienteSelected;
      },
      err => console.error(err)
    );
    this.calibradoService.getUnaVenta().subscribe(
      res => {
        this.ventaUltima = res;
        console.log(res)
        
      },
      err => console.error(err)
    );
    
    
    


  }

  guardarVenta(){ 

    delete this.venta.idventa;
    delete this.venta.id_cliente;
    delete this.venta.venta_creacion;
    delete this.venta.venta_fin;

    this.Success();

    this.venta.estado_venta = '1';
    
    this.venta.id_cliente = this.clienteSelected;
    
    this.calibradoService.saveVenta(this.venta)
    .subscribe(
      
      res => {
        console.log(res);
        this.ngOnInit();
      },
      err => console.error(err)
    )    
  }

  Success(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cliente seleccionado correctamente!',
      showConfirmButton: false,
      timer: 1500
    })
  }


}
