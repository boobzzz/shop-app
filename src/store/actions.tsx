import { ActionTypes, ErrorAction, LoadingAction, SortByAction } from "../types/ActionTypes";

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