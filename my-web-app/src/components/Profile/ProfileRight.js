import React, { useEffect, useState } from "react";
import "./ProfileRight.css";

const sectionContent = {
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
  const [user, setUser] = useState(null);

  // ✅ Load user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Logout Function (inside right)
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // ✅ "My Profile" section
  if (selected === "profile") {
    return (
      <section className="profile-right">
        <h1 className="pr-title">My Profile</h1>
        {user ? (
          <div className="pr-card">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.id}</p>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="pr-card">
            <p>No user data found. Please log in.</p>
          </div>
        )}
      </section>
    );
  }

  // ✅ Other sections
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
