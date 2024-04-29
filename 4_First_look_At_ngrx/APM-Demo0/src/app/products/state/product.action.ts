import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toggleProductCode = createAction('[product] toggle product code');
export const setCurrentProduct = createAction('[product] set current product', props<{ product: Product }>());
export const clearCurrentProduct = createAction('[product] Clear current product');
export const initCurrrentProduct = createAction('[product] init current product');
export const loadProduct = createAction('[product] load product');
export const loadProductSuccess = createAction('[product] load product success', props<{ products: Product[] }>);
export const loadProductFail = createAction('[product] load product fail', props<{ error: String }>);