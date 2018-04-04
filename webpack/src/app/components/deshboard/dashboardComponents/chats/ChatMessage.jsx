import React from "react";
import moment from "moment/moment";
import PropTypes from "prop-types";
import {Avatar, Button, Divider, Icon} from "antd";

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

        return (
            <div id={item.id} className={isActive ? 'active-message' : ' background-none'}>
                <div className='chat-header' onClick={this.handleClickChatHeader}>
                    <span>
                        <Icon type="clock-circle-o"/> {moment(new Date()).format('MM.DD.YYYY, h:mm')}
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
                            Роль: {item.role}
                        </div>
                        <div className='fixed-message'>
                            <Icon type="check-circle"/> Сообщение закреплено
                        </div>
                        <div>
                            <Icon type="file"/>
                        </div>
                    </div>
                    <Divider type="vertical"/>
                    <div className='col-md-9'>
                        <div className='actual-message'>
                            {item.description}
                        </div>
                        <div className='footer'>
                            <Button size='small'>Цитировать</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatMessage;