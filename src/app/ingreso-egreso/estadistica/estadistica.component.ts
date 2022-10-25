import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

    // Doughnut
    public doughnutChartOptions: ChartConfiguration['options'] = {
      responsive: true,
      maintainAspectRatio: false,

    };

    public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos'];
    public doughnutChartData: ChartData<'doughnut'> = {
      labels: this.doughnutChartLabels,
      datasets: [{ data: [] }]
    };

  constructor(private store: Store<AppState>) { }

  ingresos = 0;
  egresos = 0;

  totalIngresos = 0;
  totalEgresos = 0;

  ngOnInit(): void {

    this.store.select('ingresosEgresos').subscribe( ({items}) => this.generarEstadistica(items))
  }

    public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  generarEstadistica(items: IngresoEgreso[]){
    this.totalEgresos = 0;
    this.totalIngresos = 0;
    this.egresos = 0;
    this.ingresos = 0;

    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
    } else {
       this.totalEgresos += item.monto;
       this.egresos++;
    }};

    this.doughnutChartData.datasets = [{
      data: [this.totalIngresos, this.totalEgresos]
    }];
  }

}
