import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxErrorStateDirective } from './checkbox-error-state.directive';

@NgModule({
  exports: [MatCheckboxModule, CheckboxErrorStateDirective],
  declarations: [CheckboxErrorStateDirective],
})
export class CustomCheckboxModule {}
