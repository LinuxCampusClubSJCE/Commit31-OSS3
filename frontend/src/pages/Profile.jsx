import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEdit, FaSave, FaTimes, FaShieldAlt } from "react-icons/fa";
import api from "../api/client";
import useAuth from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { updateUser, logout } = useAuth();
  const navigate = useNavigate();

  // Profile data
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // Section states
  const [editingSection, setEditingSection] = useState(null); // "info" | "email" | "password"

  // Personal Info form
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [infoLoading, setInfoLoading] = useState(false);
  const [infoMsg, setInfoMsg] = useState({ type: "", text: "" });

  // Email form
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMsg, setEmailMsg] = useState({ type: "", text: "" });

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.get("/api/users/me");
        setProfile(data);
        setName(data.name || "");
        setContactNumber(data.contactNumber || "");
      } catch (err) {
        const message = err.message || "Failed to load profile";
        setFetchError(message);
        if (/unauthorized|not authorized|token|expired/i.test(message)) {
          logout();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const startEditing = (section) => {
    setEditingSection(section);
    setInfoMsg({ type: "", text: "" });
    setEmailMsg({ type: "", text: "" });
    setPasswordMsg({ type: "", text: "" });
    // Reset email/password forms
    if (section === "email") {
      setNewEmail("");
      setEmailPassword("");
    }
    if (section === "password") {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const cancelEditing = () => {
    setEditingSection(null);
    // Reset info fields to current profile
    setName(profile?.name || "");
    setContactNumber(profile?.contactNumber || "");
    setInfoMsg({ type: "", text: "" });
    setEmailMsg({ type: "", text: "" });
    setPasswordMsg({ type: "", text: "" });
  };

  // ─── Update Personal Info ───
  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setInfoLoading(true);
    setInfoMsg({ type: "", text: "" });
    try {
      const data = await api.patch("/api/users/profile", { name, contactNumber });
      setProfile(data);
      updateUser({ name: data.name, contactNumber: data.contactNumber });
      setInfoMsg({ type: "success", text: "Profile updated successfully!" });
      setEditingSection(null);
    } catch (err) {
      setInfoMsg({ type: "error", text: err.message || "Update failed" });
    } finally {
      setInfoLoading(false);
    }
  };

  // ─── Update Email ───
  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    setEmailLoading(true);
    setEmailMsg({ type: "", text: "" });
    try {
      const data = await api.patch("/api/users/email", {
        newEmail,
        currentPassword: emailPassword,
      });
      setProfile(data);
      updateUser({ email: data.email });
      setEmailMsg({ type: "success", text: "Email updated successfully!" });
      setNewEmail("");
      setEmailPassword("");
      setEditingSection(null);
    } catch (err) {
      setEmailMsg({ type: "error", text: err.message || "Email update failed" });
    } finally {
      setEmailLoading(false);
    }
  };

  // ─── Change Password ───
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMsg({ type: "", text: "" });

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "New passwords do not match" });
      return;
    }

    setPasswordLoading(true);
    try {
      await api.patch("/api/users/password", { currentPassword, newPassword });
      setPasswordMsg({ type: "success", text: "Password changed successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setEditingSection(null);
    } catch (err) {
      setPasswordMsg({ type: "error", text: err.message || "Password change failed" });
    } finally {
      setPasswordLoading(false);
    }
  };

  // ─── Shared Styles ───
  const fontStyle = { fontFamily: "'Space Mono', monospace" };

  const inputClass =
    "w-full border-2 border-black p-3 font-bold focus:bg-yellow-100 outline-none transition-colors disabled:bg-gray-100 disabled:text-gray-500";

  const btnPrimary =
    "bg-yellow-300 border-2 border-black px-6 py-2 font-black uppercase hover:bg-black hover:text-yellow-300 transition-all shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";

  const btnSecondary =
    "bg-white border-2 border-black px-6 py-2 font-black uppercase hover:bg-black hover:text-white transition-all cursor-pointer";

  const btnEdit =
    "flex items-center gap-1 text-xs font-black uppercase border-2 border-black px-3 py-1 bg-white hover:bg-black hover:text-yellow-300 transition-colors cursor-pointer";

  // ─── Loading / Error ───
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center mt-16">
        <div className="border-4 border-black p-8 bg-yellow-300 shadow-[6px_6px_0px_#000]">
          <p className="text-xl font-black uppercase animate-pulse" style={fontStyle}>
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center mt-16">
        <div className="border-4 border-black p-8 bg-red-500 text-white shadow-[6px_6px_0px_#000]">
          <p className="text-xl font-black uppercase" style={fontStyle}>{fetchError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] py-12 px-4 mt-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="border-4 border-black p-6 mb-6 bg-yellow-300 shadow-[6px_6px_0px_#000]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1
                className="text-3xl font-black uppercase tracking-tighter"
                style={fontStyle}
              >
                {profile.name}
              </h1>
              <p className="text-sm font-bold mt-1 opacity-70" style={fontStyle}>
                {profile.email}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 border-2 border-black px-3 py-1 bg-black text-yellow-300 text-xs font-black uppercase" style={fontStyle}>
              <FaShieldAlt size={12} />
              {profile.role}
            </span>
          </div>
        </div>

        {/* ─── Card 1: Personal Info ─── */}
        <div className="border-4 border-black p-6 mb-6 bg-white shadow-[6px_6px_0px_#000]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black uppercase flex items-center gap-2" style={fontStyle}>
              <FaUser /> Personal Info
            </h2>
            {editingSection !== "info" && (
              <button onClick={() => startEditing("info")} className={btnEdit}>
                <FaEdit size={12} /> Edit
              </button>
            )}
          </div>

          {infoMsg.text && (
            <div
              className={`border-2 border-black p-2 mb-4 font-bold text-center text-sm ${
                infoMsg.type === "success" ? "bg-green-400 text-black" : "bg-red-500 text-white"
              }`}
            >
              {infoMsg.text}
            </div>
          )}

          <form onSubmit={handleUpdateInfo}>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase mb-1 block" style={fontStyle}>
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={editingSection !== "info"}
                  className={inputClass}
                  style={fontStyle}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase mb-1 block" style={fontStyle}>
                  <FaPhone className="inline mr-1" size={12} />
                  Contact Number
                </label>
                <input
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  disabled={editingSection !== "info"}
                  className={inputClass}
                  style={fontStyle}
                  placeholder="Not set"
                />
              </div>
            </div>

            {editingSection === "info" && (
              <div className="flex gap-3 mt-4">
                <button type="submit" disabled={infoLoading} className={btnPrimary} style={fontStyle}>
                  <FaSave className="inline mr-1" size={12} />
                  {infoLoading ? "Saving..." : "Save"}
                </button>
                <button type="button" onClick={cancelEditing} className={btnSecondary} style={fontStyle}>
                  <FaTimes className="inline mr-1" size={12} />
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>

        {/* ─── Card 2: Email ─── */}
        <div className="border-4 border-black p-6 mb-6 bg-white shadow-[6px_6px_0px_#000]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black uppercase flex items-center gap-2" style={fontStyle}>
              <FaEnvelope /> Email
            </h2>
            {editingSection !== "email" && (
              <button onClick={() => startEditing("email")} className={btnEdit}>
                <FaEdit size={12} /> Change
              </button>
            )}
          </div>

          {emailMsg.text && (
            <div
              className={`border-2 border-black p-2 mb-4 font-bold text-center text-sm ${
                emailMsg.type === "success" ? "bg-green-400 text-black" : "bg-red-500 text-white"
              }`}
            >
              {emailMsg.text}
            </div>
          )}

          <div className="mb-4">
            <label className="text-xs font-black uppercase mb-1 block" style={fontStyle}>
              Current Email
            </label>
            <div className="w-full border-2 border-black p-3 font-bold bg-gray-100" style={fontStyle}>
              {profile.email}
            </div>
          </div>

          {editingSection === "email" && (
            <form onSubmit={handleUpdateEmail}>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black uppercase mb-1 block" style={fontStyle}>
                    New Email
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className={inputClass}
                    style={fontStyle}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase mb-1 block" style={fontStyle}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={emailPassword}
                    onChange={(e) => setEmailPassword(e.target.value)}
                    className={inputClass}
                    style={fontStyle}
                    placeholder="Verify your identity"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button type="submit" disabled={emailLoading} className={btnPrimary} style={fontStyle}>
                  <FaSave className="inline mr-1" size={12} />
                  {emailLoading ? "Updating..." : "Update Email"}
                </button>
                <button type="button" onClick={cancelEditing} className={btnSecondary} style={fontStyle}>
                  <FaTimes className="inline mr-1" size={12} />
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ─── Card 3: Password ─── */}
        <div className="border-4 border-black p-6 mb-6 bg-white shadow-[6px_6px_0px_#000]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black uppercase flex items-center gap-2" style={fontStyle}>
              <FaLock /> Password
            </h2>
            {editingSection !== "password" && (
              <button onClick={() => startEditing("password")} className={btnEdit}>
                <FaEdit size={12} /> Change
              </button>
            )}
          </div>

          {passwordMsg.text && (
            <div
              className={`border-2 border-black p-2 mb-4 font-bold text-center text-sm ${
                passwordMsg.type === "success" ? "bg-green-400 text-black" : "bg-red-500 text-white"
              }`}
            >
              {passwordMsg.text}
            </div>
          )}

          {editingSection !== "password" && (
            <p className="text-sm font-bold opacity-60" style={fontStyle}>
              ●●●●●●●●
            </p>
          )}

          {editingSection === "password" && (
            <form onSubmit={handleChangePassword}>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black uppercase mb-1 block" style={fontStyle}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className={inputClass}
                    style={fontStyle}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase mb-1 block" style={fontStyle}>
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={inputClass}
                    style={fontStyle}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase mb-1 block" style={fontStyle}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClass}
                    style={fontStyle}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button type="submit" disabled={passwordLoading} className={btnPrimary} style={fontStyle}>
                  <FaSave className="inline mr-1" size={12} />
                  {passwordLoading ? "Changing..." : "Change Password"}
                </button>
                <button type="button" onClick={cancelEditing} className={btnSecondary} style={fontStyle}>
                  <FaTimes className="inline mr-1" size={12} />
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
