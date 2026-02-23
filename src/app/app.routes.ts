import { Routes } from '@angular/router';
import { CasinoCatalogPageComponent } from './pages/casino-catalog-page/casino-catalog-page.component';
import { CasinoHomePageComponent } from './pages/casino-home-page/casino-home-page.component';

export const routes: Routes = [
  { path: 'casino', component: CasinoHomePageComponent },
  { path: 'casino/all-games', component: CasinoCatalogPageComponent },
  { path: 'casino/most-bet', component: CasinoCatalogPageComponent },
  { path: 'casino/most-played-games', component: CasinoCatalogPageComponent },
  { path: '**', redirectTo: 'casino' },
];
