import * as React from "react";
import {Menu, Icon, Row, Col, Avatar, Layout} from 'antd';
import LeftBar from "./LeftBar";
import DashboardTimeline from "./DashboardTimeline";

const {Header, Content, Sider} = Layout;

class DashBoard extends React.Component {


    render() {
        const {children} = this.props;
        const {userData: {chosenProject, projectData}} = this.props;
        console.log(this.props);
        return (
            <div className='dashboard'>
                <Row gutter={48} style={{padding: '10px', margin: '0px'}}>
                    <LeftBar chosenProject={chosenProject} projectData={projectData}/>
                    <Layout style={{padding: '0 15px 24px'}}>
                        {children}
                    </Layout>
                </Row>
            </div>
        )
    }
}

export default DashBoard;