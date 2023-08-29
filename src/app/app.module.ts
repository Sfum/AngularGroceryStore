import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {ProductCardDetailComponent} from './components/product-card/product-card-detail/product-card-detail.component';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HttpClientModule} from "@angular/common/http";

import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {HeaderComponent } from './shared/header/header.component';
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink, RouterOutlet, Routes} from "@angular/router";


import {RouterModule} from "@angular/router";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: ProductCardComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    ProductCardDetailComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatMenuModule,
    RouterLink,
    RouterOutlet,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
