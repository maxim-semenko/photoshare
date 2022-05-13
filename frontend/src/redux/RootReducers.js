import {combineReducers} from "redux";
import postReducers from "./post/PostReducers";

// There is store all reducers for work with any entity
const rootReducers = combineReducers({
    dataPosts: postReducers,
})

export default rootReducers