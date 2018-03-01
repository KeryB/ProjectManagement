import * as React from "react";
import {Upload, Icon, message} from 'antd';
import PropTypes from "prop-types";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
}

class UploadAvatar extends React.Component {

    static propTypes = {
        onChange: PropTypes.func.isRequired
    };

    state = {
        isLoading: false
    };

    handleChange = (info) => {
        let {state} = this.props;
        console.log(info);
        if (info.file.status === 'uploading') {
            this.setState({isLoading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) => {
                this.setState({
                    imageUrl,
                    isLoading: false
                });
                this.props.onChange(this.state);
            });
        }
    };

    render() {
        const imageUrl = this.state.imageUrl;

        const uploadButton = (
            <div>
                <Icon type={this.state.isLoading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">Загрузите аватар</div>
            </div>
        );

        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl}/> : uploadButton}
            </Upload>
        )
    }
}

export default UploadAvatar;