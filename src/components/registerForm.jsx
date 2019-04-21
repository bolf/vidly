import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  joi_schema = {
    username: Joi.string()
      .required()
      .label("Username")
      .email({ minDomainAtoms: 2 }),
    password: Joi.string()
      .min(3)
      .max(10)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = () => {
    //Call the server
    const username = this.state.data.username;
    console.log("Submitted", username);
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputText("username", "Username")}
          {this.renderInputText("password", "Password", "password")}
          {this.renderInputText("name", "Name", "name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
