import React, { useState } from "react";

const faqs = [
  {
    question: "What is InterviewEase?",
    answer:
      "InterviewEase is a platform that lets you practice realistic interview questions and receive personalized feedback on your performance, including technical skills and communication."
  },
  {
    question: "Do I need to pay to start?",
    answer:
      "No, the first two interviews are free for first-time users. After that, you can choose a subscription plan to continue practicing."
  },
  {
    question: "How does the feedback work?",
    answer:
      "After each interview, you receive detailed feedback on your answers, communication skills, and areas to improve, helping you prepare better for real interviews."
  },
  {
    question: "Can I practice interviews for different domains?",
    answer:
      "Yes, InterviewEase provides multiple domains and job roles, so you can practice interviews tailored to your career path."
  },
  {
    question: "Is my data safe?",
    answer:
      "Absolutely! All your interview data and personal information are stored securely and will never be shared without your consent."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20">
      <div className="main-wrapper flex flex-col items-center text-center gap-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl">
          Answers to the most common questions about using InterviewEase.
        </p>

        <div className="w-full max-w-3xl flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <span className="text-xl font-bold">
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <p className="mt-2 text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
