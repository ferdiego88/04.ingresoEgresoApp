import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions';

import Swal from 'sweetalert2';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  TIPO:string = 'ingreso';
  cargando = false;
  ingresoSubscription: Subscription = new Subscription;
  constructor(private fb: FormBuilder,
              private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) {
    this.ingresoForm = this.fb.group({});
   }


  ngOnDestroy(): void {
   this.ingresoSubscription.unsubscribe();
  }


  ngOnInit(): void {

    this.ingresoForm = this.fb.group({
      descripcion: ['',[Validators.required]],
      monto: ['',[Validators.required]],
    })

    this.ingresoSubscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);
  }


  guardar() {

    if (this.ingresoForm.invalid) {
      return;
  }

    this.store.dispatch(ui.isLoading());


    const {descripcion, monto} = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion,monto,this.TIPO);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then( () => {
        this.ingresoForm.reset();
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Registro creado',descripcion,'success')
      })
      .catch( err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error',err.message,'error');
    }
      )
  }

}
