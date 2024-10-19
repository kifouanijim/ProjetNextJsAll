import { getSession } from "@/utils/sessions";
import { useEffect } from "react";
 
export default function Home() {
  const logSession = async () => {
    const session = await getSession();
    console.log(session);
  };
 
  useEffect(() => {
    logSession();
  }, []);
 
  return (
    // ...
  );
}