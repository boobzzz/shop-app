import { ThunkAction } from "redux-thunk";
import { fetchJSON } from "../utils/fetchJSON";
import { ActionTypes } from "../types/ActionTypes";
import { AppState, AsyncActionType, KnownActions } from "./store";

export const fetchApi = (type: AsyncActionType, url: string, options = {})
: ThunkAction<Promise<void>, {}, AppState, KnownActions> =>
    async (dispatch) => {
        dispatch({ type: ActionTypes.LOADING, payload: true });

        try {
            const products = await fetchJSON(url, options);
            
            dispatch({ type: type, payload: products.body });
        } catch (err: any) {
            dispatch({ type: ActionTypes.ERROR, payload: err });
        } finally {
            dispatch({ type: ActionTypes.LOADING, payload: false });
        }
}