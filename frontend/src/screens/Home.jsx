import axios from "axios";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    axios
      .get("https://ipwho.is/")
      .then((res) => {
        const { country, region, city, latitude, longitude } = res.data;
        console.log({ country, region, city, latitude, longitude });
      })
      .catch(console.error);
  }, []);

  return <div>Home</div>;
}

export default Home;
