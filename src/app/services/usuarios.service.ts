import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario';
import { UsuarioPokemon } from '../models/usuario-pokemon';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private urlEndPoint: string = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.urlEndPoint}`).pipe(map((response: any) => response.usuarios));
  }

  getPokemonesFavoritos(id:string): Observable<UsuarioPokemon[]> {
    return this.http.get<UsuarioPokemon[]>(`${this.urlEndPoint}/favorites/${id}`).pipe(map((response: any) => response.pokemonesUsuarios));
  }

  addPokemonesFavoritos(id:string, usuario:string): Observable<UsuarioPokemon> {
    return this.http.post<UsuarioPokemon>(`${this.urlEndPoint}/favorites`, {"idUsuario":usuario, "pokemon":id}).pipe(map((response: any) => response.pokemonFavorito));
  }

  deletePokemonesFavoritos(id:string): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}/favorites/${id}`);
  }
}
