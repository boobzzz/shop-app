import { Reducer } from "redux";

import { ActionTypes, KnownActions } from "../types/ActionTypes";
import { Product } from "../types/BaseItem";
import { AppState } from "./store";

const initialState: AppState = {
    isLoading: false,
    error: "",
    sortBy: "az",
    products: [],
    product: {
        id: "",
        imageUrl: "",
        name: "",
        count: 0,
    },
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
                product: (payload as Product[])[0],
            };
        case ActionTypes.ADD_PRODUCT:
            return {
                ...state,
                products: [
                    ...state.products,
                    (payload as Product)
                ],
            };
        case ActionTypes.UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map(p =>
                    p.id === (payload as Product).id
                        ? p = (payload as Product)
                        : p
                ),
                product: (payload as Product),
            };
        case ActionTypes.REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(p =>
                    p.id !== payload as string
                ),
            };
        default:
            return state;
    }
}