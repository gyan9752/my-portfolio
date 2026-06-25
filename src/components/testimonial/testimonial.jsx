import "./testimonial.css";

export default function Testimonial() {

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Frontend Developer",
      review:
        "Great developer with excellent problem-solving skills and modern UI knowledge.",
    },
    {
      name: "Amit Verma",
      role: "Software Engineer",
      review:
        "Delivered projects on time with clean and maintainable code.",
    },
    {
      name: "Priya Singh",
      role: "MERN Developer",
      review:
        "Highly recommended for React and full-stack development work.",
    },
  ];

  return (
    <section className="testimonial">

      <h2>Testimonials</h2>

      <div className="testimonial-grid">

        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>

            <p>"{item.review}"</p>

            <h3>{item.name}</h3>

            <span>{item.role}</span>

          </div>
        ))}

      </div>

    </section>
  );
}