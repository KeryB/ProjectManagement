import React from "react";
import moment from "moment/moment";
import PropTypes from "prop-types";
import {Avatar, Button, Divider, Icon, List} from "antd";

const attachments = (data) => {

    return (
        <div className='message-attachments'>
            <List
                dataSource={data}
                renderItem={item => (
                    <div className='attachment-item'>
                        <div className='cell'>
                            {item.type}
                        </div>
                        <div className='footer-cell'>
                            {item.title}
                        </div>
                    </div>
                )}
            />
        </div>
    )
};

class ChatMessage extends React.Component {

    static PropTypes = {
        item: PropTypes.object.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
        }
    }

    handleClickChatHeader = () => {
        const {isActive} = this.state;
        this.setState({
            isActive: !isActive,
        });
        this.props.onClick(!isActive);
    };

    render() {
        const {item} = this.props;
        const {isActive} = this.state;
        const touchedMessage = isActive ? <Icon type="check-circle"/> : undefined;

        const {description} = item;
        console.log(description);
        return (
            <div id={item.id} className={isActive ? 'active-message' : ' background-none'}>
                <div className='chat-header' onClick={this.handleClickChatHeader}>
                    <span>
                        <Icon type="clock-circle-o"/> {item.time}
                    </span>
                    <span className='show-icon-touched'>
                        {touchedMessage}
                    </span>
                </div>
                <div className='row'>
                    <div className="col-0">
                        <span>
                            <a>{item.person}</a>
                        </span>
                        <div>
                            <Avatar src='/resources/images/profile.jpeg'/>
                        </div>
                        <div style={{marginTop: '5px'}}>
                            <h4> <span>Роль: </span><span>{item.role}</span></h4>
                        </div>

                        {item.isFixed ?
                            <div className='fixed-message'>
                                <Icon type="check-circle"/> Сообщение закреплено
                            </div> : undefined}

                        {item.attachments ? <div>
                            <Icon type="file"/>
                        </div> : undefined}
                    </div>
                    <Divider type="vertical"/>
                    <div>
                        <div className='actual-message'>
                            {description.first}
                            <p>{description.second}</p>
                        </div>
                        {item.attachments ? attachments(item.attachments) : undefined}
                        <div className='footer'>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatMessage;