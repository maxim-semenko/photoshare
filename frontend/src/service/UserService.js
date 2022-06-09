import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/users"
const cookies = new Cookies();

class UserService {

    async getAllByUsername(username, page = 0, size = 0) {
        return axios.get(`${API_URL}/byUsername/${username}`, {
            params: {
                sort: 'username,asc',
                page: page,
                size: size,
            },
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getAllFollowersByUserId(userId, page = 0, size = 0) {
        return axios.get(`${API_URL}/users/${userId}/followers`, {
            params: {
                sort: 'username,asc',
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
                sort: 'username,asc',
                page: page,
                size: size,
            },
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    /**
     * Update user's password by id.
     * @param request data
     * @param id user's id
     * @returns {Promise<AxiosResponse<any>>} AxiosResponse
     */
    async updatePasswordById(request, id) {
        console.log(`${API_URL}/${id}/password/`)
        return axios.patch(`${API_URL}/${id}/password/`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            },
        })
    }

}

export default new UserService()