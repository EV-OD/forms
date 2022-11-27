import styles from './qncard.module.css'
import RadioButton, { RadioContainer } from './radioButton'

function Qnscard({sendAns,qns}) {
    
    const valueChanged = (value) =>{
        sendAns(
            {id:qns.id,
            answer:value})
    }

    const answerList = qns.option.map(ans=>{
        return <RadioButton value={ans.content} key={ans.id} display={ans.content} onchange={(obj)=> valueChanged(obj)}  />
    })
  return (
    <div className={styles.qbox}>
        <div className={styles.topbar}>
            <h1 className={styles.qn}>Question:{qns.id}</h1>
            <span className={styles.markweight}>Mark Weight:<strong>{qns["marks-weight"]}</strong></span>
        </div>
        <hr/>
        <div className={styles.bottombar}>
            <p>{qns.question}</p>
            <form>
                <radioContainer>
                {answerList}
                </radioContainer>
            </form>
        </div>
    </div>
  )
}

export default Qnscard
