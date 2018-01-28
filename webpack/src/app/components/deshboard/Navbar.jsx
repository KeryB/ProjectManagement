import * as React from "react";
import {Layout, Menu, Breadcrumb, Button} from 'antd';
import {Link} from "react-router-dom";

const {Header, Content, Footer} = Layout;
import * as Path from '../../utils/RoutePath'

const notAuthComponent = () => (
    <div>
    </div>
);

const authorizedComponents = () => {
};

class Navbar extends React.Component {

    render() {
        const {auth} = this.props;
        console.log(auth);
        return (
            <div>
                <Layout className="layout">
                    <Header>
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                        >
                            <Menu.Item key="1">Пример</Menu.Item>
                            <Menu.Item key="2">Пример</Menu.Item>
                            <Menu.Item key="3">Пример</Menu.Item>
                            <Menu.Item className='position-right'>
                                <Button type="primary">
                                    <Link to={Path.LOGIN}>Регистрация/Авторизация</Link>
                                </Button>
                            </Menu.Item>
                        </Menu>
                    </Header>
                </Layout>
            </div>
        )
    }
}

Navbar.propTypes = {
    auth: React.PropTypes.object.isRequired,
};

export default Navbar;
