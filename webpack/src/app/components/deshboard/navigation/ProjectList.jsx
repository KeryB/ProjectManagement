import * as React from "react";
import {List, Avatar} from 'antd';

class ProjectList extends React.Component {

    render() {

        const {projects} = this.props;

        console.log(this.props);

        return (
            <div>

                <List
                    itemLayout="horizontal"

                />
            </div>
        )
    }
}

ProjectList = {
    projects: PropTypes.object.isRequired,
};

export default ProjectList;