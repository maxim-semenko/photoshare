import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/posts"
const cookies = new Cookies();

class PostService {

    // Get all posts by userId
    async getAllPostsByUserId(userId, page = 0, size = 0) {
        return axios.get(`${API_URL}/users/${userId}`, {
            params: {
                sort: 'createdDate,desc',
                page: page,
                size: size,
            },
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getPostById(id) {
        return axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }


    async getAllPostsByUserIdSubscribes(userId, page = 0, size = 0) {
        return axios.get(`${API_URL}/users/${userId}/subscribes`, {
            params: {
                sort: 'createdDate,desc',
                page: page,
                size: size,
            },
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getAllBookmarkPostsByUserId(userId, page = 0, size = 0) {
        return axios.get(`${API_URL}/users/${userId}/bookmarks`, {
            params: {
                sort: 'bookmark.createdDate,desc',
                page: page,
                size: size,
            },
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async createPost(request) {
        return axios.post(`${API_URL}/`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async deletePostById(postId, userId) {
        return axios.delete(`${API_URL}/${postId}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }
}

export default new PostService()