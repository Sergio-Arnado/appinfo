import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { IonLabel,IonButtons,IonIcon, IonButton, IonItem,IonList,IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-ser',
  templateUrl: './modal-ser.component.html',
  styleUrls: ['./modal-ser.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule,IonLabel,IonButtons,IonIcon, IonButton, IonItem,IonList,IonHeader, IonToolbar, IonTitle, IonContent ]
})
export class ModalSerComponent  implements OnInit {
  @Input() mensaje: string = '';
  @Input() image: string = '';

  constructor(private modalController: ModalController) {}
  ngOnInit(): void {
    
  }

  cerrarModal(confirmado: boolean): void {
    this.modalController.dismiss({ confirmado });
  }
}