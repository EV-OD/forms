import styles from "./radio.module.css";
import { useEffect, useRef } from "react";

export function radioContainer({ childrens }) {
  return { childrens };
}

export default function RadioButton(props) {
  const displayRef = useRef();
  var observer;
  useEffect(() => {
    if (props.editable == "true") {
      observer = new MutationObserver((mutations) =>
        mutations.forEach((mutation) => {
          props.ontextchange(
            mutation.target.data
              ? mutation.target.data
              : mutation.target.innerHTML
          );
        })
      );
    }
    if (props.editable == "true") {
        console.log(displayRef.current)
      observer.observe(displayRef.current, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
  }, []);

  const onchanged = (elt) => {
    if (props.editable) {
      props.onchange(displayRef.current.innerHTML);
    } else {
      props.onchange(elt.value);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label
        className={styles.container}
        style={{ transform: "translatey(-7px)" }}
      >
        <input
          type="radio"
          name="radio"
          value={props.value}
          onClick={(e) => onchanged(e.currentTarget)}
        />
        <span className={styles.checkmark}></span>
      </label>
      <p contentEditable={props.editable ? true : false} ref={displayRef}>
        {props.display}
      </p>
    </div>
  );
}
