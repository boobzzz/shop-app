import { createStore, applyMiddleware, Action } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { Product } from "../types/types";

import { productsReducer } from "./reducer";

export const store = createStore(productsReducer, applyMiddleware<AppDispatch, any>(thunk));

export interface AppState {
    isLoading: boolean;
    error: string;
    products: Product[];
    sortBy: string;
}

export interface ProductsAction extends Action {
    type: "GET_PRODUCTS";
    payload: Product[];
}

export interface ErrorAction extends Action {
    type: "ERROR";
    payload: string;
}

export interface SortByAction extends Action {
    type: "SORT_BY";
    payload: string;
}

export type KnownActions = ProductsAction | ErrorAction | SortByAction;
export type AppDispatch = ThunkDispatch<AppState, any, KnownActions>;