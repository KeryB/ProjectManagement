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

                <div className="row">
                    <div className="col-12 col-md-8">.col-12 .col-md-8</div>
                    <div className="col-6 col-md-4">.col-6 .col-md-4</div>
                </div>
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