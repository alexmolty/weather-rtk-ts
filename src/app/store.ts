import {configureStore} from "@reduxjs/toolkit";
import weather from "../features/weather/weatherSlice.ts";
import message from "../features/message/messageSlice.ts";

export const store = configureStore({
    reducer: {weather,message}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch