import { useRouter } from 'next/router'
import { use, useState } from 'react'
import Qnscard from '../../components/widgets/qncard'


function index() {
  const router = useRouter()
  const { fid } = router.query

  const qn = [
    {
        id:1,
        "marks-weight":1,
        type:"plain",
        question:"A satellite is revolving around the sun in a circular orbit with uniform velocity v. If the gravitational force suddenly disappears the velocity of the satellite will be",
        option:[
            {content:"4v",type:"plain",id:1},
            {content:"5v",type:"plain",id:2},
            {content:"zero",type:"plain",id:3},
            {content:"v",type:"plain",id:4}
        ],
        answer:null,
    },
    {
      id:2,
      "marks-weight":1,
      type:"plain",
      question:"A satellite is revolving around the sun in a circular orbit with uniform velocity v. If the gravitational force suddenly disappears the velocity of the satellite will be",
      option:[
          {content:"4v",type:"plain",id:1},
          {content:"5v",type:"plain",id:2},
          {content:"zero",type:"plain",id:3},
          {content:"v",type:"plain",id:4}
      ],
      answer:null
  }
  ]
  const [ansSet, setAnsset] = useState({})

  const getAns = (obj)=>{
    for(let i = 0;i<qn.length;i++){
        if(qn[i].id == obj.id){
            qn[i].answer = obj.answer
            console.table(qn[i])
            console.table(obj)
        }
    }
    return
  }
  const submit = ()=>{
    console.dir(qn)
  }


  return (
    <div>
        {
            qn.map(q=>{
                return <Qnscard sendAns={getAns} qns={q} key={q.id} />
            })
        }
        <button onClick={submit}>Submit</button>
    </div>
  )
}

export default index