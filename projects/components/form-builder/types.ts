import { FormControl, FormGroup } from '@angular/forms';
import { FlzMessageFn } from '@fokklzdev/components/core';

export interface FlzSubmitEvent {
  form: FormGroup;
  error: FlzMessageFn;
  warn: FlzMessageFn;
  success: FlzMessageFn;
}
export type NextFn = (err: string) => NextFn | void;

export interface FlzFormInputBase {
  name: string;
  control: FormControl;
  placeholder?: string;
  disableLabel?: boolean;
  errors?: {
    [key: string]: string;
  };
  hint?: string;
  group?: string | [string, number];
  disable?: boolean;
  prefix?: string;
  prefixType?: 'button' | 'text-button' | 'text';
  suffix?: string;
  suffixType?: 'button' | 'text-button' | 'text';
  autofocus?: boolean;
  overwriteLangKey?: string;
  onChanges?: (value: string, form: FormGroup) => void | Promise<void>;
}

export interface FlzFormTextInput extends FlzFormInputBase {
  type: 'text' | 'email' | 'textarea' | 'number' | 'double';
  onPrefix?: (form: FormGroup) => Promise<void> | void;
  onSuffix?: (form: FormGroup) => Promise<void> | void;
}

export interface FlzFormPasswordInput extends FlzFormInputBase {
  type: 'password';
  suffix?: string;
}

export interface FlzFormDateInput extends FlzFormInputBase {
  type: 'date';
  min?: Date | number;
  max?: Date | number;
  locale?: string;
  onPrefix?: (form: FormGroup) => Promise<void> | void;
  onSuffix?: (form: FormGroup) => Promise<void> | void;
}

export interface FlzFormDateRangeInput extends FlzFormInputBase {
  type: 'daterange';
  min?: Date | number;
  max?: Date | number;
  locale?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  onPrefix?: (form: FormGroup) => Promise<void> | void;
  onSuffix?: (form: FormGroup) => Promise<void> | void;
}

export interface FlzFormSelectInputOption {
  labelDefault?: string;
  value: string | boolean;
  default?: boolean;
}

export interface FlzFormToggleInput extends FlzFormInputBase {
  type: 'toggle';
  reverse?: boolean;
}

export interface FlzFormCheckboxInput extends FlzFormInputBase {
  type: 'checkbox';
}

export interface FlzFormSelectInput extends FlzFormInputBase {
  type: 'select' | 'select-multi';
  options: FlzFormSelectInputOptions;
  onPrefix?: (
    form: FormGroup
  ) =>
    | Promise<void>
    | void
    | Promise<FlzFormSelectInputOptions>
    | FlzFormSelectInputOptions
    | Promise<[FlzFormSelectInputOptions, string]>
    | [FlzFormSelectInputOptions, string];
  onSuffix?: (
    form: FormGroup
  ) =>
    | Promise<void>
    | void
    | Promise<FlzFormSelectInputOptions>
    | FlzFormSelectInputOptions
    | Promise<[FlzFormSelectInputOptions, string]>
    | [FlzFormSelectInputOptions, string];
}

export type FlzFormInput =
  | FlzFormCheckboxInput
  | FlzFormToggleInput
  | FlzFormTextInput
  | FlzFormPasswordInput
  | FlzFormDateInput
  | FlzFormDateRangeInput
  | FlzFormSelectInput;

export type FlzForm = Array<FlzFormInput>;
export type FlzFormSelectInputOptions = Array<FlzFormSelectInputOption>;
