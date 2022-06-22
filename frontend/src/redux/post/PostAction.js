import * as types from "./PostActionType"
import PostService from "../../service/PostService";

const gotPostsSuccess = (posts) => ({
    type: types.GET_POSTS_BY_ID,
    payload: posts,
})

const gotPostSuccess = (post) => ({
    type: types.GET_POST_BY_ID,
    payload: post,
})

const createdPostSuccess = (post) => ({
    type: types.CREATE_POST,
    payload: post,
})

const deletedPostSuccess = (id) => ({
    type: types.DELETE_POST,
    payload: id,
})

export const setCurrentPage = (page) => ({
    type: types.SET_CURRENT_PAGE_POST,
    payload: page
})

export const setSizePage = (size) => ({
    type: types.SET_SIZE_PAGE_POST,
    payload: size
})

export const setLoadingPosts = (loading) => ({
    type: types.SET_LOADING_POSTS,
    payload: loading
})

export const setLoadingPost = (loading) => ({
    type: types.SET_LOADING_POST,
    payload: loading
})

export const setIsOpenAbout = (open) => ({
    type: types.SET_IS_OPEN_ABOUT,
    payload: open
})

//============================================ Axios requests ==========================================================

export const getAllPostsByUserId = (userId, currentPage = 0, sizePage = 0) => {
    return function (dispatch) {
        dispatch(setLoadingPosts(true))
        PostService.getAllPostsByUserId(userId, currentPage, sizePage)
            .then(response => {
                dispatch(gotPostsSuccess(response.data))
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoadingPosts(false)
            })
    }
}

export const getPostById = (id) => {
    return function (dispatch) {
        dispatch(setLoadingPost(true))
        PostService.getPostById(id)
            .then((resp) => {
                dispatch(gotPostSuccess(resp.data))
                console.log(resp.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoadingPost(false)
            })
    }
}

export function createPost(post) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            PostService.createPost(post)
                .then((response) => {
                    dispatch(createdPostSuccess(response.data))
                    console.log(response)
                    return resolve(response);
                })
                .catch(error => {
                    console.log(error)
                    return reject(error);
                })
        })
    };
}

export const deletePostById = (postId, userId) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            PostService.deletePostById(postId, userId)
                .then((response) => {
                    dispatch(deletedPostSuccess(postId))
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