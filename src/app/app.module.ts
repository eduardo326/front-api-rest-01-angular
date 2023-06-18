import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PokemonesFavoritosComponent } from './components/pokemones-favoritos/pokemones-favoritos.component';
import { AuthComponent } from './components/auth/auth.component';

import { ROUTES } from './app.routes';
import { BarraLateralComponent } from './components/commons/barra-lateral/barra-lateral.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    PokemonesFavoritosComponent,
    AuthComponent,
    BarraLateralComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule
  ],
  exports: [ RouterModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
