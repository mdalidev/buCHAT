import Chat from './Chat';
import React, { useEffect } from 'react';
import './App.css';
import Sidebar from './Sibebar'
import { login, logout, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import {auth} from './firebase'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log('user is' ,authUser)
      if(authUser){
        dispatch( login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        })
        )
      } else{
        //log out
        dispatch(logout())
      }
    })
  }, [dispatch])
  return (
    <div className="app" style={{display:"flex"}}>
      { user ? (
        <>
        <Sidebar />
        <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
