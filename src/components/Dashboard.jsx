import { Search } from "./search/search";
import { ThemeBtn } from "./themeBtn";
import {CurrentLocation} from "./location"

export default function Dashboard() {
  return (
    <>
      <main>
        <nav className="flex justify-around items-center">
        <ThemeBtn />
        <Search />
        <CurrentLocation/>
        </nav>
        <section></section>
      </main>
    </>
  );
}
