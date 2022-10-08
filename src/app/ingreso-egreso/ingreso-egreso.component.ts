import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit {

  ingresoForm: FormGroup;
  TIPO:string = 'ingreso';
  constructor(private fb: FormBuilder,
              private ingresoEgresoService: IngresoEgresoService) {
    this.ingresoForm = this.fb.group({});
   }


  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['',[Validators.required]],
      monto: ['',[Validators.required]],
    })
  }


  guardar() {
    if (this.ingresoForm.invalid) {
        return;
    }

    const {descripcion, monto} = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion,monto,this.TIPO);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then( () => {
        this.ingresoForm.reset();
        Swal.fire('Registro creado',descripcion,'success')
      })
      .catch( err => Swal.fire('Error',err.message,'error'))
  }

}
