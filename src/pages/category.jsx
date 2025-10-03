import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../features/userSlice";
import {
  asyncSetQuestions,
} from "../features/questionSlice";

export default function Category() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // state for form
  const [mode, setMode] = useState("domain");
  const [domain, setDomainValue] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [resume, setResume] = useState(null);

  // error states
  const [errors, setErrors] = useState({
    domain: "",
    difficulty: "",
    resume: "",
  });

    const isLogging = useSelector(isAuthenticated)
  useEffect(()=>{
    if (!isLogging){
      navigate('/login')
    }
  },[isAuthenticated])

  const handleResumeUpload = (e) => { setResume(e.target.files[0]); };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { domain: "", difficulty: "", resume: "" };

    if (mode === "domain") {
      const trimmedDomain = domain.trim();
      if (!trimmedDomain) {
        newErrors.domain = "Please enter a valid role.";
        valid = false;
        setDomainValue(trimmedDomain);
      }
      if (!difficulty) {
        newErrors.difficulty = "Please select a difficulty level.";
        valid = false;
      }
    }

    if (mode === "resume") {
      if (!resume) {
        newErrors.resume = "Please upload your resume.";
        valid = false;
      }
    }

    setErrors(newErrors);

    if (!valid) return;

    if (mode === "domain") {
      const formData = {
        domain: domain.trim(),
        difficulty,
        mode_of_interview: mode,
      };
      dispatch(asyncSetQuestions(formData));
      navigate("/category/start_interview");
    } else if (mode === "resume") {
      console.log("Resume interview:", resume);
    }
  };

  return (
    <section className="w-full py-8  font-poppins">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          What field do you want to practice for?
        </h2>
        <p className="text-gray-600 mb-10">
          Choose your interview mode:{" "}
          <span className="text-[#8338EC] font-semibold">Domain</span> or{" "}
          <span className="text-[#8338EC] font-semibold">Resume</span>
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6 text-left"
        >
          {/* Radio toggle */}
          <div className="flex gap-8 justify-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mode"
                value="domain"
                checked={mode === "domain"}
                onChange={() => setMode("domain")}
              />
              <span className="font-medium">Domain based Interview</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mode"
                value="resume"
                checked={mode === "resume"}
                onChange={() => setMode("resume")}
              />
              <span className="font-medium">Resume based Interview</span>
            </label>
          </div>

          {/* Domain input + difficulty */}
          {mode === "domain" && (
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter Role (e.g., Software Developer, HR)"
                  value={domain}
                  onChange={(e) => setDomainValue(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3A86FF]"
                />
                {errors.domain && (
                  <p className="text-red-500 text-sm mt-1">{errors.domain}</p>
                )}
              </div>

              <div>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full md:w-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3A86FF]"
                >
                  <option value="">Difficulty Level</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                {errors.difficulty && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.difficulty}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Resume upload */}
          {mode === "resume" && (
            <div className="flex flex-col items-center gap-4 w-full">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer w-full"
              />
              {resume && (
                <p className="text-sm text-gray-500">
                  Uploaded: <span className="font-medium">{resume.name}</span>
                </p>
              )}
              {errors.resume && (
                <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
              )}
            </div>
          )}

          {/* CTA Button */}
          <button
            type="submit"
            className="mt-6 px-8 py-3 rounded-full text-lg font-medium text-white bg-gradient-to-r from-[#9381FF] to-[#3A86FF] hover:from-[#3A86FF] hover:to-[#8338EC] shadow-lg transition"
          >
            Start Interview
          </button>
        </form>
      </div>
    </section>
  );
}
