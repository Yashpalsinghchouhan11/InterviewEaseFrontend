import React from "react";
import { Grid, Paper, Typography, Box, IconButton } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const features = [
  {
    icon: <QuizIcon sx={{ fontSize: 30, color: "white" }} />,
    title: "Realistic Interview Questions",
    description:
      "Practice with domain-specific questions that mimic real job interviews for your target role.",
    bgColor: "#3A86FF",
  },
  {
    icon: <ChatBubbleOutlineIcon sx={{ fontSize: 30, color: "white" }} />,
    title: "AI-Powered Interviewer",
    description:
      "Experience human-like interviews with AI that listens, analyzes, and interacts just like a real interviewer.",
    bgColor: "#8338EC",
  },
  {
    icon: <FeedbackIcon sx={{ fontSize: 30, color: "white" }} />,
    title: "Personalized Feedback",
    description:
      "Get actionable feedback on your technical skills, communication, and confidence level after each interview.",
    bgColor: "#FF006E",
  },
  {
    icon: <ShowChartIcon sx={{ fontSize: 30, color: "white" }} />,
    title: "Track Your Progress",
    description:
      "Monitor your performance over time and identify areas of improvement with our detailed analytics dashboard.",
    bgColor: "#FB5607",
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 30, color: "white" }} />,
    title: "Domain & Role Coverage",
    description:
      "Prepare for multiple roles and domains, including tech, finance, management, and more.",
    bgColor: "#FFBE0B",
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 30, color: "white" }} />,
    title: "Anytime, Anywhere",
    description:
      "Practice interviews whenever you want without scheduling hassles. Fits your pace and convenience.",
    bgColor: "#00BBF9",
  },
];

export default function PlatformFeaturesSection() {
  return (
    <Box sx={{ py: 12, px: { xs: 3, md: 6 }, bgcolor: "#F9FAFB" }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          What InterviewEase Offers
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
          Everything you need to prepare for your next interview and boost your confidence.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
        {features.map((feature, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: "100%", sm: "calc(50% - 16px)", md: "calc(33.333% - 22px)" },
              minWidth: 0,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                height: "100%",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  bgcolor: feature.bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                {feature.icon}
              </Box>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  );
}