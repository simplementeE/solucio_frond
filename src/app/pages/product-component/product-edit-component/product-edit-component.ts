import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { FamilyService } from '../../../services/family.service';
import { LaboratoryService } from '../../../services/laboratory.service';
import { Product } from '../../../model/product.model';
@Component({
  selector: 'app-product-edit-component',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './product-edit-component.html',
  styleUrl: './product-edit-component.css'
})
export class ProductEditComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  isEdit = false;

  categories: any[] = [];
  families: any[] = [];
  laboratories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private familyService: FamilyService,
    private laboratoryService: LaboratoryService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      presentation: [''],
      unitPrice: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      expired: ['', Validators.required],
      idCategory: ['', Validators.required],
      idFamily: ['', Validators.required],
      idLaboratory: ['', Validators.required],
    });

    this.loadDropdowns();

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEdit = true;
      this.productService.getById(this.id).subscribe(p => this.form.patchValue(p));
    }
  }

  loadDropdowns() {
    this.categoryService.getAll().subscribe(c => this.categories = c);
    this.familyService.getAll().subscribe(f => this.families = f);
    this.laboratoryService.getAll().subscribe(l => this.laboratories = l);
  }

  save() {
    if (this.form.invalid) return;
    const data: Product = this.form.value;

    if (this.isEdit) {
      this.productService.update(this.id, data).subscribe(() => this.router.navigate(['pages/product']));
    } else {
      this.productService.create(data).subscribe(() => this.router.navigate(['pages/product']));
    }
  }

  cancel() {
    this.router.navigate(['pages/product']);
  }

}
