import * as React from "react";
import PropTypes from 'prop-types';
import {List, Avatar, Card,Col} from 'antd'

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];


class Projects extends React.Component {

    render() {

        const {projects} = this.props;

        return (
            <Col span={16} offset={1}>
                <Card>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </Col>
        )
    }
}

Projects.propTypes = {
    projects: PropTypes.array.isRequired
};

export default Projects;