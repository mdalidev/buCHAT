import { AddCircle, CardGiftcard, EmojiEmotions, Gif, Link } from '@material-ui/icons'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Chat.css'
import ChatHeader from './ChatHeader'
import { selectChannelId, selectChannelName } from './features/appSlice'
import { selectUser } from './features/userSlice'
import db from './firebase'
import Message from './Message'
import firebase from 'firebase'


function Chat() {
    const user = useSelector(selectUser)
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [fileName, setFileName] = useState("");
    const [inputUrl, setInputUrl] = useState("");
    const onChangeFile = (e) => {
        setFileName(e.target.files[0]);
      };

    useEffect(() => {
        if(channelId){
            db.collection('channels')
            .doc(channelId)
            .collection('messages')
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => 
            setMessages(snapshot.docs.map((doc) => doc.data()))
            )
        }
    }, [channelId])

    const sendMessage = (e) => {
        e.preventDefault()

        db.collection('channels').doc(channelId).collection('messages').add({
            user: user,
            messsage: input,
            imageUrl: inputUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput('');
        setInputUrl("");
    }

    return (
        <div className = "chat">
            <ChatHeader 
                channelName = {channelName}
            />

            <div className = "chat__messages">
                { messages.map((message) => (
                    <Message 
                        timestamp = {message.timestamp}
                        message = {message.messsage}
                        user = {message.user}
                        imageUrl={message.imageUrl}
                    />
                ))}
                

            </div>
            <div className = "chat__input">
           
             
             
                <AddCircle style={{color:" #9fafd0"}} />
                <form>
                    <input 
                    value = {input}
                    onChange = {(e) => setInput(e.target.value)}
                    placeholder = {`Type your Message in #${channelName} Channels`}/>
                 
                 <div className="modal__fieldLink">
              <Link/>
              <input
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                type="text"
                placeholder="Optional: inclue a link that gives context"
              ></input>
            </div>

                    <button 
                    onClick = {sendMessage}
                    disabled = {!channelId}
                    className = "chat__inputButton"
                    type = "submit">
                        send
                    </button>
                </form>
                <div className = "chat__inputIcons">
                    <CardGiftcard fontSize
                    = "large"/>
                    <Gif fontSize = "large" />
                    <EmojiEmotions fontSize = "large" />
            </div>
        </div>
    </div>
    )
}

export default Chat
