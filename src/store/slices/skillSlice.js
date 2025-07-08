import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    loading: false,
    skills: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllSkillRequest(state) {
      state.skills = [];
      state.loading = true;
      state.error = null;
    },
    getAllSkillSuccess(state, action) {
      state.skills = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllSkillFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addNewSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addNewSkillFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
     deleteSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteSkillFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
      updateSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    updateSkillFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetSkillSlice(state) {
      state.error = null;
      state.loading = false;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const getAllSkills = () => async (dispatch) => {
  dispatch(skillSlice.actions.getAllSkillRequest());
  try {
    const { data } = await axios.get(
      " https://portfolio-backend-op5p.onrender.com/api/v1/skills/getall",
      { withCredentials: true }
    );
    dispatch(skillSlice.actions.getAllSkillSuccess(data.skills));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.getAllSkillFail(error.response.data.message));
  }
};

export const addNewSkill = (data) => async (dispatch) => {
  dispatch(skillSlice.actions.addNewSkillRequest());
  try {
    const response = await axios.post(
      "https://portfolio-backend-op5p.onrender.com/api/v1/skills/add",
      data,
      { withCredentials: true }
    );
    dispatch(skillSlice.actions.addNewSkillSuccess(response.data.message));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.addNewSkillFail(error.response.data.message));
  }
};

export const deleteSkill = (id) => async (dispatch) => {
  dispatch(skillSlice.actions.deleteSkillRequest());
  try {
    const response = await axios.delete(
      `https://portfolio-backend-op5p.onrender.com/api/v1/skills/delete/${id}`,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(skillSlice.actions.deleteSkillSuccess(response.data.message));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.deleteSkillFail(error.response.data.message));
  }
};

export const updateSkill = (id,formdata) => async (dispatch)=>{
  dispatch(skillSlice.actions.updateSkillRequest());
  try {
    const {data} = await axios.put(`https://portfolio-backend-op5p.onrender.com/api/v1/skills/update/${id}`,formdata,{withCredentials:true,headers:{"Content-Type":"application/json"}});
     dispatch(skillSlice.actions.updateSkillSuccess(data.message));
     dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.updateSkillFail(error.response.data.message));
  }
}

export const clearAllSkillSliceError = () => (dispatch) => {
  dispatch(skillSlice.actions.clearAllErrors());
};

export const resetSkillSlice = () => (dispatch) => {
  dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;
