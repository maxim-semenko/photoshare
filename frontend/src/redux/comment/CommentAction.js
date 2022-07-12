import * as types from "./CommentActionType"
import CommentService from "../../service/CommentService";
import {setLoadingPost} from "../post/PostAction";

const gotCommentsSuccess = (comments) => ({
    type: types.GET_COMMENTS_BY_POST_ID,
    payload: comments,
})

const gotCommentSuccess = (comment) => ({
    type: types.GET_COMMENTS_BY_ID,
    payload: comment,
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

export const setLoadingComment = (loading) => ({
    type: types.SET_LOADING_COMMENT,
    payload: loading
})

export const resetDate = () => ({
    type: types.RESET_DATA
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

export const getCommentById = (id) => {
    return function (dispatch) {
        dispatch(setLoadingComment(true))
        CommentService.getCommentById(id)
            .then((resp) => {
                dispatch(gotCommentSuccess(resp.data))
                console.log(resp.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoadingComment(false)
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