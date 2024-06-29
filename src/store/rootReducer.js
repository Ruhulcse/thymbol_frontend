import user from './api/user/userSlice';
import users from './api/users/usersSlice';
import geoLocation from './api/GeoLocation/geoLocationSlice';

import layout from './layout';

const rootReducer = {
    layout,
    user,
    users,
    geoLocation
};
export default rootReducer;
