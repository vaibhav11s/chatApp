const Login = ({handelLogin,setName,name}) => {
  return(
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
  );
}

export default Login;