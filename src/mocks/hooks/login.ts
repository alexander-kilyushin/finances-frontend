import { Store } from '@reduxjs/toolkit'

import { AppDispatch, RootState } from '#models/store'
import { login as loginThunkCreator } from '#models/user'

type Login = (store: Store<RootState>) => void

const login: Login = (store) => {
  const dispatch: AppDispatch = store.dispatch

  dispatch(
    loginThunkCreator({
      password: 'john_doe',
      username: 's3cret',
    }),
  )
}

export default login
