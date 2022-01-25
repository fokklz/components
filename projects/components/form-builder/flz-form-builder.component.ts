import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FlzCoreComponent } from '@fokklzdev/components/core';
import { FlzInlineMessageComponent } from '@fokklzdev/components/inline-message';
import { FlzForm } from '.';
import { FlzSubmitEvent } from './types';

interface GroupedInputs {
  group: string | null;
  inputs: FlzForm;
  width: string[];
}

@Component({
  selector: 'flz-form-builder',
  templateUrl: './flz-form-builder.component.html',
  styleUrls: ['./flz-form-builder.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FlzFormBuilderComponent
  extends FlzCoreComponent
  implements OnInit, OnChanges
{
  @HostBinding('class') hostClass: string = this._('wrapper');

  @Output() flzSubmit: EventEmitter<FlzSubmitEvent> =
    new EventEmitter<FlzSubmitEvent>();
  @Output() subscribe: EventEmitter<object> = new EventEmitter<object>();

  // modify
  @Input() disableSubmit!: string;
  @Input() autosave!: string;
  @Input() preview!: string;

  @Input() reset!: string;
  @Input() inputs!: FlzForm;

  form!: FormGroup;
  @ViewChild('nativeElement') topElem!: ElementRef;

  @ViewChild(FlzInlineMessageComponent)
  inlineMessage!: FlzInlineMessageComponent;
  message = '';

  groupedOptions: Array<GroupedInputs> = [];

  timeoutAutosave!: any;

  constructor(public elemRef: ElementRef, private builder: FormBuilder) {
    super('form-builder');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputs']) {
      this.inputs = changes['inputs'].currentValue;
      this.updateForm(true);
    }
  }

  ngOnInit(): void {
    this.updateForm();
  }

  getForm(): FormGroup {
    return this.form;
  }

  getValues(): { [prop: string]: any } {
    const formValues = this.form.value;
    const values: { [prop: string]: any } = {};
    for (const key of Object.keys(formValues)) {
      if (!formValues[key]) {
        continue;
      }
      if (
        formValues[key] &&
        typeof formValues[key] === 'string' &&
        formValues[key].length === 0
      ) {
        continue;
      }

      const type = (this.inputs.find((t) => t.name === key) ?? { type: 'text' })
        .type;
      switch (type) {
        case 'checkbox':
          values[key] = Boolean(formValues[key]);
          break;
        case 'number':
          values[key] = Number.parseInt(formValues[key], 10);
          break;
        case 'double':
          values[key] = Number.parseFloat(formValues[key]);
          break;
        default:
          values[key] = formValues[key];
          break;
      }
    }
    return values;
  }

  setSuccess(message: string): void {
    this.inlineMessage.setSuccess();
    this.message = message;
    this.inlineMessage.enable();
  }

  setError(message: string): void {
    this.inlineMessage.setError();
    this.message = message;
    this.inlineMessage.enable();
  }

  setWarn(message: string): void {
    this.inlineMessage.setWarn();
    this.message = message;
    this.inlineMessage.enable();
  }

  hasReset(): boolean {
    return this.reset !== undefined;
  }

  hasAutoSave(): boolean {
    return this.autosave !== undefined;
  }

  hasSubmit(): boolean {
    return this.disableSubmit === undefined && !this.hasAutoSave();
  }

  emitSubmit(): void {
    this.flzSubmit.emit({
      form: this.form,
      error: (message: string) => {
        this.setError(message);
      },
      warn: (message: string) => {
        this.setWarn(message);
      },
      success: (message: string) => {
        this.setSuccess(message);
      },
    });
  }

  updateForm(update: boolean = false): void {
    const formGroup: { [key: string]: FormControl } = {};
    for (const option of this.inputs ?? []) {
      formGroup[option.name] = option.control;
      if (option.disable) {
        formGroup[option.name].disable();
      }
      if (update && this.form) {
        formGroup[option.name].setValue(
          this.form.get(option.name)?.value ?? formGroup[option.name].value
        );
      }
    }

    this.form = this.builder.group(formGroup);
    this.groupedOptions = this.getByGroups();

    // live form updates
    this.form.valueChanges.subscribe((v) => {
      // update inline message on value changes
      if (this.inlineMessage && this.inlineMessage.isEnabled()) {
        this.inlineMessage.disable();
      }

      // auto-submit if autosave is enabled
      if (this.hasAutoSave()) {
        if (this.timeoutAutosave) {
          clearTimeout(this.timeoutAutosave);
        }

        this.timeoutAutosave = setTimeout(() => {
          this.emitSubmit();
        }, 300);
      }

      if (this.subscribe.observers.length > 0) {
        const values = v;
        const updatedValues: { [prop: string]: any } = {};
        for (const key of Object.keys(values)) {
          const type = (
            this.inputs.find((t) => t.name === key) ?? { type: 'text' }
          ).type;
          switch (type) {
            case 'checkbox':
              updatedValues[key] = Boolean(values[key]) || false;
              break;
            case 'number':
              updatedValues[key] = Number.parseInt(values[key], 10) || 0;
              break;
            case 'double':
              updatedValues[key] = Number.parseFloat(values[key]) || 0;
              break;
            default:
              updatedValues[key] = values[key];
              break;
          }
        }
        this.subscribe.emit(updatedValues);
      }
    });

    this.inputs
      .filter((v) => v.onChanges !== undefined)
      .forEach((v) => {
        this.form.get(v.name)?.valueChanges.subscribe((value) => {
          v.onChanges?.call(this, value, this.form);
        });
      });
  }

  validate(): void {
    Object.keys(this.form.controls).forEach((ctl) => {
      this.form.controls[ctl].updateValueAndValidity();
    });
  }

  hasGroups(): boolean {
    return this.inputs.filter((v) => v.group !== undefined) !== undefined;
  }

  getByGroups(): Array<GroupedInputs> {
    const outForm: Array<GroupedInputs> = [];
    const handledGroups: string[] = [];
    for (const input of this.inputs) {
      if (!input.group) {
        outForm.push({
          group: null,
          inputs: [input],
          width: [],
        });
        continue;
      }

      const isGroupArray = Array.isArray(input.group);
      const group = (isGroupArray ? input.group[0] : input.group) as string;

      if (handledGroups.includes(group)) {
        continue;
      }

      const groupFields: FlzForm = this.inputs.filter(
        (v) => (Array.isArray(v.group) ? v.group[0] : v.group) === group
      );

      const widths: string[] = [];
      groupFields.forEach((v, i) => {
        widths[i] = Array.isArray(v.group) ? v.group[1] + '%' : 'auto';
      });
      outForm.push({
        group,
        inputs: groupFields,
        width: widths,
      });

      handledGroups.push(group);
    }
    return outForm;
  }
}
