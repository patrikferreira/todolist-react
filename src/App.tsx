import { useContext } from "react";
import { NavigationContext } from "./NavigationContext";


export default function App() {
  const ctx = useContext(NavigationContext)
  return (
    <>
      <p>{ctx?.selectedRoute}</p>
    </>
  );
}
