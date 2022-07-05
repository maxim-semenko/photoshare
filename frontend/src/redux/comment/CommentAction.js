import * as types from "./CommentActionType"
import CommentService from "../../service/CommentService";

const gotCommentsSuccess = (comments) => ({
    type: types.GET_COMMENTS_BY_FILM_ID,
    payload: comments,
})

const createdCommentSuccess = (comment) => ({
    type: types.CREATE_COMMENT,
    payload: comment,
})

const deletedCommentSuccess = (id) => ({
    type: types.DELETE_COMMENT,
    payload: id,
})

export const setCurrentPage = (page) => ({
    type: types.SET_CURRENT_PAGE_COMMENTS,
    payload: page
})

export const setSizePage = (size) => ({
    type: types.SET_SIZE_PAGE_COMMENTS,
    payload: size
})

export const setLoadingComments = (loading) => ({
    type: types.SET_LOADING_COMMENTS,
    payload: loading
})

//============================================ Axios requests ==========================================================

export const getAllCommentsByPostId = (postId, currentPage = 0, sizePage = 0) => {
    return function (dispatch) {
        dispatch(setLoadingComments(true))
        CommentService.getAllCommentsByPostId(postId, currentPage, sizePage)
            .then(response => {
                dispatch(gotCommentsSuccess(response.data))
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoadingComments(false)
            })
    }
}

export function createComment(comment) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            CommentService.createComment(comment)
                .then((response) => {
                    console.log(response)
                    dispatch(createdCommentSuccess(response.data))
                    return resolve(response);
                })
                .catch(error => {
                    console.log(error)
                    return reject(error);
                })
        })
    };
}

export const deleteCommentByCommentIdAndUserId = (commentId, userId) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            CommentService.deleteCommentByCommentIdAndUserId(commentId, userId)
                .then((response) => {
                    dispatch(deletedCommentSuccess(commentId))
                    console.log(response)
                    return resolve(response);
                })
                .catch(error => {
                    console.log(error)
                    return reject(error);
                })
        })
    }
}