import "./index.scss";

const Login = () => {
  return (
    <div className="login">
      <span className="login_header">SIGN IN</span>
      <div className="login_card">
        <input className="login_card_email" placeholder="Email" />
        <input className="login_card_password" placeholder="Password" />
        <button className="login_card_button">LOGIN</button>
        <span className="login_card_forgot">
          Don&apos;t have an account?{" "}
          <span className="login_card_forgot_link">Signup</span>
        </span>
      </div>
    </div>
  );
};

export default Login;
