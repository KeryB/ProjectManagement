import * as React from "react";
import TaskProjectList from "./TaskProjectList";
import {Route, Switch} from "react-router-dom";
import Task from "./Task";
import * as Path from "../../../../utils/RoutePath";


class TaskProjectListInternal extends React.Component {

    render(){

        return(
            <TaskProjectList {...this.props}>
                <Switch>
                    <Route path='/dashboard/taskProjectList/task/:id' component={Task}/>
                </Switch>
            </TaskProjectList>
        )
    }
}

export default TaskProjectListInternal;