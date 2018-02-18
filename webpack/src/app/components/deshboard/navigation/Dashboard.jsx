import * as React from "react";
import {Menu, Icon, Row, Col, Avatar} from 'antd';
import LeftBar from "./LeftBar";
import DashboardTimeline from "./DashboardTimeline";

class DashBoard extends React.Component {


    render() {
        const {children} = this.props;
        const {userData: {projectPermissions}} = this.props;

        return (
            <div className='dashboard'>
                <Row gutter={48} style={{padding: '10px', margin: '0px'}}>
                    <LeftBar projectPermissions={projectPermissions}/>
                    <div className="container-inner">
                        {children}
                    </div>
                </Row>
            </div>
        )
    }
}

export default DashBoard;