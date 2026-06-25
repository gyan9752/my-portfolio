import "./stats.css";

export default function Stats() {
  const stats = [
    {
      number: "5+",
      title: "Projects Completed",
    },
    {
      number: "1+",
      title: "Years Experience",
    },
    {
      number: "500+",
      title: "Hours Coding",
    },
    {
      number: "100%",
      title: "Passion & Dedication",
    },
  ];

  return (
    <section className="stats">
      <h2>My Statistics</h2>

      <div className="stats-grid">
        {stats.map((item, index) => (
          <div className="stats-card" key={index}>
            <h1>{item.number}</h1>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}