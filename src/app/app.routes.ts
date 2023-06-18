import { Routes } from '@angular/router';
import { PokemonesFavoritosComponent } from './components/pokemones-favoritos/pokemones-favoritos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';

export const ROUTES: Routes = [
	{ path: 'usuarios', component: UsuariosComponent , canActivate: [AuthGuard]},
	{ path: 'usuarios/pokemones/:id', component: PokemonesFavoritosComponent , canActivate: [AuthGuard] },
	{ path: 'login', component: AuthComponent},
	{ path: '**', pathMatch:'full', redirectTo:'usuarios' }
] 