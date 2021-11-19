import { Component, OnInit } from '@angular/core';
import { CompraGeneralService } from 'src/app/services/compra-general.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import{ToastrService} from 'ngx-toastr';
import {DetalleCompraGeneral} from '../../models/detalleCompraGeneral';
import {DetalleSalidaCompraGeneral} from '../../models/detalleSalidaCompraGeneral';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CalibradoService } from 'src/app/services/calibrado.service';

@Component({
  selector: 'app-compra-general-final',
  templateUrl: './compra-general-final.component.html',
  styleUrls: ['./compra-general-final.component.css']
})
export class CompraGeneralFinalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
