import { Component, OnInit } from '@angular/core';
import { CalibradoService } from 'src/app/services/calibrado.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import{ToastrService} from 'ngx-toastr';

import {Productos} from '../../models/productos';
import {Impuestos} from '../../models/impuestos';

@Component({
  selector: 'app-ingreso-compra-final',
  templateUrl: './ingreso-compra-final.component.html',
  styleUrls: ['./ingreso-compra-final.component.css']
})
export class IngresoCompraFinalComponent implements OnInit {

  constructor(private calibradoService: CalibradoService,private router:Router,private activedRoute: ActivatedRoute,private toastr: ToastrService) { }

  compraUltima:any = [];
  ProductosObtenidos:any = [];
  tipo_fruta:any = [];

  iAdicional = 0;
  

  
  iva:number[] = [0,19];
  

  frutaSelected: string = '';
  ivaSelected:number = 0;
  totaliva:string = ((this.ProductosSum()*19)/100) + this.ProductosSum()

  productos:Productos = {
    idproducto:0,
    idtipo_fruta:'',
    idcompra:'',
    precio:0,
    cantidad:'',
    lote_bines:'',
    estado_lote:'',
    valortotal:0,
    creacion_lote: new Date
  }
  impuestos:Impuestos = {
    idimpuestos:'',  
    iva_estado: '',
    iva: 0,
    impadicional: '',
    idcompra:''    
    
  }

  
  ngOnInit(): void {
    this.calibradoService.getTipoFruta()
    .subscribe(
      res => {
        console.log('tipos de frutos')
        this.tipo_fruta = res;
        console.log(res)
        this.frutaSelected;
      },
        err => console.error(err)
    );
    const params = this.activedRoute.snapshot.params;

    if(params.idcompra){
      this.calibradoService.getProductos(params.idcompra)
      .subscribe(
        res => {
          console.log(res);
          this.ProductosObtenidos = res;
        },
        err => console.log(err)
      )
    }
    this.calibradoService.getUnaCompra()
      .subscribe(
        res => {
          console.log(res);
          this.compraUltima = res;
        },
        err => console.log(err)
      )

  }

  guardarProducto(idcompra:string){ 
    this.CaputarValor();
    this.productos.estado_lote = '1'; 
    this.productos.valortotal =  this.productos.precio! * parseInt(this.productos.cantidad);
    this.productos.idtipo_fruta = this.frutaSelected;
    delete this.productos.idproducto;
    delete this.productos.creacion_lote;
    this.calibradoService.saveProducto(idcompra,this.productos)
    .subscribe(
      res => {
        console.log(res);
        this.toastr.success("PRODUCTO INGRESADO");
        this.ngOnInit();
      },
      err => console.error(err)
    )
  }

  guardarImpuesto(idcompra:string){     
    this.CaputarValor();
    this.Success();
    this.impuestos.iva = this.ivaSelected;
    this.impuestos.impadicional  = (<HTMLInputElement>document.getElementById('impuesto')).value;
    if(this.ivaSelected == 0){
      this.impuestos.iva_estado = 'Sin IVA'      
    }
    else{
      this.impuestos.iva_estado = 'Con IVA'
    }
    delete this.impuestos.idimpuestos; 
    this.calibradoService.saveImpuesto(idcompra,this.impuestos)
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
      title: 'Compra creada correctamente!',
      showConfirmButton: false,
      timer: 1500
    })
  }
  BorrarProducto(idcompra:string,idproducto: string){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No se podrá recuperar este producto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        
      this.calibradoService.deleteProducto(idcompra,idproducto)
      .subscribe(
        res => {
          console.log(res);          
          this.ngOnInit();
        },
        err => console.error(err)
      )
    
        Swal.fire(
          'Borrado!',
          'El producto seleccionado ha sido borrado.',
          'success'
        )
        
      }
    })
  }
  public ProductosSum(){
    return this.ProductosObtenidos.map(productos => productos.valortotal).reduce((a,b) => a+b, 0);
  }

  CaputarValor(){
    this.toastr.success("test");

    this.productos.idcompra  = (<HTMLInputElement>document.getElementById('tbx1')).value;
    this.impuestos.idcompra  = (<HTMLInputElement>document.getElementById('tbx1')).value; 
  } 

}
