import { HttpClient } from '@angular/common/http';
import { ApplicationRef, ChangeDetectorRef, isDevMode } from '@angular/core';
import { FlzForm } from '@fokklzdev/components/form-builder';
import { TranslateService } from '@ngx-translate/core';
import { FlzBaseApiService } from './flz-base-api.service';

interface CountModel {
  count: number;
}

export class FlzApiService<I, C> extends FlzBaseApiService<I> {
  form: FlzForm = [];

  constructor(
    apiUrl: string,
    endpoint: string,
    private _httpC: HttpClient,
    private _translateS: TranslateService
  ) {
    super(apiUrl, endpoint, _httpC);
  }

  convertErrorMessage(error: any): string {
    if (isDevMode()) {
      console.error(error);
    }
    const message = (error.code ?? error.status ?? 'http')
      .toString()
      .toUpperCase();
    return this._translateS.instant(`ERRORS.API.${message}`);
  }

  async resolveForm(): Promise<FlzForm> {
    return [];
  }

  async getForm(
    item: Partial<I> | null = null,
    id: boolean = true
  ): Promise<FlzForm> {
    let form = await this.resolveForm();
    if (item !== null) {
      form = this.writeForm(form, item);
    }

    return id ? form : form.filter((v) => v.name !== 'id');
  }

  writeForm(form: FlzForm, item: Partial<I>): FlzForm {
    for (const key of Object.keys(item)) {
      const formInput = form.find((v) => v.name === key);
      const value = (item as { [key: string]: any })[key];
      if (formInput && value) {
        if (Array.isArray(value)) {
          formInput.control.setValue(value.map((v) => v.id));
        } else if (typeof value === 'object') {
          formInput.control.setValue(value.id);
        } else {
          formInput.control.setValue(value);
        }
      }
    }
    return form;
  }

  convertItem(item: any): any {
    const newItem: any = {};
    for (const value of Object.keys(item)) {
      const target = item[value];
      if (Array.isArray(target)) {
        newItem[value] = target.map((v: any) => v.id);
      } else if (typeof target === 'object') {
        newItem[value] = target.id;
      } else {
        newItem[value] = target;
      }
    }
    return newItem;
  }

  count(where?: object): Promise<number> {
    return new Promise((resolve, reject) => {
      return this.get<CountModel>(
        `count${
          where ? `?where=${encodeURIComponent(JSON.stringify(where))}` : ''
        }`,
        true
      ).subscribe(
        (count) => {
          return resolve(count.count);
        },
        (err) => {
          return reject(err);
        }
      );
    });
  }

  frontendCount(where?: object): Promise<number> {
    return new Promise((resolve, reject) => {
      return this.get<CountModel>(
        `count${
          where ? `?where=${encodeURIComponent(JSON.stringify(where))}` : ''
        }`,
        'frontend'
      ).subscribe(
        (count) => {
          return resolve(count.count);
        },
        (err) => {
          return reject(err);
        }
      );
    });
  }

  create(request: C): Promise<I> {
    return new Promise((resolve, reject) => {
      return this.post('', request, true).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => {
          return reject(err);
        }
      );
    });
  }

  find(where?: object): Promise<I[]> {
    return new Promise((resolve, reject) => {
      return this.get<I[]>(
        `${where ? `?where=${encodeURIComponent(JSON.stringify(where))}` : ''}`,
        true
      ).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => {
          return reject(err);
        }
      );
    });
  }

  frontendFind(where?: object): Promise<I[]> {
    return new Promise((resolve, reject) => {
      return this.get<I[]>(
        `${where ? `?where=${encodeURIComponent(JSON.stringify(where))}` : ''}`,
        'frontend'
      ).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => {
          return reject(err);
        }
      );
    });
  }

  findById(id: string): Promise<I> {
    return new Promise((resolve, reject) => {
      return this.get(id, true).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => {
          return reject(err);
        }
      );
    });
  }

  frontendFindById(id: string): Promise<I> {
    return new Promise((resolve, reject) => {
      return this.get(id, 'frontend').subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => {
          return reject(err);
        }
      );
    });
  }

  updateById(id: string, request: Partial<C>): Promise<I> {
    return new Promise((resolve, reject) => {
      return this.patch(id, request, true).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => {
          return reject(err);
        }
      );
    });
  }

  deleteById(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.delete<void>(id).subscribe(
        () => {
          return resolve();
        },
        (err) => {
          return reject(err);
        }
      );
    });
  }
}
