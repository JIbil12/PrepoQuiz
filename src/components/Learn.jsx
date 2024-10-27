import React from "react";

const Learn = () => {
  const rules = [
    {
      title: "Time Prepositions",
      examples: [
        "at: specific time (at 5 PM)",
        "in: months, years, centuries (in 2024)",
        "on: days, dates (on Monday)",
      ],
    },
    {
      title: "Place Prepositions",
      examples: [
        "at: specific point (at home)",
        "in: enclosed space (in the room)",
        "on: surface (on the table)",
      ],
    },
    // Add more rules
  ];

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-8">Learning Fixed Prepositions</h2>

      {rules.map((rule, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{rule.title}</h3>
          <ul className="list-disc pl-6">
            {rule.examples.map((example, i) => (
              <li key={i} className="mb-2">
                {example}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Learn;
