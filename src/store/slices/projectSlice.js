import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    project: [],
    error: null,
    message: null,
    singleProjectPrev: {},
  },
  reducers: {
    getAllProjectRequest(state) {
      state.project = [];
      state.loading = true;
      state.error = null;
    

    },
    getAllProjectSuccess(state, action) {
      state.project = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllProjectFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addNewProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewProjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addNewProjectFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
     deleteProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteProjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteProjectFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    
     updateProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateProjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    updateProjectFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetProjectSlice(state) {
      state.error = null;
      state.loading = false;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const getAllProject = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectRequest());
  try {
    const { data } = await axios.get(
      " http://localhost:3000/api/v1/project/getall",
      { withCredentials: true }
    );
    dispatch(projectSlice.actions.getAllProjectSuccess(data.project));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(projectSlice.actions.getAllProjectFail(error.response.data.message));
  }
};

export const addNewProject = (data) => async (dispatch) => {
  dispatch(projectSlice.actions.addNewProjectRequest());
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/project/add",
      data,
      { withCredentials: true ,headers: {"Content-Type":"multipart/form-data"}}
    );
    dispatch(projectSlice.actions.addNewProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(projectSlice.actions.addNewProjectFail(error.response.data.message));
  }
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/project/delete/${id}`,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(projectSlice.actions.deleteProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(projectSlice.actions.deleteProjectFail(error.response.data.message));
  }
};

export const updateProject = (id,formdata) => async (dispatch)=>{
  dispatch(projectSlice.actions.updateProjectRequest());
  try {
    const {data} = await axios.put(`http://localhost:3000/api/v1/project/update/${id}`,formdata,{withCredentials:true,headers:{ "Content-Type": "multipart/form-data"}});
     dispatch(projectSlice.actions.updateProjectSuccess(data.message));
     dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(projectSlice.actions.updateProjectFail(error.response.data.message));
  }
}


export const clearAllProjectSliceError = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

export default projectSlice.reducer;
