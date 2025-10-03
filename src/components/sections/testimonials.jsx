import React from "react";

const testimonials = [
  {
    name: "John Doe",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    feedback: "This platform helped me ace my interviews! The feedback was detailed and very actionable."
  },
  {
    name: "Jane Smith",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    feedback: "I loved the realistic interview simulations. It really prepared me for real interviews."
  },
  {
    name: "Ali Khan",
    role: "Data Analyst",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
    feedback: "Personalized feedback helped me improve my communication skills and confidence."
  }
];

export default function TestimonialSection() {
  return (
    <section className="w-full py-20 ">
      <div className="main-wrapper flex flex-col items-center text-center gap-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Hear From Our Users
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl">
          See how InterviewEase has helped thousands improve their interview skills and land their dream jobs.
        </p>

        <div className="grid md:grid-cols-3 gap-8 w-full">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4"
              />
              <p className="text-gray-800 mb-4">"{testimonial.feedback}"</p>
              <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
              <span className="text-sm text-gray-500">{testimonial.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
