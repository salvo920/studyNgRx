import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import { State, getShowProductCode, getcurrentProduct } from '../state/product.reducer';
import { initCurrrentProduct, setCurrentProduct, toggleProductCode } from '../state/product.action';

@Component({
	selector: 'pm-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
	pageTitle = 'Products';
	errorMessage: string;

	displayCode: boolean;

	products: Product[];

	// Used to highlight the selected product in the list
	selectedProduct: Product | null;
	sub: Subscription;

	constructor(private store: Store<State>, private productService: ProductService) { }

	ngOnInit(): void {
		this.store.select(getcurrentProduct).subscribe(
			currentProduct => this.selectedProduct = currentProduct
		);

		this.productService.getProducts().subscribe({
			next: (products: Product[]) => this.products = products,
			error: err => this.errorMessage = err
		});

		this.store.select(getShowProductCode).subscribe(
			showProductCode => {
				this.displayCode = showProductCode
			}
		)
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	checkChanged(): void {
		this.store.dispatch(toggleProductCode())
	}

	newProduct(): void {
		this.store.dispatch(initCurrrentProduct())
	}

	productSelected(product: Product): void {
		this.store.dispatch(setCurrentProduct({ product }))
	}

}
