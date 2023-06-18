import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario= new Usuario();
  private _token: string="";
  private urlEndpoint = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {
    if (this._usuario.nombre != "") {
      return this._usuario;
    } else if (this._usuario.nombre == "" && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')||"") as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != "") {
      return this._token;
    } else if (this._token == "" && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token')||"";
      return this._token;
    }
    return "";
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != "") {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return "";
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != "" && payload.nombre && payload.nombre.length > 0) {
      return true;
    }
    return false;
  }

  guardarUsuario(usuario: Usuario): void {

    this._usuario = usuario;

    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  login(usuario:Usuario): Observable<any> {

    return this.http.post<any>(`${this.urlEndpoint}/login`, {"login":usuario.login, "password":usuario.password}).pipe(map((response: any) => response));

  }

  logout(): void {
    this._token = "";
    this._usuario = new Usuario();
    // sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

  
}
