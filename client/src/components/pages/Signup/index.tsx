import "./index.scss";
import { PasswordInput, Input, Button } from "@mantine/core";

const Signup: React.FC = () => {
  return (
    <div className="signup">
      <span className="signup_header">SIGN IN</span>
      <div className="signup_card">
        <Input className="signup_card_first" placeholder="First Name" />
        <Input className="signup_card_last" placeholder="Last Name" />
        <Input className="signup_card_address" placeholder="Address" />
        <Input className="signup_card_email" placeholder="Email" />
        <Input className="signup_card_phone" placeholder="Phone Number" />
        <PasswordInput
          className="signup_card_password"
          placeholder="Password"
        />
        <PasswordInput
          className="signup_card_confirm"
          placeholder="Confirm Password"
        />
        <div className="signup_card_action">
          <Button className="signup_card_action_button" bg="#6558f5">
            REGISTER
          </Button>
          <span className="signup_card_action_forgot">
            Already have an account?{" "}
            <a href="/login" className="signup_card_action_forgot_link">
              Sign in
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
