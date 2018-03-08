import * as React from "react";
import {List, Avatar, Button, Spin} from 'antd';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as projectAction from "../../../actions/project/ProjectAction";
import PropTypes from "prop-types";

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class FetchList extends React.Component {

    static = {
        projectData: PropTypes.object.isRequired
    };

    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
    }

    componentDidMount() {
        console.log(this.props);
        this.getData((res) => {
            this.setState({
                loading: false,
                data: res.results
            });
        });
    }

    getData = (callback) => {
        const {projectActions} = this.props;
        projectActions.fetchProjects(successCallback);
    }
    onLoadMore = () => {
        this.setState({
            loadingMore: true,
        });
        this.getData((res) => {
            const data = this.state.data.concat(res.results);
            this.setState({
                data,
                loadingMore: false,
            }, () => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
        });
    }

    render() {
        const {loading, loadingMore, showLoadingMore, data} = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'}}>
                {loadingMore && <Spin/>}
                {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
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
                    <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                            title={<a href="https://ant.design">{item.name.last}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <div>content</div>
                    </List.Item>
                )}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        projectData: state.project
    }
}

function mapDispatchToProps(dispatch) {
    return {
        projectActions: bindActionCreators(projectAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchList);