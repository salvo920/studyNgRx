import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";

import * as AppState from '../../state/app.state'
import { clearCurrentProduct, initCurrrentProduct, setCurrentProduct, toggleProductCode } from "./product.action";

export interface State extends AppState.State {
	products: ProductState;
}

export interface ProductState {
	showProductCode: boolean;
	currentProduct: Product;
	products: Product[]
}

const initState: ProductState = {
	showProductCode: true,
	currentProduct: null,
	products: []
}


const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
	getProductFeatureState,
	state => state.showProductCode
)

export const getcurrentProduct = createSelector(
	getProductFeatureState,
	state => state.currentProduct
)

export const getProducts = createSelector(
	getProductFeatureState,
	state => state.products
)

export const productReducer = createReducer<ProductState>(
	initState,
	on(toggleProductCode, (state): ProductState => {
		console.log('original state: ' + JSON.stringify(state))
		return {
			...state,
			showProductCode: !state.showProductCode
		}
	}),

	on(setCurrentProduct, (state, action): ProductState => {
		console.log('original state: ' + JSON.stringify(state))
		return {
			...state,
			currentProduct: action.product
		}
	}),
	on(clearCurrentProduct, (state, action): ProductState => {
		console.log('original state: ' + JSON.stringify(state))
		return {
			...state,
			currentProduct: {
				id: 0,
				productName: "",
				productCode: "",
				description: "",
				starRating: 0
			}
		}
	}),
	on(initCurrrentProduct, (state, action): ProductState => {
		console.log('original state: ' + JSON.stringify(state))
		return {
			...state,
			currentProduct: null
		}
	})
);

