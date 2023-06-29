// import react, react-router-dom packages and index.css file to render FreshersJuniorTabulation component
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./table.css";

function FreshersJuniorTabulation() {
  // location varaiable to get location of the testReports route and state
  const location = useLocation();
  // useState of data to store Freshers Junior test data responses
  const [data, setData] = useState(location.state);
  // navigate variable used to naviagating to different routes
  const navigate = useNavigate();

  // handleUpdate function to update section scores to google sheet of Freshers Junior Test google sheet using sheet db google api
  const handleUpdate = (item) => {
    if (item.Total_Score === undefined) {
      fetch(
        `https://sheetdb.io/api/v1/f3kdvdrvltn08/Email_Address1/${item.Email_Address1}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer 1bnneqvs9h583u64f4f5i5ba1oyojsw3skwzbyfe",
          },
          body: JSON.stringify({
            data: {
              Aptitude_Score: item.aptitude_score,
              Reasoning_Score: item.reasoning_score,
              Total_Score: item.aptitude_score + item.reasoning_score,
            },
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  return (
    <div className='test-reports-container'>
      <h1 style={{ textAlign: "center" }}>
        Freshers Junior Test Tabulation Data
      </h1>
      {/* desktop table container with table of Freshers Junior test data respones */}
      <div className='test-table'>
        {data.length > 0 ? (
          <table border='2px' style={{ margin: "auto" }}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Completed On</th>
                <th>Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Total Score</th>
                <th>Aptitude Score</th>
                <th>Reasoning Score</th>
                <th>View Score</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr>
                  <td>{index}</td>
                  <td>{item.Timestamp}</td>
                  <td>{item.Name}</td>
                  <td>{item.Email_Address}</td>
                  <td>{item.Phone_Number}</td>
                  <td>{item.Score}</td>
                  <td>{item.aptitude_score}</td>
                  <td>{item.reasoning_score}</td>
                  <td>
                    {/* clicking view button it'll navigates to studentChart route */}
                    <button
                      onClick={() => {
                        navigate("/studentChart", { state: item });
                        handleUpdate(item);
                      }}
                      style={{ padding: "3px", width: "60px" }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          "No Data Found"
        )}
      </div>
      {/* mobile table container with table of Freshers Junior test data responses */}
      <div className='mobile-table-container'>
        {data.length > 0
          ? data.map((item, index) => (
              <div className='table-data-container'>
                <div className='table-data'>
                  <p className='th'>Id</p>
                  <p className='td'>{index + 1}</p>
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
                  <p>
                    {item.aptitude_score !== undefined
                      ? "Aptitude Score"
                      : "Java Score"}
                  </p>
                  <p className='td'>
                    {item.aptitude_score !== undefined
                      ? item.aptitude_score
                      : item.fullstack_java_score}
                  </p>
                </div>
                <div className='table-data'>
                  <p>
                    {item.technical_score !== undefined
                      ? "Technical Score"
                      : item.reasoning_score !== undefined
                      ? "Reasoning Score"
                      : "React Score"}
                  </p>
                  <p className='td'>
                    {item.technical_score !== undefined
                      ? item.technical_score
                      : item.reasoning_score !== undefined
                      ? item.reasoning_score
                      : item.fullstack_react_score}
                  </p>
                </div>
                <div className='table-data'>
                  <p>Test Type</p>
                  <p className='td'>{item.testType}</p>
                </div>
                {/* clicking view button it'll navigates to studentChart route */}
                <div className='view-button'>
                  <button
                    className='btn'
                    onClick={() => {
                      navigate("/studentChart", { state: item });
                      handleUpdate(item);
                    }}
                  >
                    View Score
                  </button>
                </div>
              </div>
            ))
          : "No Data Found"}
      </div>
    </div>
  );
}

export default FreshersJuniorTabulation;
