import "./index.scss";
import { PasswordInput, Input, Button } from "@mantine/core";

const Login: React.FC = () => {
  return (
    <div className="login">
      <span className="login_header">SIGN IN</span>
      <div className="login_card">
        <Input className="login_card_email" placeholder="Email" />
        <PasswordInput className="login_card_password" placeholder="Password" />
        <div className="login_card_action">
          <Button className="login_card_action_button" bg="#6558f5">
            LOG IN
          </Button>
          <span className="login_card_action_forgot">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="login_card_action_forgot_link">
              Sign up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
