import React from "react";
import { BigButton } from "../buttons/BigButton";
import { FaCheck, FaTimes } from "react-icons/fa";
import { errorColor, goodColor, primary45 } from "@/util/colors";

export default function DraggableSignature({ url, onSet, onCancel }) {
  const styles = {
    container: {
      position: "absolute",
      zIndex: 100000,
      border: `2px solid ${primary45}`,
    },
    controls: {
      position: "absolute",
      right: 0,
      display: "inline-block",
      backgroundColor: primary45,
    },
    smallButton: {
      display: "inline-block",
      cursor: "pointer",
      padding: 4,
    },
  };
  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <div style={styles.smallButton} onClick={onSet}>
          <FaCheck color={goodColor} />
        </div>
        <div style={styles.smallButton} onClick={onCancel}>
          <FaTimes color={errorColor} />
        </div>
      </div>
      <img src={url} width={200} style={styles.img} draggable={false} />
    </div>
  );
}
