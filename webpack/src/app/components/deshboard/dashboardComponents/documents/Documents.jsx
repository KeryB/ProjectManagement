import React from "react";
import {Breadcrumb, Button, Card, Collapse, Icon, List} from "antd";

const ButtonGroup = Button.Group;
const Panel = Collapse.Panel;

const gridStyle = {
    width: '13%',
    textAlign: 'center',
    margin: ' 0 20px 20px 0'
};

const data = [
    {
        type: <Icon type="file-text" className='file'/>,
        title: <span><h4>Решения от Kery Bul.txt</h4></span>,
    },
    {
        type: <Icon type="file-word" className='file'/>,
        title: <span><h4>ТЗ.doc</h4></span>,
    },
    {
        type: <Icon type="file-excel" className='excel'/>,
        title: <span><h4>Презентация.pptx</h4></span>,
    },
    {
        type: <Icon type="file-text" className='file'/>,
        title: <span><h4>Все ссылки обсуждения.txt</h4></span>,
    },
];

const text = (
    <div>
        <div className='folder-default'>
            <h4><a><Icon type="folder"/> Папки</a></h4>
        </div>
        <div className='default'>
            <div className='folder-example choose'>
                <h4><i className="fas fa-caret-right"/> Обработать что-то</h4>
            </div>
            <div className='folder-example'>
                <h4><i className="fas fa-caret-right"/> Пример 2</h4>
            </div>
        </div>
    </div>
);


class Documents extends React.Component {

    render() {

        return (
            <div className='documents'>
                <div className='p-block'>
                    <div className='header'>
                        <h4>
                            <Breadcrumb>
                                <Breadcrumb.Item href="">
                                    <Icon type="home"/> Главная
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    Документы проекта
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </h4>
                        <div className='actions'>
                            <ButtonGroup>
                                <Button>Все</Button>
                                <Button>Документы</Button>
                                <Button>Промежуточные решения</Button>
                            </ButtonGroup>

                            <span className='float-right'>
                            <ButtonGroup>
                                <Button>Действия<Icon type="down"/></Button>
                                <Button icon='setting'/>
                            </ButtonGroup>
                        </span>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-sm-2">
                            <div className='folder-container'>
                                <Collapse bordered={true}>
                                    <Panel header="Проект" key="1">
                                        {text}
                                    </Panel>
                                    <Panel header="Обсуждения" key="2">
                                        {text}
                                    </Panel>
                                    <Panel header="Задачи" key="3">
                                        {text}
                                    </Panel>
                                </Collapse>
                                {/*<div className='default'>*/}
                                {/*<h4><a><Icon type="clock-circle-o"/> Проект</a></h4>*/}
                                {/*</div>*/}
                                {/*<div className='default'>*/}
                                {/*<h4><a><Icon type="star-o"/> Обсуждения</a></h4>*/}
                                {/*</div>*/}
                                {/*<div className='folder-default'>*/}
                                {/*<h4><a><Icon type="folder"/> Папки(обсуждения)</a></h4>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className="col-sm-10">
                            <div className='content-container'>
                                <List
                                    grid={{gutter: 16, column: 5}}
                                    dataSource={data}
                                    renderItem={item => (
                                        <List.Item>
                                            <div>
                                                <div className='cell'>
                                                    {item.type}
                                                </div>
                                                <div className='footer-cell'>
                                                    {item.title}
                                                </div>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Documents;