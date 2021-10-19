import { ThunkAction } from "redux-thunk";

import { getProducts, KnownActions, setError, setLoading } from "./actions";
import { AsyncActionType } from "../types/ActionTypes";
import { fetchJSON } from "../utils/fetchJSON";
import { AppState } from "./store";

export const fetchApi = (type: AsyncActionType, url: string, options = {})
: ThunkAction<Promise<void>, {}, AppState, KnownActions> =>
    async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const products = await fetchJSON(url, options);
            
            dispatch(getProducts(products.body));
        } catch (err: any) {
            dispatch(setError(err));
        } finally {
            dispatch(setLoading(false));
        }
}