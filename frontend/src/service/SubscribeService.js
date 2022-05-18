import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/subscribes"
const cookies = new Cookies();

class SubscribeService {

    // Get all posts by userId
    async getAllByUserId(userId, page = 0, size = 0) {
        return axios.get(`${API_URL}/users/${userId}/followers`, {
            params: {
                sort: 'following.username,asc',
                page: page,
                size: size,
            },
            headers: {

                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getAllFollowingsByUserId(userId, page = 0, size = 0) {
        return axios.get(`${API_URL}/users/${userId}/followings`, {
            params: {
                sort: 'following.username,asc',
                page: page,
                size: size,
            },
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

export default new SubscribeService()