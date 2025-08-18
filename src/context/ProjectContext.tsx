"use client";

import { createContext, useContext, useState } from "react";

const ProjectContext = createContext(false);

export const ProjectProvider = ({ children }) => {
  const [showSpinner, setShowSpinner] = useState(true);

  return (
    <ProjectContext.Provider value={{ showSpinner, setShowSpinner }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectInfo = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error(
      "useProjectInfo muse be used withing ProjectContext.Provider",
    );
  }

  return context;
};
