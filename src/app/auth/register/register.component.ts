import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { getTranslatedError } from '@nafuzi/firebase-auth-error-translator'

import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {

  registroForm!: FormGroup;
  cargando = false;
  uiSuscription: Subscription = new Subscription
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }



  ngOnDestroy(): void {
    this.uiSuscription.unsubscribe();
  }

  ngOnInit(): void {
     this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['',[ Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

    this.uiSuscription = this.store.select('ui').subscribe(ui => {
        this.cargando = ui.isLoading;
    } )
  }


  crearUsuario(){

    if (this.registroForm.invalid) {
        return;
    }

    this.store.dispatch(ui.isLoading());

    Swal.fire({
      title: 'Espere por favor!',
      didOpen: () => {
      Swal.showLoading()
        }
    })

     const {nombre, correo, password} = this.registroForm.value;

     this.authService.crearUsuario(nombre, correo, password)
      .then(credenciales => {
        console.log(credenciales);
        Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['']);
      })

      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: getTranslatedError('es',err.code) ,
        })
      })

  }

}
