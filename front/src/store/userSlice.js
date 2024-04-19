import { createSlice } from "@reduxjs/toolkit";
import { authUser, loginUser, logoutUser } from "./thunkFunctions";
import { toast } from "react-toastify";

const initialState = {
  userData: {
    id: "",
    email: "",
    name: "",
    role: 0,
    image: "",
    createdAt: "",
  },
  isAuth: false,
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  /* 기본일때쓴것 */
  reducers: {},

  /* 이 문법이 중요하다. */
  extraReducers: (builder) => {
    builder
      /* 인증 */
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload /* dispatch에서 나오는 payload */;
        toast.info(action.payload.message);
        /* 너는 인증이 된 애다 */
        state.isAuth = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      })

      /* 인가 */
      .addCase(authUser.pending /* pending은 대기상태 라는거 */, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload /* dispatch에서 나오는 payload */;
        /* 너는 인증이 된 애다 */
        state.isAuth = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuth = false;
        state.userData = initialState.userData;
        localStorage.removeItem("access Token");
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = initialState.userData; // 초기화
        /* 너는 인증이 된 애다 */
        state.isAuth = false;
        localStorage.removeItem("accessToken"); // token 삭제
        toast.info(action.payload.message);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      });
  },
});

export default userSlice.reducer;
