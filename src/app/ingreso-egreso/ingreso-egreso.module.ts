import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class IngresoEgresoModule { }
