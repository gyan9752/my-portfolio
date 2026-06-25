import "./scrolltop.css";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="scroll-top" onClick={scrollToTop} title="Scroll to Top">
      <FaArrowUp />
    </div>
  );
}