import {
    combineReducers
} from "redux";
import searchReducer from './search';
import productReducer from "./product";
import storeReducer from "./store"
import {
    createNavigationReducer
} from "react-navigation-redux-helpers";
import {AppNavigator} from "../containers/AppNavigator";


const navReducer = createNavigationReducer(AppNavigator);

const rootReducer = combineReducers({
    productState: productReducer,
    storeState: storeReducer,
    searchState: searchReducer,
    navState: navReducer
})

export default rootReducer;