import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const unSetItems = createAction('[Counter Component] unset Items');
export const setItems = createAction(
  '[Counter Component] Set Items',
  props<{items: IngresoEgreso[]}>()
  );



