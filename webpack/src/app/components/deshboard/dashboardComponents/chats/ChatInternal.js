import * as React from "react";
import {Route} from "react-router-dom";
import * as Path from "../../../../utils/RoutePath";
import ChatPage from "./ChatPage";
import ChatList from "./ChatList";


class ChatInternal extends React.Component {

    render() {

        return (
            <div>
                <Route path={Path.CHAT_LIST} component={ChatList}/>
                <Route path={Path.CHAT_PAGE} component={ChatPage}/>
            </div>
        )
    }
}

export default ChatInternal;