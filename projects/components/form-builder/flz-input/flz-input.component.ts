import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { FlzCoreComponent } from '@fokklzdev/components/core';
import { TranslateService } from '@ngx-translate/core';
import {
  FlzFormDateInput,
  FlzFormInput,
  FlzFormTextInput,
  FlzFormPasswordInput,
  FlzFormSelectInput,
  FlzFormDateRangeInput,
  FlzFormSelectInputOptions,
  FlzForm,
} from '../types';

@Component({
  selector: 'flz-input',
  templateUrl: './flz-input.component.html',
  styleUrls: ['./flz-input.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FlzInputComponent),
    },
  ],
})
export class FlzInputComponent
  extends FlzCoreComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  @HostBinding('class') hostClass = this._('wrapper');

  /**
   * PASSWORD
   */
  isPassword = false;
  passwordToggled = false;
  @ViewChild('passwordToggle') passwordToggle!: ElementRef;

  /**
   * DATERANGE
   */
  dateRangeForm!: FormGroup;

  template!: string;

  @Output()
  iconClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Input() value!: string;
  @Input() type!: string;
  @Input() formControlName!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() hint!: string;
  @Input() disabled = false;
  @Input() form!: FormGroup;

  @Input() options!: FlzFormInput;

  touched = false;
  langKey!: string;
  errors: string[] = [];

  startDateInputPlaceholder!: string;
  endDateInputPlaceholder!: string;

  multiSelect = false;

  onChange = (__: any) => {};
  onTouched = () => {};

  constructor(
    public controlContainer: ControlContainer,
    private builder: FormBuilder,
    private adapter: DateAdapter<any>,
    private translateServive: TranslateService
  ) {
    super('form-field');
  }

  ngOnInit(): void {
    if (!this.formControlName) {
      throw new Error('[formControlName] has to be provided for FlzFormInputs');
    }

    this.langKey =
      'FORMS.INPUTS.' +
      (this.options.overwriteLangKey !== undefined
        ? this.options.overwriteLangKey.toUpperCase()
        : this.formControlName.toUpperCase());

    // resolve template
    switch (this.options.type) {
      case 'date':
        this.template = 'date';
        break;
      case 'daterange':
        this.template = 'daterange';
        this.dateRangeForm = this.builder.group({
          start: new FormControl('', []),
          end: new FormControl('', []),
        });
        this.dateRangeForm.valueChanges.subscribe((d) => {
          this.onChange(d);
        });
        break;
      case 'select':
        this.template = 'select';
        break;
      case 'select-multi':
        this.template = 'select';
        this.multiSelect = true;
        break;
      case 'textarea':
        this.template = 'textarea';
        break;
      case 'toggle':
        this.template = 'toggle';
        break;
      case 'checkbox':
        this.template = 'checkbox';
        break;
      default:
        this.template = 'default';
        this.isPassword = this.options.type === 'password';
        break;
    }

    if (this.options.type === 'daterange') {
      this.startDateInputPlaceholder = this.options.startPlaceholder ?? '';
      this.endDateInputPlaceholder = this.options.endPlaceholder ?? '';
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.options.type === ('date' || 'daterange')) {
        this.adapter.setLocale(
          (this.options as FlzFormDateInput).locale ?? 'de'
        );
      }
      if (this.options.type === 'select') {
        if (
          this.options.options.length > 0 &&
          this.options.options.find((v) => v.default === true) !== undefined
        ) {
          this.resolveFormControl().setValue(
            (
              this.options.options.find((v) => v.default === true) ?? {
                value: this.options.options[0].value,
              }
            ).value,
            {
              emitEvent: false,
            }
          );
        }
      }
    }, 1);
  }

  // value comming from outside
  writeValue(angularProvidedValue: any): void {
    this.value = angularProvidedValue;
  }

  // register on change to emit changes
  registerOnChange(angularProvidedFunction: any): void {
    this.onChange = angularProvidedFunction;
  }

  registerOnTouched(angularProvidedFunction: any): void {
    this.onTouched = angularProvidedFunction;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  resolveInputType(): string {
    if (this.isPassword && this.passwordToggled) {
      return 'text';
    }
    if (this.options.type === 'double') {
      return 'number';
    }
    return this.options.type;
  }

  resolveFormControl(): FormControl {
    return (
      (this.controlContainer.control?.get(
        this.formControlName
      ) as FormControl) ?? new FormControl('', [])
    );
  }

  resolveFormControlErrors(): string[] {
    return Object.keys(this.resolveFormControl().errors ?? {});
  }

  resolveHint(): string {
    return this.options.hint ?? this.hint ?? '';
  }

  resolvePlaceholder(): string {
    return this.options.placeholder ?? this.placeholder ?? '';
  }

  resolveSuffix(): string {
    return this.options.suffix ?? '';
  }

  resolvePrefix(): string {
    return this.options.prefix ?? '';
  }

  isUsingLabel(): boolean {
    return !this.options.disableLabel ?? true;
  }

  isUsingHint(): boolean {
    return this.resolveHint().length > 0;
  }

  isUsingPrefix(): boolean {
    return this.options.prefix !== undefined;
  }

  isUsingSuffix(): boolean {
    return this.options.suffix !== undefined;
  }

  isInputType(
    type:
      | 'password'
      | 'text'
      | 'email'
      | 'textarea'
      | 'date'
      | 'daterange'
      | 'number'
      | 'double'
      | 'select'
      | 'select-multi'
  ): boolean {
    const t = this.resolveInputType();
    if (t === 'text' && this.isPassword) {
      return 'password' === type;
    }
    return type === t;
  }

  onIconClick(event: MouseEvent): void {
    this.iconClick.emit(event);
  }

  async executePrefix(): Promise<void> {
    if (
      this.isInputType('text') ||
      this.isInputType('email') ||
      this.isInputType('textarea') ||
      this.isInputType('number') ||
      this.isInputType('double')
    ) {
      const opts = this.options as FlzFormTextInput;
      if (opts.onPrefix) {
        await opts.onPrefix(this.form);
      }
      return;
    }
    if (this.isInputType('date')) {
      const opts = this.options as FlzFormDateInput;
      if (opts.onPrefix) {
        await opts.onPrefix(this.form);
      }
      return;
    }
    if (this.isInputType('daterange')) {
      const opts = this.options as FlzFormDateRangeInput;
      if (opts.onPrefix) {
        await opts.onPrefix(this.form);
      }
      return;
    }
    if (this.isInputType('select') || this.isInputType('select-multi')) {
      const opts = this.options as FlzFormSelectInput;
      if (opts.onPrefix) {
        const result = await opts.onPrefix(this.form);
        if (Array.isArray(result) && Array.isArray(result[0])) {
          (this.options as FlzFormSelectInput).options = (
            result as [FlzFormSelectInputOptions, string]
          )[0];
          this.value = (result as [FlzFormSelectInputOptions, string])[1];
        } else if (result) {
          (this.options as FlzFormSelectInput).options =
            result as FlzFormSelectInputOptions;
        }
      }
      return;
    }
  }

  async executeSuffix(): Promise<void> {
    if (
      this.isInputType('text') ||
      this.isInputType('email') ||
      this.isInputType('textarea') ||
      this.isInputType('number') ||
      this.isInputType('double')
    ) {
      const opts = this.options as FlzFormTextInput;
      if (opts.onSuffix) {
        await opts.onSuffix(this.form);
      }
      return;
    }
    if (this.isInputType('date')) {
      const opts = this.options as FlzFormDateInput;
      if (opts.onSuffix) {
        await opts.onSuffix(this.form);
      }
      return;
    }
    if (this.isInputType('daterange')) {
      const opts = this.options as FlzFormDateRangeInput;
      if (opts.onSuffix) {
        await opts.onSuffix(this.form);
      }
      return;
    }
    if (this.isInputType('select') || this.isInputType('select-multi')) {
      const opts = this.options as FlzFormSelectInput;
      if (opts.onSuffix) {
        const result = await opts.onSuffix(this.form);
        if (Array.isArray(result) && Array.isArray(result[0])) {
          (this.options as FlzFormSelectInput).options = (
            result as [FlzFormSelectInputOptions, string]
          )[0];
          this.value = (result as [FlzFormSelectInputOptions, string])[1];
        } else if (result) {
          (this.options as FlzFormSelectInput).options =
            result as FlzFormSelectInputOptions;
        }
      }
    }
  }

  /**
   *  PASSWORD
   */

  togglePassword(e: any): void {
    e.stopPropagation();
    this.passwordToggled = !this.passwordToggled;
  }

  resolvePasswordIcon(): string {
    return (this.options as FlzFormPasswordInput).suffix ?? 'eye';
  }

  /**
   * SELECT
   */

  resolveSelectOptions(): FlzFormSelectInputOptions {
    return (this.options as FlzFormSelectInput).options;
  }

  setSelectOption(value: string | boolean, event: boolean = true): void {
    if (typeof value === 'string' && !(value.length > 0)) {
      return;
    }
    this.resolveFormControl().setValue(value, { emitEvent: event });
  }
}
