import { combineReducers } from 'redux'
import theme from './slices/themeSlice'
import auth from './slices/authSlice'
import vendorReducer from './reducers/vendorReducer';
import userProfileReducer from './reducers/userProfileReducer';
import platformReducer from './reducers/platformReducer';

const rootReducer = combineReducers({
    theme,
    auth,
    vendorReducer,
    userProfileReducer,
    platformReducer
})

export default rootReducer

