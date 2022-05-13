import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/bookmarks"
const cookies = new Cookies();

class LikeService {

    async getAllBookmarksByUserId(userId, page = 0, size = 0) {
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

    // Get all posts by userId
    async addBookmark(postId, userId) {
        return axios.post(`${API_URL}/posts/${postId}/users/${userId}`, null, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async deleteBookmark(postId, userId) {
        return axios.delete(`${API_URL}/posts/${postId}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

}

export default new LikeService()