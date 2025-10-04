import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncGetAnswer,
  answers,
  asyncgetFeedbackReport,
  feedback,
} from "../features/answersSlice";
import { interviewId } from "../features/questionSlice";
import { isAuthenticated } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

// Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import HearingIcon from "@mui/icons-material/Hearing";
import PsychologyIcon from "@mui/icons-material/Psychology";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ReplayIcon from "@mui/icons-material/Replay";

export function ReviewAnswer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogging = useSelector(isAuthenticated);
  const interview_id = useSelector(interviewId);
  const answer = useSelector(answers);
  const Feedback = useSelector(feedback);

  // const [report, setReport] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [openFeedback, setOpenFeedback] = useState(null);

  useEffect(() => {
    if (!isLogging) {
      navigate("/login");
    }
  }, [isLogging, navigate]);

  useEffect(() => {
    if (interview_id) {
      dispatch(asyncGetAnswer(interview_id));
      dispatch(asyncgetFeedbackReport(interview_id));
    }
  }, [dispatch, interview_id]);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleFeedback = (key) => {
    setOpenFeedback(openFeedback === key ? null : key);
  };

  // Icons mapping for feedback
  const feedbackIcons = {
    confidence: <RecordVoiceOverIcon className="text-indigo-500" />,
    strengths: <TrendingUpIcon className="text-emerald-500" />,
    weaknesses: <HighlightOffIcon className="text-rose-500" />,
    area_of_improvement: <PsychologyIcon className="text-yellow-500" />,
    suggestions: <LightbulbIcon className="text-orange-500" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#fff9f9] to-[#fdf6ff] p-6 font-poppins shadow-xl">
      <div className="max-w-5xl mx-auto rounded-xl  p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-[#9381FF] mb-4 flex items-center justify-center gap-2">
          <HearingIcon className="text-[#9381FF" /> Interview Report
        </h1>
        <p className="text-center text-rose-600 mb-8">
          Disclaimer: If your speech is not clear or loud enough, the
          speech-to-text may have inaccuracies.
        </p>
        {/* Loader while feedback is not ready */}
        {!Feedback ? (
          <div className="flex justify-center items-center my-8">
            <div className="w-12 h-12 border-4 border-[#9381FF] border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-4 text-gray-600 font-medium">
              Generating AI Feedback...
            </span>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <QuestionAnswerIcon className="text-indigo-500" /> Review Answers
            </h2>
            <div className="space-y-4">
              {answer.map((ans, index) => (
                <div
                  key={ans.id}
                  className="border border-gray-300 rounded-lg shadow-sm"
                >
                  <button
                    onClick={() => toggleAnswer(index)}
                    className="flex justify-between items-center w-full p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  >
                    <span className="text-lg font-medium text-gray-800">
                      Question {index + 1}
                    </span>
                    <ExpandMoreIcon
                      className={`transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIndex === index && (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <p className="text-gray-700 mb-2">
                        <span className="font-bold">Q:</span> {ans.question}
                      </p>
                      <p className="text-gray-700 mb-2">
                        <span className="font-bold">Your Answer:</span>{" "}
                        {ans.answer_text}
                      </p>
                      <audio
                        className="w-full mt-2"
                        controls
                        src={ans.audio_path}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Feedback Section */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4 flex items-center gap-2">
              <PsychologyIcon className="text-purple-500" /> AI Feedback
            </h2>
            <div className="space-y-4">
              {Object.entries(Feedback).map(([key, value]) => (
                <div
                  key={key}
                  className="border border-gray-300 rounded-lg shadow-sm"
                >
                  <button
                    onClick={() => toggleFeedback(key)}
                    className="flex justify-between items-center w-full p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  >
                    <span className="capitalize font-medium text-gray-800 flex items-center gap-2">
                      {feedbackIcons[key]} {key.replaceAll("_", " ")}
                    </span>
                    <ExpandMoreIcon
                      className={`transition-transform ${
                        openFeedback === key ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFeedback === key && (
                    <div className="p-4 bg-white border-t border-gray-200 text-gray-700">
                      {value}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-10 text-center">
              <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 transition mx-4 flex items-center gap-2 justify-center">
                <ReplayIcon /> Retake Interview
              </button>
            </div>
          </>
        )}
        ;
      </div>
    </div>
  );
}
