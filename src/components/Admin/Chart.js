// this component about score card design,downloading score card,sending scores to candidate through emails including cc

import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import emailjs from "@emailjs/browser";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/button";
import { useReactToPrint } from "react-to-print";
import { useLocation } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./index.css";

function Chart() {
  const detailsPdf = useRef();
  const location = useLocation();
  const [data, setData] = useState(location.state);
  const [mailId, setMailId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  console.log(data);
  const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
  // this loop about candidate's scores with respective of stream and making piechat data for designing piechart
  let pieData;
  //  this condition is  validating aptitude score and technical score,
  //  if it is aptitude score and technical score taking
  //   this data and designing piechat which is candidate
  //   who wrote the test which has apitude and technical are sections of that respective test

  if (data.aptitude_score !== undefined && data.reasoning_score === undefined) {
    pieData = [
      {
        name: "Aptitude",
        value: data.aptitude_score,
      },
      {
        name: "Technical",
        value: data.technical_score,
      },
    ];
    //  this condition is  validating aptitude score and reasoing score,
    //  if it is aptitude score and reasoning score taking
    //   this data and designing piechat which is candidate
    //   who wrote the test which has apitude and reasoning are sections of that respective test
  } else if (
    data.aptitude_score !== undefined &&
    data.reasoning_score !== undefined
  ) {
    pieData = [
      {
        name: "Aptitude",
        value: data.aptitude_score,
      },
      {
        name: "Reasoning",
        value: data.reasoning_score,
      },
    ];
    //  this condition is  validating java score and React score,
    //  if it is java score and React score taking
    //   this data and designing pieChat which is candidate
    //   who wrote the test which has Java and React are sections of that respective test
  } else {
    pieData = [
      {
        name: "Java",
        value: data.fullstack_java_score,
      },
      {
        name: "React",
        value: data.fullstack_react_score,
      },
    ];
  }

  // this function regarding to generate  the pdf which includes student details along with scores piechat when clicking on the download button in the component
  const generatePdf = useReactToPrint({
    content: () => detailsPdf.current,
    documentTitle: data.Email_Address.slice(0, data.Email_Address.indexOf("@")),
    onAfterPrint: () => alert("pdf downloaded"),
  });
  // this handle Submit function regarding to sending email to candidates.  this function  includes whatever the detail sending  candidate through email,
  // store those details in the variable name message
  const handleSubmit = (item) => {
    var document = new jsPDF("landscape", "px", "a4", false);
    document.rect(60, 60, 600, 400, "D");
    document.setLineWidth(2);
    document.setDrawColor(255, 0, 0);
    document.setFillColor(0, 255, 0);
    document.text(
      60,
      60,
      "TestCompleted: " +
        data.Timestamp +
        "\n" +
        "\n" +
        "Email: " +
        data.Email_Address +
        "\n" +
        "\n" +
        "Score: " +
        data.Score +
        "\n" +
        "\n" +
        data.aptitude_score !==
        undefined
        ? "Aptitude Score : "
        : "Java Score: " + data.aptitude_score !== undefined
        ? data.aptitude_score
        : data.fullstack_java_score + "\n" + "\n" + data.technical_score !==
          undefined
        ? "Technical Score : "
        : "React Score: " + data.technical_score !== undefined
        ? data.technical_score
        : data.reasoning_score !== undefined
        ? data.reasoning_score
        : data.fullstack_react_score
    );
    data.new_Mail = item;

    const pdfContent = document.output("datauristring");
    // this message variable includes data which sending to candidate through mail
    let message = `Hello ${data.Email_Address} \n \n Here Your result Details \n \n ${pdfContent}`;
    data.section1_score =
      data.aptitude_score !== undefined
        ? data.aptitude_score
        : data.fullstack_java_score;
    data.section2_score =
      data.technical_score !== undefined
        ? data.technical_score
        : data.reasoning_score !== undefined
        ? data.reasoning_score
        : data.fullstack_react_score;

    data.type1 =
      data.aptitude_score !== undefined ? "Aptitude Score" : "Java Score";
    data.type2 =
      data.technical_score !== undefined
        ? "Technical Score"
        : data.reasoning_score !== undefined
        ? "Reasoning Score"
        : "React Score";

    emailjs
      .send(
        "service_52vbgo4",
        "template_ibuby0d",
        {
          ...data,
          message: message,
        },
        "SzLGLBrz5rRn3ETlY"
      )
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        alert(`Email sent to ${data.Email_Address}`);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };
  // this function regarding to populating popup while sending emails adding  and adding  cc of email
  const sendMail = (data) => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chart-container">
      <div ref={detailsPdf} className="charts">
        <div className="details">
          <h1 style={{ fontSize: "25px", fontWeight: "bold" }}>
            Student Details:
          </h1>
          <p>Name : {data.Name}</p>
          <p>Email : {data.Email_Address}</p>
          <p>Score : {data.Score}</p>
          <p>
            {data.aptitude_score !== undefined
              ? `Aptitude Score : ${data.aptitude_score}`
              : `Java Score : ${data.fullstack_java_score}`}
          </p>
          <p>
            {data.technical_score !== undefined
              ? `Technical Score :  ${data.technical_score}`
              : data.reasoning_score !== undefined
              ? `Reasoning Score : ${data.reasoning_score}`
              : `React Score : ${data.fullstack_react_score}`}
          </p>
        </div>
        <div>
          <PieChart width={730} height={300} className="piechart">
            <Pie
              data={pieData}
              color="#000000"
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          type="button"
          style={{
            backgroundColor: "cyan",
            color: "white",
            padding: "10px",
            border: "none",
            fontSize: "15px",
            marginRight: "20px",
          }}
          onClick={generatePdf}
        >
          Download
        </button>
        <button
          style={{
            backgroundColor: "darkgrey",
            color: "white",
            padding: "10px",
            border: "none",
            fontSize: "15px",
            marginRight: "20px",
          }}
          onClick={() => sendMail(data)}
          className="send"
        >
          Send Email
        </button>
      </div>
      <Modal show={isOpen} onRequestClose={handleClose}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Email Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Student Mail ID: </Form.Label>
            <Form.Control type="text" value={data.Email_Address} />
          </Form.Group>
          <Form.Group>
            <Form.Label>CC Mail ID's: </Form.Label>
            <Form.Control
              type="text"
              value={mailId}
              onChange={(e) => setMailId(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              handleSubmit(mailId);
              setIsOpen(!isOpen);
            }}
          >
            Send Email
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Chart;
