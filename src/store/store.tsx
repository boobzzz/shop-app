import { createStore, applyMiddleware, Action } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { Product } from "../types/types";

import { productsReducer } from "./reducer";

export const store = createStore(productsReducer, applyMiddleware<AppDispatch, any>(thunk));

export interface AppState {
    isLoading: boolean;
    error: string;
    products: Product[];
}

export interface ProductsAction extends Action {
    type: "GET_PRODUCTS";
    payload: Product[];
}

export interface ErrorAction extends Action {
    type: "ERROR";
    payload: string;
}

export type KnownActions = ProductsAction | ErrorAction;
export type AppDispatch = ThunkDispatch<AppState, any, KnownActions>;