import React, { Component } from "react";
import InputText from "./common/inputText";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  joi_schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(3)
      .max(10)
      .required()
      .label("Password")
  };

  validate = () => {
    const validationResult = Joi.validate(this.state.account, this.joi_schema, {
      abortEarly: false
    });

    if (!validationResult.error) return null;

    const errors = {};
    for (let item of validationResult.error.details)
      errors[item.path[0]] = item.message;

    return errors;

    // const { account } = this.state;
    // if (account.username.trim() === "")
    //   errors.username = "Username is required";

    // if (account.password.trim() === "")
    //   errors.password = "Password is required";

    // return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    //Call the server
    const username = this.state.account.username;
    console.log("Submitted", username);
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.joi_schema[name] };
    const { error } = Joi.validate(obj, schema);
    if (!error) return null;
    return error.details[0].message;
  };

  handleTextFieldChange = e => {
    const errors = { ...this.state.errors };
    const errorMesaage = this.validateProperty(e.currentTarget);
    if (errorMesaage) errors[e.currentTarget.name] = errorMesaage;
    else delete errors[e.currentTarget.name];

    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account, errors });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <InputText
            name="username"
            label="Username"
            value={this.state.account.name}
            onChange={this.handleTextFieldChange}
            error={this.state.errors.username}
          />

          <InputText
            name="password"
            label="Password"
            value={this.state.account.password}
            onChange={this.handleTextFieldChange}
            error={this.state.errors.password}
          />

          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
