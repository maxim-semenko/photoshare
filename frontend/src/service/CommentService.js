import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/comments"
const cookies = new Cookies();

class CommentService {

    /**
     * Get all comments by postId
     * @param postId needed post
     * @param page the value of page
     * @param size the value of size
     * @returns {Promise<AxiosResponse<any>>} response of comments
     */
    async getAllCommentsByPostId(postId, page = 0, size = 0) {
        return axios.get(`${API_URL}/posts/${postId}`, {
            params: {
                sort: 'createdAt,desc',
                page: page,
                size: size,
            },
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getCommentById(id) {
        return axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    /**
     * Method that create a new comment.
     * @param request data of a new comment
     * @returns {Promise<AxiosResponse<any>>} response of created comment
     */
    async createComment(request) {
        return axios.post(`${API_URL}/`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async deleteCommentByCommentIdAndUserId(commentId, userId) {
        return axios.delete(`${API_URL}/${commentId}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }
}

export default new CommentService()