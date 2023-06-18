import { Component, OnInit } from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuariosService: UsuariosService){}

  ngOnInit() {
    this.usuariosService.getUsuarios().subscribe(
      usuarios => {
        this.usuarios = usuarios as Usuario[];
        console.log(this.usuarios);
      }
  )
  }


}
