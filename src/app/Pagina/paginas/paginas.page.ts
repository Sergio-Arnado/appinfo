import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MensajesService } from 'src/app/Servicio/mensajes.service';
import { IonTextarea,IonContent,IonTitle,IonToolbar,IonHeader,IonButton,IonItem, IonLabel, IonInput,IonThumbnail, IonIcon } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { Camera, CameraResultType, CameraSource, } from '@capacitor/camera';
import { HomePage } from 'src/app/home/home.page';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';



@Component({
  selector: 'app-paginas',
  templateUrl: './paginas.page.html',
  styleUrls: ['./paginas.page.scss'],
  standalone: true,
  imports: [IonTextarea,IonContent,IonTitle,IonToolbar,IonHeader,IonButton,IonItem, IonLabel, IonInput,IonThumbnail ,RouterModule,HomePage,IonicModule, CommonModule, FormsModule]
})
export class PaginasPage implements OnInit {
  nuevoPublicaciones: any = {};
  imagenData: string | null = null;

  constructor(private Servicio: MensajesService) {
    addIcons({
      cameraOutline
    })
  }
  ngOnInit(): void {
    
  }

  agregarPublicacion(): void {
    if (this.PublicacionValida()) {
     
      this.nuevoPublicaciones.foto = this.imagenData;

      this.Servicio.agregarPublicacion(this.nuevoPublicaciones);
      this.nuevoPublicaciones = {};

      
      this.Servicio.actualizarPublicacion();

      this.imagenData = null;
    }
  }

  async capturarFoto(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    
    this.imagenData = 'data:image/jpeg;base64,' + image.dataUrl;
  }

  PublicacionValida(): boolean {
      return (
      this.nuevoPublicaciones.titulo?.length >= 5 &&
      this.nuevoPublicaciones.descripcion?.length >= 20
    );
  }
}