"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ProjectContextType = {
  showSpinner: boolean;
  setShowSpinner: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
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
