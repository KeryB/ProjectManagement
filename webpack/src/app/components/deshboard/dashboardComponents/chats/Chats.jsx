import React from "react";
import {Avatar, Button, Checkbox, Icon, List, Popconfirm, Table, Tabs} from "antd";

const TabPane = Tabs.TabPane;


class Chats extends React.Component {

    onRow = (record) => {
        return {
            onClick: () => {
                console.log(record)
            },
        };
    };

    render() {

        return (
            <div>
                <div className='p-block'>
                    <div className='display-inline-block'>
                        <h3>BREADCRUMB</h3>
                    </div>
                    <div className='display-inline-block float-right'>
                        <a className='a-btn-primary'><Icon type="plus-circle-o"/> Добавить</a>
                    </div>
                </div>
                <div className='indent-p-block'>

                </div>
            </div>
        )
    }
}

export default Chats;