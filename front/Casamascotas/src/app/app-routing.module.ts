import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaMascotaComponent } from './alta-mascota/alta-mascota.component';
import { AltaUsuarioComponent } from './alta-usuario/alta-usuario.component';
import { EditarMascotaComponent } from './editar-mascota/editar-mascota.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ListadoMascotasComponent } from './listado-mascotas/listado-mascotas.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component'
import { ListadoVentasComponent } from './listado-ventas/listado-ventas.component';
import { VentaMascotaComponent } from './venta-mascota/venta-mascota.component';

const routes: Routes = [
  /* Usuarios */
  {path:"altaUsuario", component: AltaUsuarioComponent},
  {path:"editarUsuario", component: EditarUsuarioComponent},
  {path:"listadoUsuarios", component: ListadoUsuariosComponent},
  /* Mascotas */
  {path:"altaMascota", component: AltaMascotaComponent},
  {path:"editarMascota", component: EditarMascotaComponent},
  {path:"listadoMascotas", component: ListadoMascotasComponent},
  {path:"venderMascota", component: VentaMascotaComponent},
  /* Ventas */
  {path:"listadoVentas", component: ListadoVentasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
