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

export default Messages;