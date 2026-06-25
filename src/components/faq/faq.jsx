// import "./faq.css";

// export default function Faq() {

//   const faqs = [
//     {
//       question: "What technologies do you work with?",
//       answer: "I work with React, Node.js, Express, MongoDB and modern JavaScript."
//     },
//     {
//       question: "Do you build responsive websites?",
//       answer: "Yes, all websites are fully responsive and mobile-friendly."
//     },
//     {
//       question: "Do you provide backend development?",
//       answer: "Yes, I develop complete MERN stack applications."
//     },
//     {
//       question: "Can you fix existing bugs?",
//       answer: "Yes, I can debug, optimize and improve existing projects."
//     }
//   ];

//   return (
//     <section className="faq">

//       <h2>Frequently Asked Questions</h2>

//       <div className="faq-container">

//         {faqs.map((item, index) => (
//           <div className="faq-card" key={index}>
//             <h3>{item.question}</h3>
//             <p>{item.answer}</p>
//           </div>
//         ))}

//       </div>

//     </section>
//   );
// }

import { useState } from "react";
import "./faq.css";

export default function Faq() {
  // activeIndex में खुले हुए सवाल का इंडेक्स रहेगा (null मतलब सब बंद हैं)
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    // अगर पहले से खुला हुआ है तो बंद कर दो (null), नहीं तो नया इंडेक्स सेट करो
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What technologies do you work with?",
      answer: "I work with React, Node.js, Express, MongoDB and modern JavaScript."
    },
    {
      question: "Do you build responsive websites?",
      answer: "Yes, all websites are fully responsive and mobile-friendly."
    },
    {
      question: "Do you provide backend development?",
      answer: "Yes, I develop complete MERN stack applications."
    },
    {
      question: "Can you fix existing bugs?",
      answer: "Yes, I can debug, optimize and improve existing projects."
    }
  ];

  return (
    <section className="faq">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-container">
        {faqs.map((item, index) => {
          const isOpen = activeIndex === index;
          return (
            <div 
              className={`faq-card ${isOpen ? "active" : ""}`} 
              key={index}
            >
              {/* हेडर पर क्लिक करने से टोगल होगा */}
              <div className="faq-header" onClick={() => toggleFaq(index)}>
                <h3>{item.question}</h3>
                <span className="faq-icon">{isOpen ? "−" : "+"}</span>
              </div>
              
              {/* अगर खुला है तभी आंसर दिखेगा */}
              {isOpen && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}