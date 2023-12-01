import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { kegiatanPage } from './kegiatan.page';

const routes: Routes = [
  {
    path: '',
    component: kegiatanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KegiatanPageRoutingModule {}
