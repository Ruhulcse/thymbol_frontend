import user from './api/user/userSlice';
import users from './api/users/usersSlice';

import layout from './layout';

const rootReducer = {
    layout,
    user,
    users,
};
export default rootReducer;
