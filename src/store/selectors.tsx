// import { createSelector } from 'reselect';

import { AppState } from "./store";

export const getIsLoading = (state: AppState) => state.isLoading;
export const getError = (state: AppState) => state.error;
export const getProducts = (state: AppState) => state.products;
export const getSorted = (state: AppState) => state.sortBy;
// export const productsSelector = createSelector(getProducts, getPinned, (products, pinnedItem) => {
//     if (isEmpty(pinnedItem)) return products

//     const filtered = products.filter(item => item !== pinnedItem)
//     filtered.unshift({...pinnedItem, pinned: true})

//     return filtered
// })