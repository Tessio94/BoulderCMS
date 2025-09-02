"use client";

import React, { useEffect, useState } from "react";
import ResultsInfo from "./ResultsInfo";
import { createPortal } from "react-dom";

const UserResultsForm = ({ userResult, place }) => {
  const [showResultInfo, setShowResultInfo] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleUserResult = async (eventId, memberId) => {
    try {
      const res = await fetch(
        `/api/userResults?eventId=${eventId}&memberId=${memberId}`,
      );

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();

      setUserData(data);
      setShowResultInfo((prev) => !prev);
    } catch (error) {
      console.error("Failed to fetch user result:", error);
    }
  };

  useEffect(() => {
    if (showResultInfo) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showResultInfo]);

  return (
    <>
      <tbody
        onClick={() => handleUserResult(userResult.event, userResult.member)}
        className="cursor-pointer bg-white transition-all duration-300 hover:bg-slate-200"
      >
        <tr>
          <td className="p-1 text-start text-sm sm:px-3 sm:py-2 sm:text-lg">
            {userResult.eventName}
          </td>
          <td className="p-1 text-start text-sm sm:px-3 sm:py-2 sm:text-lg">
            {" "}
            {userResult.categoryName}
          </td>
          <td className="p-1 text-start text-sm sm:px-3 sm:py-2 sm:text-lg">
            {" "}
            {userResult.points}
          </td>
          <td className="p-1 text-start text-sm sm:px-3 sm:py-2 sm:text-lg">
            {place}
          </td>
        </tr>
      </tbody>
      {showResultInfo &&
        userResult &&
        createPortal(
          <ResultsInfo
            setShow={setShowResultInfo}
            data={userData}
            eventId={userResult.event}
          />,
          document.body,
        )}
    </>
  );
};

export default UserResultsForm;
