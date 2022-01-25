import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

export class FlzBaseDialogService {
  constructor(private dialogC: MatDialog) {}

  open<T = unknown>(
    component: ComponentType<T>,
    config = {},
    cb = (result: string) => {}
  ): void {
    this.dialogC
      .open(
        component,
        Object.assign(
          {
            minWidth: '300px',
            closeOnNavigation: true,
          },
          config ?? {}
        )
      )
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        cb(result);
      });
  }
}
