import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalibradoService } from 'src/app/services/calibrado.service';
import{ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

//Modelos
import {Compras} from '../../models/compras';


@Component({
  selector: 'app-ingreso-compra',
  templateUrl: './ingreso-compra.component.html',
  styleUrls: ['./ingreso-compra.component.css']
})
export class IngresoCompraComponent implements OnInit {

  constructor(private calibradoService: CalibradoService,private router:Router,private activedRoute: ActivatedRoute, private toastr: ToastrService) { }

  clientes:any = [];
  compraUltima:any = [];
  clienteSelected:string = '';

  

  compra:Compras = {
    idcompra:'',
    id_cliente:'',
    estado_compra:'',
    compra_inicio:new Date,
    compra_fin:new Date
  } 

  ngOnInit(): void {

    this.calibradoService.getClientesIngreso().subscribe(
      res => {
        this.clientes = res;
        console.log(res)
        this.clienteSelected;
      },
      err => console.error(err)
    );

    this.calibradoService.getUnaCompra()
      .subscribe(
        res => {
          console.log(res);
          this.compraUltima = res;
        },
        err => console.log(err)
      )
  }

  guardarCompra(){ 

    delete this.compra.idcompra;
    delete this.compra.id_cliente;
    delete this.compra.compra_inicio;
    delete this.compra.compra_fin;

    this.Success();

    this.compra.estado_compra = '1';
    
    this.compra.id_cliente = this.clienteSelected;
    
    this.calibradoService.saveCompra(this.compra)
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
