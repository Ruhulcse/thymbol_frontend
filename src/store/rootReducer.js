import geoLocation from './api/GeoLocation/geoLocationSlice';
import searchStore from './api/storeSearch/storeSearchSlice';
import user from './api/user/userSlice';
import users from './api/users/usersSlice';
import layout from './layout';

const rootReducer = {
    layout,
    user,
    users,
    geoLocation,
    searchStore
};
export default rootReducer;
