import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
	email: string
	isAuth: boolean
	isLoading: boolean
	isError: boolean
}

const initialState: UserState = {
	email: '',
	isAuth: false,
	isLoading: false,
	isError: false,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload
		},
		setAuth: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},
		setError: (state, action: PayloadAction<boolean>) => {
			state.isError = action.payload
		},
	},
})

export const { setEmail, setAuth, setLoading, setError } = userSlice.actions
export default userSlice.reducer
