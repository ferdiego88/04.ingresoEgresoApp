import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth:  AngularFireAuth) { }

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
      console.log(fuser?.email);
      console.log(fuser?.uid);
    })
  }

  crearUsuario(nombre: string, email:string, password: string) {

     return this.auth.createUserWithEmailAndPassword(email, password);

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
