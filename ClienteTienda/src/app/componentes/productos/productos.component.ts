import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Producto } from 'src/app/modelos/producto.model';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  public formularioEditar!: FormGroup;
  public listaProductos: any
  public producto!: Producto;
  public listaCategorias: any
  display = "none"
  idProducto: any
  url: any
  modalEliminarVisible = false;
  modalEditarVisible = false;
  productoSeleccionado: any;
  


  constructor(private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.url = 'https://mauriciokta123.pythonanywhere.com/media/img'
  }

  obtenerProductos() {
    this.productoService.getProductos().subscribe((result) => {
      this.listaProductos = result
    })
  }

  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((result) =>
      this.listaCategorias = result)
  }

  cerrarModal() {
    this.modalEliminarVisible = false;
    this.modalEditarVisible = false;
    this.display = "none"
  }

  abrirModalEliminar(id: number) {
    this.modalEliminarVisible = true;
    this.display = "block"
    this.idProducto = id
    console.log(id)
  }

  abrirModalEditar(producto: Producto) {
    this.productoSeleccionado = producto;

    this.formularioEditar.patchValue({
      txtCodigo: producto.proCodigo,
      txtNombre: producto.proNombre,
      txtPrecio: producto.proPrecio,
      cbCategoria: producto.proCategoria,
      // No es recomendable cargar la imagen aquí, solo mostrarla
    });

    this.modalEditarVisible = true;
    this.display = "block";
  }


  eliminarProducto() {
    this.productoService.eliminarProducto(this.idProducto).subscribe((result) => {
      console.log(this.idProducto)
      this.obtenerProductos()
      this.cerrarModal()
    }, error => {
      console.log(error)
    });
    this.display = 'none'
  }

  // onFileSelect(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0]
  //     this.productoSeleccionado = URL.createObjectURL(file)
  //     this.formularioEditar.get('fileFoto')?.setValue(file)
  //   }
  // }

  actualizarProducto() {
    if (this.formularioEditar.valid) {
      const formData = new FormData();

      formData.append('proCodigo', this.formularioEditar.get('txtCodigo')?.value);
      formData.append('proNombre', this.formularioEditar.get('txtNombre')?.value);
      formData.append('proPrecio', this.formularioEditar.get('txtPrecio')?.value);
      formData.append('proCategoria', this.formularioEditar.get('cbCategoria')?.value);

      // Solo agrega la imagen si se ha seleccionado una nueva
      const nuevaImagen = this.formularioEditar.get('fileFoto')?.value;
      if (nuevaImagen instanceof File) {
        formData.append('proFoto', nuevaImagen);
        console.log(nuevaImagen)
      }


      this.productoService.actualizarProducto(this.productoSeleccionado.proCodigo, formData).subscribe(
        (result) => {
          console.log(result);
          this.obtenerProductos();
          this.cerrarModal();
        },
        (error) => {
          console.log(error);
        }
      );
      this.display = 'none';
    }
  }

  ngOnInit(): void {
    this.listarCategorias()
    this.obtenerProductos()

    this.formularioEditar = this.formBuilder.group({
      txtCodigo: [''],
      txtNombre: [''],
      txtPrecio: [''],
      cbCategoria: [''],
      fileFoto: [null]
    });
  }
}
