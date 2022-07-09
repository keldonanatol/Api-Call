import React,{ useEffect, useState } from "react";
import "./App.css";
import {FiPlus, FiMinus} from 'react-icons/fi'

function App() {
  const [students, setStudents] = useState([]);
  const [click, setClick] = useState(false)

useEffect(() => {
  setStudents([])
  const abortController = new AbortController()
  async function loadPosts() {
    try {
      const response = await fetch(
          'https://api.hatchways.io/assessment/students',
          {signal: abortController.signal}
      );
      const loadedPosts = await response.json();
      setStudents(loadedPosts.students);
    } catch (error) {
        if (error.name === "AbortError") {
            console.log("Aborted")
        } else {
            throw error
        }
    } 
  }
  loadPosts()

  return () => {
      abortController.abort()
  }
}, [])


  const handleChange = (event) => {
      const searchWord = event.target.value
      const newFilter = students.filter((student) => {
          return student.firstName.toLowerCase().includes(searchWord.toLowerCase())
      });
      if (searchWord === "") {
          setStudents([]);
      } else {
         setStudents(newFilter); 
      }  
  };

 const handleClick = (index) => {
     if (click === false) {
         return setClick(null)
     }
     setClick(index)
    }

const average = (grades) => {
    let sum = 0
    for (let i=0; i < grades.length; i++) {
        sum += Number(grades[i])
    }
    return sum/grades.length
}
const arrange = (a,b) => {
  if(a.firstName < b.firstName){
      return -1
  }
  if(a.firstName > b.firstName){
      return 1
  }
  return 0
  }



 
return (
  <div>
      <input type='search'  placeholder="Search by name" onChange={handleChange} style={{width: '100%', border: '0px', borderBottom: '2px solid black', margin: '20px'}}/>
      {students.sort(arrange).map((student,index) => (
              <div key={index} style={{display:'flex', flexDirection:'row'}}>
                <div className='studentSection'>
                  <img src={student.pic}  style={{width:'150px', height: '150px', borderRadius: '60%', border: '2px solid grey'}}/>
                </div>
                <div className='studentSection'>
                  <div style={{fontSize: '50px'}}>{student.firstName} {student.lastName}</div>
                  <p>Email: {student.email}</p>
                  <p>City: {student.city}</p>
                  <p>Company: {student.company}</p>
                  <p>Skill: {student.skill}</p>
                  <p>Average: {average(student.grades)}%</p>
                  <p>{tag}</p>
                  <div>
                  {click === index ? (
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <div>
                          <p>Test 1</p>
                          <p>Test 2</p>
                          <p>Test 3</p>
                          <p>Test 4</p>
                          <p>Test 5</p>
                          <p>Test 6</p>
                          <p>Test 7</p>
                          <p>Test 8</p>
                        </div>
                        <div>
                            {student.grades.map((grade, index) => (
                         <div key={index}>
                             <p>{grade}%</p>
                         </div>
                            ))}
                        </div> 
                      </div>
                  ) : null}
                  </div>
                <br/> 
              </div> 
               <div onClick={() => handleClick(index)} key={index} style={{position: 'relative'}}>
                  <span style={{float:'right'}}>{click === index ? <FiMinus/> : <FiPlus/>}</span>
                  </div>
            </div>   
     ))} 
  </div>
)
}

export default App