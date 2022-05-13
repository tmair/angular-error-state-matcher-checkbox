import {
  Directive,
  DoCheck,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { NgForm, FormGroupDirective, NgControl } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { ErrorStateMatcher, mixinErrorState } from '@angular/material/core';
import { Subscription } from 'rxjs';

const _CustomCheckboxErrorStateBase = mixinErrorState(
  class {
    constructor(
      public _defaultErrorStateMatcher: ErrorStateMatcher,
      public _parentForm: NgForm,
      public _parentFormGroup: FormGroupDirective,
      public ngControl: NgControl
    ) {}
  }
);

@Directive({
  selector: 'mat-checkbox',
  host: {
    class: 'checkbox-error-state',
    '[class.has-error-state]': 'errorState',
  },
})
export class CheckboxErrorStateDirective
  extends _CustomCheckboxErrorStateBase
  implements OnInit, OnDestroy, DoCheck
{
  @Input()
  override errorStateMatcher!: ErrorStateMatcher;

  private changesSubscription!: Subscription;

  constructor(
    private checkbox: MatCheckbox,
    defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() @Self() ngControl: NgControl,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective
  ) {
    super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
  }

  ngOnInit(): void {
    // update the error state on state changes
    this.changesSubscription = this.checkbox.change.subscribe(() =>
      this.updateErrorState()
    );
  }

  ngDoCheck() {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState();
    }
  }

  ngOnDestroy(): void {
    this.changesSubscription.unsubscribe();
  }
}
