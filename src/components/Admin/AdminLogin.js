import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { GiHamburgerMenu } from "react-icons/gi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import "./index.css";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

const AdminLogin = () => {
  const [fresherData, setFresherData] = useState([]);
  const [pythonData, setPythonData] = useState([]);
  const [fullStackData, setFullStackData] = useState([]);
  const [shopifyData, setShopifyData] = useState([]);
  const [mernDeveloperIntermediateData, setMernDeveloperIntermediateData] =
    useState([]);
  const [frontEndFresherData, setfrontEndFresherData] = useState([]);
  const [javaData, setJavaData] = useState([]);
  const [mernDeveloperJuniorData, setMernDeveloperJuniorData] = useState([]);
  const [qaData, setQAData] = useState([]);
  const [freshersJuniorData, setFreshersJuniorData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  // useState to store boolean value of signedIn status of client
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGoogleAPI = () => {
      const script = document.createElement("script");
      script.src = process.env.REACT_APP_SCRIPT_SRC;
      script.onload = initializeGoogleAPI;
      document.head.appendChild(script);
    };

    // to initialize the google api
    const initializeGoogleAPI = () => {
      window.gapi.load("client:auth2", initClient);
    };

    // to initialize the google api client using apikey, client id, scopes and discoveryDocs from google cloudspace
    const initClient = () => {
      window.gapi.client
        .init({
          apiKey: process.env.REACT_APP_API_KEY,
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: [
            "https://sheets.googleapis.com/$discovery/rest?version=v4",
          ],
        })
        .then(() => {
          const authInstance = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(authInstance.isSignedIn.get());
          authInstance.isSignedIn.listen(updateSignInStatus);
          // execute request functions to get google sheet data responses for different tests
          executeRequestFreshersTest();
          executeRequestPythonTest();
          executeRequestShopifyTest();
          executeRequestFrontEndFresherTest();
          executeRequestFullStackTest();
          executeRequestMernDeveloperIntermediateTest();
          executeRequestJavaTest();
          executeRequestMernDeveloperJuniorTest();
          executeRequestQATest();
          executeRequestFreshersJuniorTest();
          getUserEmail();
        })
        .catch((error) => {
          console.error("Error initializing Google API client", error);
        });
    };

    const updateSignInStatus = (isUserSignedIn) => {
      setIsSignedIn(isUserSignedIn);
      // if user is signedIn, getUserEmail function will render else userEmail variable will be set to empty
      if (isUserSignedIn) {
        getUserEmail();
      } else {
        setUserEmail("");
      }
    };

    const executeRequestFreshersTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_FRESHERS_TEST_SHEET_ID,
          range: process.env.REACT_APP_FRESHERS_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing freshers test responses data in setFresherData function
          setFresherData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for python test using spreadsheet id and name
    const executeRequestPythonTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_PYTHON_TEST_SHEET_ID,
          range: process.env.REACT_APP_PYTHON_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing python test responses data in setPythonData function
          setPythonData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for shopify test using spreadsheet id and name
    const executeRequestShopifyTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_SHOPIFY_TEST_SHEET_ID,
          range: process.env.REACT_APP_SHOPIFY_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing shopify test responses data in setShopifyData function
          setShopifyData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for front end fresher test using spreadsheet id and name
    const executeRequestFrontEndFresherTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_FRONTEND_FRESHER_TEST_SHEET_ID,
          range: process.env.REACT_APP_FRONTEND_FRESHER_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing front end fresher test responses data in setfrontEndFresherData function
          setfrontEndFresherData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for full stack test using spreadsheet id and name
    const executeRequestFullStackTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_FULL_STACK_TEST_SHEET_ID,
          range: process.env.REACT_APP_FULL_STACK_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing full stack test responses data in setFullStackData function
          setFullStackData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for mern developer intermediate test using spreadsheet id and name
    const executeRequestMernDeveloperIntermediateTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId:
            process.env.REACT_APP_MERN_DEVELOPER_INTERMEDIATE_TEST_SHEET_ID,
          range:
            process.env.REACT_APP_MERN_DEVELOPER_INTERMEDIATE_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing mern developer intermediate test responses data in setMernDeveloperIntermediateData function
          setMernDeveloperIntermediateData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for java test using spreadsheet id and name
    const executeRequestJavaTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_JAVA_TEST_SHEET_ID,
          range: process.env.REACT_APP_JAVA_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing java test responses data in setJavaData function
          setJavaData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for mern developer junior test using spreadsheet id and name
    const executeRequestMernDeveloperJuniorTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId:
            process.env.REACT_APP_MERN_DEVELOPER_JUNIOR_TEST_SHEET_ID,
          range: process.env.REACT_APP_MERN_DEVELOPER_JUNIOR_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing mern developer junior test responses data in setMernDeveloperJuniorData function
          setMernDeveloperJuniorData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for qa test using spreadsheet id and name
    const executeRequestQATest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_QA_TEST_SHEET_ID,
          range: process.env.REACT_APP_QA_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing qa test responses data in setQAData function
          setQAData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for freshers junior test using spreadsheet id and name
    const executeRequestFreshersJuniorTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_FRESHERS_JUNIOR_TEST_SHEET_ID,
          range: process.env.REACT_APP_FRESHERS_JUNIOR_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing freshers junior test responses data in setFreshersJuniorData function
          setFreshersJuniorData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // getUserEmail function
    const getUserEmail = () => {
      const authInstance = window.gapi.auth2.getAuthInstance();
      if (authInstance.isSignedIn.get()) {
        const currentUser = authInstance.currentUser.get();
        const basicProfile = currentUser.getBasicProfile();
        const email = basicProfile.getEmail();
        // if email from the auth instance equals to the provided email then a unique loginid token will be created
        if (email === "klocprojectone@gmail.com") {
          const loginId = uuidv4();
          // Cookies.set method is used to set cookies for the login id token and expiration validity of 30 days
          Cookies.set("token", loginId, { expires: 30 });
          // if email does not exists, notFound component will render
        } else {
          navigate("/notFound");
        }
        // userEmail value is set to the email
        setUserEmail(email);
      }
    };

    loadGoogleAPI();
  }, []);

  const fetchFresherData = () => {
    fresherData.map((item, index) => {
      let aptitude_score = 0;
      let technical_score = 0;
      const aptitude = JSON.parse(
        process.env.REACT_APP_FRESHER_TEST_APTITUDE_QUESTIONS_ANSWERS
      );
      const technical = JSON.parse(
        process.env.REACT_APP_FRESHER_TEST_TECHNICAL_QUESTIONS_ANSWERS
      );
      Object.keys(item).map((_, i) => {
        if (i > 5 && i < 26) {
          if (i - 5 in aptitude) {
            if (item[_] === aptitude[i - 5]) {
              aptitude_score += 1;
            }
          }
        } else if (i > 25 && i < 56) {
          if (i - 25 in technical) {
            if (item[_] === technical[i - 25]) {
              technical_score += 1;
            }
          }
        }
      });
      item.aptitude_score = aptitude_score;
      item.technical_score = technical_score;
      item.total_score = aptitude_score + technical_score;
      item.testType = "Freshers Test";
    });
  };

  useEffect(() => {
    fetchFresherData();
  }, [fresherData]);

  const fetchPythonData = () => {
    let aptitude = JSON.parse(
      process.env.REACT_APP_PYTHON_TEST_APTITUDE_QUESTIONS_ANSWERS
    );
    let technical = JSON.parse(
      process.env.REACT_APP_PYTHON_TEST_TECHNICAL_QUESTIONS_ANSWERS
    );
    pythonData.map((item, index) => {
      let aptitude_score = 0;
      let technical_score = 0;
      Object.keys(item).map((score, i) => {
        if (i > 5 && i < 31) {
          if (i - 5 in aptitude) {
            if (item[score] === aptitude[i - 5]) {
              aptitude_score += 1;
            }
          }
        } else if (i > 30 && i < 56) {
          if (i - 30 in technical) {
            if (item[score] === technical[i - 30]) {
              technical_score += 1;
            }
          }
        }
      });

      item.aptitude_score = aptitude_score;
      item.technical_score = technical_score;
      item.total_score = item.aptitude_score + item.technical_score;
      item.testType = "Python Test";
    });
  };
  useEffect(() => {
    fetchPythonData();
  }, [pythonData]);

  const fetchShopifyData = () => {
    shopifyData.map((item, index) => {
      let aptitude_score = 0;
      let technical_score = 0;
      const aptitude = JSON.parse(
        process.env.REACT_APP_SHOPIFY_APTITUDE_QUESTIONS_ANSWERS
      );
      const technical = JSON.parse(
        process.env.REACT_APP_SHOPIFY_TECHNICAL_QUESTIONS_ANSWERS
      );
      Object.keys(item).map((_, i) => {
        if (i > 5 && i < 16) {
          if (i - 5 in aptitude) {
            if (item[_] === aptitude[i - 5]) {
              aptitude_score += 1;
            }
          }
        } else if (i > 15 && i < 46) {
          if (i - 15 in technical) {
            if (item[_] === technical[i - 15]) {
              technical_score += 1;
            }
          }
        }
      });
      item.aptitude_score = aptitude_score;
      item.technical_score = technical_score;
      item.total_score = aptitude_score + technical_score;
      item.testType = "Shopify Test";
    });
  };

  useEffect(() => {
    fetchShopifyData();
  }, [shopifyData]);

  const fetchFrontEndFresherData = () => {
    let aptitude = JSON.parse(
      process.env.REACT_APP_FRONTEND_FRESHER_TEST_APTITUDE_QUESTIONS_ANSWERS
    );
    let technical = JSON.parse(
      process.env.REACT_APP_FRONTEND_FRESHER_TEST_TECHNICAL_QUESTIONS_ANSWERS
    );
    frontEndFresherData.map((item, index) => {
      let aptitude_score = 0;
      let technical_score = 0;
      Object.keys(item).map((score, i) => {
        if (i > 5 && i < 16) {
          if (i - 5 in aptitude) {
            if (item[score] === aptitude[i - 5]) {
              aptitude_score += 1;
            }
          }
        } else if (i > 15 && i < 56) {
          if (i - 15 in technical) {
            if (item[score] === technical[i - 15]) {
              technical_score += 1;
            }
          }
        }
      });

      item.aptitude_score = aptitude_score;
      item.technical_score = technical_score;
      item.total_score = aptitude_score + technical_score;
      item.testType = "Front End Fresher Test";
    });
  };

  useEffect(() => {
    fetchFrontEndFresherData();
  }, [frontEndFresherData]);
  console.log(frontEndFresherData);

  const fetchFullStackData = () => {
    fullStackData.map((item, index) => {
      let fullstack_java_score = 0;
      let fullstack_react_score = 0;
      const fullstack_java = JSON.parse(
        process.env.REACT_APP_FULLSTACK_JAVA_QUESTIONS_ANSWERS
      );
      const fullstack_react = JSON.parse(
        process.env.REACT_APP_FULLSTACK_REACT_QUESTIONS_ANSWERS
      );
      Object.keys(item).map((_, i) => {
        if (i > 5 && i < 31) {
          if (item[_] === fullstack_react[i - 5]) {
            fullstack_react_score += 1;
          }
        } else if (i > 30 && i < 57) {
          if ([i - 30] in fullstack_java) {
            if (item[_] === fullstack_java[i - 30]) {
              fullstack_java_score += 1;
            }
          }
        }
      });
      item.fullstack_java_score = fullstack_java_score;
      item.fullstack_react_score = fullstack_react_score;
      item.total_score = fullstack_java_score + fullstack_react_score;
      item.testType = "Full Stack Test";
    });
  };

  useEffect(() => {
    fetchFullStackData();
  }, [fullStackData]);

  const fetchMernDeveloperIntermediateData = () => {
    let aptitude = JSON.parse(
      process.env
        .REACT_APP_MERN_DEVELOPER_INTERMEDIATE_TEST_APTITUDE_QUESTIONS_ANSWERS
    );
    let technical = JSON.parse(
      process.env
        .REACT_APP_MERN_DEVELOPER_INTERMEDIATE_TEST_TECHNICAL_QUESTIONS_ANSWERS
    );
    mernDeveloperIntermediateData.map((item, index) => {
      let aptitude_score = 0;
      let technical_score = 0;
      Object.keys(item).map((score, i) => {
        if (i > 5 && i < 16) {
          if (i - 5 in aptitude) {
            if (item[score] === aptitude[i - 5]) {
              aptitude_score += 1;
            }
          }
        } else if (i > 15 && i < 56) {
          if (i - 15 in technical) {
            if (item[score] === technical[i - 15]) {
              technical_score += 1;
            }
          }
        }
      });

      item.aptitude_score = aptitude_score;
      item.technical_score = technical_score;
      item.total_score = aptitude_score + technical_score;
      item.testType = "MERN Developer Intermediate Test";
    });
  };

  useEffect(() => {
    fetchMernDeveloperIntermediateData();
  }, [mernDeveloperIntermediateData]);

  const fetchJavaData = () => {
    let aptitude = JSON.parse(
      process.env.REACT_APP_JAVA_TEST_APTITUDE_QUESTIONS_ANSWERS
    );
    let technical = JSON.parse(
      process.env.REACT_APP_JAVA_TEST_TECHNICAL_QUESTIONS_ANSWERS
    );
    javaData.map((item, index) => {
      let aptitude_score = 0;
      let technical_score = 0;
      Object.keys(item).map((score, i) => {
        if (i > 5 && i < 31) {
          if (i - 5 in aptitude) {
            if (item[score] === aptitude[i - 5]) {
              aptitude_score += 1;
            }
          }
        } else if (i > 30 && i < 56) {
          if (i - 30 in technical) {
            if (item[score] === technical[i - 30]) {
              technical_score += 1;
            }
          }
        }
      });

      item.aptitude_score = aptitude_score;
      item.technical_score = technical_score;
      item.total_score = aptitude_score + technical_score;
      item.testType = "Java Test";
    });
  };
  useEffect(() => {
    fetchJavaData();
  }, [javaData]);

  const fetchMernDeveloperJuniorData = () => {
    let aptitude = JSON.parse(
      process.env
        .REACT_APP_MERN_DEVELOPER_JUNIOR_TEST_APTITUDE_QUESTIONS_ANSWERS
    );
    let technical = JSON.parse(
      process.env
        .REACT_APP_MERN_DEVELOPER_JUNIOR_TEST_TECHNICAL_QUESTIONS_ANSWERS
    );
    mernDeveloperJuniorData.map((item, index) => {
      let aptitude_score = 0;
      let technical_score = 0;
      Object.keys(item).map((score, i) => {
        if (i > 5 && i < 16) {
          if (i - 5 in aptitude) {
            if (item[score] === aptitude[i - 5]) {
              aptitude_score += 1;
            }
          }
        } else if (i > 15 && i < 56) {
          if (i - 15 in technical) {
            if (item[score] === technical[i - 15]) {
              technical_score += 1;
            }
          }
        }
      });

      item.aptitude_score = aptitude_score;
      item.technical_score = technical_score;
      item.total_score = aptitude_score + technical_score;
      item.testType = "MERN Developer Junior Test";
    });
  };

  useEffect(() => {
    fetchMernDeveloperJuniorData();
  }, [mernDeveloperJuniorData]);

  const fetchQAData = () => {
    let aptitude = JSON.parse(
      process.env.REACT_APP_QA_TEST_APTITUDE_QUESTIONS_ANSWERS
    );
    let technical = JSON.parse(
      process.env.REACT_APP_QA_TEST_TECHNICAL_QUESTIONS_ANSWERS
    );
    qaData.map((item, index) => {
      let aptitude_score = 0;
      let technical_score = 0;
      Object.keys(item).map((score, i) => {
        if (i > 5 && i < 16) {
          if (i - 5 in aptitude) {
            if (item[score] === aptitude[i - 5]) {
              aptitude_score += 1;
            }
          }
        } else if (i > 15 && i < 56) {
          console.log(item[score], i - 15);
          console.log(technical[i - 15], i - 15);
          console.log(item[score] === technical[i - 15]);
          if (i - 15 in technical) {
            if (item[score] === technical[i - 15]) {
              technical_score += 1;
            }
          }
        }
      });
      console.log("aptitude_score", aptitude_score);
      console.log("technical_score", technical_score);
      item.aptitude_score = aptitude_score;
      item.technical_score = technical_score;
      item.total_score = aptitude_score + technical_score;
      item.testType = "QA Test";
    });
  };

  useEffect(() => {
    fetchQAData();
  }, [qaData]);

  const fetchFreshersJuniorData = () => {
    let aptitude = JSON.parse(
      process.env.REACT_APP_FRESHERS_JUNIOR_TEST_APTITUDE_QUESTIONS_ANSWERS
    );
    let reasoning = JSON.parse(
      process.env.REACT_APP_FRESHERS_JUNIOR_TEST_REASONING_QUESTIONS_ANSWERS
    );
    freshersJuniorData.map((item, index) => {
      let aptitude_score = 0;
      let reasoning_score = 0;
      Object.keys(item).map((score, i) => {
        if (i > 5 && i < 31) {
          if (i - 5 in aptitude) {
            if (item[score] === aptitude[i - 5]) {
              aptitude_score += 1;
            }
          }
        } else if (i > 30 && i < 56) {
          if (i - 30 in reasoning) {
            if (item[score] === reasoning[i - 30]) {
              reasoning_score += 1;
            }
          }
        }
      });

      item.aptitude_score = aptitude_score;
      item.reasoning_score = reasoning_score;
      item.total_score = aptitude_score + reasoning_score;
      item.testType = "Freshers Junior Test";
    });
  };
  useEffect(() => {
    fetchFreshersJuniorData();
  }, [freshersJuniorData]);

  let allData = [];
  allData.push(fresherData);
  allData.push(pythonData);
  allData.push(shopifyData);
  allData.push(frontEndFresherData);
  allData.push(mernDeveloperIntermediateData);
  allData.push(fullStackData);
  allData.push(javaData);
  allData.push(mernDeveloperJuniorData);
  allData.push(qaData);
  allData.push(freshersJuniorData);
  console.log(allData);

  const handleSignIn = () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signIn().catch((error) => {
      if (error.error === "popup_closed_by_user") {
        console.error("Popup Closed By the User", error);
      } else {
        console.error("Error signing in with Google", error);
      }
    });
  };

  // handleSignOut function used to signOut of admin google account
  const handleSignOut = () => {
    Cookies.remove("token");
    const authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signOut();
  };

  const datat = {
    fresherData,
    pythonData,
    mernDeveloperIntermediateData,
    shopifyData,
    frontEndFresherData,
    fullStackData,
    javaData,
    mernDeveloperJuniorData,
    qaData,
    freshersJuniorData,
  };
  console.log(datat);
  let finalData = {
    allData,
    datat,
  };

  return (
    <div>
      <div>
        <p>
          {isSignedIn ? (
            // if admin has signedIn, the below code will render
            <div className="admin-header-container">
              {/* header for desktop  with Logo and components Dashboard, Assessments, Test Reports, Student Reports and Sign Out */}
              <div className="admin-header-logo-container">
                {/* logo */}
                <img
                  src="https://res.cloudinary.com/dufx8zalt/image/upload/v1687419355/logoimage1_krvkbq.png"
                  alt="logo"
                  style={{
                    height: "50px",
                    width: "100px",
                    borderRadius: "10px",
                  }}
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
                  onClick={() =>
                    navigate("/sendAssessments", { state: finalData })
                  }
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
                  onClick={() =>
                    navigate("/studentReports", { state: finalData })
                  }
                  className="admin-desktop-header-navbar-link"
                >
                  Student Reports
                </p>
                {/* when clicking this Sign Out text, it'll navigates to admin login route and agains admin needs to sign in to access all routes */}
                <p
                  className="admin-desktop-header-navbar-link"
                  onClick={handleSignOut}
                >
                  Sign Out
                </p>
              </div>
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
                    <li
                      onClick={() =>
                        navigate("/dashboard", { state: finalData })
                      }
                      className="admin-header-navbar-link"
                    >
                      Dashboard
                    </li>
                    <li
                      onClick={() =>
                        navigate("/sendAssessments", { state: finalData })
                      }
                      className="admin-header-navbar-link"
                    >
                      Assessments
                    </li>
                    <li
                      onClick={() =>
                        navigate("/testReports", { state: finalData })
                      }
                      className="admin-header-navbar-link"
                    >
                      Test Reports
                    </li>
                    <li
                      onClick={() =>
                        navigate("/studentReports", { state: finalData })
                      }
                      className="admin-header-navbar-link"
                    >
                      Student Reports
                    </li>
                    <li
                      onClick={handleSignOut}
                      className="admin-header-navbar-link"
                    >
                      Sign Out
                    </li>
                  </ul>
                </Popup>
              </div>
            </div>
          ) : (
            // if admin hasn't signedIn, the below code will render
            <div className="display-column">
              <h2>Login With Google</h2>
              {/* if admin clicks this button, he can sign in into his account and get access for all routes */}
              <button onClick={handleSignIn} className="google-signin-button">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google Logo"
                />
                Sign In with Google
              </button>
            </div>
          )}
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
