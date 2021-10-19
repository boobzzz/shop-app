import { Reducer } from "redux";

import { Product } from "../types/BaseItem";
import { KnownActions } from "./actions";
import { ActionTypes } from "../types/ActionTypes";
import { AppState } from "./store";

const initialState: AppState = {
    isLoading: false,
    error: "",
    products: [],
    selected: {
        imageUrl: "",
        name: "",
        count: 0,
    },
    sortBy: "az",
};

export const productsReducer: Reducer<AppState, KnownActions> =
(state = initialState, action): AppState => {
    const { type, payload } = action;

    switch (type) {
        case ActionTypes.LOADING:
            return {
                ...state,
                isLoading: payload as boolean,
                error: "",
            };
        case ActionTypes.ERROR:
            return {
                ...state,
                error: payload as string,
            };
        case ActionTypes.SORT_BY:
            return {
                ...state,
                sortBy: payload as string,
            };
        case ActionTypes.GET_PRODUCTS:
            return {
                ...state,
                products: payload as Product[],
            };
        case ActionTypes.GET_PRODUCT:
            return {
                ...state,
                selected: payload as Product,
            };
        case ActionTypes.ADD_PRODUCT:
            return {
                ...state,
                products: [
                    ...state.products,
                    (payload as Product)
                ],
            };
        default:
            return state;
    }
}