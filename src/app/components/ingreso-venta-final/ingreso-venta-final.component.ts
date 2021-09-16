import { Component, OnInit } from '@angular/core';
import { CalibradoService } from 'src/app/services/calibrado.service';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import{ToastrService} from 'ngx-toastr';

import {ProductoxVenta} from '../../models/productoxventa';
import {Impuestos} from '../../models/impuestos';
import {Productos} from '../../models/productos';

@Component({
  selector: 'app-ingreso-venta-final',
  templateUrl: './ingreso-venta-final.component.html',
  styleUrls: ['./ingreso-venta-final.component.css']
})
export class IngresoVentaFinalComponent implements OnInit {

  constructor(private calibradoService: CalibradoService,private router:Router,private activedRoute: ActivatedRoute,private toastr: ToastrService) { }

  products:any = [];
  unaVenta:any = [];
  compras:any = [];
  prodxventa1:any = [];
  resta:string = '';
  restafinal:number = 0;

  restarcantidad:number = 0;
  totalresta:number = 0;

   
      

  compraSelected = 0;
  productoSelected = 0;
  frutaSelected =0;

  prodxventa:ProductoxVenta = {
    idproductosxventa:'',
    idventa:'',
    idproducto:0,
    cantidad_producto:0,
    precio_prodxventa:0,
    valortotal_prodxventa:0,
    calibre:0,
    cantidad_bins:0
  }

  
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

  getcalibre:any = [];

  

  ngOnInit(): void {

    const params = this.activedRoute.snapshot.params;

    if(params.idventa){
      this.calibradoService.getProdxVenta(params.idventa)
      .subscribe(
        res => {
          this.prodxventa1 = res;                             
          console.log(res);
        },
        err => console.error(err)
      );
    }
    
    this.calibradoService.getProductosGeneral()
      .subscribe(
        res => {
          this.products = res;                             
          console.log(res);
        },
        err => console.error(err)
      );

      this.calibradoService.getUnaVenta()
      .subscribe(
        res => {
          this.unaVenta = res;                           
          console.log(res);
        },
        err => console.error(err)
      );

      this.calibradoService.getCompras()
      .subscribe(
        res => {
          this.compras = res;  
          this.compraSelected;
                           
          console.log(res);
        },
        err => console.error(err)
      );
      
      this.calibradoService.getCalibre()
      .subscribe(
        res => {
          console.log(res);
          this.getcalibre = res;
        },
        err => console.log(err)
      )

  }

  onSelectCompra(idcompra: number) {
    this.compraSelected = idcompra;
    this.productoSelected = 0;    
    this.products = this.products.filter((item) => {
    return item.idcompra === Number(idcompra)
    });
    if(this.compraSelected == 0){
      this.ngOnInit();
    }
    
    }
    onSelectProducto(idproducto: number) {
      this.productoSelected = idproducto;
      this.frutaSelected = 0;          
      this.products = this.products.filter((item) => {
      return item.idproducto === Number(idproducto)
      });    
      const found = this.products.find(element => element.idproducto == this.productoSelected); 
      console.log(found) 
      this.restarcantidad = found.cantidad;
      console.log(this.restarcantidad);
      this.totalresta = found.cantidad - this.prodxventa.cantidad_producto;
      
     
      
      
    }

    
    guardarProductoxVenta(){ 

      delete this.productos.idtipo_fruta;
      delete this.productos.precio;
      delete this.productos.lote_bines;
      delete this.productos.estado_lote;
      delete this.productos.creacion_lote;
      delete this.productos.idcompra;
      delete this.productos.valortotal;      

      this.productos.cantidad = (<HTMLInputElement>document.getElementById('resta')).value;
      this.productos.idproducto = this.productoSelected;
      

      delete this.prodxventa.idproductosxventa;   
      
      this.prodxventa.idventa = this.unaVenta.idventa;
      this.prodxventa.idproducto = this.productoSelected;
      this.prodxventa.valortotal_prodxventa =  this.prodxventa.precio_prodxventa! * this.prodxventa.cantidad_producto;
      
      

      if(this.productos.cantidad < "0" || (<HTMLInputElement>document.getElementById('cantidad')).value == "0") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No existe esa cantidad en el inventario!',
          
        })
      }
      else{
        this.toastr.success("PRODUCTO INGRESADO");
        this.calibradoService.updateProducto(this.productoSelected,this.productos)
        .subscribe(
          res => {
            console.log(res); 
            
            this.ngOnInit();          
          },
          err => console.error(err)
        )
        this.calibradoService.saveProdxVenta(this.prodxventa)
      .subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
          
        },
        err => console.error(err)
      )
      }      
      
    }
    BorrarProdRestantes(idventa:string){
      this.calibradoService.deleteProductosVenta(idventa,this.products)
        .subscribe(
          res => {
            console.log(res); 
            
            this.ngOnInit();          
          },
          err => console.error(err)
        )
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La venta ha sido guardada correctamente!',
          showConfirmButton: false,
          timer: 1500
        })
    }
    CancelarVenta(idventa:string,idproductosxventa:string,idproducto:string){
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
          this.calibradoService.CancelarVenta(idventa,idproductosxventa,idproducto,this.products)
        .subscribe(
          res => {
            console.log(res); 
            
            this.ngOnInit();          
          },
          err => console.error(err)
        )   
        
      
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La cantidad ingresada del producto ha sido devuelta!',
          showConfirmButton: false,
          timer: 2000
        })
          this.calibradoService.deleteProductoxVenta(idventa,idproductosxventa)
        .subscribe(
          res => {
            console.log(res); 
            
            this.ngOnInit();          
          },
          err => console.error(err)
        )
          
        }
      })       
    }
    public ProductosSum(){
      return this.prodxventa1.map(productos => productos.valortotal_prodxventa).reduce((a,b) => a+b, 0);
    }

    
    
     

}
