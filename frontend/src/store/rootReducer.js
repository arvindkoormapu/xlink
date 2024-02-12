import { combineReducers } from 'redux'
import theme from './slices/themeSlice'
import auth from './slices/authSlice'
import vendorReducer from './reducers/vendorReducer';
import userProfileReducer from './reducers/userProfileReducer';
import platformReducer from './reducers/platformReducer';
import apikeysReducer from './reducers/apikeyReducer'
import taxesReducer from './reducers/taxesReducer'
import addonsReducer from './reducers/addonsReducer'

const rootReducer = combineReducers({
    theme,
    auth,
    vendorReducer,
    userProfileReducer,
    platformReducer,
    apikeysReducer,
    taxesReducer,
    addonsReducer
})

export default rootReducer

