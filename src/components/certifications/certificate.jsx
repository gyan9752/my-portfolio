import "./certificate.css";
import { motion } from "framer-motion";

// 1. Yahan apni 8 alag-alag family photos ke sahi filename aur path change kar lijiye
import member1 from "../../assets/image/father.jpeg";       // Father ki photo
import member2 from "../../assets/image/mother.jpeg";       // Mother ki photo
import member3 from "../../assets/image/brother1.jpeg";     // Brother 1 ki photo
import member4 from "../../assets/image/brother2.jpeg";     // Brother 2 ki photo
import member5 from "../../assets/image/didi.jpeg";       // Sister ki photo
import member6 from "../../assets/image/bhabhi.jpeg";   // Sister-in-Law ki photo
import member7 from "../../assets/image/nephew.jpeg";       // Nephew ki photo
import member8 from "../../assets/image/photo.jpeg";        // Aapki khud ki photo (Me)

export default function Family() {
  // 2. Array me har relation ke sath uske sahi image variable ko map kar diya hai
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