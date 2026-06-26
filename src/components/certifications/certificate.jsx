import "./certificate.css";
import { motion } from "framer-motion";

// Existing images paths stays exactly safe
import member1 from "../../assets/image/father.jpeg";       
import member2 from "../../assets/image/mother.jpeg";       
import member3 from "../../assets/image/brother1.jpeg";     
import member4 from "../../assets/image/brother2.jpeg";     
import member5 from "../../assets/image/didi.jpeg";       
import member6 from "../../assets/image/bhabhi.jpeg";   
import member7 from "../../assets/image/nephew.jpeg";       
import member8 from "../../assets/image/PHOTO.jpeg"; 

export default function Certificate() {
  const familyMembers = [
    { image: member1, name: "Father" },
    { image: member2, name: "Mother" },
    { image: member3, name: "Brother 1" },
    { image: member4, name: "Brother 2" },
    { image: member5, name: "Sister" },
    { image: member6, name: "Sister-in-Law" },
    { image: member7, name: "Nephew" },
    { image: member8, name: "Me" },
  ];

  return (
    <section className="certificate" id="family">
      <h2>My Pillars (Inspiration)</h2>
      <p className="certificate-subtitle">root.getInspiration().map(member =&gt; member.log());</p>

      <div className="certificate-grid">
        {familyMembers.map((item, index) => (
          <motion.div 
            className="certificate-card" 
            key={index}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="pillar-avatar-wrapper">
              <img src={item.image} alt={item.name} />
            </div>
            
            {/* 📝 Sirf single clean string variable text */}
            <h3>
              <span className="code-string">"{item.name}"</span>
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}