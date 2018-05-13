import React from "react";
import {Avatar, Breadcrumb, Button, Checkbox, Divider, Dropdown, Icon, List, Menu} from "antd";
import {EditorState} from 'draft-js';
import ChatMessage from "./ChatMessage";
import {FormEditWysiwyg} from "../../../forms/Inputs";
import {Field, reduxForm} from "redux-form";

const getData = () => {
    let data = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            id: i,
            title: "Проговорить детали",
            person: "KEK",
            role: "Роль",
            description: "тут какой-то текст много текста"
        })
    }
    return data
};
const FORM_ID = 'addMessage';

const menu=(
    <Menu>
        <Menu.Item key="0">
            <a>Пометить как важное</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a>Закрепить сообщение</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
            Резюмировать
        </Menu.Item>
    </Menu>
);

class ChatPage extends React.Component {

    constructor(props){
        super(props);
        this.state={
            editorState: EditorState.createEmpty(),
            isActive: false
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    handleSubmit = (values) => {
        console.log(values)
    };

    handleClickHeaderChat = (value) =>{
        this.setState({
            isActive: value
        })
    };


    render() {
        const {handleSubmit} = this.props;
        const{isActive} = this.state;
        const showActive = isActive ?
            <Dropdown overlay={menu} trigger={['click']}>
                <Button>Действия <Icon type="down" /></Button>
            </Dropdown> : undefined;

        return (
            <div className='chat-page'>
                <div className='p-block'>
                    <div>
                        <h4>
                            <Breadcrumb>
                                <Breadcrumb.Item href="">
                                    <Icon type="home"/> Главная
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    Список чатов
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    Обсуждение
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </h4>
                    </div>
                    <div className='page-header'>
                        <div className='display-inline-block'>
                            <h3>Тема обсуждения: <a>ТУТ тема</a></h3>
                        </div>
                        {isActive ? showActive : undefined}
                    </div>
                    <div>
                        <List
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            dataSource={getData()}
                            renderItem={item => (
                                <List.Item>
                                    <ChatMessage item={item} onClick={this.handleClickHeaderChat}/>
                                </List.Item>
                            )}
                        />
                        <form id={FORM_ID} className='form-add-message' onSubmit={handleSubmit(this.handleSubmit)}>
                            <Field
                                name='comment'
                                onEditorStateChange={this.onEditorStateChange}
                                component={FormEditWysiwyg}/>
                            <Button className='button button-regular' onClick={this.handleCancelComment}>Отмена</Button>
                            <Button onClick={handleSubmit(this.handleSubmit)}>Добавить</Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

ChatPage = reduxForm({
    form: FORM_ID
})(ChatPage);

export default ChatPage;
