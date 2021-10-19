import { createStore, applyMiddleware, Action } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";

import { productsReducer } from "./reducer";
import { Product } from "../types/BaseItem";
import { ActionTypes } from "../types/ActionTypes";

export const store = createStore(productsReducer, applyMiddleware<AppDispatch, any>(thunk));

export interface AppState {
    isLoading: boolean;
    error: string;
    products: Product[];
    selected: Product;
    sortBy: string;
}

export interface LoadingAction extends Action {
    type: ActionTypes.LOADING;
    payload: boolean;
}

export interface ErrorAction extends Action {
    type: ActionTypes.ERROR;
    payload: string;
}

export interface SortByAction extends Action {
    type: ActionTypes.SORT_BY;
    payload: string;
}

export interface AsyncAction extends Action {
    type: AsyncActionType;
}

export interface GetProductsAction extends AsyncAction {
    payload: Product[];
}

export interface GetProductAction extends AsyncAction {
    payload: Product;
}

export interface AddProductAction extends AsyncAction {
    payload: Product;
}

export interface RemoveProductAction extends AsyncAction {
    payload: string;
}

export type KnownActions = GetProductsAction |
                           GetProductAction |
                           AddProductAction |
                           RemoveProductAction |
                           SortByAction |
                           ErrorAction |
                           LoadingAction;
export type AsyncActionType = ActionTypes.GET_PRODUCTS |
                              ActionTypes.GET_PRODUCT |
                              ActionTypes.ADD_PRODUCT |
                              ActionTypes.REMOVE_PRODUCT;
export type AppDispatch = ThunkDispatch<AppState, any, KnownActions>;