/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() labelText = 'label';
  @Input() inputId = 'inputId';
  @Input() inputType = 'text';
  @Input() inputAutocomplete = 'on';
  @Input() inputPlaceholder = 'placeholder';
  @Input() formControl = new FormControl();
  @Input() checkValueCondition = false;

  @Output() public readonly inputChange = new EventEmitter<FormControl>();

  public value = '';
  public isDisabled?: boolean;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onChange = (value: string): void => {};
  public onTouched = (): void => {};

  public writeValue(value: string): void {
    this.value = value || '';
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public onInputChange(): void {
    this.inputChange.emit(this.formControl);
  }
}
