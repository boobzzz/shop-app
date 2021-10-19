import { Action } from "redux";
import { ActionTypes, AsyncActionType } from "../types/ActionTypes";
import { Product } from "../types/BaseItem";

export const setLoading: (param: boolean) => LoadingAction = (param: boolean) => (
    {
        type: ActionTypes.LOADING,
        payload: param
    }
);

export const setError: (err: any) => ErrorAction = (err: any) => (
    {
        type: ActionTypes.ERROR,
        payload: err
    }
);

export const sortBy: (param: string) => SortByAction = (param: string) => (
    {
        type: ActionTypes.SORT_BY,
        payload: param
    }
);

export const getProducts: (param: Product[]) => GetProductsAction = (param: Product[]) => (
    {
        type: ActionTypes.GET_PRODUCTS,
        payload: param
    }
);


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