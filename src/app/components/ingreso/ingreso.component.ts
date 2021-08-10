import { Component, OnInit, HostBinding} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalibradoService } from 'src/app/services/calibrado.service';
import{ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

//Modelos
import {Calibrado} from '../../models/calibrado';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  @HostBinding('class') classes ='row';  

  constructor(private calibradoService: CalibradoService,private router:Router,private activedRoute: ActivatedRoute, private toastr: ToastrService) { }
  
  calibradoUno:any = [];
  tipo_pago:any =[];
  tipo_fruta:any = [];
  clientes:any = [];

  pago:string ='';
  fruta:string = '';

  frutaSelected: string = '';
  pagoSelected:string = '';
  clienteSelected:string = '';
  
  calibrado:Calibrado = {
    numero_proceso:"",
    id_cliente:'',
    valor_servicio:0,
    idtipo_pago:'',
    idtipo_fruta:'',
    tipo_proceso:'',
    fecha_ingreso:new Date,
    fecha_proceso:new Date,
    estado:''
  }  

  ngOnInit(){ 

    //Obtener último registro en Calibrado
    this.calibradoService.getCalibradoUno().subscribe(
      res => {
        this.calibradoUno = res;
        console.log(res)

      },
      err => console.error(err)
    ); 
    
    this.calibradoService.getTipoPago().subscribe(
      res => {
        this.tipo_pago = res;
        console.log(res)
        this.pagoSelected;
      },
      err => console.error(err)
    );

    this.calibradoService.getTipoFruta().subscribe(
      res => {
        this.tipo_fruta = res;
        console.log(res)
        this.frutaSelected;
      },
      err => console.error(err)
    );

    this.calibradoService.getClientesIngreso().subscribe(
      res => {
        this.clientes = res;
        console.log(res)
        this.clienteSelected;
      },
      err => console.error(err)
    );
  } 

  //Guardar nuevo calibrado
  guardarCalibrado(){ 

    delete this.calibrado.numero_proceso;
    delete this.calibrado.fecha_ingreso;
    delete this.calibrado.fecha_proceso;

    this.Success();

    this.calibrado.estado = '1';

    this.calibrado.idtipo_fruta = this.frutaSelected;
    this.calibrado.idtipo_pago = this.pagoSelected;
    this.calibrado.id_cliente = this.clienteSelected;
    
    this.calibradoService.saveCalibrado(this.calibrado)
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
      title: 'Proceso creado correctamente!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  
}
