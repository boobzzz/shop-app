import { LoadingAction, SortByAction } from "./store";
import { ActionTypes } from "../types/ActionTypes";

export const setLoading: (param: boolean) => LoadingAction = (param: boolean) => (
    {
        type: ActionTypes.LOADING,
        payload: param
    }
);

export const sortBy: (param: string) => SortByAction = (param: string) => (
    {
        type: ActionTypes.SORT_BY,
        payload: param
    }
);