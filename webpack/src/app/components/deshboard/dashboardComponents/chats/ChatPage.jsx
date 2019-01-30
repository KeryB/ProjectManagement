import React from "react";
import {Avatar, Breadcrumb, Button, Checkbox, Divider, Dropdown, Icon, List, Menu} from "antd";
import {EditorState} from 'draft-js';
import ChatMessage from "./ChatMessage";
import {FormEditWysiwyg} from "../../../forms/Inputs";
import {Field, reduxForm} from "redux-form";

const getData = (item) => {
    let data = [];
    data.push({
        id: 1,
        title: "Проговорить детали",
        person: "Зубкова Екатерина",
        role: "Менеджер(Заказчик)",
        time: "10 апреля 2018, 18:52",
        description: {
            first: "Алексей в отдельном файле прошу Вас прописать продвижение программы Mercedes-Benz StarClass посредством контекста:",
            second: <a>https://www.drom.ru/misc/certified/mb_starclass/</a>
        },
        isFixed: true,
        isDivide: false,
    }, {
        isDivide: true
    }, {
        id: 2,
        title: "Высылаю список критически важных правок, которые необходимо выполнить по текущему проекту",
        person: "Зубкова Екатерина",
        role: "Менеджер(Заказчик)",
        description: {
            first: "Алексей, прошу Вас выслать отчет по этим объявлениям. И заменить их на новое\n" +
            "название вместо StarClass на это (см. описание):",
            second: <div>
                <a>http://www.bluefish.ru/special-programs/mercedes-benz-starclass/</a>
                <p>- по замененным объявлениям тоже сразу желателен отчет в виде скринов.</p>
                <p>Срок до завтра до обеда.</p>
                <p>Спасибо.</p>
            </div>,

        },
        time: '14 июня 2018, 19:48',
        isFixed: false,
        isDivide: false,
    }, {
        id: 3,
        title: "Проговорить детали",
        person: "Николаев Алексей",
        role: "Менеджер(Исполнитель)",
        time: "14 июня 2018, 14:52",
        attachments: [{
            type: <Icon type="file-word" className='attachment-word'/>,
            title: <span><h4>Первый-текст.doc</h4></span>
        }, {
            type: <Icon type="file-word" className='attachment-word'/>,
            title: <span><h4>Второй-текст.doc</h4></span>
        },  {
            type: <Icon type="file-word" className='attachment-word'/>,
            title: <span><h4>Третий-текст.doc</h4></span>
        }],
        description: {
            first: "Здравствуйте, Екатерина.",
            second: <p>Я правильно понимаю, что меняется только программа (ссылка), а сами тексты
                объявлений остаются прежними согласованными?
                <p>Высылаю тексты объявлений, визуально они одинаковые.</p>
                <p>Размещение проводилось с 14 апреля (согласование текстов) до 10 мая
                    (приостановка размещения по требованию).</p>
                <p>Было совершено 25 переходов по объявлениям, потрачено 1.000 руб.</p>
                </p>
        },
        isFixed: false,
        isDivide: false,
    }, {
        id: 4,
        title: "Высылаю список критически важных правок, которые необходимо выполнить по текущему проекту",
        person: "Зубкова Екатерина",
        role: "Менеджер(Заказчик)",
        description: {
            first: "Алексей,",
            second: <div>
                Да, меняется только программа, ссылка. Тексты пока оставим. Можно еще пару
                    просто придумать в этом ключе.
                <p>Спасибо за отчет.</p>
            </div>,
        },
        time: '15 июня 2018, 17:55',
        isFixed: false,
        isDivide: false,
    });
    return data
};
const FORM_ID = 'addMessage';

const menu = (
    <Menu>
        <Menu.Item key="0">
            <a>Пометить как важное</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a>Закрепить сообщение</a>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="3">
            Резюмировать
        </Menu.Item>
    </Menu>
);

const renderItems = (message) => {

    console.log(message);

    return (
        <ChatMessage
            item={message}
            onClick={this.handleClickHeaderChat}/>
    )
};

class ChatPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: props.location.state.item,
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

    handleClickHeaderChat = (value) => {
        this.setState({
            isActive: value
        })
    };

    renderItems = (message) => {
        const {isDivide} = message;

        if (isDivide) {
            return (
                <Divider><Button type='primary'>Просмотреть все сообщения (15)</Button></Divider>
            )
        }
        return (
            <ChatMessage
                item={message}
                onClick={this.handleClickHeaderChat}/>
        )
    };


    render() {
        const {handleSubmit} = this.props;
        const {item} = this.state;

        const {isActive} = this.state;
        const showActive = isActive ?
            <Dropdown overlay={menu} trigger={['click']}>
                <Button>Действия <Icon type="down"/></Button>
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
                            <h3>Тема обсуждения (Из архива): <a> {item.title}</a></h3>
                        </div>
                        {isActive ? showActive : undefined}
                    </div>
                    <div>
                        <List
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            dataSource={getData(item)}
                            renderItem={message => (
                                <List.Item>
                                    {this.renderItems(message)}
                                </List.Item>
                            )}
                        />

                        {/*<form id={FORM_ID} className='form-add-message' onSubmit={handleSubmit(this.handleSubmit)}>*/}
                        {/*<Field*/}
                        {/*name='comment'*/}
                        {/*onEditorStateChange={this.onEditorStateChange}*/}
                        {/*component={FormEditWysiwyg}/>*/}
                        {/*<Button className='button button-regular' onClick={this.handleCancelComment}>Отмена</Button>*/}
                        {/*<Button onClick={handleSubmit(this.handleSubmit)}>Добавить</Button>*/}
                        {/*</form>*/}
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
