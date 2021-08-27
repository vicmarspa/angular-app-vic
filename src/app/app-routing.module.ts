import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IngresoComponent} from './components/ingreso/ingreso.component';
import {IngresoFinalComponent} from './components/ingreso-final/ingreso-final.component';
import {BusquedaComponent} from './components/busqueda/busqueda.component';
import { VerProcesoComponent } from './components/ver-proceso/ver-proceso.component';
import { BusquedaFrutaComponent } from './components/busqueda-fruta/busqueda-fruta.component';
import { IngresoFrutaComponent } from './components/ingreso-fruta/ingreso-fruta.component';
import { BusquedaPagoComponent } from './components/busqueda-pago/busqueda-pago.component';
import { IngresoPagoComponent } from './components/ingreso-pago/ingreso-pago.component';
import { BusquedaCalibreComponent } from './components/busqueda-calibre/busqueda-calibre.component';
import { IngresoCalibreComponent } from './components/ingreso-calibre/ingreso-calibre.component';
import { EliminadosComponent } from './components/eliminados/eliminados.component';
import { ContinuarProcesoComponent } from './components/continuar-proceso/continuar-proceso.component';
import { EditarProcesoComponent } from './components/editar-proceso/editar-proceso.component';
import { IngresoClientesComponent } from './components/ingreso-clientes/ingreso-clientes.component';
import { BusquedaClientesComponent } from './components/busqueda-clientes/busqueda-clientes.component';
import { EditarCalibreComponent } from './components/editar-calibre/editar-calibre.component';
import { EditarClientesComponent } from './components/editar-clientes/editar-clientes.component';
import { EditarFrutaComponent } from './components/editar-fruta/editar-fruta.component';
import { EditarPagoComponent } from './components/editar-pago/editar-pago.component';
import { BusquedaComprasComponent } from './components/busqueda-compras/busqueda-compras.component';
import { IngresoCompraComponent } from './components/ingreso-compra/ingreso-compra.component';
import { IngresoCompraFinalComponent } from './components/ingreso-compra-final/ingreso-compra-final.component';
import { VerCompraComponent } from './components/ver-compra/ver-compra.component';
import { ProductosComponent } from './components/productos/productos.component';
import { BusquedaVentasComponent } from './components/busqueda-ventas/busqueda-ventas.component';
import { IngresoVentaComponent } from './components/ingreso-venta/ingreso-venta.component';
import { IngresoVentaFinalComponent } from './components/ingreso-venta-final/ingreso-venta-final.component';
import { VerVentaComponent } from './components/ver-venta/ver-venta.component';

import{PagoServiciosComponent} from './components/pago-servicios/pago-servicios.component';

import{IngresoCamarasComponent} from './components/ingreso-camaras/ingreso-camaras.component';

import{VerProcesoCamarasComponent} from './components/ver-proceso-camaras/ver-proceso-camaras.component';
import{ServicioGruasComponent} from './components/servicio-gruas/servicio-gruas.component';
import{VerServicioGruasComponent} from './components/ver-servicio-gruas/ver-servicio-gruas.component';
import{ArriendoBinsComponent} from './components/arriendo-bins/arriendo-bins.component';
import{VerArriendoBinsComponent} from './components/ver-arriendo-bins/ver-arriendo-bins.component';
import{ServicioCamionesComponent} from './components/servicio-camiones/servicio-camiones.component';


const routes: Routes = [
  {
      path:'',
      redirectTo:'/busqueda',
      pathMatch:'full'
    },    
    {
      path: 'busqueda',
      component:BusquedaComponent
    },
    {
      path: 'busqueda/detalle/:numero_proceso',
      component: VerProcesoComponent
    },
    {
      path:'ingreso',
       component:IngresoComponent
    },    
    {
      path:'ingreso/:numero_proceso/final',
      component:IngresoFinalComponent
    },
    {
      path:'busqueda-fruta',
      component: BusquedaFrutaComponent
    },
    {
     path:'ingreso-fruta',
     component: IngresoFrutaComponent
    },
    {
      path:'busqueda-pago',
      component: BusquedaPagoComponent
    },
    {
      path:'ingreso-pago',
      component:IngresoPagoComponent
    },
    {
      path:'busqueda-calibre',
      component:BusquedaCalibreComponent
    },
    {
      path:'ingreso-calibre',
      component:IngresoCalibreComponent
    },
    {
      path:'eliminados',
      component:EliminadosComponent
    },
    {
      path:'continuar/:numero_proceso',
      component:ContinuarProcesoComponent
    },
    {
      path:'busqueda/editar/:numero_proceso',
      component:EditarProcesoComponent
    },
    {
      path:'ingreso-clientes',
      component:IngresoClientesComponent
    },
    {
      path:'busqueda-clientes',
      component:BusquedaClientesComponent
    },
    {
      path:'editar/calibre/:idcalibre',
      component:EditarCalibreComponent
    },
    {
      path:'editar/clientes/:id_cliente',
      component:EditarClientesComponent
    },
    {
      path:'editar/fruta/:idtipo_fruta',
      component:EditarFrutaComponent
    },
    {
      path:'editar/pago/:idtipo_pago',
      component:EditarPagoComponent
    },
    {
      path:'busqueda-compras',
      component:BusquedaComprasComponent
    },
    {
      path:'ingreso-compra',
      component:IngresoCompraComponent
    },
    {
      path:'ingreso-compra/:idcompra/final',
      component:IngresoCompraFinalComponent
    },
    {
      path:'busqueda-compras/ver-compra/:idcompra',
      component:VerCompraComponent
    },
    {
      path:'productos',
      component:ProductosComponent
    },
    {
      path:'busqueda-ventas',
      component:BusquedaVentasComponent
    },
    {
      path:'ingreso-venta',
      component:IngresoVentaComponent
    },
    {
      path:'ingreso-venta/:idventa/final',
      component:IngresoVentaFinalComponent
    },
    {
      path:'busqueda-ventas/ver-venta/:idventa',
      component:VerVentaComponent
    },
    {
      path:'pago_servicios',
      component:PagoServiciosComponent
    },
    {
      path:'camaras/ingreso',
      component:IngresoCamarasComponent
    },
    {
      path:'camaras/ver-proceso-camaras',
      component:VerProcesoCamarasComponent
    },
    {
      path:'servicio-gruas/ingreso',
      component:ServicioGruasComponent
    },
    {
      path:'servicio-gruas/ver',
      component:VerServicioGruasComponent
    },
    {
      path:'arriendo-bins/ingreso',
      component:ArriendoBinsComponent
    },
    {
      path:'arriendo-bins/ver',
      component:VerArriendoBinsComponent
    },
    {
      path:'servicio-camiones/ingreso',
      component:ServicioCamionesComponent
    }
    
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
