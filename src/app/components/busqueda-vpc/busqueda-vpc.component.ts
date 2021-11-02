import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CalibradoService } from 'src/app/services/calibrado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'
import { PaltaChilenaService } from 'src/app/services/palta-chilena.service';

import {CpcPrincipal} from '../../models/cpcPrincipal';

@Component({
  selector: 'app-busqueda-vpc',
  templateUrl: './busqueda-vpc.component.html',
  styleUrls: ['./busqueda-vpc.component.css']
})
export class BusquedaVpcComponent implements OnInit {

  getAllSells:any= [];
  getAllSellsRespaldo:any= [];

  constructor(
    public calibradoService: CalibradoService,
    private router:Router,
    private activedRoute: ActivatedRoute,
    public paltaChilenaService: PaltaChilenaService
  ) { }

  ngOnInit(): void {
    this.paltaChilenaService.getAllSells()
    .subscribe(
      res => {
        this.getAllSells = res;
        this.getAllSellsRespaldo = this.getAllSells;
        console.log(res);
      },
      err => console.error(err)
    );
  }






}
