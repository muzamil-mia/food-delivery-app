import { Component } from "react";


class ProfileUserClass extends Component {
    constructor(props) {
        super(props);
        console.log("ProfileUserClass child constructor")
    }

    componentDidMount() {
          console.log("ProfileUserClass child componentDidMount");
    }
    componentDidUpdate() {
       console.log("ProfileUserClass child componentDidUpdate");
      }
      componentWillUnmount() {
       console.log("ProfileUserClass child componentWillUnmount");
      }

      render() {

        const { name, avatar_url, bio} = this.props.data; // accessing full json data as props from parent class `ProfileClass`
        return(
            <div className="profile-user-card">
                <img src={avatar_url} alt= {name} title={name} />
                <p className="profile-user-bio">{bio}</p>
            </div>
        )
      }
}

export default ProfileUserClass