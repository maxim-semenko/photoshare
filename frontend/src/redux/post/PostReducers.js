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
                loadingFilms: false,
            }
        case types.GET_POST_BY_ID:
            return {
                ...state,
                film: action.payload,
                loadingFilm: false,
            }
        // case types.CREATE_FILM:
        //     return {
        //         ...state,
        //         films: [...state.films, action.payload]
        //     }
        // case types.UPDATE_FILM:
        //     const objIndex = state.films.findIndex((item => item.id === action.payload.id));
        //     let updatedFilms = state.films;
        //     updatedFilms[objIndex] = action.payload
        //     return {
        //         ...state,
        //         films: updatedFilms,
        //     }
        // case types.DELETE_FILM:
        //     return {
        //         ...state,
        //         films: state.films.filter(item => item.id !== action.payload),
        //     }
        // case types.SET_CURRENT_PAGE:
        //     return {
        //         ...state,
        //         currentPage: action.payload
        //     }
        // case types.SET_SIZE_PAGE_FILM:
        //     return {
        //         ...state,
        //         sizePage: action.payload
        //     }
        // case types.SET_LOADING_FILMS:
        //     return {
        //         ...state,
        //         loading: action.payload
        //     }
        // case types.SET_LOADING_FILM:
        //     return {
        //         ...state,
        //         loadingFilm: action.payload
        //     }
        default:
            return state
    }
}

export default postReducers;