import React, { Component } from "react";
import axios from "axios";
import Loading from "./Loading";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getUsers() {
    this.setState({
      loading: true
    });
    axios("https://randomuser.me/api/?results=5").then(res =>
      this.setState({
        users: [...this.state.users, ...res.data.results],
        loading: false
      })
    );
  }

  handleSubmit(e) {
    e.preventtDefault();
    this.getUsers();
    console.log("more users loaded");
  }

  componentWillMount() {
    this.getUsers();
  }

  render() {
    const { loading, users } = this.state;
    return (
      <div>
        <h1>Sad man</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="load users" />
        </form>
        <hr />
        {!loading ? (
          users.map(user => (
            <div key={user.id.value}>
              <h1 style={{ color: "green" }}>{user.name.first}</h1>
              <h2>{user.email}</h2>
              <hr />
            </div>
          ))
        ) : (
          <Loading message="Be skrong" />
        )}
      </div>
    );
  }
}
export default App;
