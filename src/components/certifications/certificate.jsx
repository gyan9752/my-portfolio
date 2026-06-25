import "./certificate.css";
import { motion } from "framer-motion";

// Images exact paths ke sath loaded hain
import member1 from "../../assets/image/father.jpeg";       
import member2 from "../../assets/image/mother.jpeg";       
import member3 from "../../assets/image/brother1.jpeg";     
import member4 from "../../assets/image/brother2.jpeg";     
import member5 from "../../assets/image/didi.jpeg";       
import member6 from "../../assets/image/bhabhi.jpeg";   
import member7 from "../../assets/image/nephew.jpeg";       
import member8 from "../../assets/image/PHOTO.jpeg"; // capital PHOTO matching your terminal files

export default function Certificate() {
  const familyMembers = [
    { image: member1, relation: "Father" },
    { image: member2, relation: "Mother" },
    { image: member3, relation: "Brother 1" },
    { image: member4, relation: "Brother 2" },
    { image: member5, relation: "Sister" },
    { image: member6, relation: "Sister-in-Law" },
    { image: member7, relation: "Nephew" },
    { image: member8, relation: "Me" },
  ];

  return (
    <section className="certificate" id="family">
      <h2>My Pillars (Family)</h2>

      <div className="certificate-grid">
        {familyMembers.map((item, index) => (
          <motion.div 
            className="certificate-card" 
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img src={item.image} alt={item.relation} />
            <h3>{item.relation}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}