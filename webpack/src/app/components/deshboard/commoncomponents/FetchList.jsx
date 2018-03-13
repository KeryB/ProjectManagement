import * as React from "react";
import {List, Avatar, Button, Spin, Badge} from 'antd';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as projectAction from "../../../actions/project/ProjectAction";
import PropTypes from "prop-types";
import moment from "moment/moment";
import {Link} from "react-router-dom";
import * as Path from '../../../utils/RoutePath';
import {isEmpty} from "lodash";
import {dateFormat, toFormat} from "../../../utils/DateUtils";

class FetchList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            loadingMore: false,
            showLoadingMore: true,
            pageable: {
                current: 0,
                pageSize: 8,
                userId: 0
            },
            data: [],
        }
    }

    static = {
        projectData: PropTypes.object.isRequired,
        userObject: PropTypes.object.isRequired,
    };

    componentDidMount() {
        const {userObject} = this.props;

        this.setState({
            pageable:{
                ...this.state.pageable,
                userId: parseInt(userObject.id)
            }
        }, () => {
            console.log(this.state);
            this.getData(this.state.pageable, (resp) => {
                this.setState({
                    loading: false,
                    data: resp
                })
            });
        });
    }

    getData = (pageable, successCallback) => {
        const {projectActions} = this.props;
        projectActions.fetchProjects(pageable, successCallback)
    };

    onLoadMore = () => {
        let {pageable} = this.state;
        this.setState({
            loadingMore: true,
        });
        pageable.current++;
        this.getData(pageable, (res) => {
            const data = this.state.data.concat(res);
            this.setState({
                data: data,
                loadingMore: false
            });
        });
    }

    render() {
        const {loading, loadingMore, showLoadingMore, data} = this.state;
        const {projectData: {projects}} = this.props;

        const loadMore = showLoadingMore ? (
            <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'}}>
                {loadingMore && <Spin/>}
                {!loadingMore && !isEmpty(projects) ?
                    <Button onClick={this.onLoadMore}>Загрузить еще</Button> : undefined}
            </div>
        ) : null;

        return (
            <List
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={data}
                renderItem={item => (
                    <List.Item actions={[<span>{toFormat(item.creationDate)}</span>]}>
                        <List.Item.Meta
                            avatar={<Link to={Path.ROOT}><Badge status="processing"
                                                                text={<Avatar shape="square"/>}/></Link>}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        projectData: state.profile
    }
}

function mapDispatchToProps(dispatch) {
    return {
        projectActions: bindActionCreators(projectAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchList);