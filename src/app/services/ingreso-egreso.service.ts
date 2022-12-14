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


    delete ingresoEgreso.uid;

    return this.firestore.doc(`${this.authService.user.uid}/ingresos-egresos`)
      .collection('items')
      .add({...ingresoEgreso});
  }

  initIngresosEgresosListener(uid: string): Observable<IngresoEgreso[]> {

    return this.firestore.collection(`${uid}/ingresos-egresos/items`,refs => refs.orderBy('tipo','desc'))
    .valueChanges({idField: 'uid'})
    .pipe(
      map ((data:any) => {
       return  data
      }
        )
    )
  }


  borrarIngresoEgreso(uidItem: string) {
    return this.firestore.doc(`${this.authService.user.uid}/ingresos-egresos/items/${uidItem}`).delete();
  }


}
