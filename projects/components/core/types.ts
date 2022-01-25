export class FlzBaseOptions<T extends { [prop: string]: any }> {
  [prop: string]: any;

  constructor(defaults: T, options?: Partial<T>) {
    if (options === undefined) {
      options = {};
    }
    Object.keys(defaults).forEach((key) => {
      this[key] = options && options[key] ? options[key] : defaults[key];
    });
  }
}

export type FlzPrintFunction = (content: string | number) => string;

export type FlzMessageFn = (message: string) => FlzMessageFn | void;
