import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'paginas',
    loadComponent: () => import('./Pagina/paginas/paginas.page').then( m => m.PaginasPage)
  },
  {
    path: 'camara',
    loadComponent: () => import('./Pagina/camara/camara.page').then( m => m.CamaraPage)
  },
];
