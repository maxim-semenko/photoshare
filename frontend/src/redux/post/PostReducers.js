import * as types from "./PostActionType"

const initialState = {
    posts: [],
    post: null,
    loadingPosts: true,
    loadingPost: true,
    currentPage: 1,
    sizePage: 9,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
}

const postReducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.GET_POSTS_BY_ID:
            return {
                ...state,
                posts: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                numberOfElements: action.payload.numberOfElements,
                loadingPosts: false,
            }
        case types.GET_POST_BY_ID:
            return {
                ...state, post: action.payload,
                loadingPost: false,
            }
        case types.CREATE_POST:
            return {
                ...state,
                posts: [...state.posts.slice(0, 0), action.payload, ...state.posts.slice(0)],
                totalElements: state.totalElements + 1,
            }
        case types.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(item => item.id !== action.payload),
                totalElements: state.totalElements - 1,
            }
        case types.SET_CURRENT_PAGE_POST:
            return {
                ...state, currentPage: action.payload
            }
        case types.SET_SIZE_PAGE_POST:
            return {
                ...state, sizePage: action.payload
            }
        case types.SET_LOADING_POSTS:
            return {
                ...state, loadingPosts: action.payload
            }
        case types.SET_LOADING_POST:
            return {
                ...state, loadingPost: action.payload
            }
        default:
            return state
    }
}

export default postReducers;