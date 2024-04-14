import { Search } from "./search/search";
import { ThemeBtn } from "./themeBtn";
import {CurrentLocation} from "./location"
import {Times} from "./times"
import { useState } from "react";

export default function Dashboard() {
  const [location, setLocation] = useState("");

  return (
    <>
      <main>
        <nav className="flex justify-around items-center">
        <ThemeBtn />
        <Search />
        <CurrentLocation setLocation={setLocation}/>
        </nav>
        <section>
          <Times location= {location}/>
        </section>
      </main>
    </>
  );
}
