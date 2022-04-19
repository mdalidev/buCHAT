import { Avatar } from '@material-ui/core'
import React from 'react'
import './Message.css'

function Message( { timestamp, message,imageUrl, user }) {
    return (
        <div className = "message">
            <Avatar 
                src = {user.photo}
            />
            <div className ='message__info'>
                <h4>
                    {user.displayName}
                    <span className = "message__timestamp">
                        {new Date(timestamp?.toDate()).toLocaleString()}
                    </span>
                </h4>
                    <p>{message}</p>
                    <img src={imageUrl} alt="" />
            </div>
        </div>
    )
}

export default Message
