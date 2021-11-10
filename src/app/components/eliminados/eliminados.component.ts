import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CalibradoService } from 'src/app/services/calibrado.service';

//Modelos
import { Calibrado } from '../../models/calibrado';
import {Calibre} from '../../models/calibre';
import { Tipo_Fruta } from '../../models/tipo_fruta';
import { Tipo_Pago } from '../../models/tipo_pago';
import { Clientes } from '../../models/clientes';
import { Compras } from '../../models/compras';
import { Ventas } from '../../models/ventas';
import {CpcPrincipal} from '../../models/cpcPrincipal';
import { PaltaChilenaService } from 'src/app/services/palta-chilena.service';
import {VpcPrincipal} from '../../models/vpcPrincipal';


@Component({
  selector: 'app-eliminados',
  templateUrl: './eliminados.component.html',
  styleUrls: ['./eliminados.component.css']
})
export class EliminadosComponent implements OnInit {

  constructor(
    public calibradoService: CalibradoService,
    private paltaChilenaService: PaltaChilenaService) { }

  calibrado:any = [];
  calibre:any = [];
  fruta:any = [];
  pago:any = [];
  clientes:any = [];
  compras:any = [];
  ventas:any= [];
  products:any = [];
  compraPaltaChilena:any = [];
  compraPaltaChilenaMaxRegister:any = [];

  ventaPaltaChilena:any = [];
  ventaPaltaChilenaMaxRegister:any = [];

  tipoSelected:string ='';

  Eliminados:any =[];

  calibrado1:Calibrado = {
    numero_proceso:'',  
    id_cliente:'',
    valor_servicio:0,
    idtipo_pago:'',
    idtipo_fruta:'',
    fecha_ingreso:new Date,
    fecha_proceso:new Date,
    estado:''
  }
  calibre1:Calibre = {
    idcalibre:"",
    calibre:"",
    calibre_fin:new Date,
    estado_calibre:""
  }
  fruta1:Tipo_Fruta = {
    idtipo_fruta:"",
    tipo_fruta:"",
    fruta_fin:new Date,
    estado_fruta:""
  }
  pago1:Tipo_Pago = {
    idtipo_pago:"",
    tipo_pago:"",
    pago_fin:new Date,
    estado_pago:""
  }
  cliente1:Clientes = {
    id_cliente:"",
    nombre:"",
    correo:"",
    telefono:"",
    direccion:"",
    fecha_ingreso:new Date,
    fecha_fin:new Date,
    estado_cliente:""

  }
  compra:Compras = {
    idcompra:'',
    id_cliente:'',
    estado_compra:'',
    compra_inicio:new Date,
    compra_fin:new Date
  } 

  venta:Ventas = {
    idventa:'',
    id_cliente:'',
    estado_venta:'',
    venta_creacion:new Date,
    venta_fin:new Date
  }

  cpcPrincipal:CpcPrincipal = {
    id_cpc: 0,
    cliente_id: 0,
    fecha_ingreso: new Date,
    estado:'',
    impuesto:0,
  }

  vpcPrincipal:VpcPrincipal = {
    id_vpc: 0,
    cliente_id: 0,
    fecha_ingreso: new Date,
    estado:0,
  }


  tbx1?:string='';

  ngOnInit(): void {
    this.Eliminados = [
      {Tipo:'Procesos'},
      {Tipo:'Compras'},
      {Tipo:'Ventas'},
      {Tipo:'Calibre'},
      {Tipo:'Fruta'},
      {Tipo:'Pago'},
      {Tipo:'Clientes'},
      {Tipo:'Productos'},
      {Tipo:'Compra Palta Chilena'},
      {Tipo:'Venta Palta Chilena'}           
    ]

    this.calibradoService.getCalibradosEliminados()
      .subscribe(
        res => {
          this.calibrado = res;
          console.log(res);
        },
        err => console.error(err)
      );

    this.calibradoService.getCalibreEliminados()
      .subscribe(
        res => {
          this.calibre = res;
          console.log(res);
        },
        err => console.error(err)
      );

    this.calibradoService.getFrutaEliminados()
      .subscribe(
        res => {
          this.fruta = res;
          console.log(res);
        },
        err => console.error(err)
      );

    this.calibradoService.getPagoEliminados()
      .subscribe(
        res => {
          this.pago = res;
          console.log(res);
        },
        err => console.error(err)
      );

    this.calibradoService.getClientesEliminados()
      .subscribe(
        res => {
          this.clientes = res;
          console.log(res);
        },
        err => console.error(err)
      );
      this.calibradoService.getComprasEliminadas()
      .subscribe(
        res => {
          this.compras = res;
          console.log(res);
        },
        err => console.error(err)
      );

      this.calibradoService.getVentasEliminadas()
      .subscribe(
        res => {
          this.ventas = res;
          console.log(res);
        },
        err => console.error(err)
      );
      this.calibradoService.getproductosEliminados()
      .subscribe(
        res => {
          this.products = res;
          console.log(res);
        },
        err => console.error(err)
      );
      this.calibradoService.getCompraPaltaChilenaEliminados()
      .subscribe(
        res => {
          this.compraPaltaChilena = res;
          console.log(res);
        },
        err => console.error(err)
      );
      this.calibradoService.getVentaPaltaChilenaEliminados()
      .subscribe(
        res => {
          this.ventaPaltaChilena = res;
          console.log(res);
        },
        err => console.error(err)
      );

  }

  RestaurarCalibradoPapelera(numero_proceso:string) {
    Swal.fire({
    title: 'Estas seguro(a)?',
    text: "El proceso será restaurado!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, restauralo!'
  }).then((result) => {
    if (result.isConfirmed) {
      delete this.calibrado1.numero_proceso;
      delete this.calibrado1.fecha_ingreso;
      delete this.calibrado1.fecha_proceso;
      delete this.calibrado1.idtipo_fruta;
      delete this.calibrado1.idtipo_pago;
      delete this.calibrado1.id_cliente;

      this.calibrado1.estado = this.tbx1 = (<HTMLInputElement>document.getElementById('restaurado')).value
      
      this.calibradoService.RestaurarCalibradoPapelera(numero_proceso,this.calibrado1)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Restaurado!',
      'El proceso seleccionado ha sido restaurado.',
      'success'
      )
          
      }
    })
  }

  RestaurarCalibrePapelera(idcalibre:string) {
    Swal.fire({
    title: 'Estas seguro(a)?',
    text: "El proceso será restaurado!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, restauralo!'
  }).then((result) => {
    if (result.isConfirmed) {
      delete this.calibre1.idcalibre;
      delete this.calibre1.calibre_fin;
      delete this.calibre1.calibre;      

      this.calibre1.estado_calibre = this.tbx1 = (<HTMLInputElement>document.getElementById('restaurado')).value
      
      this.calibradoService.RestaurarCalibrePapelera(idcalibre,this.calibre1)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Restaurado!',
      'El calibre seleccionado ha sido restaurado.',
      'success'
      )
          
      }
    })
  }

  RestaurarFrutaPapelera(idtipo_fruta:string) {
    Swal.fire({
    title: 'Estas seguro(a)?',
    text: "La fruta será restaurada!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, restaurala!'
  }).then((result) => {
    if (result.isConfirmed) {
      delete this.fruta1.idtipo_fruta;
      delete this.fruta1.fruta_fin;
      delete this.fruta1.tipo_fruta;      

      this.fruta1.estado_fruta = this.tbx1 = (<HTMLInputElement>document.getElementById('restaurado')).value
      
      this.calibradoService.RestaurarFrutaPapelera(idtipo_fruta,this.fruta1)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Restaurado!',
      'La fruta seleccionada ha sido restaurada.',
      'success'
      )
          
      }
    })
  }

  RestaurarPagoPapelera(idtipo_pago:string) {
    Swal.fire({
    title: 'Estas seguro(a)?',
    text: "El pago será restaurado!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, restauralo!'
  }).then((result) => {
    if (result.isConfirmed) {
      delete this.pago1.idtipo_pago;
      delete this.pago1.pago_fin;
      delete this.pago1.tipo_pago;      

      this.pago1.estado_pago = this.tbx1 = (<HTMLInputElement>document.getElementById('restaurado')).value
      
      this.calibradoService.RestaurarPagoPapelera(idtipo_pago,this.pago1)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Restaurado!',
      'El pago seleccionado ha sido restaurado.',
      'success'
      )
          
      }
    })
  }

  deleteCalibrado(numero_proceso:string) {
    Swal.fire({
      title: 'Estas seguro(a)?',
      text: "No se podrá recuperar el proceso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
          this.calibradoService.deleteCalibrado(numero_proceso)
        .subscribe(
          res => {
            console.log(res);
            this.ngOnInit();
            
          },
          err => console.error(err)
        )
        Swal.fire(
          'Borrado!',
          'El proceso seleccionado ha sido borrado.',
          'success'
        )
        
      }
    })
  }

  deleteVenta(idventa:string) {
    Swal.fire({
      title: 'Estas seguro(a)?',
      text: "No se podrá recuperar la venta!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrala!'
    }).then((result) => {
      if (result.isConfirmed) {
          this.calibradoService.deleteVenta(idventa)
        .subscribe(
          res => {
            console.log(res);
            this.ngOnInit();
            
          },
          err => console.error(err)
        )
        Swal.fire(
          'Borrada!',
          'La venta seleccionada ha sido borrada.',
          'success'
        )
        
      }
    })
  }

  deleteCompra(idcompra:string) {
    Swal.fire({
      title: 'Estas seguro(a)?',
      text: "No se podrá recuperar la compra!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrala!'
    }).then((result) => {
      if (result.isConfirmed) {
          this.calibradoService.deleteCompra(idcompra)
        .subscribe(
          res => {
            console.log(res);
            this.ngOnInit();
            
          },
          err => console.error(err)
        )
        Swal.fire(
          'Borrado!',
          'La compra seleccionada ha sido borrada.',
          'success'
        )
        
      }
    })
  }

  RestaurarClientesPapelera(id_cliente:string) {
    Swal.fire({
    title: 'Estas seguro(a)?',
    text: "El pago será restaurado!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, restauralo!'
  }).then((result) => {
    if (result.isConfirmed) {
      delete this.cliente1.nombre;
      delete this.cliente1.correo;
      delete this.cliente1.direccion;
      delete this.cliente1.telefono;
      delete this.cliente1.id_cliente;     
      delete this.cliente1.fecha_ingreso;
      delete this.cliente1.fecha_fin;      

      this.cliente1.estado_cliente = this.tbx1 = (<HTMLInputElement>document.getElementById('restaurado')).value
      
      this.calibradoService.RestaurarClientePapelera(id_cliente,this.cliente1)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Restaurado!',
      'El cliente seleccionado ha sido restaurado.',
      'success'
      )
          
      }
    })
  }

  RestaurarComprasPapelera(idcompra:string) {
    Swal.fire({
    title: 'Estas seguro(a)?',
    text: "La compra será restaurada!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, restaurala!'
  }).then((result) => {
    if (result.isConfirmed) {
      delete this.compra.idcompra;
    delete this.compra.id_cliente;
    delete this.compra.compra_inicio;
    delete this.compra.compra_fin;     

      this.compra.estado_compra = this.tbx1 = (<HTMLInputElement>document.getElementById('restaurado')).value
      
      this.calibradoService.RestaurarComprasPapelera(idcompra,this.compra)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Restaurada!',
      'La compra seleccionada ha sido restaurada.',
      'success'
      )
          
      }
    })
  }

  RestaurarVentasPapelera(idventa:string) {
    Swal.fire({
    title: 'Estas seguro(a)?',
    text: "La compra será restaurada!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, restaurala!'
  }).then((result) => {
    if (result.isConfirmed) {
    delete this.venta.idventa;
    delete this.venta.id_cliente;
    delete this.venta.venta_creacion;
    delete this.venta.venta_fin;     

      this.venta.estado_venta = this.tbx1 = (<HTMLInputElement>document.getElementById('restaurado')).value
      
      this.calibradoService.RestaurarVentasPapelera(idventa,this.venta)
        .subscribe(
          res => {
            console.log(res); 
            this.ngOnInit();          
          },
          err => console.error(err)
        )
    Swal.fire(
      'Restaurada!',
      'La venta seleccionada ha sido restaurada.',
      'success'
      )
          
      }
    })
  }


  obtenerMaximoRegistroCompraPaltaChilena(_callBackCompraPaltaChilena){

    this.paltaChilenaService.getMaxRegisterCompraPaltaChilena()
    .subscribe(
      res => {
        this.compraPaltaChilenaMaxRegister = res;
        console.log(res);
        _callBackCompraPaltaChilena();
      },
      err => console.error(err)
    );

  }



  deleteCompraPaltaChilena(id_cpc:string) {
    this.obtenerMaximoRegistroCompraPaltaChilena(()=>{
      if(this.compraPaltaChilenaMaxRegister[0].id_cpc == id_cpc){
        Swal.fire({
          title: 'Estas seguro(a)?',
          text: "No se podrá recuperar la compra!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borrala!'  
        }).then((result) => {
          if (result.isConfirmed) {

            this.actualizarIdBase(id_cpc);

            Swal.fire(
              'Borrado!',
              'La compra seleccionada ha sido borrada.',
              'success'
            )
          }
        })
      }else(
        Swal.fire(
          'No es posible borrar esta compra',
          'Solo puedes borrar la ultima compra realizada',
          'error'
        )
      )
    });
  }


  borrarCompraPaltaChilena(_callBackBorrarCompraPaltaChilena, id_cpc){  
    this.paltaChilenaService.deleteCompraPaltaChilena(id_cpc)
    .subscribe(
      res => {
        console.log(res);
        _callBackBorrarCompraPaltaChilena();
      },
      err => console.error(err)
    )
  }


  actualizarIdBase(id_cpc:string){
    this.borrarCompraPaltaChilena(()=>{
      this.paltaChilenaService.deleteCompraPaltaChilena2(id_cpc, this.cpcPrincipal)
      .subscribe(
        res => {
          console.log(res);
          location.reload();
        },
        err => console.error(err)
      )
    },id_cpc);
  }

  updateStatusBuyDelete2(id_cpc:number){
    Swal.fire({
      title: '¿Estás Seguro?',
      text: "¿Desea Restablecer Esta Compra?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {   
    this.cpcPrincipal.id_cpc= id_cpc;
    this.cpcPrincipal.estado = '1';
    this.paltaChilenaService.changeBuyStatusDelete2(this.cpcPrincipal)
    .subscribe(
      res => {
        location.reload()
      },
      err => console.error(err)
    );
    Swal.fire(
      'Compra Restablecida',
      'Se Ha Restablecido La Compra',
      'success'
        )
      }
    })
  }











  obtenerMaximoRegistroVentaPaltaChilena(_callBackVentaPaltaChilena){

    this.paltaChilenaService.getMaxRegisterVentaPaltaChilena()
    .subscribe(
      res => {
        this.ventaPaltaChilenaMaxRegister = res;
        console.log(res);
        _callBackVentaPaltaChilena();
      },
      err => console.error(err)
    );

  }



  deleteVentaPaltaChilena(id_vpc:string) {
    this.obtenerMaximoRegistroVentaPaltaChilena(()=>{
      if(this.ventaPaltaChilenaMaxRegister[0].id_vpc == id_vpc){
        Swal.fire({
          title: 'Estas seguro(a)?',
          text: "No se podrá recuperar la venta!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borrala!'  
        }).then((result) => {
          if (result.isConfirmed) {

            this.actualizarIdBase2(id_vpc);

            Swal.fire(
              'Borrado!',
              'La venta seleccionada ha sido borrada.',
              'success'
            )
          }
        })
      }else(
        Swal.fire(
          'No es posible borrar esta venta',
          'Solo puedes borrar la ultima venta realizada',
          'error'
        )
      )
    });
  }


  borrarVentaPaltaChilena2(_callBackBorrarVentaPaltaChilena, id_vpc){  
    this.paltaChilenaService.deleteVentaPaltaChilena(id_vpc)
    .subscribe(
      res => {
        console.log(res);
        _callBackBorrarVentaPaltaChilena();
      },
      err => console.error(err)
    )
  }


  actualizarIdBase2(id_vpc:string){
    this.borrarVentaPaltaChilena2(()=>{
      this.paltaChilenaService.deleteVentaPaltaChilena2(id_vpc, this.vpcPrincipal)
      .subscribe(
        res => {
          console.log(res);
          location.reload();
        },
        err => console.error(err)
      )
    },id_vpc);
  }

  updateStatusSellDelete2(id_vpc:number){
    console.log("se encuentra aqui la funcion");
    Swal.fire({
      title: '¿Estás Seguro?',
      text: "¿Desea Restablecer Esta Venta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {   
    this.vpcPrincipal.id_vpc= id_vpc;
    this.vpcPrincipal.estado = 1;
    this.paltaChilenaService.changeSellStatusDelete2(this.vpcPrincipal)
    .subscribe(
      res => {
        location.reload()
      },
      err => console.error(err)
    );
    Swal.fire(
      'Venta Restablecida',
      'Se Ha Restablecido La Venta',
      'success'
        )
      }
    })
  }






  


}
