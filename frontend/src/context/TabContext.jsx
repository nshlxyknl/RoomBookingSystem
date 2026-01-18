
import { createContext, useContext } from "react";

const TabContext = createContext();

export const usetab = () => useContext(TabContext);

export default TabContext