import * as React from "react";
import PropTypes from "prop-types";
import {Button, Icon} from "antd";


class SaveComponent extends React.Component {

    static propTypes = {
        buttonText: PropTypes.string.isRequired,
        iconType: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired,
    };

    state = {
        loading: false
    };

    onClick = (e) => {
        console.log(e);
        this.setState({ loading: true });
    };

    render() {
        const {buttonText, iconType, onSubmit} = this.props;
        return (
            <Button type="primary" htmlType="submit" loading={this.state.loading} onClick={this.onClick}>
                <Icon type={this.state.loading ? undefined : iconType}/>{buttonText}
            </Button>
        )
    }
}

export default SaveComponent;