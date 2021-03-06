import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'about',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'sq-ui',
    loadChildren: './sq-ui/sq-ui.module#SqUiModule'
  },
  {
    path: 'sq-common',
    loadChildren: './sq-common/sq-common.module#SqCommonModule'
  },
  {
    path: 'datetime-picker',
    loadChildren: './datetime-picker/datetime-picker.module#DatetimePickerModule'
  },
  {
    path: 'modal',
    loadChildren: './modal/modal.module#ModalModule'
  },
  {
    path: 'datatable',
    loadChildren: './datatable/datatable.module#DatatableModule'
  },
  {
    path: '',
    redirectTo: '/about',
    pathMatch: 'full'
  }
];
