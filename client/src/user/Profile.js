import React, { Component } from "react";
import { isAuthenticated } from "../auth/Index";
import { Redirect, Link } from "react-router-dom";
import DefaultProfileImg from "../images/avatar.png";
import { read } from "./api-user";
import DeleteUser from "./DeleteUser";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false
    };
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, user } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;

    const photoURL = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : DefaultProfileImg;

    return (
      <div className="container">
        <h2 className="mt-5-mb-5">{user.name}</h2>
        <div className="row">
          <div className="col-md-6">
            <img
              style={{ height: "200px", width: "auto" }}
              className="img-thumbnail"
              src={photoURL}
              onError={i => (i.target.src = `${DefaultProfileImg}`)}
              alt={user.name}
            />
          </div>

          <div className="col -md-6">
            <div className="lead mt-2">
              <p> Hi {user.name}</p>
              <p> Email {user.email} </p>
              <p> {`Joined on ${new Date(user.created).toDateString()}`}</p>
            </div>

            {isAuthenticated().user && isAuthenticated().user._id === user._id && (
              <div className="d-inline-block ">
                <Link
                  className="btn btn-raised btn-success mr-5"
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>

                <DeleteUser userId={user._id} />
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col md-12 mt-5 mb-5">
            <hr />
            <div className="lead">{user.about}</div>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
