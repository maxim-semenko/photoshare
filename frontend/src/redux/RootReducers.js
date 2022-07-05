import {combineReducers} from "redux";
import postReducers from "./post/PostReducers";
import commentReducers from "./comment/CommentReducers";

// There is store all reducers for work with any entity
const rootReducers = combineReducers({
    dataPosts: postReducers,
    dataComments: commentReducers,
})

export default rootReducers