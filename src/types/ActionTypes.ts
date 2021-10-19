export enum ActionTypes {
    LOADING = "LOADING",
    ERROR = "ERROR",
    GET_PRODUCTS = "GET_PRODUCTS",
    GET_PRODUCT = "GET_PRODUCT",
    ADD_PRODUCT = "ADD_PRODUCT",
    REMOVE_PRODUCT = "REMOVE_PRODUCT",
    SORT_BY = "SORT_BY"
}

export type AsyncActionType = ActionTypes.GET_PRODUCTS |
                              ActionTypes.GET_PRODUCT |
                              ActionTypes.ADD_PRODUCT |
                              ActionTypes.REMOVE_PRODUCT;