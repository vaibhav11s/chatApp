import GetChatId from './GetChatId'

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

export default Sidebar;