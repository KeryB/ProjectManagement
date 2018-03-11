import * as React from "react";
import {Avatar, Card, Icon} from "antd";
import {connect} from "react-redux";
import PropTypes from "prop-types";


class ActualProject extends React.Component {

    static propTypes = {
        projectData: PropTypes.object.isRequired,
    };

    render() {

        const {projectData:{chosenProject}} = this.props;

        let project={};
        if(chosenProject != null){
            project = chosenProject.primaryProject;
        }

        return (
            <div className='actual-project'>
                <Card className='card-project'>
                    <Avatar size='large'/>
                    <h2>
                        {project.title}
                    </h2>
                </Card>
            </div>
        )
    }
}
//
// function mapStateToProps(state) {
//     return {
//         projectData: state.actualProject
//     }
// }

export default ActualProject;