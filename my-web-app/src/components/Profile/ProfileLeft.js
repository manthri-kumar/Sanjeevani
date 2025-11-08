import React from "react";
import "./ProfileLeft.css";
import sanjeevaniImg from "../../assets/sanjeevani.jpg"; // ✅ import your logo

const sections = [
  { id: "profile", label: "👤 My Profile" },
  { id: "appointments", label: "📅 Appointments" },
  { id: "health", label: "🩺 Health Records" },
  { id: "volunteering", label: "🎖 Volunteering" },
];

const ProfileLeft = ({ selected, setSelected }) => (
  <aside className="profile-left">

    <ul className="profile-left-menu">
      {sections.map(section => (
        <li key={section.id}>
          <button
            className={`profile-btn${selected === section.id ? " active" : ""}`}
            onClick={() => setSelected(section.id)}
            aria-current={selected === section.id ? "page" : undefined}
          >
            {section.label}
          </button>
        </li>
      ))}
    </ul>
  </aside>
);

export default ProfileLeft;
