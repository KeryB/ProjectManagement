import * as React from "react";
import {Route} from "react-router-dom";
import * as Path from "../../../../utils/RoutePath";
import Chats from "./Chats";
import ChatPage from "./ChatPage";


class ChatInternal extends React.Component {

    render() {

        return (
            <div>
                <Route path={Path.CHAT_LIST} component={Chats}/>
                <Route path={Path.CHAT_PAGE} component={ChatPage}/>
            </div>
        )
    }
}

export default ChatInternal;