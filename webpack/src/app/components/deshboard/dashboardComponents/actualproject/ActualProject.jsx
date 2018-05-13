import * as React from "react";
import {Avatar, Badge, Breadcrumb, Card, Icon, Select, Spin, Input, Table, Button} from "antd";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {fetchActualProjectData} from "../../../../actions/project/ProjectAction";
import {isEmpty} from "lodash";
import UserList from "./UserList";
import {PriorityTask, TaskStatus, TaskTypeOption} from "../../../../utils/task/TaskUtils";

const columns = [{
    title: 'Название файла',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
}, {
    title: 'Описание',
    dataIndex: 'description',
    key: 'description',
}, {
    title: 'Последнее изменение',
    dataIndex: 'lastChange',
    key: 'lastChange',
}];
const data = [{
    key: '1',
    name: <span><Icon type="folder" /> src</span>,
    description: '',
    lastChange: '05.04.2018, 15:24'
},{
    key: '2',
    name: <span><Icon type="folder" /> папка</span>,
    description: '',
    lastChange: '05.04.2018, 15:24'
},{
    key: '3',
    name: <span><Icon type="file" /> file.txt</span>,
    description: '',
    lastChange: '05.04.2018, 15:24'
}];


class ActualProject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null
        }
    }

    static propTypes = {
        actualProject: PropTypes.object.isRequired,
    };

    componentDidMount() {
        const {fetchActualProjectData, match: {params}} = this.props;
        this.setState({
            id: parseInt(params.id)
        }, () => {
            fetchActualProjectData(this.state);
        })

    }


    render() {
        const {actualProject: {loading, projectData, projectData: {project, users}}} = this.props;

        return (
            <div className='actual-project'>
                {isEmpty(projectData) ? <Spin/> :
                    <div>
                        <div className='p-block'>
                            <h4>
                                <Breadcrumb>
                                    <Breadcrumb.Item href="">
                                        <Icon type="home"/> Главная
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        Текущий проект
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </h4>
                            <div className='row '>
                                <div className='col-6 col-md-7'>
                                    <span className='project-avatar'><Avatar size='large'/></span>
                                    <div className='title-container'>
                                        <h2>
                                            {project.title}
                                            <Icon type={project.locked ? 'lock' : 'unlock'}/>
                                        </h2>
                                        <div className='project-description'>
                                            {project.description}
                                        </div>
                                    </div>
                                    <div className='add-user'><Button icon='user-add'> Добавить пользователя</Button></div>
                                </div>
                                <div className='col-6 col-md-5 data-container'>
                                    <div className='row'>
                                        <div className='col-6 col-md-4'>
                                            <div>
                                                <h3><Icon type="user"/> Пользователей</h3>
                                                <div className='total-users'>1</div>
                                            </div>
                                        </div>
                                        <div className='col-6 col-md-4'>
                                            <div>
                                                <h3><Icon type="file"/> Файлов</h3>
                                                <div className='total-users'>1(mb)</div>
                                            </div>
                                        </div>
                                        <div className='col-6 col-md-4'>
                                            <div>
                                                <h3><i className="far fa-clipboard"/>
                                                    Задач</h3>
                                                <div className='total-users'>9</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='second-container-project'>
                            <div className='row'>
                                <div className='col-sm-8'>
                                    <div className='indent-p-block'>
                                        <div className='row'>
                                            <div className='col-6 col-md-3'>
                                                <div style={{display: 'inline-block'}}>
                                                    <h4 style={{display: 'inline-block'}}>Ветка:</h4>
                                                    <div style={{display: 'inline-block'}}>
                                                        <Select defaultValue="master" style={{width: 120}}>
                                                            <Select.Option value="Master">Master</Select.Option>
                                                            <Select.Option value="lucy">Lucy</Select.Option>
                                                            <Select.Option value="Yiminghe">yiminghe</Select.Option>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-6 col-md-6'>
                                            <span>
                                                 <h4 style={{display: 'inline-block'}}>Поиск по файлу:</h4>
                                                 <Input.Search
                                                     placeholder="Введите название файла"
                                                     onSearch={value => console.log(value)}
                                                     style={{width: 200}}
                                                 />
                                            </span>
                                            </div>
                                        </div>
                                        <div className='file-table'>
                                            <Table columns={columns}
                                                   dataSource={data}
                                                   size='middle'
                                                   pagination={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-4'>
                                    <div className='indent-p-block'>
                                        <h4> Пользователи в проекте:</h4>
                                        <UserList users={users}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        actualProject: state.actualProject
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchActualProjectData: bindActionCreators(fetchActualProjectData, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActualProject);