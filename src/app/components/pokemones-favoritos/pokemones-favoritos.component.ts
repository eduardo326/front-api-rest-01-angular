import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioPokemon } from '../../models/usuario-pokemon';

@Component({
  selector: 'app-pokemones-favoritos',
  templateUrl: './pokemones-favoritos.component.html',
  styleUrls: ['./pokemones-favoritos.component.css']
})
export class PokemonesFavoritosComponent implements OnInit {

  pokemones: UsuarioPokemon[] = [];
  id:string="";

  constructor(private usuariosService: UsuariosService,
              private activatedRoute: ActivatedRoute){}

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe( params =>{
      this.id=params.get('id') || "";

      this.usuariosService.getPokemonesFavoritos(this.id).subscribe(
        ( pokemones ) => {
          this.pokemones = pokemones as UsuarioPokemon[];
          console.log(this.pokemones);
        })
    })
    
  }

  anadirPokemon(): void{
    Swal.fire({
      title: 'Ingrese el id del pokemon',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Añadir',
      showLoaderOnConfirm: true,
      preConfirm: (pokemon) => {
        if (!isNaN(pokemon)) {
          let banderExiste:boolean = false;

          this.pokemones.forEach((element) => {
            if (element.pokemon == pokemon) {
              banderExiste=true;
            }
          });

          if (!banderExiste) {
            return this.usuariosService.addPokemonesFavoritos(pokemon, this.id).subscribe(
              ( pokemon ) => {
                this.pokemones.push(pokemon);
                return pokemon;
              });
          } else {
            throw {name:"Pokemon ya existe", msg:"El pokemon ya esta en la lista de favoritos"};
          }
          
        } else{
          throw {name:"Valor incorrecto", msg:"Solo puede ingresar numeros"};
        }
        
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        Swal.fire({
          title: `Pokemon añadido a la lista de favoritos`
        })
      }
    }).catch( err => {
      console.log(err);
      Swal.fire(err.name, err.msg, 'warning');
    });
  }


  borrarPokemon(idPokemon:string): void{
    
    Swal.fire({
      title: 'Borrar registro!',
      text: "Seguro que desea borrar el registro de su lista?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuariosService.deletePokemonesFavoritos(idPokemon).subscribe(
          ( resp ) => {
            this.pokemones = this.pokemones.filter(cli => cli._id !== idPokemon)
            return resp;
          });


        Swal.fire(
          'Registro borrado!',
          'Su registro ha sido borrado.',
          'success'
        )
      }
    })
  
  }
}
