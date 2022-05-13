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

    async getAllPostsByUserIdSubscribes(userId, page = 0, size = 0) {
        return axios.get(`${API_URL}/subscribes/users/${userId}`, {
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

}

export default new PostService()