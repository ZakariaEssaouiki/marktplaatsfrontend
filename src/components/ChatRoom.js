import React, { useEffect, useState } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { ToastContainer, toast } from 'react-toastify';

var stompClient = null;
const ChatRoom = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({
        name: '',
        sub: '',
    });

    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [messages,setMessages] = useState([]);
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        verzenderId: '',
        ontvangerId: '',
        connected: false,
        text: '',
        datum: ''
    });
    useEffect(() => {
        console.log(userData);
    }, [userData]);

    useEffect(() => {
        //setLoading(true);
        fetch('/login/getUser', { credentials: 'include' })
            .then(response => response.text())
            .then(body => {
                if (body === '') {
                    setAuthenticated(false);
                } else {
                    setUser(JSON.parse(body));
                    setAuthenticated(true);
                }
                //setLoading(false);
            });
    }, [setAuthenticated, setUser/*, setLoading */])

    const privateMessages = async(e) =>{
        var senderReceiver = {
            senderName: user.name,
            senderId: user.sub,
            receiverName: 'Zakaria afedjah'
        }
        e.preventDefault();
        const request = await fetch(
            "http://localhost:8080/bericht/getAllFromSenderAndReceiver",{
            method: "GET",
            headers:{
                "Content-Type":"application/json"
            },
            //body: JSON.stringify(senderReceiver),
        });
        const response = await request.json();
        setMessages(response);
        //alert(messages);
    }

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/websocket');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setUserData({ ...userData, "connected": true });
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + user.name + '/private', onPrivateMessage);
        userJoin();
    }

    const userJoin = () => {
        var chatMessage = {
            verzenderName: user.name,
            verzenderId: user.sub,
            status: "JOIN"
        };
        stompClient.send("/app/create", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.verzenderName)){
                    privateChats.set(payloadData.verzenderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
            default:
                console.log("Kon payload status niet ophalen");
        }
    }

    // const setAllMessagesAndTabs = (payload) => {
    //     var payloadData = JSON.parse(payload.body);
    //     for (let index = 0; index < payloadData.length; index++) {
    //         const element = payloadData[index];
    //         switch (element.status) {
    //             case "JOIN":
    //                 if (!privateChats.get(payloadData.verzenderName)) {
    //                     privateChats.set(payloadData.verzenderName, []);
    //                     setPrivateChats(new Map(privateChats));
    //                 }
    //                 break;
    //             case "MESSAGE":
    //                 if (element.ontvangerName != null) {
    //                     if (element.verzenderName === user.name || element.ontvangerName === user.name) {
    //                         if (element.verzenderName === user.name) {
    //                             if (!privateChats.get(element.ontvangerName)) {
    //                                 privateChats.set(element.ontvangerName, []);
    //                                 privateChats.get(element.ontvangerName).push(element);
    //                                 setPrivateChats(new Map(privateChats));
    //                             }
    //                             else {
    //                                 privateChats.get(element.ontvangerName).push(element);
    //                             }
    //                         }
    //                         else {
    //                             if (!privateChats.get(element.verzenderName)) {
    //                                 privateChats.set(element.verzenderName, []);
    //                                 privateChats.get(element.verzenderName).push(element);
    //                                 setPrivateChats(new Map(privateChats));
    //                             }
    //                             else {
    //                                 privateChats.get(element.verzenderName).push(element);
    //                             }
    //                         }
    //                     }
    //                 }
    //                 else {
    //                     publicChats.push(element);
    //                     setPublicChats([...publicChats]);
    //                     }
    //                 break;
    //             default:
    //                 console.log("Hmm");
    //         }
    //     }
    // }

const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    if(privateChats.get(payloadData.verzenderName)){
        privateChats.get(payloadData.verzenderName).push(payloadData);
        setPrivateChats(new Map(privateChats));
    }else{
        let list =[];
        list.push(payloadData);
        privateChats.set(payloadData.verzenderName,list);
        setPrivateChats(new Map(privateChats));
    }
}

const onError = (err) => {
    console.log(err);
}

const getAllPublicMessages = () => {
    stompClient.send("/app/getAll", {});
}

const getAllFromSenderAndReceiver=() =>{
    var senderReceiver = {
        senderName: user.name,
        senderId: user.sub,
        receiverName: 'Zakaria afedjah'
    }
    stompClient.send("/app/getAllFromSenderAndReceiver",{},JSON.stringify(senderReceiver));
}

const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, "text": value });
}

const sendValue = () => {
    if (stompClient) {
        var chatMessage = {
            verzenderName: user.name,
            verzenderId: user.sub,
            text: userData.text,
            status: "MESSAGE"
        };
        if(chatMessage.text.trim() !== ""){
            stompClient.send("/app/create", {}, JSON.stringify(chatMessage));
        }
        setUserData({ ...userData, "text": "" });
    }
}

const sendPrivateValue = () => {
    if (stompClient) {
        var chatMessage = {
            verzenderName: user.name,
            verzenderId: user.sub,
            ontvangerName: tab,
            text: userData.text,
            status: "MESSAGE"
        };
        if(chatMessage.text.trim() !== ""){
        if (user.name !== tab) {
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
        }
        stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
        setUserData({ ...userData, "text": "" });
        }
    }
}

const handleUsername = () => {
    setUserData({ ...userData, "username": user.sub });
}

const registerUser = () => {
    if(authenticated){
        connect();
    }
    else{
        toast.error("Log eerst in om deel te nemen aan de chat.");
    }
}

return (
    <div className="container">
        {userData.connected ?
            <div className="chat-box">
                <div className="member-list">
                    <ul>
                        <li onClick={() => { setTab("CHATROOM") }} className={`member ${tab === "CHATROOM" && "active"}`}>Chatroom</li>
                        {[...privateChats.keys()].map((name, index) => (
                            <li onClick={() => { setTab(name) }} className={`member ${tab === name && "active"}`} key={index}>{name}</li>
                        ))}
                    </ul>
                </div>
                {tab === "CHATROOM" && <div className="chat-content">
                    <ul className="chat-messages">
                        {publicChats.map((chat, index) => (
                            <li className={`message ${chat.verzenderName === user.name && "self"}`} key={index}>
                                {chat.verzenderName !== user.name && <div className="avatar">{chat.verzenderName}</div>}
                                <div className="message-data">{chat.text}</div>
                                {chat.verzenderName === user.name && <div className="avatar self">{chat.verzenderName}</div>}
                            </li>
                        ))}
                    </ul>

                    <div className="send-message">
                        <input type="text" className="input-message" placeholder="enter the message" value={userData.text} onChange={handleMessage} />
                        <button type="button" className="send-button" onClick={sendValue}>send</button>
                    </div>
                </div>}
                {tab !== "CHATROOM" && <div className="chat-content">
                    <ul className="chat-messages">
                        {[...privateChats.get(tab)].map((chat, index) => (
                            <li className={`message ${chat.verzenderName === user.name && "self"}`} key={index}>
                                {chat.verzenderName !== user.name && <div className="avatar">{chat.verzenderName}</div>}
                                <div className="message-data">{chat.text}</div>
                                {chat.verzenderName === user.name && <div className="avatar self">{chat.verzenderName}</div>}
                            </li>
                        ))}
                    </ul>

                    <div className="send-message">
                        <input type="text" className="input-message" placeholder="enter the message" value={userData.text} onChange={handleMessage} />
                        <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                    </div>
                </div>}
            </div>
            :
            <div className="register">
                <input
                    id="user-name"
                    placeholder={user.name}
                    name="userName"
                    value={userData.username}
                    onChange={handleUsername}
                    margin="normal"
                    disabled="disabled"
                />
                <button type="button" onClick={registerUser} onClickCapture={privateMessages}>
                    Treedt chat binnen
                </button>
                <ToastContainer/>
            </div>}
    </div>
)
}

export default ChatRoom