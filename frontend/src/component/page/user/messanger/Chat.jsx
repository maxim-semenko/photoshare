import React, {useEffect, useRef, useState} from 'react';

import {makeStyles} from "@mui/styles";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import {Fab, ListItem, ListItemIcon, ListItemText, Paper, TextField} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import SendIcon from '@mui/icons-material/Send';
import image from "../../../../image/img.png";
import ChatRoomService from "../../../../service/ChatRoomService";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import ListFriends from "./ListFriends";
import moment from "moment-timezone";
import UserService from "../../../../service/UserService";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '81.8vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '68.4vh',
        overflowY: 'auto'
    }
});

let stompClient = null;
const Chat = () => {
    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem("user"))
    const [users, setUsers] = useState([])
    const [containerUsers, setContainerUsers] = useState([])
    const [currentChatRoom, setCurrentChatRoom] = useState(null)
    const [messages, setMessages] = useState([])
    const [connected, setConnected] = useState(false)
    const chatRef = useRef(null);


    const messageInputRef = useRef(null);


    useEffect(() => {
        connect()
        UserService.getAllFollowingsByUserId(user.id)
            .then(response => {
                console.log(response.data)
                setUsers(response.data.content)
                setContainerUsers(response.data.content)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (messages.length !== 0) {
            scrollToMyRef()
        }
    }, [messages])

    const connect = () => {
        let sock = new SockJS('//localhost:8095/ws');
        stompClient = over(sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        if (stompClient.connected) {
            stompClient.subscribe('/user/' + user.username + '/private', getMessage);
            stompClient.send("/app/chat/addUser", {}, user.username)
            setConnected(true)
        }
    }

    const onError = () => {
        console.log("ERROR TO CONNECT")
    }

    const getMessage = (payload) => {
        const payloadData = JSON.parse(payload.body);
        setMessages(messages => [...messages, payloadData])
    }

    const sendMessageHandler = () => {
        if (stompClient !== null) {
            let textMessage = messageInputRef.current.value
            if (textMessage.length > 0 && textMessage.length < 2049) {
                const chatMessage = {
                    chatRoom: currentChatRoom,
                    chatCode: currentChatRoom.chatCode,
                    sender: currentChatRoom.sender,
                    recipient: currentChatRoom.recipient,
                    content: textMessage,
                    createdDate: new Date(),
                };
                setMessages([...messages, chatMessage])
                stompClient.send("/app/send-message", {}, JSON.stringify(chatMessage));
                messageInputRef.current.value = ""
            }
        }
    }

    const getChatRoom = (senderId, recipientId) => {
        ChatRoomService.getBySenderIdAndRecipientsId(senderId, recipientId)
            .then(responseChatRoom => {
                setCurrentChatRoom(responseChatRoom.data)
                ChatRoomService.getHistory(responseChatRoom.data.id)
                    .then(responseMessages => {
                        setMessages(responseMessages.data)
                    })
            })
    }

    const handlerSearchUsername = (event) => {
        let value = event.target.value;
        if (value === '') {
            setUsers(containerUsers);
        } else {
            const filterUserList = containerUsers.filter(user => {
                return user.username.toLowerCase().includes(value.toLowerCase())
            })
            setUsers(filterUserList)
        }
    }

    const LeftMessage = (message, index) => {
        return (
            <ListItem key={index}>
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText align="left" primary={message.content} style={{
                            backgroundColor: "#616062",
                            color: "white",
                            display: "inline-block",
                            maxWidth: "50%",
                            textAlign: "left",
                            float: "left",
                            padding: "5px 8px 5px 8px",
                            borderRadius: "5px"
                        }}
                        />
                    </Grid>
                    <ListItemText align="left" secondary={moment(message.createdDate).format('MMMM D YYYY, h:mm A')}/>
                </Grid>
            </ListItem>
        )
    }

    const RightMessage = (message, index) => {
        return (
            <ListItem key={index}>
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText align="right" primary={message.content}
                                      style={{
                                          backgroundColor: "#6c359d",
                                          color: "white",
                                          display: "inline-block",
                                          maxWidth: "50%",
                                          textAlign: "left",
                                          float: "right",
                                          padding: "5px 8px 5px 8px",
                                          borderRadius: "5px"
                                      }}/>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItemText
                            align="right"
                            secondary={moment(message.createdDate).format('MMMM D YYYY, h:mm A')}
                        />
                    </Grid>
                </Grid>
            </ListItem>
        )
    }


    const scrollToMyRef = () => {
        chatRef.current?.scrollIntoView()
    };

    const PrintMessage = (message, index) => {
        if (message.sender.username === user.username) {
            return RightMessage(message, index)
        } else {
            return LeftMessage(message, index)
        }
    }

    const handleEnterKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessageHandler()
        }
    }

    return (
        <div>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src={image}/>
                            </ListItemIcon>
                            <ListItemText primary={user.username}/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField label="Search" variant="outlined" fullWidth onChange={handlerSearchUsername}/>
                    </Grid>
                    <Divider/>
                    <ListFriends list={users} getChatRoom={getChatRoom}/>
                </Grid>
                <Grid item xs={9}>
                    {
                        currentChatRoom !== null ?
                            <div>
                                <List className={classes.messageArea}>
                                    {
                                        messages.map((message, index) => (
                                            <div>
                                                {PrintMessage(message, index)}
                                                <div ref={chatRef}/>
                                            </div>
                                        ))
                                    }
                                </List>
                                <Divider/>
                                <Grid container style={{padding: '20px'}}>
                                    <Grid item xs={11}>
                                        <TextField
                                            onKeyDown={handleEnterKeyDown}
                                            label="Type message"
                                            fullWidth
                                            autoComplete="off"
                                            inputRef={messageInputRef}
                                            // onChange={handlerChangeText}
                                        />
                                    </Grid>
                                    <Grid xs={1} align="right">
                                        <Fab color="primary" disabled={!connected} onClick={() => sendMessageHandler()}>
                                            <SendIcon/>
                                        </Fab>
                                    </Grid>
                                </Grid>
                            </div>
                            :
                            null
                    }

                </Grid>
            </Grid>
        </div>
    );
}

export default Chat;