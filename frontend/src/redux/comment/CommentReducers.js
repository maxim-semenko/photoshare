import * as types from "./CommentActionType"

const initialState = {
    comments: [],
    loadingComments: true,
    currentPage: 0,
    sizePage: 9,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
}

const commentReducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.GET_COMMENTS_BY_FILM_ID:
            return {
                ...state,
                comments: state.comments.concat(action.payload.content),
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                numberOfElements: action.payload.numberOfElements,
                loadingComments: false,
            }
        case types.CREATE_COMMENT:
            return {
                ...state,
                comments: [...state.comments.slice(0, 0), action.payload, ...state.comments.slice(0)],
                totalElements: state.totalElements + 1,
            }
        case types.DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(item => item.id !== action.payload),
                totalElements: state.totalElements - 1,
            }
        case types.SET_CURRENT_PAGE_COMMENTS:
            return {
                ...state, currentPage: action.payload
            }
        case types.SET_SIZE_PAGE_COMMENTS:
            return {
                ...state, sizePage: action.payload
            }
        case types.SET_LOADING_COMMENTS:
            return {
                ...state, loadingComments: action.payload
            }
        default:
            return state
    }
}

export default commentReducers;