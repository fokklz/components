import { Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export class FlzCoreComponent {
  baseClass = 'flz';
  classes!: string[] | string;

  constructor(baseClass: string, private transService?: TranslateService) {
    this.baseClass = `flz-${baseClass}`;
  }

  public _(classExt?: string, ...additional: Array<string>): string {
    const outClasses: Array<string> = [];
    const baseClass =
      classExt && classExt.length > 0
        ? `${this.baseClass}-${classExt}`
        : `${this.baseClass}`;

    outClasses.push(baseClass);

    if (additional.length > 0) {
      additional.forEach((add) => {
        if (add && typeof add === 'string' && add.length > 0) {
          if (add.startsWith('-')) {
            outClasses.push(`${baseClass}${add}`);
          } else {
            outClasses.push(add);
          }
        }
      });
    }

    return outClasses.join(' ');
  }

  public resolveTranslateDefault(
    defaultValue: string,
    data: { [key: string]: string } = {}
  ): object {
    for (const key of Object.keys(data)) {
      const val = data[key];
      if (/^[A-Z\.\_]+$/.test(val)) {
        data[key] = this.transService?.instant(val) ?? val;
      }
    }
    return Object.assign({ Default: defaultValue }, data);
  }

  public _convert_lang_key(key: string): string {
    return key
      .toUpperCase()
      .replace(/[^A-Za-z0-9\.\-\_]/gm, '')
      .replace(/[\-]/gm, '_');
  }
}
