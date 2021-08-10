import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CalibradoService } from 'src/app/services/calibrado.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(public calibradoService: CalibradoService,private router:Router,private activedRoute: ActivatedRoute) { }

  products:any = [];

  idcompra:any;

  ngOnInit(): void {

    this.calibradoService.getProductosGeneral()
      .subscribe(
        res => {
          this.products = res;  
                           
          console.log(res);
        },
        err => console.error(err)
      );
  }
  Search(){
    if(this.idcompra == ""){
      this.ngOnInit();
    }
    else{
      this.products = this.products.filter(res => {
        return res.idcompra.toString().match(this.idcompra.toString());
      })
    }
  }

}
