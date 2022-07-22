import * as types from "./FeedbackActionType"

const initialState = {
    feedbacks: [],
    feedback: null,
    loadingFeedbacks: true,
    loadingFeedback: true,
    currentPage: 0,
    sizePage: 10,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
}

const feedbackReducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.GET_FEEDBACKS:
            return {
                ...state,
                feedbacks: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                numberOfElements: action.payload.numberOfElements,
                loadingFeedbacks: false,
            }
        case types.GET_FEEDBACK_BY_ID:
            return {
                ...state,
                feedback: action.payload,
                loadingFeedback: false,
            }
        case types.UPDATE_FEEDBACK_BY_ID:
            const objIndex = state.feedbacks.findIndex((item => item.id === action.payload.id));
            let updatedFeedbacks = state.feedbacks;
            updatedFeedbacks[objIndex] = action.payload
            return {
                ...state,
                feedbacks: updatedFeedbacks,
            }
        case types.SET_CURRENT_PAGE_FEEDBACKS:
            return {
                ...state,
                currentPage: action.payload
            }
        case types.SET_SIZE_PAGE_FEEDBACKS:
            return {
                ...state,
                sizePage: action.payload
            }
        case types.SET_LOADING_FEEDBACKS:
            return {
                ...state,
                loadingFeedbacks: action.payload
            }
        case types.SET_LOADING_FEEDBACK:
            return {
                ...state,
                loadingFeedback: action.payload
            }
        default:
            return state
    }
}

export default feedbackReducers;