import React from "react";
import { primary45 } from "@/util/colors";
import { Modal } from "flowbite-react";

export function Dialog({
  isVisible,
  body,
  onClose,
  title,
  noPadding,
  backgroundColor,
}) {
  if (!isVisible) {
    return null;
  }

  const styles = {
    header: {
      backgroundColor: primary45,
      color: "#FFF",
      padding: 8,
      fontSize: 14,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    body: {
      padding: noPadding ? 0 : 14,
      backgroundColor: backgroundColor ? backgroundColor : "#FFF",
    },
    xIcon: {
      cursor: "pointer",
    },
  };
  // <Modal show={show} size="6xl" popup onClose={onClose} >
  //    <Modal  onClose={onClose}  isVisible={isVisible}  positionTop={positionTop}  style={style}>
  return (
    <Modal onClose={onClose} show={isVisible}>
      <Modal.Header style={styles.header}>{title}</Modal.Header>
      <div style={styles.body}>{body}</div>
    </Modal>
  );
}
