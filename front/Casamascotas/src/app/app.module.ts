import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { ListadoMascotasComponent } from './listado-mascotas/listado-mascotas.component';
import { ListadoVentasComponent } from './listado-ventas/listado-ventas.component';
import { AltaUsuarioComponent } from './alta-usuario/alta-usuario.component';
import { AltaMascotaComponent } from './alta-mascota/alta-mascota.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { EditarMascotaComponent } from './editar-mascota/editar-mascota.component';
import { HttpClientModule} from '@angular/common/http';
import { PantallaAdminComponent } from './pantalla-admin/pantalla-admin.component';
import { PantallaUsuarioComponent } from './pantalla-usuario/pantalla-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormLoginComponent } from './form-login/form-login.component';
import { VentaMascotaComponent } from './venta-mascota/venta-mascota.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    ListadoUsuariosComponent,
    ListadoMascotasComponent,
    ListadoVentasComponent,
    AltaUsuarioComponent,
    AltaMascotaComponent,
    EditarUsuarioComponent,
    EditarMascotaComponent,
    PantallaAdminComponent,
    PantallaUsuarioComponent,
    FormLoginComponent,
    VentaMascotaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
