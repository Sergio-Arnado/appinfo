import { Component } from '@angular/core';
import { IonImg,IonCardContent,IonCardHeader,IonCard,IonIcon, IonButton, IonItem,IonList,IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { PaginasPage } from '../Pagina/paginas/paginas.page'; 
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { addCircleOutline, trashOutline} from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { Camera,CameraResultType,CameraSource } from '@capacitor/camera';
import { MensajesService } from '../Servicio/mensajes.service';
import { ModalSerComponent } from '../componente/modal-ser/modal-ser.component';
import { FormsModule } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [FormsModule,IonImg,PaginasPage, IonCardContent,IonCardHeader,IonCard,RouterModule,IonIcon,IonButton,CommonModule,IonItem,IonList,IonHeader, IonToolbar, IonTitle, IonContent],
})


export class HomePage {
  fotoCapturada: string = '';
  Publicacion: any[] = [];
  date: string = new Date().toLocaleDateString();

  constructor(
    private servicio: MensajesService,
    private modalController: ModalController
  ) {

    addIcons({
      addCircleOutline,
      trashOutline
    })
  }

  ngOnInit() {
    this.servicio.Publicacion$.subscribe((Publicacion) => {
      this.Publicacion = Publicacion;
    });

    // Recuperar Publicacion al iniciar la página
    Preferences.get({ key: 'Publicacion' })
      .then((result) => {
        const storedPublicacion = result.value; 
        if (storedPublicacion && Array.isArray(storedPublicacion)) {
          
          this.Publicacion = storedPublicacion;
        } else {
          console.error('Los Publicacion no son un array válido.');
        }
      })
      .catch((error) => console.error('Error al recuperar Publicacion', error));
  }

  async borrar(Publicaciones: any): Promise<void> {
    try {
      const modal = await this.modalController.create({
        component: ModalSerComponent,
        componentProps: {
          mensaje: '¿Eliminar este Publicaciones?',
        },
        cssClass: 'confirm-modal',
      });

      await modal.present();

      const { data } = await modal.onDidDismiss();

      if (data && data.confirmado) {
        const index = this.Publicacion.indexOf(Publicaciones);
        if (index !== -1) {
          this.servicio.borrar(index);
          this.guardarPublicacionEnPreferences(); 
        }
      }
    } catch (error) {
      console.error('Error', error);
    }
  }

  async capturarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    this.fotoCapturada = image.dataUrl || ''; 

    this.servicio.setFotoData(this.Publicacion.length, this.fotoCapturada);
  
    const nuevoPublicaciones = {
      titulo: 'Nuevo Publicaciones',
      fotoData: this.fotoCapturada,
    };

    this.Publicacion.push(nuevoPublicaciones);
    this.guardarPublicacionEnPreferences(); 
  }

  private guardarPublicacionEnPreferences() {
    const PublicacionString = JSON.stringify(this.Publicacion);
    Preferences.set({ key: 'Publicacion', value: PublicacionString })
      .catch((error) => console.error('Error al guardar Publicacion en Preferences', error));
  }
}