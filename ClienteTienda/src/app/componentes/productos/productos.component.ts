import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public listaProductos: any
  public listaCategorias: any
  display="none"
  idProducto: any
  url: any


  constructor(private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private router: Router){
      this.url = 'https://mauriciokta123.pythonanywhere.com/media/img'
    }

    obtenerProductos(){
      this.productoService.getProductos().subscribe((result)=>{
        this.listaProductos=result
      })
    }

    listarCategorias(){
      this.categoriaService.listarCategorias().subscribe((result)=>
      this.listaCategorias=result)
    }

    cerrarModal(){
      this.display= "none"
    }

    abrirModalEliminar(id:number){
      this.display="block"
      this.idProducto=id
    }

    eliminarProducto(){
      this.productoService.eliminarProducto(this.idProducto).subscribe((result)=>{
        this.obtenerProductos()
      }, error=>{
        console.log(error)
      });
      this.display='none'
    }

    ngOnInit(): void {
        this.listarCategorias()
        this.obtenerProductos()
    }
}
