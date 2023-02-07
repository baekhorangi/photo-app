import React from "react";

function PostModal({ data }) {
  return (
    <div className="fixed top-1/2 left-1/2 flex h-screen w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-gray-800/90">
      <div className="h-1/2 w-full max-w-4xl px-4">
        <div className="h-full flex-grow rounded-lg bg-white shadow-2xl">
          Inner Modal
        </div>
      </div>
    </div>
  );
}

export default PostModal;
