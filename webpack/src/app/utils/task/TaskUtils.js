import {Avatar, Icon} from "antd";
import * as React from "react";

export const TaskTypeOption = [
    {value: 0, name: 'Баг', displayName:'BUG', avatar: <Avatar size='small' src='../../resources/images/icon-spam.png'/>},
    {value: 1, name: 'Новая функция', displayName:'NEW_FEATURE', avatar: <Avatar size='small' src='../../resources/images/new-feature.png'/>},
    {value: 2, name: 'Улучшение', displayName:'IMPROVEMENT', avatar: <Avatar size='small' src='../../resources/images/improvement.png'/>}
];

export const PriorityTask = [
    {value: 0, name: 'Срочный', displayName:'BLOCKER', avatar: <Avatar size='small' src='../spam'/>},
    {value: 1, name: 'Главный', displayName:'MAJOR', avatar: <Avatar size='small'><Icon type="plus-square"/></Avatar>},
    {value: 2, name: 'Критический', displayName:'CRITICAL', avatar: <Avatar size='small'><Icon type="plus-square"/></Avatar>},
    {value: 3, name: 'Незначительный', displayName:'MINOR', avatar: <Avatar size='small'><Icon type="plus-square"/></Avatar>}
];

export const getPriorityTask = (displayName) => {
    let taskEnum = null;
    PriorityTask.forEach((item, index) => {
        if(item.displayName === displayName ){
            taskEnum = item;
        }
    });
    return taskEnum;
};
