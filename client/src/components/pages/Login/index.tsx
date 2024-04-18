import "./index.scss";
import { PasswordInput, Input, Button } from "@mantine/core";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { LOGIN_QUERY } from "../../../_types_/gql";
import { useDispatch, useSelector } from "react-redux";
import { saveLogin } from "../../../store/auth";

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "snigdho.howlder@gmail.com",
    password: "Abc@1234",
  });
  const navigate = useNavigate();

  const [triggerLogin, { data: loginData, error: loginDataError }] =
    useLazyQuery(LOGIN_QUERY);
  const dispatch = useDispatch();
  const user = useSelector((x) => x);
  console.log(user);

  useEffect(() => {
    if (loginDataError) {
      console.log(loginDataError);
      notifications.show({
        title: "Error",
        message: loginDataError.message,
        color: "red",
      });
    }
    if (loginData?.login?.id) {
      notifications.show({
        title: "Success",
        message: "Successfully logged in!",
        color: "green",
      });
      dispatch(saveLogin(loginData.login));
    }
  }, [loginData, loginDataError, navigate, dispatch]);

  return (
    <div className="login">
      <span className="login_header">SIGN IN</span>
      <form
        className="login_card"
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(credentials);
          triggerLogin({
            variables: {
              email: credentials.email,
              password: credentials.password,
            },
          });
        }}
      >
        <Input
          onChange={(e) =>
            setCredentials((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
          value={credentials.email}
          className="login_card_email"
          placeholder="Email"
        />
        <PasswordInput
          onChange={(e) =>
            setCredentials((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
          value={credentials.password}
          className="login_card_password"
          placeholder="Password"
        />
        <div className="login_card_action">
          <Button
            className="login_card_action_button"
            bg="#6558f5"
            type="submit"
          >
            LOG IN
          </Button>
          <span className="login_card_action_forgot">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="login_card_action_forgot_link">
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
