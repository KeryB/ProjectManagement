import React from "react";
import {Breadcrumb, Button, Icon} from "antd";

const ButtonGroup = Button.Group;

class Documents extends React.Component {

    render() {

        return (
            <div className='doc p-block'>
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
                    <div>
                        <ButtonGroup>
                            <Button>Все</Button>
                            <Button>Документы</Button>
                            <Button>Промежуточные решения</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        )
    }
}

export default Documents;