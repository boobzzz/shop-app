import { ThunkAction } from "redux-thunk";

import { setError, setLoading } from "./actions";
import { AsyncActionType, KnownActions } from "../types/ActionTypes";
import { fetchJSON } from "../utils/fetchJSON";
import { AppState } from "./store";

export const fetchApi = (type: AsyncActionType, url: string, options = {}, payload?: any)
: ThunkAction<Promise<void>, {}, AppState, KnownActions> =>
    async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const res = await fetchJSON(url, options);
            console.log(res);
            
            dispatch({ type: type, payload: payload ? payload : res.body });
        } catch (err: any) {
            dispatch(setError(err));
        } finally {
            dispatch(setLoading(false));
        }
}