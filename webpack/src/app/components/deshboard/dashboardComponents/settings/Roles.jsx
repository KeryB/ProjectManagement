import React from 'react'
import {Button, Modal} from "antd";
import PropTypes from "prop-types";

class Roles extends React.Component {

    static propTypes = {
        visible: PropTypes.bool.isRequired,
    };

    state = {
        loading: false,
        visible: false
    };

    componentWillReceiveProps(props) {
        const {visible} = props;
        this.setState({
            visible: visible
        })
    }

    handleOk = () => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false, visible: false});
        }, 3000);
    };
    handleCancel = () => {
        this.setState({visible: false});
    };

    render() {
        const {loading, visible} = this.state;
        return (
            <div>
                <Modal
                    visible={visible}
                    title="Title"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Return</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            Submit
                        </Button>,
                    ]}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        );
    }
}

export default Roles;