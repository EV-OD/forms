import styles from "../../components/widgets/qncard.module.css";
import { useEffect, useRef, useState , forwardRef, useImperativeHandle } from "react";
import RadioButton from "../../components/widgets/radioButton";

function Modifier({...props},ref) {
  const [activeAns, setActiveAns] = useState("");
  const baseEditorRef = useRef();
  function formatText(type) {
    document.execCommand(type);
  }
  const [anslist, setAnslist] = useState([
    { id: 1, ans: "ans1" },
    { id: 2, ans: "ans2" },
    { id: 3, ans: "ans3" },
    { id: 4, ans: "ans4" },
  ]);
  if (props.anslist) {
    setAnslist(props.anslist)
  }

  const valueChanged = (obj, id) => {
    let newAnslist = anslist.map((ans) => {
      if (id == ans.id) {
        let newAns = { id, ans: obj };
        return newAns;
      }
      return ans;
    });
    console.log(newAnslist)
    setAnslist(newAnslist);
  };

  const extractQns = () => {
    let qn = baseEditorRef.current.innerHTML;
    return {
      question: qn,
      anslist,
      active: activeAns,
    };
  };

  useImperativeHandle(ref,()=>{
    return {
      extractQns
    }
  })

  const handleActiveChange = (obj) => {
    setActiveAns(obj);
  };

  return (
    <>
      <div className={styles.modifier}>
        <div className={styles.modifier__font}>
          <button className={styles.modifier__button}>-</button>
          <label>10</label>
          <button className={styles.modifier__button}>+</button>
        </div>
        <button
          className={
            styles.modifier__button + " " + styles.bold + " "
            // + styles.active__modifier__button
          }
          onClick={() => formatText("bold")}
        >
          B
        </button>
        <button
          className={styles.modifier__button + " " + styles.italic}
          onClick={() => formatText("italic")}
        >
          I
        </button>
        <button
          className={styles.modifier__button + " " + styles.underline}
          onClick={() => formatText("underline")}
        >
          U
        </button>
      </div>
      <div
        contentEditable
        className={styles.Qeditor}
        ref={baseEditorRef}
        onChange={(e) => handleChange()}
        spellCheck="false"
      >
        {props.question ? props.question : "question area"}
      </div>
      <form>
        {anslist.map(ans=>{
          return <RadioButton
          value=""
          editable="true"
          display={ans.ans}
          ontextchange={(obj) => valueChanged(obj, props.id)}
          onchange={(obj) => handleActiveChange(obj)}
        />
        })}
      </form>
    </>
  );
}

export default forwardRef(Modifier)
