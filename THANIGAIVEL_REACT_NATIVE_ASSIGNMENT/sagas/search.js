import {
    put,
    takeLatest, throttle
} from "redux-saga/effects";
import * as actionCreators from "../actionCreators/search"
import {
    SEARCH_PRODUCT
} from "../actionTypes/search";

let URI = "http://192.168.0.101:4000";

function* searchProduct(action) {
    try {
        console.log(`http://192.168.0.101:4000/products?q=${action.search}&_page=${action.page}&_limit=${action.limit}`);
        let products = yield fetch(`${URI}/products?q=${action.search}&_page=${action.page}&_limit=${action.limit}`).then(r => r.json());
        yield put(actionCreators.searchProductSuccess(products))
    } catch (error) {
        yield put(actionCreators.searchProductFailure(error))
    }
}
export function* searchWatchers() {
    yield  takeLatest(SEARCH_PRODUCT, searchProduct)
}