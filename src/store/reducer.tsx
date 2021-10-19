import { Reducer } from "redux";
import { Product } from "../types/types";
import { AppState, KnownActions } from "./store";

const initialState: AppState = {
    isLoading: true,
    error: "",
    products: [],
};

export const productsReducer: Reducer<
    AppState, KnownActions
> = (state = initialState, action): AppState => {
    const { type, payload } = action;

    switch (type) {
        case "GET_PRODUCTS":
            return {
                ...state,
                isLoading: false,
                products: payload as Product[],
            };
        case "ERROR":
            return {
                ...state,
                isLoading: false,
                error: payload as string,
            };
        default:
            return state;
    }
}