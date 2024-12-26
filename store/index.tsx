import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducer/loginReducer'


export default configureStore({
  reducer: {
    login: loginReducer,
  },
})