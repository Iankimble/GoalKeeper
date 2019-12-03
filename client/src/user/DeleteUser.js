import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/Index";
import { remove } from "./api-user";
import { signout } from "../auth/Index";

class DeleteUser extends Component {
  state = {
    redirect: false
  };

  deleteAccount = () => {
    const token = isAuthenticated().token;
    const userId = this.props.userId;
    remove(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        // sign out user
        signout(() => {
          console.log("user is deleted");
        });
        // redirect
        this.setState({ redirect: true });
      }
    });
  };

  deleteConfirm = () => {
    let answer = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (answer) {
      this.deleteAccount();
    }
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <button
        onClick={this.deleteConfirm}
        className="btn btn-raised btn-danger"
      >
        Delete Profile
      </button>
    );
  }
}

export default DeleteUser;
