import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../model/product.model';
import { NgFor } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-component',
  standalone: true,  
  imports: [NgFor, CurrencyPipe],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css'
})
export class ProductComponent implements OnInit
{
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: data => this.products = data,
      error: err => console.error(err)
    });
  }

  create() {
    this.router.navigate(['pages/product/new']);
  }

  edit(id: number) {
    this.router.navigate(['pages/product/edit', id]);
  }

  delete(id: number) {
    if (confirm('¿Deseas eliminar este producto?')) {
      this.productService.delete(id).subscribe(() => this.loadProducts());
    }
  }

}
