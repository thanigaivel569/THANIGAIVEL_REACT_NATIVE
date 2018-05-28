import {
    SEARCH_PRODUCT,
    SEARCH_PRODUCT_SUCCESS,
    SEARCH_PRODUCT_FAILURE
} from "../actionTypes/search";

export function searchProduct(page, limit, search) {
    return {
        type: SEARCH_PRODUCT,
        page,
        limit,
        search
    }
}

export function searchProductSuccess(products) {
    return {
        type: SEARCH_PRODUCT_SUCCESS,
        products
    }
}

export function searchProductFailure(error) {
    return {
        type: SEARCH_PRODUCT_FAILURE,
        error
    }
}