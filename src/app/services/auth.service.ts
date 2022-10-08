import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth:  AngularFireAuth,
              public firestore: AngularFirestore,
              private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
        if (fuser) {
          this.firestore.doc(`${fuser?.uid}/usuario`).valueChanges()
          .subscribe((firestoreUser) => {
            console.log(firestoreUser);
            const userTemp = new Usuario('sasass','hola','diefgo@fnailcm.com')
            this.store.dispatch(authActions.setUser({user: userTemp}))
          })
        } else {
          console.log('Llamar unset del User');

        }

    })
  }

  crearUsuario(nombre: string, email:string, password: string) {


     return this.auth.createUserWithEmailAndPassword(email, password)
      .then( ({user}) => {
          const newUser = new Usuario(user!.uid, nombre, email);

          return this.firestore.doc(`${user!.uid}/usuario`).set({...newUser});
      } )

  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }


  isAuth() {
    return this.auth.authState.pipe(
      map(fbuser => fbuser != null )
    );
  }
}
