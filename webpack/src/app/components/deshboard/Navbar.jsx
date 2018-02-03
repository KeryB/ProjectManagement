import * as React from "react";
import {Layout, Menu, Breadcrumb, Button} from 'antd';
import {Link} from "react-router-dom";
const {Header, Content, Footer} = Layout;
import * as Path from '../../utils/RoutePath'
import * as Status from '../../utils/AuthStatus';

const notAuthComponent = () => (
    <div>
        <Menu.Item key="1">Пример</Menu.Item>
        <Menu.Item key="2">Пример</Menu.Item>
        <Menu.Item key="3">Пример</Menu.Item>
    </div>
);

const authorizedComponents = () => {
};

class Navbar extends React.Component {

    render() {
        const {props} = this.props;
        const{location, auth} = props;
        console.log(this.props);
        return (
            <div>
                <Layout className="layout">
                    <Header>
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                        >
                            {/*{auth.user.status === Status.NOT_AUTH ? notAuthComponent : authorizedComponents}*/}
                            {/*<Menu.Item className='position-right'>*/}
                            {/*<Button type="primary">*/}
                            {/*<Link to={Path.LOGIN}>Регистрация/Авторизация</Link>*/}
                            {/*</Button>*/}
                            {/*</Menu.Item>*/}
                            {
                                (location.pathname !== Path.LOGIN) ?
                                    <Button type="primary" className='position-right'>
                                        <Link to={Path.LOGIN}>Регистрация/Авторизация</Link>
                                    </Button>
                                    :
                                    undefined
                            }
                        </Menu>
                    </Header>
                </Layout>
            </div>
        )
    }
}

Navbar.propTypes = {
    props: React.PropTypes.object.isRequired,
};

export default Navbar;
