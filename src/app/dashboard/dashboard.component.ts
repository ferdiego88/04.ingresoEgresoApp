import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription = new Subscription;
  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }



  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.userSubs = this.store.select('user')
    .pipe(
      filter( auth => auth.user.nombre != '' )
    )
    .subscribe(({user}) => {

      this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
        .subscribe(ingresosEgresos => {
          console.log(ingresosEgresos);
          this.store.dispatch(ingresoEgresoActions.setItems({items: ingresosEgresos}))
        })
    })


  }

}
