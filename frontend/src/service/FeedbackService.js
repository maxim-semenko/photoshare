import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/feedbacks"
const cookies = new Cookies();

class FeedbackService {

    // Get all posts by userId
    async getAllFeedbackType(page = 0, size = 0) {
        return axios.get(`${API_URL}/types`, {
            params: {
                // sort: 'createdDate,desc',
                page: page,
                size: size,
            },
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getAllFeedbacks(page = 0, size = 0) {
        return axios.get(`${API_URL}/`, {
            params: {
                sort: 'registerDate,desc',
                page: page,
                size: size,
            },
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getUserById(id) {
        return axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async create(request) {
        return axios.post(`${API_URL}/`, request, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }
}

export default new FeedbackService()