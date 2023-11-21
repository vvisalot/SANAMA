import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function DraggableSignature({ url, onSet, onCancel }) {
  return (
    <div className="absolute z-50 border-2 border-blue-800">
      <div className="absolute right-0 inline-block bg-blue-800">
        <div className="inline-block cursor-pointer p-1" onClick={onSet}>
          <FaCheck />
        </div>
        <div className="inline-block cursor-pointer p-1" onClick={onCancel}>
          <FaTimes />
        </div>
      </div>
      <img src={url} width={200} className="block" draggable={false} />
    </div>
  );
}
