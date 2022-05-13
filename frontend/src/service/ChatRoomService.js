import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/chat-rooms"
const cookies = new Cookies();

class ChatRoomService {

    // Get all posts by userId
    async getBySenderIdAndRecipientsId(senderId, recipientId) {
        return axios.get(`${API_URL}/senders/${senderId}/recipients/${recipientId}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

    async getHistory(chatCode) {
        return axios.get(`${API_URL}/history/${chatCode}`, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`,
            }
        })
    }

}

export default new ChatRoomService()