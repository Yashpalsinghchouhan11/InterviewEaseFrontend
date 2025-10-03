import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { showToast } from "./toastSlice";


const initialState = {
  answers: [],
  feedback:null,
};


const setAnswer = (formData) => {
  const token = Cookies.get("access_token"); // Fetch token from cookies or storage

  return new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/login/save_answers/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for FormData
          Authorization: `Bearer ${token}`, // Authorization token
        },
      })
      .then((response) => resolve(response)) // Resolve with the response data
      .catch((error) => reject(error)); // Reject with error details
  });
};



export const setAnswerAsync = createAsyncThunk(
  "answers/setAnswer",
  async (formData, thunkAPI) => {
    try {
      // console.log("FormData sent to backend:");
      // formData.forEach((value, key) => {
      //   console.log(`${key}:`, value); // Logs text fields, blobs, etc.
      // });

      const response = await setAnswer(formData);
      if (response.status == 200)
        {
          thunkAPI.dispatch(showToast({message:response.data.message, status:response.data.status}))
        }
    } catch (error) {
      thunkAPI.dispatch(showToast({message:error.response?.data?.error || "Something went wrong while submitting the answer.", status:"error"}))
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong while submitting the answer."
      );
    }
  }
);

const getAnswers = (interview_id) =>{
  const token = Cookies.get("access_token");
  return new Promise((resolve, reject)=>{
  axios.get(`${import.meta.env.VITE_BASE_URL}/login/fetch_interview_answers/${interview_id}`,{
    headers:{
      Authorization: `Bearer ${token}`,
    }
  })
  .then((response)=>resolve(response))
  .catch((error)=> reject(error))
})
}

export const asyncGetAnswer = createAsyncThunk(
  "answers/getAnswer",
  async (interview_id, thunkAPI) => {
    try {
      const response = await getAnswers(interview_id);

      if (response.data.status === 200) {
        const answers = response.data.answers;
        thunkAPI.dispatch(setAnswers(answers))
        // if (answers.length > 0) {
        //   // Dispatch the first audio path for now (adjust as needed)
        //   thunkAPI.dispatch(setAudioAnswer(answers[0].audio_path));
        //   thunkAPI.dispatch(setTextAnswer(answers[0].answer_text));
        //   thunkAPI.dispatch(setQuestionText(answers[0].question));
        // }
      }
    } catch (error) {
      console.error("Error fetching answers:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error occurred while fetching answers."
      );
    }
  }
);


const getFeedbackReport = (interview_id) => {
  const token = Cookies.get("access_token"); // Fetch token from cookies or storage
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/login/feedback_report/`, {
        params :{interview_id:interview_id},
        headers: {
          Authorization: `Bearer ${token}`, // Authorization token
        }
      })
      .then((response) => resolve(response)) // Resolve with the response data
      .catch((error) => reject(error)); // Reject with error details
  });
}

export const asyncgetFeedbackReport = createAsyncThunk(
  "answers/getFeedbackReport",
  async (interview_id, thunkAPI) => {
    try {
      const response = await getFeedbackReport(interview_id);

      if (response.status === 201) {
        const feedback = response.data.feedback;
        delete feedback.interview
        thunkAPI.dispatch(setFeedback(feedback))
      }
    } catch (error) {
      thunkAPI.dispatch(showToast({message:error.response?.data?.error || "Something went wrong while fetching the feedback report.", status:"error"}))
      thunkAPI.dispatch(setFeedback({
    "confidence": "Confident",
    "strengths": "Strong fundamentals with clear answers.",
    "weaknesses": "No major weaknesses observed",
    "area_of_improvement": "No immediate improvements needed",
    "suggestions": "Keep practicing to maintain current performance"
  }))
    }
  }
);


const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
    setFeedback:(state, action) =>{
      state.feedback = action.payload;
    }
  },
});

export const {setAnswers, setFeedback} = answerSlice.actions;

export const answers = (state)=> state.answer.answers
export const feedback = (state) => state.answer.feedback;

export default answerSlice.reducer;
