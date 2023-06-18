import { Component, OnInit  } from '@angular/core';
import { Usuario } from '../../models/usuario';
import swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
    console.log(0);
    if (this.authService.isAuthenticated()) {
      console.log(1);
      swal.fire('Login', `Hola ${this.authService.usuario.nombre} ya estás autenticado!`, 'info');
      this.router.navigate(['/usuarios']);
    }
  }

  login(): void {

    if (this.usuario.nombre == null || this.usuario.password == null) {
      swal.fire('Error Login', 'Login o password vacías!', 'error');
      return;
    }
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      
      this.authService.guardarUsuario(response.usuario);
      this.authService.guardarToken(response.token);
      let usuario = this.authService.usuario;

      this.router.navigate(['/usuarios']);
      swal.fire('Login', `Hola ${usuario.nombre}, has iniciado sesión con éxito!`, 'success');
    }, err => {
      if (err.status == 400) {
        swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    });
  }
  
}
