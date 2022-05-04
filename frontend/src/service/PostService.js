import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/posts"
const cookies = new Cookies();

class PostService {

    // Get all posts by userId
    async getAllPostsByUserId(userId) {
        return axios.get(`${API_URL}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getAllPostsByUserIdSubscribes(userId) {
        return axios.get(`${API_URL}/subscribes/users/${userId}?sort=createdDate,desc`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

}

export default new PostService()