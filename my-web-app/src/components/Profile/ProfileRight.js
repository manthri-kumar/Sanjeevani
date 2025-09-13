import React from "react";
import "./ProfileRight.css";

const sectionContent = {
  profile: {
    title: "My Profile",
    content: "Basic user details go here.",
  },
  appointments: {
    title: "Appointments",
    content: "No upcoming appointments.",
  },
  health: {
    title: "Health Records",
    content: "Your medical records will appear here.",
  },
  volunteering: {
    title: "Volunteering",
    content: "Details about your volunteering activities.",
  },
};

const ProfileRight = ({ selected }) => {
  const section = sectionContent[selected];

  return (
    <section className="profile-right">
      {section ? (
        <>
          <h1 className="pr-title">{section.title}</h1>
          <div className="pr-card">{section.content}</div>
        </>
      ) : (
        <>
          <h1 className="pr-title">Overview</h1>
          <div className="pr-card">Pick an item from the left.</div>
        </>
      )}
    </section>
  );
};

export default ProfileRight;
