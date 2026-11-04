import React from 'react';

export const LogoTextComponent = () => {
  return (
    <svg
      width="110"
      height="33"
      viewBox="0 0 110 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="22" x={0} y={6} fill="#F97316" rx={4} />
      <path
        d="M6 12L10 22L14 12H11.2L10 16L8.8 12H6Z"
        fill="white"
      />
      <text
        x="26"
        y="24"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="20"
        fontWeight="700"
        fill="currentColor"
      >
        Viralz
      </text>
    </svg>
  );
};
