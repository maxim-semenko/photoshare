import React, {useEffect, useRef, useState} from 'react';

import {makeStyles} from "@mui/styles";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import {Fab, ListItem, ListItemIcon, ListItemText, Paper, TextField} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import SendIcon from '@mui/icons-material/Send';
import image from "../../../image/img.png";
import SubscribeService from "../../../service/SubscribeService";
import ChatRoomService from "../../../service/ChatRoomService";
import SockJS from "sockjs-client";
import {over} from "stompjs";

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
    const [currentChatRoom, setCurrentChatRoom] = useState(null)
    const [messages, setMessages] = useState([])
    const [currentText, setCurrentText] = useState("")
    const [connected, setConnected] = useState(false)
    const chatRef = useRef(null);

    useEffect(() => {
        connect()
        SubscribeService.getAllByUserId(user.id)
            .then(response => {
                setUsers(response.data.content)
            })
    }, [])

    useEffect(() => {
        if (messages.length !== 0) {
            scrollToMyRef()
        }
    }, [messages])

    const connect = () => {
        let sock = new SockJS('//localhost:8090/ws');
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
            const chatMessage = {
                chatRoom: currentChatRoom,
                chatCode: currentChatRoom.chatCode,
                sender: currentChatRoom.sender,
                recipient: currentChatRoom.recipient,
                content: currentText,
            };
            setMessages([...messages, chatMessage])
            stompClient.send("/app/send-message", {}, JSON.stringify(chatMessage));
            setCurrentText("")
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

    const handlerChangeText = (event) => {
        setCurrentText(event.target.value)
    }

    const LeftMessage = (content, index) => {
        return (
            <ListItem key={index}>
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText align="left" primary={content} style={{
                            backgroundColor: "green",
                            display: "inline-block",
                            float: "left",
                            padding: "3px",
                            borderRadius: "5px"
                        }}
                        />
                    </Grid>
                    <Grid item xs={12}><ListItemText align="left" secondary="09:31"/></Grid>
                </Grid>
            </ListItem>
        )
    }

    const RightMessage = (content, index) => {
        return (
            <ListItem key={index}>
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText align="right" primary={content}
                                      style={{
                                          backgroundColor: "red",
                                          display: "inline-block",
                                          float: "right",
                                          padding: "3px",
                                          borderRadius: "5px"
                                      }}/>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItemText align="right" secondary="09:30"/>
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
            return RightMessage(message.content, index)
        } else {
            return LeftMessage(message.content, index)
        }
    }

    return (
        <div>
            <Grid container>
            </Grid>
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
                        <TextField label="Search" variant="outlined" fullWidth/>
                    </Grid>
                    <Divider/>
                    <List>
                        {
                            users.map((item, index) => (
                                <ListItem button key={index}
                                          onClick={() => getChatRoom(user.id, item.following.id)}>
                                    <ListItemIcon>
                                        <Avatar alt="Remy Sharp"
                                                src="https://material-ui.com/static/images/avatar/1.jpg"/>
                                    </ListItemIcon>
                                    <ListItemText primary={item.following.username}/>
                                </ListItem>
                            ))
                        }
                    </List>
                </Grid>
                <Grid item xs={9}>
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
                                       label="Type message"
                                       fullWidth
                                       autoComplete="off"
                                       value={currentText}
                                       onChange={handlerChangeText}/>
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" disabled={!connected} onClick={() => sendMessageHandler()}>
                                <SendIcon/>
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Chat;