import * as React from "react";
import {Menu, Icon, Row, Col, Avatar, Layout, Breadcrumb, Dropdown} from 'antd';
import AuthHeader from "./AuthHeader";
import LayoutSider from "./LayoutSider";

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

class DashBoard extends React.Component {

    render() {
        const {children} = this.props;
        const {userData: {projectData:{chosenProject}, user}} = this.props;

        return (
            <div className='dashboard'>
                <Layout style={{minHeight: '100vh'}}>
                    <LayoutSider chosenProject={chosenProject}/>
                    <Layout>
                        <AuthHeader user={user}
                                    project={chosenProject}/>
                        <Content style={{margin: '16px 16px'}}>
                            {children}
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default DashBoard;