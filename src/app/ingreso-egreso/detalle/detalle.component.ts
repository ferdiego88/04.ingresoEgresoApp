import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresoSubs: Subscription = new Subscription;
  constructor(private store: Store<AppStateWithIngreso>,
              private ingresoEgresoService: IngresoEgresoService) { }


  ngOnDestroy(): void {
    this.ingresoSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.ingresoSubs = this.store.select('ingresosEgresos').subscribe(({items}) => this.ingresosEgresos = items);
  }


  borrar(uid: string){
    console.log(uid);

    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then(() => Swal.fire('Borrado','Item borrado','success'))
      .catch(err => Swal.fire('Error',err.message,'error'))

  }


}
