import "./gallary.css";

import img1 from "../../assets/gallery/img1.jpeg";
import img2 from "../../assets/gallery/img2.jpeg";
import img3 from "../../assets/gallery/img3.jpeg";
import img4 from "../../assets/gallery/img4.jpeg";

export default function Gallery() {
  const images = [img1, img2, img3, img4];

  return (
    <section className="gallery">
      <h2>Gallery</h2>

      <div className="gallery-grid">
        {images.map((image, index) => (
          <div className="gallery-card" key={index}>
            <img src={image} alt={`gallery-${index}`} />
          </div>
        ))}
      </div>
    </section>
  );
}