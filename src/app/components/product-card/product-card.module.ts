import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";

import {MatCardModule} from "@angular/material/card";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    MatCardModule,
  ],
  exports: [

  ],
  declarations: [

  ]
})
export class ProductCardModule {
}
