import {
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE,
    GET_PRODUCT,
    GET_PRODUCT_FAILURE,
    GET_PRODUCT_SUCCESS,
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE
} from "../actionTypes/product";

export function getProducts(page, limit) {
    return {
        type: GET_PRODUCTS,
        page,
        limit
    }
}

export function getProductsSuccess(products) {
    return {
        type: GET_PRODUCTS_SUCCESS,
        products
    }
}

export function getProductsFailure(error) {
    return {
        type: GET_PRODUCTS_FAILURE,
        error
    }
}

export function getProduct(id) {
    return {
        type: GET_PRODUCT,
        id
    }
}

export function getProductSuccess(product) {
    return {
        type: GET_PRODUCT_SUCCESS,
        product
    }
}

export function getProductFailure(error) {
    return {
        type: GET_PRODUCT_FAILURE,
        error
    }
}

export function addProduct(product) {
    return {
        type: ADD_PRODUCT,
        product
    }
}

export function addProductSuccess(product) {
    return {
        type: ADD_PRODUCT_SUCCESS,
        product
    }
}

export function addProductFailure(error) {
    return {
        type: ADD_PRODUCT_FAILURE,
        error
    }
}
export function deleteProduct(id) {
    return {
        type: DELETE_PRODUCT,
        id
    }
}

export function deleteProductSuccess(id) {
    return {
        type: DELETE_PRODUCT_SUCCESS,
        id        
    }
}

export function deleteProductFailure(error) {
    return {
        type: DELETE_PRODUCT_FAILURE,
        error
    }
}