import { Action } from "redux";
import { Product } from "./BaseItem";

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

export interface UpdateProductAction extends AsyncAction {
    payload: Product;
}

export interface RemoveProductAction extends AsyncAction {
    payload: string;
}


export enum ActionTypes {
    LOADING = "LOADING",
    ERROR = "ERROR",
    SORT_BY = "SORT_BY",
    GET_PRODUCTS = "GET_PRODUCTS",
    GET_PRODUCT = "GET_PRODUCT",
    ADD_PRODUCT = "ADD_PRODUCT",
    UPDATE_PRODUCT = "UPDATE_PRODUCT",
    REMOVE_PRODUCT = "REMOVE_PRODUCT",
}

export type AsyncActionType = ActionTypes.GET_PRODUCTS | ActionTypes.GET_PRODUCT | ActionTypes.ADD_PRODUCT | ActionTypes.REMOVE_PRODUCT | ActionTypes.UPDATE_PRODUCT;
export type KnownActions = GetProductsAction | GetProductAction | AddProductAction | UpdateProductAction | RemoveProductAction | SortByAction | ErrorAction | LoadingAction;