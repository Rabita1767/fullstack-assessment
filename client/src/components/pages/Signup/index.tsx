import "./index.scss";
import {
  PasswordInput,
  Input,
  Button,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FormEvent, useState } from "react";

const Signup: React.FC = () => {
  const [signupData, setSignupData] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
    address: string;
    phone: string;
  }>({
    first_name: "",
    last_name: "",
    email: "",
    confirm_password: "",
    password: "",
    address: "",
    phone: "",
  });

  const onSignup = (e: FormEvent) => {
    e.preventDefault();
    if (
      signupData.first_name === "" ||
      signupData.last_name === "" ||
      signupData.email === "" ||
      signupData.password === "" ||
      signupData.confirm_password === "" ||
      signupData.address === "" ||
      signupData.phone === ""
    ) {
      notifications.show({
        title: "Multiple fields",
        message: "One or more of the fields are empty",
        color: "red",
      });
    }
    else if (
      signupData.password !==
      signupData.confirm_password
    ) {
      notifications.show({
        title: "Password",
        message: "Passwords do not match",
        color: "red",
      });
    }
  };

  return (
    <div className="signup">
      <span className="signup_header">
        SIGN UP
      </span>
      <form
        className="signup_card"
        onSubmit={onSignup}
      >
        <Input
          onChange={(e) =>
            setSignupData((prevState) => ({
              ...prevState,
              first_name: e.target.value,
            }))
          }
          value={signupData.first_name}
          className="signup_card_first"
          placeholder="First Name"
        />
        <Input
          onChange={(e) =>
            setSignupData((prevState) => ({
              ...prevState,
              last_name: e.target.value,
            }))
          }
          value={signupData.last_name}
          className="signup_card_last"
          placeholder="Last Name"
        />
        <Input
          onChange={(e) =>
            setSignupData((prevState) => ({
              ...prevState,
              address: e.target.value,
            }))
          }
          value={signupData.address}
          className="signup_card_address"
          placeholder="Address"
        />
        <Input
          onChange={(e) =>
            setSignupData((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
          value={signupData.email}
          className="signup_card_email"
          placeholder="Email"
        />
        <Input
          onChange={(e) =>
            setSignupData((prevState) => ({
              ...prevState,
              phone: e.target.value,
            }))
          }
          value={signupData.phone}
          className="signup_card_phone"
          placeholder="Phone Number"
        />
        <PasswordInput
          onChange={(e) =>
            setSignupData((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
          value={signupData.password}
          className="signup_card_password"
          placeholder="Password"
        />
        <PasswordInput
          onChange={(e) =>
            setSignupData((prevState) => ({
              ...prevState,
              confirm_password: e.target.value,
            }))
          }
          value={signupData.confirm_password}
          className="signup_card_confirm"
          placeholder="Confirm Password"
        />
        <div className="signup_card_action">
          <Button
            className="signup_card_action_button"
            bg="#6558f5"
            type="submit"
          >
            REGISTER
          </Button>
          <span className="signup_card_action_forgot">
            Already have an account?{" "}
            <a
              href="/login"
              className="signup_card_action_forgot_link"
            >
              Sign in
            </a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
