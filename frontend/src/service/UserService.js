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

}

export default new UserService()