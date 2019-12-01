import React, { Component } from "react";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password
    };

    this.signup(user).then(data => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          open: true
        });
    });
  };

  signup = user => {
    // console.log(user);
    return fetch("http://localhost:6060/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify(user)
    })
      .then(res => {
        return res.json();
      })
      .catch(err => console.log(err));
  };

  render() {
    const { name, email, password, error, open } = this.state;
    return (
      <div className="container">
        <h1 className="mt-5 mb-5">Signup</h1>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        <div
          className="alert alert-info"
          style={{ display: open ? "" : "none" }}
        >
          New account successfully created! Please sign in.
        </div>

        <form>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={this.handleChange("name")}
              type="text"
              className="form-control"
              value={name}
            ></input>
            <div className="form-group"></div>

            <label className="text-muted">Email</label>
            <input
              onChange={this.handleChange("email")}
              type="text"
              className="form-control"
              value={email}
            ></input>
          </div>

          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={this.handleChange("password")}
              type="text"
              className="form-control"
              value={password}
            ></input>
          </div>

          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
