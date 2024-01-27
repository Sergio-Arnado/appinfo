import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private PublicacionSubject = new BehaviorSubject<any[]>([]);
  public Publicacion$ = this.PublicacionSubject.asObservable();
  private Publicacion: any[] = [];

  constructor() {}

  getPublicacion(): any[] {
    return this.PublicacionSubject.value;
  }

  agregarPublicacion(Publicaciones: any): void {
    const Publicacion = this.PublicacionSubject.value;
    Publicacion.push(Publicaciones);
    this.PublicacionSubject.next(Publicacion);
  }

  borrar(index: number): void {
    const Publicacion = this.PublicacionSubject.value;
    Publicacion.splice(index, 1);
    this.PublicacionSubject.next(Publicacion);
  }

  actualizarPublicacion(): void {
    this.PublicacionSubject.next(this.PublicacionSubject.value.slice());
  }
  setFotoData(PublicacionesIndex: number, fotoData: any) {
    if (this.Publicacion[PublicacionesIndex]) {
      this.Publicacion[PublicacionesIndex].fotoData = fotoData;
    }
}
}