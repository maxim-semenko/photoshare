import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/likes"
const cookies = new Cookies();

class LikeService {

    // Get all posts by userId
    async addLike(postId, userId) {
        return axios.post(`${API_URL}/posts/${postId}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async deleteLike(postId, userId) {
        return axios.delete(`${API_URL}/posts/${postId}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

}

export default new LikeService()