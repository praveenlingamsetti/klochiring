import StudentNavbar from "./StudentNavbar";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
// Below test Array is user to store  googleSheet ID respective test name
const tests = [
  {
    name: "Freshers Junior Test",
    sheetId: "1FAIpQLScEF29Ck2UPPWQXODVSVUH4lZFpbo1N71Cgf0AjJlo_fOtDxQ",
  },
  {
    name: "Freshers QA Test",
    sheetId: "1FAIpQLSe_6u3m6FpCbHOnOhmcqQvF9j4BZQmZ_xQJCvXemdgUoiGfzQ",
  },
  {
    name: "Full Stack Developer Test",
    sheetId: "1FAIpQLSey5QnV8zlrIaW1iA_VUPsk3Dn00EvsHJFBdAfstuQ5sFKqHA",
  },
  {
    name: "Freshers Python Test",
    sheetId: "1FAIpQLSc6bo70tKr4cBVmXu77DCT5GDk4QxDQqlBn-Yc4rm52Nm3YwA",
  },
  {
    name: "Freshers Java Test",
    sheetId: "1FAIpQLSe854IK4Vjbc75J4KHfh7vtseWAhA3oM9_tvV1Chc-B3TSs4g",
  },
  {
    name: "Frontend Freshers Test",
    sheetId: "1FAIpQLSfrDGqx_UKpYQRWXux6DY46fQ7ORmMCOrumWBg0edT-zXaDmw",
  },
  {
    name: "Shopify Developer Test",
    sheetId: "1FAIpQLSfmG8lozHE7zsZCiuDPZHcT21j7FxceG0MVIHTMhkWcVADD6w",
  },
  {
    name: "MERN Developer Junior Test",
    sheetId: "1FAIpQLSe-QGKb02hDYOw5P90U1NnsFbr57ULgiDko4b6Z44j05HPsjQ",
  },
  {
    name: "MERN Developer Intermediate Test",
    sheetId: "1FAIpQLSfqB_s6hE_rIV4I8edQaO_u6Q-Jr6GvhDrI42vlYEwEr3hPdA",
  },
  {
    name: "Fresher Test",
    sheetId: "1FAIpQLSfTsUnkTZgGcIG6ZekFGNNCJ5o2I6hXLSMSrvs6ibRNiRJJJg",
  },
];

const AllTests = () => {
  const location = useLocation();
  const [test, setTest] = useState(location.state); //location object is used to get the testName form the studentLogin page through navigation
  // currentTestForm indicates that current test object filtered from the above tests array
  const currentTestForm = tests.find((each) => each.name === test);

  return (
    <div>
      <StudentNavbar />
      <div className="text-center pt-5">
        <iframe
          // current test name as title
          title={currentTestForm.name}
          // each google form has same domain url with unique keys so here currentTestForm.sheetId is unique key of the google form
          src={`https://docs.google.com/forms/d/e/${currentTestForm.sheetId}/viewform?embedded=true'
          width='700'`}
          width="700"
          height="520"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
};

export default AllTests;
