import SockJS from 'sockjs-client'
import {Stomp} from '@stomp/stompjs'

let stompClient = null;
const handlers = []

export const connect = (username) => {
    let socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
        console.log('Connected: ' + frame)
        stompClient.subscribe('/user/' + username + '/private', payload => {
            handlers.forEach(handler => handler(payload))
        })
    })
}

export const addHandler = (handler) => {
    handlers.push(handler)
}

export const disconnect = () => {
    if (stompClient !== null) {
        stompClient.disconnect()
    }
    console.log("Disconnected")
}

export const sendMessage = (message) => {
    if (stompClient !== null) {
        stompClient.send("/app/send-message", {}, JSON.stringify(message));
    } else {
        console.log("ERROR TO SEND MESSAGE")
    }
}

