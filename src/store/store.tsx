import { createStore, applyMiddleware } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";

import { productsReducer } from "./reducer";
import { KnownActions } from "../types/ActionTypes";
import { Product } from "../types/BaseItem";

export const store = createStore(productsReducer, applyMiddleware<AppDispatch, any>(thunk));


export interface AppState {
    isLoading: boolean;
    error: string;
    products: Product[];
    product: Product;
    sortBy: string;
}

export type AppDispatch = ThunkDispatch<AppState, any, KnownActions>;