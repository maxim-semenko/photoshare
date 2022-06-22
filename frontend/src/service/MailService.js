import axios from "axios"
import {Cookies} from "react-cookie"

const API_URL = "/api/v1/mail"
const cookies = new Cookies()

class MailService {

    async send(request) {
        console.log(request)
        return axios.post(`${API_URL}/`, request, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

}

export default new MailService()