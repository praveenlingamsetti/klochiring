// this component about  metrics for every test
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Chart } from "react-google-charts";
import gapi from "gapi-script";
import Cookies from "js-cookie";
import { GiHamburgerMenu } from "react-icons/gi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [finalData, setFinalData] = useState(location.state || []);
  const data = finalData?.datat || [];
  const fresher = data.fresherData?.length || [];
  const freshersJunior = data.freshersJuniorData?.length || [];
  const python = data.pythonData?.length || [];
  const frontendfresher = data.frontEndFresherData?.length || [];
  const qa = data.qaData?.length || [];
  const merndeveloperintermediate =
    data.mernDeveloperIntermediateData?.length || [];
  const merndeveloperjunior = data.mernDeveloperJuniorData?.length || [];
  const shopify = data.shopifyData?.length || [];
  const fullStack = data.fullStackData?.length || [];
  const java = data.javaData?.length || [];

  const pieData = [
    ["Language", "Speakers (in millions)"],
    ["Fresher_Junior_Test", freshersJunior],
    ["Freshers_Test", fresher],
    ["Python_Test", python],
    ["Front_End_Fresher_Test", frontendfresher],
    ["QA_Test", qa],
    ["Full_Stack_Test", fullStack],
    ["Java_Test", java],
    ["Mern_Developer_Intermediate_Test", merndeveloperintermediate],
    ["Mern_Developer_Junior_Test", merndeveloperjunior],
    ["Shopify_Test", shopify],
  ];

  let freshers_aptitude_score = 0;
  let freshers_technical_score = 0;
  let freshers_aptitude_percentage = 0;
  let freshers_technical_percentage = 0;

  data.fresherData?.map((item, index) => {
    freshers_aptitude_score += item.aptitude_score;
    freshers_technical_score += item.technical_score;
  });

  freshers_aptitude_percentage =
    (freshers_aptitude_score /
      data.fresherData?.length /
      process.env.REACT_APP_FRESHER_TEST_APTITUDE_QUESTIONS) *
    100;
  freshers_technical_percentage =
    (freshers_technical_score /
      (data.fresherData?.length *
        process.env.REACT_APP_FRESHER_TEST_TECHNICAL_QUESTIONS)) *
    100;

  let python_aptitude_score = 0; // this variable stores the data ,aptitudescore who took Pythontest
  let python_technical_score = 0; // this variable stores the data ,Technicalscore who took freshertest
  let python_aptitude_percentage = 0; //this variable stores the data , percentage of apitude score who took Pythontest
  let python_technical_percentage = 0; //this variable stores the data , percentage of Technical score who took Pythontest

  // this calculation for correct responses by the candidate in Python test
  data.pythonData?.map((item, index) => {
    python_aptitude_score += item.aptitude_score;
    python_technical_score += item.technical_score;
  });
  python_aptitude_percentage =
    (python_aptitude_score /
      data.pythonData?.length /
      process.env.REACT_APP_PYTHON_TEST_APTITUDE_QUESTIONS) *
    100;
  python_technical_percentage =
    (python_technical_score /
      data.pythonData?.length /
      process.env.REACT_APP_PYTHON_TEST_TECHNICAL_QUESTIONS) *
    100;

  let shopify_aptitude_score = 0; // this variable stores the data ,aptitudescore who took Shopifytest
  let shopify_technical_score = 0; // this variable stores the data ,Technicalscore who took Shopifytest
  let shopify_aptitude_percentage = 0; //this variable stores the data , percentage of apitude score who took Shopifytest
  let shopify_technical_percentage = 0; //this variable stores the data , percentage of Technicalscore who took Pythontest
  // this calculation for correct reponses by the candidate in Python test
  data.shopifyData?.map((item, index) => {
    shopify_aptitude_score += item.aptitude_score;
    shopify_technical_score += item.technical_score;
  });
  shopify_aptitude_percentage =
    (shopify_aptitude_score /
      data.shopifyData?.length /
      process.env.REACT_APP_SHOPIFY_TEST_APTITUDE_QUESTIONS) *
    100;
  shopify_technical_percentage =
    (shopify_technical_score /
      data.shopifyData?.length /
      process.env.REACT_APP_SHOPIFY_TEST_TECHNICAL_QUESTIONS) *
    100;

  let fullStack_java_score = 0; // this variable stores the data ,javascore who took Fullstacktest
  let fullStack_react_score = 0; // this variable stores the data ,Reactscore who took Fullstacktest
  let fullStack_java_percentage = 0; //this variable stores the data , percentage of java score who took Fullstacktest
  let fullStack_react_percentage = 0; //this variable stores the data , percentage of  React score who took Fullstacktest

  // this calculation for correct reponses by the candidate in FullStack test
  data.fullStackData?.map((item, index) => {
    fullStack_java_score += item.fullstack_java_score;
    fullStack_react_score += item.fullstack_react_score;
  });
  fullStack_java_percentage =
    (fullStack_java_score /
      data.fullStackData?.length /
      process.env.REACT_APP_FULL_STACK_TEST_JAVA_QUESTIONS) *
    100;
  fullStack_react_percentage =
    (fullStack_react_score /
      data.fullStackData?.length /
      process.env.REACT_APP_FULL_STACK_TEST_REACT_QUESTIONS) *
    100;

  let java_aptitude_score = 0; // this variable stores the data ,aptitudescore who took Javatest

  let java_technical_score = 0; // this variable stores the data ,Technicalscore who took Javatest

  let java_aptitude_percentage = 0; //this variable stores the data , percentage of apitude score who took javatest

  let java_technical_percentage = 0; //this variable stores the data , percentage of Technicalscore who took Javatest

  data.javaData?.map((item, index) => {
    java_aptitude_score += item.aptitude_score;
    java_technical_score += item.technical_score;
  });
  java_aptitude_percentage =
    (java_aptitude_score /
      data.javaData?.length /
      process.env.REACT_APP_JAVA_TEST_APTITUDE_QUESTIONS) *
    100;
  java_technical_percentage =
    (java_technical_score /
      data.javaData?.length /
      process.env.REACT_APP_JAVA_TEST_TECHNICAL_QUESTIONS) *
    100;

  // this variable stores the data ,aptitudescore who took QAtest
  let Qa_aptitude_score = 0;
  // this variable stores the data ,Technicalscore who took QAtest
  let Qa_technical_score = 0;
  //this variable stores the data , percentage of apitude score who took QAtest
  let Qa_aptitude_percentage = 0;
  //this variable stores the data , percentage of Technicalscore who took QAtest
  let Qa_technical_percentage = 0;

  // this calculation for correct reponses by the candidate in QA test
  data.qaData?.map((item, index) => {
    Qa_aptitude_score += item.aptitude_score;
    Qa_technical_score += item.technical_score;
  });
  Qa_aptitude_percentage =
    (Qa_aptitude_score /
      data.qaData?.length /
      process.env.REACT_APP_QA_TEST_APTITUDE_QUESTIONS) *
    100;
  Qa_technical_percentage =
    (Qa_technical_score /
      data.qaData?.length /
      process.env.REACT_APP_QA_TEST_TECHNICAL_QUESTIONS) *
    100;

  let frontendfresher_aptitude_score = 0; // this variable stores the data ,aptitudescore who took Froentendfreshertest
  let frontendfresher_technical_score = 0; // this variable stores the data ,Technicalscore who took Froentendfreshertest
  let frontendfresher_aptitude_percentage = 0; //this variable stores the data , percentage of apitude score who took  Froentendfreshertest
  let frontendfresher_technical_percentage = 0; //this variable stores the data , percentage of Technicalscore who took Froentendfreshertest

  // this calculation for correct reponses by the candidate in Froentendfresher test
  data.frontEndFresherData?.map((item, index) => {
    frontendfresher_aptitude_score += item.aptitude_score;
    frontendfresher_technical_score += item.technical_score;
  });
  frontendfresher_aptitude_percentage =
    (frontendfresher_aptitude_score /
      data.frontEndFresherData?.length /
      process.env.REACT_APP_FRONTEND_FRESHER_TEST_APTITUDE_QUESTIONS) *
    100;
  frontendfresher_technical_percentage =
    (frontendfresher_technical_score /
      data.frontEndFresherData?.length /
      process.env.REACT_APP_FRONTEND_FRESHER_TEST_TECHNICAL_QUESTIONS) *
    100;

  let freshersJunior_aptitude_score = 0; // this variable stores the data ,aptitudescore who took freshersJuniortest
  let freshersJunior_reasoning_score = 0; // this variable stores the data ,reasoning_score who took freshersJuniortest
  let freshersJunior_aptitude_percentage = 0; //this variable stores the data , percentage of apitude score who took freshersJuniortest

  let freshersJunior_reasoning_percentage = 0; //this variable stores the data , percentage of Reasoning who took freshersJuniortest

  // this calculation for correct reponses by the candidate in FresherJunior test
  data.freshersJuniorData?.map((item, index) => {
    freshersJunior_aptitude_score += item.aptitude_score;
    freshersJunior_reasoning_score += item.reasoning_score;
  });
  freshersJunior_aptitude_percentage =
    (freshersJunior_aptitude_score /
      data.freshersJuniorData?.length /
      process.env.REACT_APP_FRESHERS_JUNIOR_TEST_APTITUDE_QUESTIONS) *
    100;
  freshersJunior_reasoning_percentage =
    (freshersJunior_reasoning_score /
      data.freshersJuniorData?.length /
      process.env.REACT_APP_FRESHERS_JUNIOR_TEST_REASONING_QUESTIONS) *
    100;

  let merndeveloperintermediate_aptitude_score = 0; //this variable stores the data ,aptitudescore who took  merndeveloperintermediate
  let merndeveloperintermediate_technical_score = 0; // this variable stores the data ,reasoning_score who took  merndeveloperintermediate
  let merndeveloperintermediate_aptitude_percentage = 0; //this variable stores the data , percentage of apitude score who took  merndeveloperintermediate
  let merndeveloperintermediate_technical_percentage = 0; // this variable stores the data , percentage of Reasoning who took merndeveloperintermediate
  // this calculation for correct reponses by the candidate in mernDeveloperIntermediate
  data.mernDeveloperIntermediateData?.map((item, index) => {
    merndeveloperintermediate_aptitude_score += item.aptitude_score;
    merndeveloperintermediate_technical_score += item.technical_score;
  });
  merndeveloperintermediate_aptitude_percentage =
    (merndeveloperintermediate_aptitude_score /
      data.mernDeveloperIntermediateData?.length /
      process.env
        .REACT_APP_MERN_DEVELOPER_INTERMEDIATE_TEST_APTITUDE_QUESTIONS) *
    100;
  merndeveloperintermediate_technical_percentage =
    (merndeveloperintermediate_technical_score /
      data.mernDeveloperIntermediateData?.length /
      process.env
        .REACT_APP_MERN_DEVELOPER_INTERMEDIATE_TEST_TECHNICAL_QUESTIONS) *
    100;

  let merndeveloperjunior_aptitude_score = 0; //this variable stores the data ,aptitudescore who took  merndeveloperjunior
  let merndeveloperjunior_technical_score = 0; // this variable stores the data ,reasoning_score who took  merndeveloperjunior
  let merndeveloperjunior_aptitude_percentage = 0; //this variable stores the data , percentage of apitude score who took merndeveloperjunior
  let merndeveloperjunior_technical_percentage = 0; // this variable stores the data , percentage of Reasoning who took merndeveloperjunior

  // this calculation for correct reponses by the candidate in mernDeveloperJunior
  data.mernDeveloperJuniorData?.map((item, index) => {
    merndeveloperjunior_aptitude_score += item.aptitude_score;
    merndeveloperjunior_technical_score += item.technical_score;
  });
  merndeveloperjunior_aptitude_percentage =
    (merndeveloperjunior_aptitude_score /
      data.mernDeveloperJuniorData?.length /
      process.env.REACT_APP_MERN_DEVELOPER_JUNIOR_TEST_APTITUDE_QUESTIONS) *
    100;
  merndeveloperjunior_technical_percentage =
    (merndeveloperjunior_technical_score /
      data.mernDeveloperJuniorData?.length /
      process.env.REACT_APP_MERN_DEVELOPER_JUNIOR_TEST_TECHNICAL_QUESTIONS) *
    100;

  //this data for designing the piechart of fresherTest
  const fresherPieData = [
    ["Language", "Speakers (in millions)"],
    ["FreshersAptitude", freshers_aptitude_percentage],
    ["FreshersTechnical", freshers_technical_percentage],
  ];

  //this data for designing the piechart of PythonTest
  const pythonPieData = [
    ["Language", "Speakers (in millions)"],
    ["PythonAptitude", python_aptitude_percentage],
    ["PythonTechnical", python_technical_percentage],
  ];

  //this data for designing the piechart of  shopifyTest
  const shopifyPieData = [
    ["Language", "Speakers (in millions)"],
    ["ShopifyAptitude", shopify_aptitude_percentage],
    ["ShopifyTechnical", shopify_technical_percentage],
  ];

  //this data for designing the piechart of fullstackTest
  const fullStackPieData = [
    ["Language", "Speakers (in millions)"],
    ["FullStackJava", fullStack_java_percentage],
    ["FullStackReact", fullStack_react_percentage],
  ];
  //this data for designing the piechart of  javaTest
  const javaPieData = [
    ["Language", "Speakers (in millions)"],
    ["JavaAptitude", java_aptitude_percentage],
    ["JavaTechnical", java_technical_percentage],
  ];

  //this data for designing the piechart of  QaTest
  const qaPieData = [
    ["Language", "Speakers (in millions)"],
    ["QAAptitude", Qa_aptitude_percentage],
    ["QATechnical", Qa_technical_percentage],
  ];
  //this data for designing the piechart of  frontendfresherTest
  const frontendfresherPieData = [
    ["Language", "Speakers (in millions)"],
    ["FrontEndFresherAptitude", frontendfresher_aptitude_percentage],
    ["FrontEndFresherTechnical", frontendfresher_technical_percentage],
  ];
  //this data for designing the piechart of   freshersJuniorTest
  const freshersJuniorPieData = [
    ["Language", "Speakers (in millions)"],
    ["FreshersJuniorAptitude", freshersJunior_aptitude_percentage],
    ["FreshersJuniorReasoning", freshersJunior_reasoning_percentage],
  ];
  //this data for designing the piechart of  merndeveloperintermediateTest
  const merndeveloperintermediatePieData = [
    ["Language", "Speakers (in millions)"],
    [
      "MERNDeveloperIntermediateAptitude",
      merndeveloperintermediate_aptitude_percentage,
    ],
    [
      "MERNDeveloperIntermediateTechnical",
      merndeveloperintermediate_technical_percentage,
    ],
  ];
  //this data for designing the piechart of   merndeveloperJuniorTest
  const merndeveloperJuniorPieData = [
    ["Language", "Speakers (in millions)"],
    ["MERNDeveloperJuniorAptitude", merndeveloperjunior_aptitude_percentage],
    ["MERNDeveloeprJuniorTechnical", merndeveloperjunior_technical_percentage],
  ];

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/notFound");
    }
  }, []);

  const options = {
    legend: "none",
    title: "All Tests Metrics",
    pieStartAngle: 100,
  };

  const fresheroptions = {
    legend: "none",
    title: "Freshers Test Metric",
    pieStartAngle: 100,
  };

  const pythontestoptions = {
    legend: "none",
    title: "Python Test Metric",
    pieStartAngle: 100,
  };

  const fullstactoptions = {
    legend: "none",
    title: "Full Stack Test Metric",
    pieStartAngle: 100,
  };

  const javaoptions = {
    legend: "none",
    title: "Java Test Metric",
    pieStartAngle: 100,
  };

  const qaoptions = {
    legend: "none",
    title: "QA Test Metric",
    pieStartAngle: 100,
  };

  const froentendFresheroprions = {
    legend: "none",
    title: "Front End Fresher Test Metric",
    pieStartAngle: 100,
  };

  const fresherjunioroptions = {
    legend: "none",
    title: "Freshers Junior Test Metric",
    pieStartAngle: 100,
  };

  const merndeveloperjunioroptions = {
    legend: "none",
    title: "MERN Developer Junior Test Metric",
    pieStartAngle: 100,
  };

  const mernintermediateoprions = {
    legend: "none",
    title: "MERN Developer Intermediate Test Metric",
    pieStartAngle: 100,
  };

  const shopifyoptions = {
    legend: "none",
    title: "Shopify Test Metric",
    pieStartAngle: 100,
  };

  return (
    <>
      {/* header for desktop  with Logo and components Dashboard, Assessments, Test Reports, Student Reports and Admin */}
      <div className="admin-header-container">
        <div className="admin-header-logo-container">
          {/* logo */}
          <img
            src="https://res.cloudinary.com/dufx8zalt/image/upload/v1687419355/logoimage1_krvkbq.png"
            alt="logo"
            style={{ height: "50px", width: "100px", borderRadius: "10px" }}
            onClick={() => navigate("/")}
          />
        </div>
        <div className="admin-desktop-header-navbar-container">
          {/* when clicking this Dashboard text, it'll navigates to dashboard route */}
          <p
            onClick={() => navigate("/dashboard", { state: finalData })}
            className="admin-desktop-header-navbar-link"
          >
            Dashboard
          </p>
          {/* when clicking this Assessments text, it'll navigates to send assessments route */}
          <p
            onClick={() => navigate("/sendAssessments", { state: finalData })}
            className="admin-desktop-header-navbar-link"
          >
            Assessments
          </p>
          {/* when clicking this Test Reports text, it'll navigates to test reports route */}
          <p
            onClick={() => navigate("/testReports", { state: finalData })}
            className="admin-desktop-header-navbar-link"
          >
            Test Reports
          </p>
          {/* when clicking this student reports text, it'll navigates to student reports route */}
          <p
            onClick={() => navigate("/studentReports", { state: finalData })}
            className="admin-desktop-header-navbar-link"
          >
            Student Reports
          </p>
          {/* when clicking this Sign Out text, it'll navigates to admin login route and again admin can access all routes */}
          <p
            className="admin-desktop-header-navbar-link"
            onClick={() => navigate("/adminLogin")}
          >
            Admin
          </p>
        </div>
        {/* nav header for mobile  with Logo and components Dashboard, Assessments, Test Reports, Student Reports and Admin */}
        <div className="admin-mobile-header-navbar-container">
          <Popup
            contentStyle={{ width: "50%", backgroundColor: "white" }}
            trigger={
              <button className="admin-hamburger-btn">
                <GiHamburgerMenu />
              </button>
            }
            position="bottom right"
          >
            <ul className="admin-mobile-hamburger-menu">
              {/* when clicking this Dashboard text, it'll navigates to dashboard route */}
              <li
                onClick={() => navigate("/dashboard", { state: finalData })}
                className="admin-header-navbar-link"
              >
                Dashboard
              </li>
              {/* when clicking this Assessments text, it'll navigates to send assessments route */}
              <li
                onClick={() =>
                  navigate("/sendAssessments", { state: finalData })
                }
                className="admin-header-navbar-link"
              >
                Assessments
              </li>
              {/* when clicking this Test Reports text, it'll navigates to test reports route */}
              <li
                onClick={() => navigate("/testReports", { state: finalData })}
                className="admin-header-navbar-link"
              >
                Test Reports
              </li>
              {/* when clicking this student reports text, it'll navigates to student reports route */}
              <li
                onClick={() =>
                  navigate("/studentReports", { state: finalData })
                }
                className="admin-header-navbar-link"
              >
                Student Reports
              </li>
              {/* when clicking this Sign Out text, it'll navigates to admin login route and again admin can access all routes */}
              <li
                onClick={() => navigate("/adminLogin")}
                className="admin-header-navbar-link"
              >
                Admin
              </li>
            </ul>
          </Popup>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "Column" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            "@media (max-width:820px)": {
              textAlign: "left",
              marginLeft: "20px",
            },
          }}
        >
          AMS METRICS
        </h1>
        <h2 className="allmetricsHeading">
          Below Metric is about number of tests taken by student for each test
          in percentage
        </h2>
        <div className="piechart-details">
          <div className="test-legend">
            <button className="color"></button>
            <span className="test">Python Test</span>
          </div>
          <div className="test-legend">
            <button
              style={{ backgroundColor: "#e62e81" }}
              className="color"
            ></button>
            <span className="test">Java Test</span>
          </div>
          <div className="test-legend">
            <button
              style={{ backgroundColor: "#5c9ed1" }}
              className="color"
            ></button>
            <span className="test">FullStack Test</span>
          </div>
          <div className="test-legend">
            <button
              className="color"
              style={{ backgroundColor: "#963596" }}
            ></button>
            <span className="test">QA Test</span>
          </div>
          <div className="test-legend">
            <button
              className="color"
              style={{ backgroundColor: "#2b8a3c" }}
            ></button>
            <span className="test">Frontend Fresher Test</span>
          </div>
          <div className="test-legend">
            <button
              className="color"
              style={{ backgroundColor: "#0e3ab3" }}
            ></button>
            <span className="test">Freshers Junior Test</span>
          </div>
          <div className="test-legend">
            <button
              className="color"
              style={{ backgroundColor: "#f05232" }}
            ></button>
            <span className="test">Freshers Test</span>
          </div>
          <div className="test-legend">
            <button
              className="color"
              style={{ backgroundColor: "#62b027" }}
            ></button>
            <span className="test">MERN Developer Intermediate Test</span>
          </div>
          <div className="test-legend">
            <button
              className="color"
              style={{ backgroundColor: "#b02709" }}
            ></button>
            <span className="test">MERN Developer Junior Test</span>
          </div>
          <div className="test-legend">
            <button
              className="color"
              style={{ backgroundColor: "#102061" }}
            ></button>
            <span className="test">Shopify Developer Test</span>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <button className="totaltestconductedbutton">
            Total Tests Conducted:
            {fresher +
              fullStack +
              python +
              freshersJunior +
              frontendfresher +
              qa +
              java +
              shopify +
              merndeveloperintermediate +
              merndeveloperjunior}
          </button>
        </div>
        <div className="test-chart">
          <Chart
            className="allstremsPiechart"
            chartType="PieChart"
            data={pieData}
            options={{
              colors: [
                "#0e3ab3",
                "#f05232",
                "#e89510",
                "#2b8a3c",
                "#963596",
                "#5c9ed1",
                "#e62e81",
                "#62b027",
                "#b02709",
                "#102061",
              ],
              title: "All Test Metrics",
              legend: "none",
            }}
          ></Chart>
        </div>
      </div>
      <h3 className="allmetricsHeading">
        Below Metrics are about percentage of each section which are correctly
        answered by students of different tests
      </h3>
      <div className="piechart-details">
        <div className="test-legend">
          <button
            className="color"
            style={{ backgroundColor: "#aed25d" }}
          ></button>
          <span className="test">Aptitude</span>
        </div>
        <div className="test-legend">
          <button
            className="color"
            style={{ backgroundColor: "#6f6fed" }}
          ></button>
          <span className="test">Technical</span>
        </div>
        <div className="test-legend">
          <button
            className="color"
            style={{ backgroundColor: "#9f93ed" }}
          ></button>
          <span className="test">Reasoing</span>
        </div>
        <div className="test-legend">
          <button
            className="color"
            style={{ backgroundColor: "#468f0a" }}
          ></button>
          <span className="test">Java</span>
        </div>
        <div className="test-legend">
          <button
            className="color"
            style={{ backgroundColor: "#4d71bd" }}
          ></button>
          <span className="test">React</span>
        </div>
      </div>
      <div className="dashboard_chart_container">
        <Chart
          className="testwisePiechart"
          chartType="PieChart"
          data={fresherPieData}
          options={{
            title: "Fresher Test Metrics",
            colors: ["#aed25d", "#6f6fed"],
            legend: "none",
          }}
        />
        <Chart
          className="testwisePiechart"
          chartType="PieChart"
          data={pythonPieData}
          options={{
            title: "Python Test Metrics",
            colors: ["#aed25d", "#6f6fed"],
            legend: "none",
          }}
        />
        <Chart
          className="testwisePiechart"
          chartType="PieChart"
          data={fullStackPieData}
          options={{
            title: "FullStack Test Metrics",
            colors: ["#468f0a", "#4d71bd"],
            legend: "none",
          }}
        />
        <Chart
          className="testwisePiechart"
          chartType="PieChart"
          data={javaPieData}
          options={{
            title: "Java Test Metrics",
            colors: ["#aed25d", "#6f6fed"],
            legend: "none",
          }}
        />
        <Chart
          className="testwisePiechart"
          chartType="PieChart"
          data={qaPieData}
          options={{
            title: "QA Test Metrics",
            colors: ["#aed25d", "#6f6fed"],
            legend: "none",
          }}
        />
        <Chart
          className="testwisePiechart"
          chartType="PieChart"
          data={frontendfresherPieData}
          options={{
            title: "FroentFresher Test Metrics",
            colors: ["#aed25d", "#6f6fed"],
            legend: "none",
          }}
        />

        <Chart
          className="testwisePiechart"
          chartType="PieChart"
          data={freshersJuniorPieData}
          options={{
            title: "FresherJunior Test Metrics",
            colors: ["#aed25d", "#9f93ed"],
            legend: "none",
          }}
        />
        <Chart
          className="testwisePiechart"
          chartType="PieChart"
          data={merndeveloperJuniorPieData}
          options={{
            title: "MernDeveloper Junior Test Metrics",
            colors: ["#aed25d", "#6f6fed"],
            legend: "none",
          }}
        />
        <Chart
          className="testwisePiechart"
          chartType="PieChart"
          data={merndeveloperintermediatePieData}
          options={{
            title: "MernDeveloperIntermediate Test Metrics",
            colors: ["#aed25d", "#6f6fed"],
            legend: "none",
          }}
        />
        <Chart
          className="testwisePiechart"
          chartType="PieChart"
          data={shopifyPieData}
          options={{
            title: "Shopify Test Metrics",
            colors: ["#aed25d", "#6f6fed"],
            legend: "none",
          }}
        />
      </div>
    </>
  );
};

export default Dashboard;
