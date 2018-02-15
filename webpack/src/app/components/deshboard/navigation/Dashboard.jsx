import * as React from "react";
import {Menu, Icon, Row, Col,Avatar} from 'antd';
import LeftBar from "./LeftBar";

class DashBoard extends React.Component {


    render() {

        const{children} = this.props;
        console.log(this.props);

        const {userData: {projectPermissions}} = this.props;
        console.log(projectPermissions);

        return (
            <div className='dashboard'>
                <LeftBar/>
                <div className='content'>
                    {children}
                </div>
            </div>
        )
    }
}

export default DashBoard;