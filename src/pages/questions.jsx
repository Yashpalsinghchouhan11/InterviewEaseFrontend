//   import Interviewer from "../assets/Interviewer1.png";
//   import { Link } from "react-router-dom";
//   import VolumeUpIcon from "@mui/icons-material/VolumeUp";
//   import MicIcon from "@mui/icons-material/Mic";
//   import { useSelector, useDispatch } from "react-redux";
//   import {interviewId } from "../Features/questionSlice";
//   import {asyncGetQuestions, index, totalQuestions, questions, questionId } from "../Features/getQuestions";
//   import { useEffect, useState, useRef } from "react";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
//   import { user, setAudioFileUrls, isAuthenticated } from "../Features/userSlice";
//   import { setAnswerAsync } from "../Features/answersSlice";

//   export default function Questions() {
//     // All state for speech to text answers
//     const [recordStart, setRecordStart] = useState(false);
//     const [redo, setReDo] = useState(true);
//     const [save, setSave] = useState(false);
//     const [ans, setAns] = useState(true);
//     const [transcriptText, setTranscriptText] = useState("");
//     // const [question_no, setQuestion_no] = useState(0);
//     // const [ques, setQues] = useState("");
//     // const [answer, setAnswer] = useState([]);

//     const questionIndex = useSelector(index);
//     const currentQuestion = useSelector(questions)
//     const totalNumberOfQuestions = useSelector(totalQuestions)
//     const interview_id = useSelector(interviewId)
//     const question_id = useSelector(questionId)
//     console.log(interview_id)
//     // All states for Audio recording
//     const [audioBlobFile, setAudioBlobFile] = useState(null); // Array for 5 recordings
//     // const [currentAnswer, setCurrentAnswer] = useState(0); // Current recording index (0-4)
//     // const [isRecording, setIsRecording] = useState(false);
//     const mediaRecorderRef = useRef(null);

//     const dispatch = useDispatch();
//     // const Question = useSelector(question);
//     const audioFile = 1;
//     const synth = window.speechSynthesis;

//     // const currentQuestionRef = useRef(null);

//     const User = useSelector(user);
//     const isLogging = useSelector(isAuthenticated)
//     useEffect(()=>{
//       if (!isLogging){
//         navigate('/login')
//       }
//     },[isAuthenticated])

//     // Function to speak a greeting
//     const speakIntro = () => {
//       const greeting = `Hey ${User.username}, Let's practice an interview.`;
//       const utterance = new SpeechSynthesisUtterance(greeting);
//       let voices = synth.getVoices();
//       const selectedVoice = voices.find(
//         (voice) => voice.name === "Microsoft Zira - English (United States)"
//       );
//       utterance.voice = selectedVoice;
//       synth.speak(utterance);
//     };

//     // Run the speakIntro function when the component mounts
//     useEffect(() => {
//       const timeout = setTimeout(() => {
//         speakIntro();
//       }, 1000);
//       return () => clearTimeout(timeout);
//     }, []);

//     // Function to speak a question aloud
//     const speakQuestion = (Q) => {
//       const utterance = new SpeechSynthesisUtterance(Q);
//       let voices = synth.getVoices();
//       const selectedVoice = voices.find(
//         (voice) => voice.name === "Microsoft Zira - English (United States)"
//       );
//       utterance.voice = selectedVoice;
//       synth.speak(utterance);
//     };

//     // Load the first question and speak it aloud when questions are available
//     // useEffect(() => {
//     //   if (Question && Question.length > 0) {
//     //     setQues(Question[0]);
//     //     currentQuestionRef.current = Question[0];
//     //     const timeout = setTimeout(() => {
//     //       speakQuestion(Question[0]);
//     //     }, 2000);
//     //     return () => clearTimeout(timeout);
//     //   }
//     // }, [Question]);

//     useEffect(() => {
//       if (currentQuestion && totalNumberOfQuestions > 0) {
//         // setQues(Question[0]);
//         // currentQuestionRef.current = Question[0];
//         const timeout = setTimeout(() => {
//           speakQuestion(currentQuestion);
//         }, 2000);
//         return () => clearTimeout(timeout);
//       }
//     }, [currentQuestion]);

//     // Dispatch answers to Redux store when there is an update
//     // useEffect(() => {
//     //   if (answer.length > 0) {
//     //     dispatch(setAnswers(answer));
//     //   }
//     // }, [answer]);

//     // Handle advancing to the next question
//     // const handleNext = () => {
//     //   if (question_no < Question.length - 1) {
//     //     const nextQuestion = Question[question_no + 1];
//     //     setQues(nextQuestion);
//     //     currentQuestionRef.current = nextQuestion;
//     //     const timeout = setTimeout(() => {
//     //       speakQuestion(nextQuestion);
//     //       setQuestion_no((prevQuestionNo) => prevQuestionNo + 1);
//     //       setReDo(true);
//     //       setAns(true);
//     //     }, 1000);
//     //     return () => clearTimeout(timeout);
//     //   }
//     // };
//     const handleNext = () => {
//       // if (questionIndex == totalNumberOfQuestions-1) {
//         // const nextQuestion = Question[question_no + 1];
//         // setQues(nextQuestion);
//         // currentQuestionRef.current = nextQuestion;
//         //   speakQuestion(nextQuestion);
//         //   setQuestion_no((prevQuestionNo) => prevQuestionNo + 1);
//         dispatch(asyncGetQuestions({ interviewId: interview_id, index: questionIndex+1 }));
//           setReDo(true);
//           setAns(true);
//       // }
//     };

//     // Speech recognition functions
//     const {
//       transcript,
//       listening,
//       resetTranscript,
//       abortListening,
//       browserSupportsSpeechRecognition,
//     } = useSpeechRecognition();

//     // Start recording user response
//     const record = async () => {
//       if (browserSupportsSpeechRecognition) {
//         SpeechRecognition.startListening({ continuous: true });

//         //Audio recording setup
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         mediaRecorderRef.current = new MediaRecorder(stream);
//         const audioChunks = [];

//         mediaRecorderRef.current.ondataavailable = (event) => {
//           audioChunks.push(event.data);
//         };

//         mediaRecorderRef.current.onstop = () => {

//           const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
//           setAudioBlobFile(audioBlob)
//           // const newAudioUrl = URL.createObjectURL(audioBlob);

//           // const updatedAudioUrls = [...audioUrls];
//           // updatedAudioUrls[currentAnswer] = newAudioUrl;
//         };

//         mediaRecorderRef.current.start();
//         setRecordStart(true);

//       } else {
//         console.log("Browser does not support speech recognition.");
//       }
//     };

//     // Stop recording and save transcript
//     const recordEnd = () => {
//       SpeechRecognition.stopListening();
//       mediaRecorderRef.current.stop();
//       setTranscriptText(transcript);
//       setRecordStart(false);
//       // console.log("transcript",transcript)
//       setReDo(false);
//       setSave(true);
//       setAns(false);
//     };

//     // Save the current answer and reset the state for the next question
//     const handleSave = () => {
//       const formData = new FormData();
//       formData.append("questionId", question_id); // Replace with actual question ID
//       formData.append("interviewId", interview_id); // Replace with actual interview ID (if any)
//       formData.append("answer_text", transcriptText); // Add text response
//       formData.append("audio_path", audioBlobFile);
//       dispatch(setAnswerAsync(formData))
//       setSave(false);
//       setReDo(true);
//       setAns(false);
//       resetTranscript();
//     };

//     // Redo Restart recording for redo functionality
//     const recordStartAgain = () => {
//       // const updatedAudioUrls = [...audioUrls];
//       // updatedAudioUrls[currentAnswer] = null;
//       // setAudioUrls('');
//       setAudioBlobFile(null)
//       setTranscriptText("");
//       resetTranscript();
//       setReDo(true);
//       setRecordStart(false);
//       setSave(false);
//       setAns(true);
//     };

//     // Repeat the current question aloud
//     const SpeakQuestionAgain = () => {
//       speakQuestion(currentQuestion);
//     };

//     useEffect(() => {
//       // if (interview_id && typeof questionIndex === "number") {
//           dispatch(asyncGetQuestions({ interviewId: interview_id, index: questionIndex }));
//       // }
//   }, [dispatch, interview_id, questionIndex]);

//   // Render the component UI
//   return (
//     <div className="h-screen w-full bg-slate-100 flex flex-col justify-center items-center ">
//       {totalNumberOfQuestions > 0 ? (
//         <>
//           <img
//             src={Interviewer}
//             alt=""
//             className="max-w-sm bg-white max-md:max-w-40 max-md:mt-8"
//           />
//           <div className="flex flex-col items-center mb-8 rounded-lg">
//             <audio src="" controls autoPlay hidden>
//               <source src={audioFile} type="audio/mpeg" />
//             </audio>
//             <h1 className="text-md font-semibold text-zinc-700 mt-4">
//               Question - {questionIndex + 1}
//               <span onClick={SpeakQuestionAgain}>
//                 <VolumeUpIcon style={{ height: "1.5rem", width: "2rem" }} />
//               </span>
//             </h1>
//             <p className="text-lg text-zinc-700 my-4 px-16 shadow-md hover:shadow-xl">
//               {/* Show question or a loading message */}
//               {currentQuestion}
//             </p>
//           </div>
//           <div className="flex justify-between">
//             {recordStart ? (
//               <button
//                 className="flex bg-rose-500 py-2 px-4 m-2 text-center rounded-md text-slate-200 hover:shadow-lg ml-4"
//                 onClick={recordEnd}
//               >
//                 Stop
//               </button>
//             ) : (
//               <button
//                 className="flex bg-rose-500 py-2 px-4 m-2 text-center rounded-md text-slate-200 hover:shadow-lg mr-4 disabled:cursor-not-allowed disabled:bg-rose-400"
//                 onClick={record}
//                 disabled={ans ? false : true}
//               >
//                 Answer
//                 <span className="float-end">
//                   <MicIcon />
//                 </span>
//               </button>
//             )}
//             {!redo && (
//               <button
//                 className={`${
//                   !redo ? "" : "hidden"
//                 } flex bg-rose-500 py-2 px-4 m-2 text-center rounded-md text-slate-200 hover:shadow-lg ml-4 disabled:cursor-not-allowed disabled:bg-rose-400`}
//                 onClick={recordStartAgain}
//               >
//                 Redo
//               </button>
//             )}
//             <button
//               className={`flex bg-rose-500 py-2 px-4 m-2 text-center rounded-md text-slate-200 hover:shadow-lg ml-4 cursor-pointer disabled:cursor-not-allowed disabled:bg-rose-400`}
//               onClick={handleSave}
//               disabled={save ? false : true}
//             >
//               Save
//             </button>
//             {questionIndex === totalNumberOfQuestions - 1 ? (
//               <Link
//                 className={`flex bg-rose-500 py-2 px-4 m-2 text-center rounded-md text-slate-200 hover:shadow-lg ml-4 cursor-pointer disabled:cursor-not-allowed`}
//                 to="/category/domain/start/reviewanswer"
//               >
//                 Review Answers
//               </Link>
//             ) : (
//               <Link
//                 to={`/category/domain/start?questionIndex=${questionIndex+1}`}
//                 className={`flex bg-rose-500 py-2 px-4 m-2 text-center rounded-md text-slate-200 hover:shadow-lg ml-4 cursor-pointer`}
//                 onClick={handleNext}
//               >
//                 Next
//               </Link>
//             )}
//           </div>
//         </>
//       ) : (
//         <h1 className="text-red-500 text-4xl text-center">Loading...</h1>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MicIcon from "@mui/icons-material/Mic";
import CircularProgress from "@mui/material/CircularProgress";
import Interviewer from "../assets/Interviewer1.png";
import { interviewId } from "../Features/questionSlice";
import {
  // interviewId,
  questionId,
  index,
  totalQuestions,
  questions,
  asyncGetQuestions,
} from "../Features/getQuestions";
import { user, isAuthenticated } from "../Features/userSlice";
import { setAnswerAsync } from "../Features/answersSlice";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Questions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const questionIndex = useSelector(index);
  const currentQuestion = useSelector(questions);
  const totalNumberOfQuestions = useSelector(totalQuestions);
  const interview_id = useSelector(interviewId);
  const question_id = useSelector(questionId);

  const User = useSelector(user);
  const isLogging = useSelector(isAuthenticated);

  // Local states
  const [recordStart, setRecordStart] = useState(false);
  const [redo, setReDo] = useState(true);
  const [save, setSave] = useState(false);
  const [ans, setAns] = useState(true);
  const [transcriptText, setTranscriptText] = useState("");
  const [audioBlobFile, setAudioBlobFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const mediaRecorderRef = useRef(null);
  const synth = window.speechSynthesis;

  // Speech recognition
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLogging) navigate("/login");
  }, [isLogging, navigate]);

  // Request microphone permission on mount
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => console.log("Mic permission granted"))
      .catch(() =>
        alert("Microphone access denied. Please enable it to continue.")
      );
  }, []);

  // Speak greeting
  useEffect(() => {
    const timeout = setTimeout(() => {
      const greeting = `Hey ${
        User?.username || "Candidate"
      }, Let's practice an interview.`;
      const utterance = new SpeechSynthesisUtterance(greeting);
      let voices = synth.getVoices();
    const selectedVoice = voices.find(
      (voice) => voice.name === "Microsoft Zira - English (United States)"
    );
    utterance.voice = selectedVoice;
    synth.speak(utterance);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [User, synth]);
  // useEffect(() => {
  //   if (currentQuestion && totalNumberOfQuestions > 0) {
  //     // setQues(Question[0]);
  //     // currentQuestionRef.current = Question[0];
  //     const timeout = setTimeout(() => {
  //       speakQuestion(currentQuestion);
  //     }, 2000);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [currentQuestion]);

  // Speak question aloud
  // const speakQuestion = (Q) => {
  //   const utterance = new SpeechSynthesisUtterance(Q);
  //   synth.speak(utterance);
  // };

  const speakQuestion = (Q) => {
    const utterance = new SpeechSynthesisUtterance(Q);
    let voices = synth.getVoices();
    const selectedVoice = voices.find(
      (voice) => voice.name === "Microsoft Zira - English (United States)"
    );
    utterance.voice = selectedVoice;
    synth.speak(utterance);
  };

  // Fetch first question
  useEffect(() => {
    setLoading(true);
    if (interview_id) {
      dispatch(
        asyncGetQuestions({ interviewId: interview_id, index: questionIndex })
      ).finally(() => setLoading(false));
    }
  }, [dispatch, interview_id, questionIndex]);

  // Next question
  const handleNext = () => {
    dispatch(
      asyncGetQuestions({ interviewId: interview_id, index: questionIndex + 1 })
    );
    setReDo(true);
    setAns(true);
  };

  // Start recording
  const record = async () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }
    SpeechRecognition.startListening({ continuous: true });

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      setAudioBlobFile(audioBlob);
    };

    mediaRecorderRef.current.start();
    setRecordStart(true);
  };

  // Stop recording
  const recordEnd = () => {
    SpeechRecognition.stopListening();
    mediaRecorderRef.current.stop();
    setTranscriptText(transcript);
    setRecordStart(false);
    setReDo(false);
    setSave(true);
    setAns(false);
  };

  // Save answer
  const handleSave = () => {
    const formData = new FormData();
    formData.append("questionId", question_id);
    formData.append("interviewId", interview_id);
    formData.append("answer_text", transcriptText);
    formData.append("audio_path", audioBlobFile);

    dispatch(setAnswerAsync(formData));
    setSave(false);
    setReDo(true);
    setAns(false);
    resetTranscript();
  };

  // Redo answer
  const recordStartAgain = () => {
    setAudioBlobFile(null);
    setTranscriptText("");
    resetTranscript();
    setReDo(true);
    setRecordStart(false);
    setSave(false);
    setAns(true);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#fff9f9] to-[#fdf6ff] flex flex-col justify-center items-center font-poppins">
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <CircularProgress color="secondary" />
          <p className="text-gray-600">Preparing your interview questions...</p>
        </div>
      ) : totalNumberOfQuestions > 0 ? (
        <>
          {/* Interviewer Image */}
          <img
            src={Interviewer}
            alt="AI Interviewer"
            className="max-w-sm bg-white rounded-xl shadow-md"
          />

          {/* Question Panel */}
          <div className="flex flex-col items-center my-6 p-6 bg-white shadow-lg rounded-lg max-w-2xl">
            <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              Question {questionIndex + 1}
              <VolumeUpIcon
                onClick={() => speakQuestion(currentQuestion)}
                className="cursor-pointer text-[#3A86FF]"
              />
            </h1>
            <p className="text-xl text-gray-700 mt-4 text-center">
              {currentQuestion}
            </p>
          </div>

          {/* Mic Animation */}
          {recordStart && (
            <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
              <MicIcon className="text-white text-3xl" />
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {recordStart ? (
              <button
                className="bg-rose-500 px-6 py-2 rounded-lg text-white hover:bg-rose-600 transition"
                onClick={recordEnd}
              >
                Stop
              </button>
            ) : (
              <button
                className="bg-rose-500 px-6 py-2 rounded-lg text-white hover:bg-rose-600 transition disabled:opacity-50"
                onClick={record}
                disabled={!ans}
              >
                Answer <MicIcon className="ml-2" />
              </button>
            )}

            {!redo && (
              <button
                onClick={recordStartAgain}
                className="bg-yellow-500 px-6 py-2 rounded-lg text-white hover:bg-yellow-600 transition"
              >
                Redo
              </button>
            )}

            <button
              onClick={handleSave}
              disabled={!save}
              className="bg-green-600 px-6 py-2 rounded-lg text-white hover:bg-green-700 transition disabled:opacity-50"
            >
              Save
            </button>

            {questionIndex === totalNumberOfQuestions - 1 ? (
              <Link
                to="/interview_report"
                className="bg-blue-600 px-6 py-2 rounded-lg text-white hover:bg-blue-700 transition"
              >
                Review Answers
              </Link>
            ) : (
              <button
                onClick={handleNext}
                className="bg-blue-600 px-6 py-2 rounded-lg text-white hover:bg-blue-700 transition"
              >
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="text-red-500 text-xl">No questions found</p>
      )}
    </div>
  );
}
