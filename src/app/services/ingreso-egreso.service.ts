import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore,
              private authService: AuthService) { }


  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {

    return this.firestore.doc(`${this.authService.user.uid}/ingresos-egresos`)
      .collection('items')
      .add({...ingresoEgreso});
  }

  initIngresosEgresosListener(uid: string): Observable<IngresoEgreso[]> {

    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
    .valueChanges({idField: 'uid'})
    .pipe(
      map ((data:any) => {
       return  data
      }
        )
    )
  }
}
