import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/modelos/producto.model';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  public frmProducto!: FormGroup;
  public producto!: Producto;
  public mensaje: String = "";
  listaCategorias: any;
  rutaFoto: any

  // constructor(private location: Location,
  //   private _productoService: ProductoService,
  //   private _categoriaService: CategoriaService) {

  // }
  constructor(private router: Router,
    private productoService: ProductoService,
    private categoriaService: CategoriaService) {

  }

  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((result) => {
      this.listaCategorias = result;
    })
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.rutaFoto = URL.createObjectURL(file)
      this.frmProducto.get('fileFoto')?.setValue(file)
    }
  }

  agregarProducto(frmProductoValue: any) {
    const formData = new FormData()
    if (this.frmProducto.valid) {
      var codigo = frmProductoValue.txtCodigo
      var nombre = frmProductoValue.txtNombre
      var precio = frmProductoValue.txtPrecio
      var categoria = frmProductoValue.cbCategoria
      var foto = frmProductoValue.fileFoto
      formData.append('proCodigo', codigo)
      formData.append('proNombre', nombre)
      formData.append('proPrecio', precio)
      formData.append('proCategoria', categoria)
      formData.append('proFoto', this.frmProducto.get('fileFoto')?.value)
      this.producto = new Producto(codigo, nombre, precio, categoria, foto)
    }
    this.productoService.agregarProducto(formData).subscribe(respuesta => {
      this.router.navigate(['/', 'productos'])
      this.mensaje = "Producto agregado Correctamente"
      //this.location.back();

    }, error => {
      console.log(error)
      this.mensaje = "Problemas al Agregar el Producto"
    });

  }

  ngOnInit(): void {
    this.listarCategorias()
    this.frmProducto = new FormGroup({
      txtCodigo: new FormControl('', [Validators.required]),
      txtNombre: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      txtPrecio: new FormControl('', [Validators.required]),
      cbCategoria: new FormControl('', [Validators.required]),
      fileFoto: new FormControl('',),
    })
  }


}
