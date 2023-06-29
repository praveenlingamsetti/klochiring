// import react, react-router-dom packages and index.css file to render PythonTabulation component
import { useState} from "react"
import {useNavigate,useLocation} from 'react-router-dom'
import './table.css'

const PythonTest = () =>{
  // location varaiable to get location of the testReports route and state
  const location=useLocation()
  // useState of data to store python test data responses
  const [data,setData]=useState(location.state)
  // navigate variable used to naviagating to different routes
  const navigate=useNavigate()
      
  return (
    <div className="test-reports-container">
      <h1 style={{textAlign:'center'}}>Python Test Tabulation Data</h1>
      {/* desktop table container with table of python test data respones */}
      <div className="test-table">
        {data.length> 0 ? <table border="2px" style={{margin:'auto'}}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Completed On</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Total Score</th>
                    <th>Aptitude Score</th>
                    <th>Technical Score</th> 
                    <th>View Score</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index) =><tr>
                    <td>{index}</td>
                    <td>{item.Timestamp}</td>
                    <td>{item.Name}</td>
                    <td>{item.Email_Address}</td>
                    <td>{item.Phone_Number}</td>
                    <td>{item.Score}</td>
                    <td>{item.aptitude_score}</td>
                    <td>{item.technical_score}</td>
                    <td>
                      {/* clicking view button it'll navigates to studentChart route */}
                        <button onClick={()=>navigate('/studentChart',{state:item})
                        } style={{padding:'3px',width:'60px'}}>
                            View
                        </button>
                    </td>
                </tr>)}
            </tbody>
        </table> :"No Data Found"}
      </div>
       {/* mobile table container with table of python test data responses */}
      <div className='mobile-table-container'>
        {data.length >0  ? (
          data.map((item,index)=>
            <div className='table-data-container'>
              <div className='table-data'>
                <p className='th'>Id</p>
                <p className='td'>{index+1}</p>
              </div>
              <div className='table-data'>
                <p>Completed On</p>
                <p className='td'>{item.Timestamp}</p>
              </div>
              <div className='table-data'>
                <p>Name</p>
                <p className='td'>{item.Name}</p>
              </div>
              <div className='table-data'>
                <p>Email Address</p>
                <p className='td'>{item.Email_Address}</p>
              </div>
              <div className='table-data'>
                <p>Phone Number</p>
                <p className='td'>{item.Phone_Number}</p>
              </div>
              <div className='table-data'>
                <p>Email Address</p>
                <p className='td'>{item.Email_Address}</p>
              </div>
              <div className='table-data'>
                <p>Total Score</p>
                <p className='td'>{item.Score}</p>
              </div>
              <div className='table-data'>
                <p>{item.aptitude_score !==undefined ? 'Aptitude Score' : 'Java Score'}</p>
                <p className='td'>{item.aptitude_score !==undefined ? item.aptitude_score : item.fullstack_java_score}</p>
              </div>
              <div className='table-data'>
                <p>{item.technical_score !==undefined ? "Technical Score" : "React Score"}</p>
                <p className='td'>{item.technical_score !==undefined ? item.technical_score : (item.reasoning_score!==undefined ? item.reasoning_score : item.fullstack_react_score )}</p>
              </div>
              <div className='table-data'>
                <p>Test Type</p>
                <p className='td'>{item.testType}</p>
              </div>
              {/* clicking view button it'll navigates to studentChart route */}
              <div className='view-button'>
                <button className='btn' onClick={()=>navigate('/studentChart',{state:item})}>View Score</button>
              </div>
          </div>
        )) : 'No Data Found'}
      </div>
    </div>
  )
}
export default PythonTest