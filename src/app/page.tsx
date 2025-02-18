import Hero from "@/components/Hero";
import Feature from "@/components/Feature";
import Categoties from "@/components/Categoties";
import About from "./about/page";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Feature />
      <Categoties />
    </div>
  );
}
