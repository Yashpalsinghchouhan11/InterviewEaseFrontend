import React from "react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center bg-zinc-900 py-6">
      <ul className="flex flex-row gap-6 mb-4">
        <li className="text-white hover:text-[#9381FF] transition-colors cursor-pointer">
          <a 
            href="https://www.linkedin.com/in/yashpal-singh-chouhan-907819224" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
        </li>
        <li className="text-white hover:text-[#9381FF] transition-colors cursor-pointer">
          <a 
            href="https://github.com/Yashpalsinghchouhan11" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
        </li>
        <li className="text-white hover:text-[#9381FF] transition-colors cursor-pointer">
          <a 
            href="https://x.com/Yashpal_11" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
          >
            <XIcon />
          </a>
        </li>
      </ul>
      <p className="text-white text-sm max-md:max-w-44 max-md:text-center">
        <span>© 2025 InterviewEase</span>
        {" • "}
        <span>All Rights Reserved</span>
      </p>
    </footer>
  );
}