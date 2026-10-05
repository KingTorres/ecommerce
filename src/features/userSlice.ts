import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface UserState {
    userProfile: any | null;
    accessToken: string | null
}
const initialToken = localStorage.getItem('accessToken')
const initialState: UserState = {
    userProfile: null,
    accessToken: initialToken
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{userProfile: any; accessToken: string}>) => {
            state.userProfile = action.payload.userProfile;
            state.accessToken = action.payload.accessToken
            localStorage.setItem("accessToken", action.payload.accessToken)
        },
        logout: (state) => {
            state.userProfile = null;
            state.accessToken = null;
            localStorage.removeItem("accessToken");
        }
    }
})

export const {setCredentials, logout} = userSlice.actions;
export default userSlice.reducer