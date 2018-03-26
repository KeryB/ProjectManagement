import * as React from "react";
import PropTypes from "prop-types";
import {Avatar, Button, Dropdown, Icon, Input, List, Menu} from "antd";
import {Editor} from "react-draft-wysiwyg";
import {EditorState} from 'draft-js';
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {FormEditWysiwyg} from "../../forms/Inputs";
import {bindActionCreators} from "redux";
import {addComment} from "../../../actions/TaskActions";

const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="http://www.alipay.com/">Пожаловаться</a>
        </Menu.Item>
    </Menu>
);


const FORM_ID = 'addComment';

class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            editorState: EditorState.createEmpty(),
        }
    }


    static propTypes = {
        comments: PropTypes.array.isRequired,
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    handleButtonClick = (e) => {
        this.setState({
            ...this.state,
            showComponent: true
        })
    };

    handleSubmit = (values) => {
        const{addComment} = this.props;
        addComment(values.comment);
    };

    handleCancelComment=()=>{
     this.setState({
         showComponent: false
     })
    };

    EditForm = () => {
        const {handleSubmit} = this.props;
        return (
            <form id={FORM_ID} onSubmit={handleSubmit(this.handleSubmit)}>
                <Field
                    name='comment'
                    onEditorStateChange={this.onEditorStateChange}
                    component={FormEditWysiwyg}/>
                <Button onClick={this.handleCancelComment}>Отмена</Button>
                <Button onClick={handleSubmit(this.handleSubmit)}>Добавить</Button>
            </form>
        )
    };

    RenderComments = (comments) => {
        if (!comments) {
            return (
                <Button>Комментировать</Button>
            )
        }
        const IconText = ({type, text}) => (
            <span>
        <Icon type={type} style={{marginRight: 8}}/>
                {text}
        </span>
        );

        return (
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={item => (
                    <div style={{margin: '5px'}} className='comment-list-container'>
                        <div className='list-header'>
                            <Avatar size='small'/>
                            <span
                                className='comment-sender'><h4>{item.primaryUser.firstName + ' ' + item.primaryUser.secondName}</h4></span>
                            <span style={{float: 'right'}}>
                           <Dropdown overlay={menu} trigger={['click']}>
                               <Icon type="ellipsis"/>
                           </Dropdown>
                       </span>
                        </div>
                        <div className='comment-content'>{item.message}</div>
                        <div className='action-panel'>
                        <span>
                            <span className='count-sub-messages'>
                                <IconText type="message" text="2"/>
                            </span>
                            <span className='comment-button'>
                                <Button icon="cloud" onClick={this.handleButtonClick}>Ответить</Button>
                            </span>
                        </span>
                            <div className='editor-comment'>
                                {this.state.showComponent ?
                                    this.EditForm() : undefined}
                            </div>
                        </div>
                    </div>

                )}
            />
        )
    };

    render() {
        const {comments} = this.props;

        return (
            <div className='comments-panel'>
                {this.RenderComments(comments)}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addComment: bindActionCreators(addComment, dispatch)
    }
}

Comment = reduxForm({
    form: FORM_ID
})(Comment);

export default connect(null, mapDispatchToProps)(Comment);