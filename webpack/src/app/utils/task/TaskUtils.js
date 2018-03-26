import {Avatar, Icon, Tag} from "antd";
import * as React from "react";

export const TaskTypeOption = [
    {value: 0, name: 'Баг', displayName:'BUG', avatar: <Avatar size='small' src='/resources/images/icon-spam.png'/>},
    {value: 1, name: 'Новая функция', displayName:'NEW_FEATURE', avatar: <Avatar size='small' src='/resources/images/new-feature.png'/>},
    {value: 2, name: 'Улучшение', displayName:'IMPROVEMENT', avatar: <Avatar size='small' src='/resources/images/improvement.png'/>}
];

export const PriorityTask = [
    {value: 0, name: 'Срочный', displayName:'BLOCKER', avatar: <Avatar size='small' src='/resources/images/blocker.png'/>},
    {value: 1, name: 'Главный', displayName:'MAJOR', avatar: <Avatar size='small' src='/resources/images/major.png'/>},
    {value: 2, name: 'Критический', displayName:'CRITICAL', avatar:  <Avatar size='small' src='/resources/images/critical.png'/>},
    {value: 3, name: 'Незначительный', displayName:'MINOR', avatar:  <Avatar size='small' src='/resources/images/minor.png'/>}
];

//todo переделать на map
// export const TaskStatus = () =>{
//     let map = new Map();
//     map.set(0, {name: 'Открытая', displayName: 'OPEN'});
//     map.set(1, {name: 'Переоткрытая', displayName: 'REOPEN'});
//     map.set(2, {name: 'RESOLVED', displayName: 'RESOLVED'});
//     map.set(3, {name: 'В разработке', displayName: 'IN_PROGRESS'});
//     map.set(4, {name: 'Завершенная', displayName: 'finished'});
//     map.set(5, {name: 'Архивная', displayName: 'ARCHIVE'});
// };

export const TaskStatus = [
    {value: 0, name: 'Открытая', displayName:'OPEN', avatar: <Tag color="#2db7f5">Открытая</Tag>},
    {value: 1, name: 'Переоткрытая', displayName:'REOPEN', avatar:  <Tag color="#108ee9">Переоткрытая</Tag>},
    {value: 2, name: 'RESOLVED', displayName:'RESOLVED', avatar:  <Avatar size='small' src='/resources/images/critical.png'/>},
    {value: 3, name: 'В разработке', displayName:'IN_PROGRESS', avatar:  <Avatar size='small' src='/resources/images/minor.png'/>},
    {value: 4, name: 'Завершенная', displayName:'finished', avatar:  <Avatar size='small' src='/resources/images/minor.png'/>},
    {value: 5, name: 'Архивная', displayName:'ARCHIVE', avatar:  <Avatar size='small' src='/resources/images/minor.png'/>}
];

export const getEnumsTask = (displayName, enums) => {
    let taskEnum = null;
    enums.forEach((item, index) => {
        if(item.displayName === displayName ){
            taskEnum = item;
        }
    });
    return taskEnum;
};
