import { List, Avatar, Button, Spin } from 'antd';
import * as React from "react";
import PropTypes from "prop-types";

class UserList extends React.Component {

    static propTypes = {
        users: PropTypes.array.isRequired,
    };

    state = {
        loading: false,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
    }

    render() {
        const { loading, loadingMore, showLoadingMore, data } = this.state;
        const {users} = this.props;
        //
        // const loadMore = showLoadingMore ? (
        //     <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        //         {loadingMore && <Spin />}
        //         {!loadingMore && <Button onClick={this.onLoadMore}>Показать всех</Button>}
        //     </div>
        // ) : null;
        return (
            <List
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="horizontal"
                dataSource={users}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="/resources/images/profile.jpeg" />}
                            title={<a href="https://ant.design">{item.firstName + item.secondName}</a>}
                            description='Супер-администратор'
                        />
                    </List.Item>
                )}
            />
        );
    }
}

export default UserList;