import { AppState } from "./store";

export const getIsLoading = (state: AppState) => state.isLoading;
export const getError = (state: AppState) => state.error;
export const getProducts = (state: AppState) => state.products;
export const getSorted = (state: AppState) => state.sortBy;