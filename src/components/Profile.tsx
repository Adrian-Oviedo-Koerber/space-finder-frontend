import React from "react";
import { User, UserAttribute } from "../model/Model";
import { AuthService } from "../services/AuthService";
import { Link } from "react-router-dom";

interface ProfileState {
    userAttributes: UserAttribute[];
}

interface ProfileProps {
    user: User | undefined;
    authService: AuthService;
}

export class Profile extends React.Component<ProfileProps, ProfileState> {
    render() {
        let profileSpace;
        if (this.props.user) {
            profileSpace = <h3>Welcome {this.props.user.userName}</h3>
        } else {
            profileSpace = <div>Please login <Link to="/login">Login</Link></div>
        }
        return (
            <div>
                Profile works!!
                {profileSpace}
            </div>
        );
    }
}