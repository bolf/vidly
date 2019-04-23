import React from "react";

import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  joi_schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(3)
      .required()
      .label("Password")
  };

  doSubmit = () => {
    //Call the server
    const username = this.state.data.username;
    console.log("Submitted", username);
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputText("username", "Username")}
          {this.renderInputText("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
