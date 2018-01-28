import * as Roles from '../utils/Roles';
import * as Status from '../utils/AuthStatus';

const initialState = {
    isFetched: false,
    user: {
        role: Roles.NOT_AUTH,
        status: Status.NOT_AUTH
    }
};
export default (state = initialState, action = {}) => {
    switch (action.type) {

        default:
            return state;
    }
}