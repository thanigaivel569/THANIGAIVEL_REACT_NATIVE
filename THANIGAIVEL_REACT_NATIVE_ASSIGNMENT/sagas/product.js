import {
    put,
    takeLatest
} from "redux-saga/effects";
import * as actionCreators from "../actionCreators/product"
import {
    GET_PRODUCTS, ADD_PRODUCT,DELETE_PRODUCT
} from "../actionTypes/product";
import {
    SEARCH_PRODUCT
} from "../actionTypes/search";
let URI = "http://192.168.1.101:4000";

function* getProducts(action) {
    try {
        let products = yield fetch(`${URI}/products?_page=${action.page}&_limit=${action.limit}`).then(r => r.json());
        yield put(actionCreators.getProductsSuccess(products))
    } catch (error) {
        yield put(actionCreators.getProductsFailure(error))
    }
}

function* deleteProduct(action) {
    try {
        console.log(`${URI}/products?/${action.id}`, 'delete product');
        let products = yield fetch(`${URI}/products?/${action.id}`,{
            method: 'DELETE', 
        }).then(r => r.json());
        yield put(actionCreators.deleteProductSuccess(action.id))
    } catch (error) {
        yield put(actionCreators.deleteProductFailure(error))
    }
}

function* addProduct(action) {
    try {
        let product = yield fetch(`${URI}\products`, {
            body: JSON.stringify(action.product),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
        }).then(r => r.json());
        yield put(actionCreators.addProductSuccess(product))
    } catch (error) {
        yield put(actionCreators.addProductFailure(error))
    }
}

export function* productWatchers() {
    yield takeLatest(GET_PRODUCTS, getProducts)
    yield takeLatest(DELETE_PRODUCT, deleteProduct)
    yield takeLatest(ADD_PRODUCT, addProduct)
}