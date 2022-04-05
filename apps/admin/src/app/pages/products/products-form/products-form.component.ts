import { MessageService } from 'primeng/api';
import { ProductsService, Product } from '@develop/products';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styles: [],
})
export class ProductsFormComponent implements OnInit {
    form: FormGroup;
    isSubmitted = false;
    editMode = false;
    imageDisplay: string | ArrayBuffer;
    currentProductId: number;

    constructor(
        private location: Location,
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private productsServices: ProductsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this._initForm()  
      this._checkEditModel();
    }

    private _initForm() {
        this.form = this.formBuilder.group({
            productname: ['', Validators.required],
            price: ['', Validators.required],
            category:'',
            description:'...',
            image:''
        });
    }

    onCancel(){
      this.location.back(); 
    }
    
    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        const product : Product = {
         id: this.currentProductId,
         title:  this.productForm.productname.value,
         price: this.productForm.price.value
        };

        if (this.editMode) {
          this._updateProduct(product);
        } else {
          this._addProduct(product);
        }

    }

    private _addProduct(product) {
      this.productsServices.addProduct(product).subscribe(
        (product: Product) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Product ${product.title} is created!`
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not created!'
          });
        }
      );
    }

    private _updateProduct(product: Product) {
      this.productsServices.updateProduct(product, this.currentProductId).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product is updated!'
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not updated!'
          });
        }
      );
    }
    onImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.patchValue({ image: file });
        this.form.get('image').updateValueAndValidity();
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.imageDisplay = fileReader.result;
        };
        fileReader.readAsDataURL(file);
      }
    } 
    private _checkEditModel() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.editMode = true;
                this.currentProductId = params.id;
                this.productsServices.getProduct(params.id).subscribe((product) => {
                    this.productForm.productname.setValue(product.title);
                    this.productForm.price.setValue(product.price);
                });
            }
        });
    }

    get productForm() {
        return this.form.controls;
    }
}
