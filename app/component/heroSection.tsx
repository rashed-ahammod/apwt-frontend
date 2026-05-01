import React from "react";

function HeroSection() {
  return (
    <main>
      <section>
        <h1><center>Smart Company Management System</center></h1>

        <p text-align="center">
          This system helps manage employees, roles, tasks, and company activities
          in a simple, organized, and efficient way.
        </p>

              <button
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Get Started
      </button>
      </section>
    </main>
  );
}

export default HeroSection;