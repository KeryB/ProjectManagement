import {Avatar, Button, Dropdown, Icon, List, Menu, Tooltip} from 'antd';
import React from 'react';
import moment from "moment/moment";

export const ModalFooter = ({
                                submitButton = true,
                                closeButton = true,
                                onClose,
                                onSubmit,
                                isSubmitting = false,
                                submitButtonIcon,
                                submitButtonMessage,
                            }) => {
    const elems = [];
    if (closeButton && onClose) {
        elems.push(<Button disabled={isSubmitting} key="close" onClick={onClose}>
            Отмена
        </Button>);
    }
    if (submitButton && onSubmit) {
        elems.push(<Button key="submit"
                           type="primary"
                           loading={isSubmitting}
                           onClick={onSubmit}
                           icon={submitButtonIcon}>
            {submitButtonMessage}
        </Button>);
    }
    return elems;
};

export const SubDropDown = ({
                                text
                            }) => {

    const menu = (
        <Menu>
            <Menu.Item key="1">Записать время</Menu.Item>
            <Menu.Item key="2">Закрыть задачу</Menu.Item>
            <Menu.Item key="3">Переоткрыть задачу</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown trigger={['click']} overlay={menu}>
            <Button>
                {text} <Icon type="down"/>
            </Button>
        </Dropdown>
    )
};

export const SubList = ({
                            datasource = [],
                            avatar,
                        }) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={datasource}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={avatar}
                        title={<a>{item.title}</a>}
                        description={item.description}
                    />
                </List.Item>
            )}
        />
    )
};

export const SubTaskData = ({title, data}) => {

    return (
        <div className="row">
            <div className="col-6">
                {title}
            </div>
            <div className="col-6">
                {data.format("DD:MM:YYYY")}
            </div>
        </div>
    )
};

export const DefaultViewMode = ({defaultValue, className, onClick, tooltipTitle}) => {

    const defaultClassname = defaultValue ? className + ' default-view-mode' : className;
    return (
        <Tooltip placement="topLeft" title={tooltipTitle}>
            <span>
                <i className={defaultClassname} onClick={onClick}/>
            </span>
        </Tooltip>
    )
};
