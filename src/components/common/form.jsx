import React, { Component } from "react";
import Joi from "joi-browser";
import InputText from "./inputText";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const validationResult = Joi.validate(this.state.data, this.joi_schema, {
      abortEarly: false
    });

    if (!validationResult.error) return null;

    const errors = {};
    for (let item of validationResult.error.details)
      errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.joi_schema[name] };
    const { error } = Joi.validate(obj, schema);
    if (!error) return null;
    return error.details[0].message;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };

  handleTextFieldChange = e => {
    const errors = { ...this.state.errors };
    const errorMesaage = this.validateProperty(e.currentTarget);
    if (errorMesaage) errors[e.currentTarget.name] = errorMesaage;
    else delete errors[e.currentTarget.name];

    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInputText(name, label, type = "text") {
    return (
      <InputText
        type={type}
        name={name}
        label={label}
        value={this.state.data[name]}
        onChange={this.handleTextFieldChange}
        error={this.state.errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleTextFieldChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
