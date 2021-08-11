import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe'
import {NgxPaginationModule} from 'ngx-pagination';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { VerProcesoComponent } from './components/ver-proceso/ver-proceso.component';
import { CalibradoService } from './services/calibrado.service';
import { IngresoFinalComponent } from './components/ingreso-final/ingreso-final.component';






import{ToastrModule, ToastrService} from 'ngx-toastr';
import { BusquedaFrutaComponent } from './components/busqueda-fruta/busqueda-fruta.component';
import { IngresoFrutaComponent } from './components/ingreso-fruta/ingreso-fruta.component';
import { BusquedaPagoComponent } from './components/busqueda-pago/busqueda-pago.component';
import { IngresoPagoComponent } from './components/ingreso-pago/ingreso-pago.component';
import { IngresoCalibreComponent } from './components/ingreso-calibre/ingreso-calibre.component';
import { EliminadosComponent } from './components/eliminados/eliminados.component';
import { BusquedaCalibreComponent } from './components/busqueda-calibre/busqueda-calibre.component';
import { ContinuarProcesoComponent } from './components/continuar-proceso/continuar-proceso.component';
import { EditarProcesoComponent } from './components/editar-proceso/editar-proceso.component';
import { IngresoClientesComponent } from './components/ingreso-clientes/ingreso-clientes.component';
import { BusquedaClientesComponent } from './components/busqueda-clientes/busqueda-clientes.component';
import { EditarCalibreComponent } from './components/editar-calibre/editar-calibre.component';
import { EditarClientesComponent } from './components/editar-clientes/editar-clientes.component';
import { EditarFrutaComponent } from './components/editar-fruta/editar-fruta.component';
import { EditarPagoComponent } from './components/editar-pago/editar-pago.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {BsDatepickerModule, DatepickerModule, BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { BusquedaComprasComponent } from './components/busqueda-compras/busqueda-compras.component';
import { IngresoCompraComponent } from './components/ingreso-compra/ingreso-compra.component';
import { IngresoCompraFinalComponent } from './components/ingreso-compra-final/ingreso-compra-final.component';
import { VerCompraComponent } from './components/ver-compra/ver-compra.component';
import { ProductosComponent } from './components/productos/productos.component';
import { BusquedaVentasComponent } from './components/busqueda-ventas/busqueda-ventas.component';
import { IngresoVentaComponent } from './components/ingreso-venta/ingreso-venta.component';
import { IngresoVentaFinalComponent } from './components/ingreso-venta-final/ingreso-venta-final.component';
import { VerVentaComponent } from './components/ver-venta/ver-venta.component';
import { PagoServiciosComponent } from './components/pago-servicios/pago-servicios.component';
//import { DialogComponentComponent } from './components/dialog-component/dialog-component.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BusquedaComponent,
    IngresoComponent,
    VerProcesoComponent,
    IngresoFinalComponent,
    BusquedaFrutaComponent,
    IngresoFrutaComponent,
    BusquedaPagoComponent,
    IngresoPagoComponent,
    IngresoCalibreComponent,
    EliminadosComponent,
    BusquedaCalibreComponent,
    ContinuarProcesoComponent,
    EditarProcesoComponent,
    IngresoClientesComponent,
    BusquedaClientesComponent,
    EditarCalibreComponent,
    EditarClientesComponent,
    EditarFrutaComponent,
    EditarPagoComponent,
    BusquedaComprasComponent,
    IngresoCompraComponent,
    IngresoCompraFinalComponent,
    VerCompraComponent,
    ProductosComponent,
    BusquedaVentasComponent,
    IngresoVentaComponent,
    IngresoVentaFinalComponent,
    VerVentaComponent,
    PagoServiciosComponent,
    //DialogComponentComponent
    
  ],

  //entryComponents:[DialogComponentComponent],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    Ng2SearchPipeModule,   
    Ng2OrderModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxDaterangepickerMd.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot()

    
  ],
  providers: [
    CalibradoService,
    ToastrService,
    BsDatepickerConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
