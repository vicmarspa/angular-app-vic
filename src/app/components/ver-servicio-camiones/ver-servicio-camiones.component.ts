import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ServicioCamionesService } from 'src/app/services/servicio-camiones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'

@Component({
  selector: 'app-ver-servicio-camiones',
  templateUrl: './ver-servicio-camiones.component.html',
  styleUrls: ['./ver-servicio-camiones.component.css']
})
export class VerServicioCamionesComponent implements OnInit {

  constructor(private servicioCamionesService: ServicioCamionesService, private router:Router, private activedRoute: ActivatedRoute) { }


  servicio_camiones:any=[];
  fechaActual = new Date();
  numero_proceso:any;
  selectedNombre:any;
  ts = new Date();
  startDateText:any="";
  endDateText:any="";
  selectedTipoFruta:any;
  selectedTipoPago:any;
  selectedTipoServicio:any;
  selectNumeroProceso:any='';
  selectNombre:any='';
  selectFechaIngreso:any='';
  selectTotalBines:any='';
  selectPrecio:any='';
  selectPrecioTotal:any='';
  selectFormato:any='';
  selectCantidad:any='';


  procesos_camaras2:any=[];









  ngOnInit(): void {
    

    
    this.servicioCamionesService.getServicioCamiones()
    .subscribe(
      res => {
        this.servicio_camiones = res;                 
        console.log(res);
      },
      err => console.error(err)
    );

}



}