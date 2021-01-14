import './App.css';
import {useRef, useState} from 'react'
import firebase from 'firebase/app';
import 'firebase/firestore';
import Sidebar from './Chat/Sidebar';
import Messages from './Chat/Messages'
import Login from './Login/Login'

import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  //your config
};

firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()


function App() {

  const [user,setUser] = useState(null)
  const [name,setName] = useState('')
  const [chatbox,setChatbox] = useState(null)
  const [message,setMessage] = useState('')
  const usersRef = firestore.collection("Users")
  const [messagesRef,setMessageRef] = useState(firestore.collection("1_1"))
  const [messages] = useCollectionData(messagesRef)
  const [users] = useCollectionData(usersRef)
  const messagesEndRef = useRef(null)

  const handelLogin = async(e) => {
    e.preventDefault()
    var flag = false
    users.forEach((usr)=>{
      if(usr.name === name){
        flag = true
        setUser(usr)
      }

    })
    if(!flag){
      const newUsr = {"id":users.length,"name":name}
      await usersRef.add(newUsr).then().catch((err)=>console.log(err.message))
      setUser(newUsr)
    }
    setName('')
  }

  const autoScroll = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  const mesRef = (nm,s) => {
    setChatbox(nm)
    setMessageRef(firestore.collection(s))
  }

  const handleSend = async(e) =>{
    e.preventDefault()
    const newMsg = {
      "time":new Date().getTime(),
      "from":user.name,
      "message":message
    }
    setMessage('')
    await messagesRef.doc(newMsg.time.toString()).set(newMsg).then().catch((err)=>console.log(err.message))
    autoScroll()
  }

  return (
    <div className="App">
      {!user && 
        <Login handelLogin={handelLogin} name= {name} setName= {setName}/>
      }
      {user &&
        <div className="chat">
          <Sidebar users={users} user = {user} mesRef = {mesRef} />
          <div className="chat__main">
            {chatbox && <div className="friend-name">{chatbox}</div> }
            {messages && <Messages messages = {messages} nm = {chatbox} eR = {messagesEndRef} />}
            {chatbox && <div className="compose">
              <form id="message-form" onSubmit = {handleSend}>
                <input type="text" value={message} required 
                  onChange={(e) => setMessage(e.target.value)}/>
                <button>Send</button>
              </form>
            </div>
            }
          </div>
        </div>
      }
    </div>
  );
}




export default App;
