import './App.css';
import {useRef, useState} from 'react'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAuIwQB0Mu4DrKZJhUcxhiQzF65NQJh17M",
  authDomain: "connect-me-b56ac.firebaseapp.com",
  projectId: "connect-me-b56ac",
  storageBucket: "connect-me-b56ac.appspot.com",
  messagingSenderId: "1068230467868",
  appId: "1:1068230467868:web:6d37a9b0519e38577bdad9"
};

firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()


function App() {

  const [user,setUser] = useState(null)
  const [name,setName] = useState('')
  const [chatbox,setChatbox] = useState(null)
  const [message,setMessage] = useState('')
  // const messagesRef = firestore.collection('1_3')
  const usersRef = firestore.collection("Users")
  const [messagesRef,setMessageRef] = useState(firestore.collection("1_1"))
  const [messages] = useCollectionData(messagesRef)
  const [users] = useCollectionData(usersRef)
  // const sendMessage = async(e) => {
  //   e.preventDefault()
  //   await messagesRef.document("1_3").setData({"chat":[...messages,message]})

  // }

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

  

  const messagesEndRef = useRef(null)

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
        <div className="centered-form">
          <div className="centered-form__box">
            <h1>Login</h1>
            <form onSubmit={handelLogin}>
              <label>Name</label>
              <input
                type="text"
                required
                value = {name}
                onChange={(e) => setName(e.target.value)}
              />
              <button>Login</button>
            </form>
          </div>
        </div>
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

const GetChatId = (s1,s2) =>  {
  if(parseInt(s1) < parseInt(s2)){
    return s1+"_"+s2
  }
  return s2+"_"+s1
}

const Sidebar = ({users,user,mesRef}) => {
  return (
    <div className="chat__sidebar">
      <h2 className="my-name">{user.name}</h2>
      <h3 className="list-title">Peoples</h3>
      <ul className="users">
      {users.map( usr => (
        usr.id === user.id ? null:
        <li key = {usr.id} onClick = {
          () => {mesRef(usr.name,GetChatId(usr.id,user.id))}
        }>{usr.name}</li>
      ))}
      </ul>
    </div>
  );
}

const Messages = ({messages,nm,eR}) => {
  return(
    <div className="chat__messages">
      {messages.map(message => (
        
        <div className={message.from !== nm ? "message-right":"message-left"} key = {message.time}>
          
          <p>
            <span className="message__name">{message.from}</span>
            {/* <span className="message_meta">{Date(message.time).toLocaleTimeString()}</span> */}
          </p>
          <p >{message.message}</p>
        </div>
      ))}
      <div ref = {eR} />
    </div>
  );
}


export default App;
