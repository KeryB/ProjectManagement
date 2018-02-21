import * as React from "react";
import {Layout, Menu, Breadcrumb, Button, Icon, Avatar, Dropdown} from 'antd';
import {Link} from "react-router-dom";
import * as Path from '../../utils/RoutePath'
import * as Status from '../../utils/AuthStatus';
import PropTypes from 'prop-types';
import {getStorageItem, removeStorageItem} from "../../utils/token/TokenManager";
import AuthHeader from "./header/AuthHeader";
import {tokenHeader} from "../../actions/api/Api";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const {Header, Content, Footer} = Layout;


const notAuthComponent = (location) => (
    <div>
        {location.pathname !== Path.LOGIN
            ?
            <Button type="primary" className='position-right'>
                <Link to={Path.LOGIN}><Icon type="login"/> Войти</Link>
            </Button>
            : undefined

        }
    </div>
);

class Navbar extends React.Component {

    logout = () => {
        removeStorageItem(tokenHeader);
        window.location.href = '/';
    };

    render() {
        const {location, user, project} = this.props;
        console.log(project);
        return (
            <Layout className="layout">
                <div className='ant-layout-header ant-menu-horizontal'>
                    <Link to={user.tokenStatus === Status.NOT_AUTH ? Path.ROOT : Path.DASHBOARD} className='logo'>
                        <div className='top_home_logo'>
                        </div>
                    </Link>
                    {(user.tokenStatus === Status.NOT_AUTH) ?
                        notAuthComponent(location)
                        :
                        <div>
                            <AuthHeader user={user} project={project} logout={this.logout}/>
                        </div>
                    }
                </div>
            </Layout>
        )
    }
}

Navbar.propTypes = {
    location: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    project: PropTypes.array.isRequired,
};

export default Navbar;
