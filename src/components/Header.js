import React from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">

                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Sign in
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Sign up
                    </Link>
                </li>

            </ul>
        );
    }
    return null;
};

const LoggedInView = props => {
    if (props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">

                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/editor" className="nav-link">
                        <i className="ion-compose"/>&nbsp;New Post
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/settings" className="nav-link">
                        <i className="ion-gear-a"/>&nbsp;Settings
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/@${props.currentUser.username}`}
                        className="nav-link"
                    >
                        <img src={props.currentUser.image} className="user-pic" alt=""/>
                        {props.currentUser.username}
                    </Link>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="/" onClick={props.logOut}>
                        Log out
                    </a>
                </li>
            </ul>
        );
    }

    return null;
};

@inject('userStore', 'commonStore', 'authStore')
@observer
class Header extends React.Component {
    handleClickLogout = () =>
        this.props.authStore.logout();
            // .then(() => this.props.history.replace('/'));

    render() {
        return (
            <nav className="navbar navbar-light">
                <div className="container">

                    <Link to="/" className="navbar-brand">
                        {this.props.commonStore.appName.toLowerCase()}
                    </Link>

                    <LoggedOutView currentUser={this.props.userStore.currentUser}/>

                    <LoggedInView currentUser={this.props.userStore.currentUser} logOut={this.handleClickLogout}/>
                </div>
            </nav>
        );
    }
}

export default Header;
