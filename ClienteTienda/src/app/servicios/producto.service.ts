import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Producto } from '../modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = "https://mauriciokta123.pythonanywhere.com/producto"
  constructor(private http: HttpClient) {

  }
  getProductos(): Observable<any> {
    return this.http.get(this.url)
  }

  getProducto(id: string): Observable<any> {
    return this.http.get(this.url + "/" + id);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(this.url + "/" + id);
  }

  actualizarProducto(id: string, formData: FormData): Observable<any> {
    return this.http.put(this.url + "/" + id, formData);
  }
  
  agregarProducto(producto: any): Observable<any> {
    return this.http.post(this.url, producto);
  }

  editarProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(this.url + "/" + id, producto)
  }

  
}
