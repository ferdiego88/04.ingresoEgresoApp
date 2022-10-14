import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ingresos = 0;
  egresos = 0;

  totalIngresos = 0;
  totalEgresos = 0;

  ngOnInit(): void {

    this.store.select('ingresosEgresos').subscribe( ({items}) => this.generarEstadistica(items))
  }


  generarEstadistica(items: IngresoEgreso[]){
    console.log(items);
     items.map( item => {

        if (item.tipo === 'ingreso') {
            this.totalIngresos += item.monto;
            this.ingresos++;
        } else {
           this.totalEgresos += item.monto;
           this.egresos++;
        }
     })

  }

}
