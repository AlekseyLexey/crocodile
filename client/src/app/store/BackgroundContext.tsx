import { createContext, useContext, useState } from "react";

type BackgroundType = "forest" | "river" | "beach";

const BackgroundContext = createContext<{
  background: BackgroundType;
  setBackground: (bg: BackgroundType) => void;
}>({
  background: "forest",
  setBackground: () => {},
});

export const useBackground = () => useContext(BackgroundContext);

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [background, setBackground] = useState<BackgroundType>("forest");
  
  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};