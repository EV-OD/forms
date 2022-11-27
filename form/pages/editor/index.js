import styles from "../../components/widgets/qncard.module.css";
import Modifier from "./editor";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef, forwardRef } from "react";

// const DynamicModifier = dynamic(() => import("./editor"), { ssr: false });

function Editor() {
  const editorList = [
    {
      id: 1,
      Qns: {
        question: "",
        anslist: "",
        active: "",
        point: 1,
      },
    },
    {
      id: 2,
      Qns: {
        question: "",
        anslist: "",
        active: "",
        point: 1,
      },
    },
  ];
  const editorRefList = useRef([])
  useEffect(() => {
    editorRefList.current = editorRefList.current.slice(0, editorList.length);
 }, [editorList]);

  const handleSubmit = () => {
    for (let i = 0; i < editorList.length; i++) {
      const { question, anslist, active } = editorRefList.current[i].extractQns();
      editorList[i].question = question;
      editorList[i].anslist = anslist;
      editorList[i].active = active;
    }
  };

  return (
    <div className="editor">
      {editorList.map((editor,i) => {
        return (
          <>
            <div className={styles.qbox}>
              <div className={styles.topbar}>
                <h1 className={styles.qn}>Question:{editor.id}</h1>
                <span className={styles.markweight}>
                  Mark Weight:<strong>{editor.Qns.point}</strong>
                </span>
              </div>
              <hr />
              <div className={styles.bottombar}>
                <Modifier
                  id={editor.id}
                  ref={el=> editorRefList.current[i] = el}
                  anslist={editor.Qns.anslist}
                  question={editor.Qns.question}
                  active={editor.Qns.active}
                  point={editor.Qns.point}
                ></Modifier>
              </div>
            </div>
          </>
        );
      })
      }
      <button onClick={() => handleSubmit()}>submit</button>
    </div>
  );
}


export default Editor;
