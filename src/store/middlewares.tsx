import { ThunkAction } from "redux-thunk";
import { AppState, KnownActions } from "./store";

export const fetchProducts =
(url: string): ThunkAction<Promise<void>, {}, AppState, KnownActions> => async (dispatch) => {
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Failed to fetch");
        }

        const products = await res.json();

        dispatch({ type: "GET_PRODUCTS", payload: products });
    } catch (err: any) {
        dispatch({ type: "ERROR", payload: err });
    }
}