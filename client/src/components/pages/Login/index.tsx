import "./index.scss";
import { PasswordInput, Input, Button } from "@mantine/core";
import { useLazyQuery, gql } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const LOGIN_QUERY = gql`
    query Query($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id
        email
        status
        user {
          id
          first_name
          last_name
          address
          phone
        }
      }
    }
  `;
  const [triggerLogin] = useLazyQuery(LOGIN_QUERY);
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
