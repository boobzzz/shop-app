import { SortByAction } from "./store";

export const sortBy: (param: string) => SortByAction = (value: string) => (
    {
        type: "SORT_BY",
        payload: value
    }
);