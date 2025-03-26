"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  Camera,
} from "lucide-react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    dateOfBirth: "1990-05-15",
    bio: "Software engineer passionate about creating innovative solutions.",
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Add save logic here
    console.log("Saving profile data:", profileData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Sidebar */}
        <div className="bg-indigo-50 p-8 flex flex-col items-center justify-center">
          <motion.div className="relative mb-6" variants={itemVariants}>
            <div className="w-40 h-40 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
              <img
                src="/api/placeholder/160/160"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <motion.button
                className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Camera size={20} />
              </motion.button>
            </div>
          </motion.div>

          <motion.h2
            className="text-2xl font-bold text-indigo-600 mb-2"
            variants={itemVariants}
          >
            {profileData.firstName} {profileData.lastName}
          </motion.h2>
          <motion.p
            className="text-gray-600 text-center"
            variants={itemVariants}
          >
            Software Engineer
          </motion.p>
        </div>

        {/* Profile Details */}
        <motion.div className="col-span-2 p-8" variants={itemVariants}>
          <div className="flex justify-between items-center mb-6">
            <motion.h1
              className="text-3xl font-bold text-indigo-600"
              variants={itemVariants}
            >
              Profile Details
            </motion.h1>
            <motion.button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                isEditing
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isEditing ? (
                <>
                  <Save size={20} /> Save
                </>
              ) : (
                <>
                  <Edit2 size={20} /> Edit
                </>
              )}
            </motion.button>
          </div>

          <div className="space-y-4">
            {/* First Name */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 items-center"
            >
              <label className="flex items-center gap-2 text-gray-700">
                <User size={20} /> First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <span className="col-span-2 text-gray-800">
                  {profileData.firstName}
                </span>
              )}
            </motion.div>

            {/* Last Name */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 items-center"
            >
              <label className="flex items-center gap-2 text-gray-700">
                <User size={20} /> Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <span className="col-span-2 text-gray-800">
                  {profileData.lastName}
                </span>
              )}
            </motion.div>

            {/* Email */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 items-center"
            >
              <label className="flex items-center gap-2 text-gray-700">
                <Mail size={20} /> Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <span className="col-span-2 text-gray-800">
                  {profileData.email}
                </span>
              )}
            </motion.div>

            {/* Phone */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 items-center"
            >
              <label className="flex items-center gap-2 text-gray-700">
                <Phone size={20} /> Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <span className="col-span-2 text-gray-800">
                  {profileData.phone}
                </span>
              )}
            </motion.div>

            {/* Location */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 items-center"
            >
              <label className="flex items-center gap-2 text-gray-700">
                <MapPin size={20} /> Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <span className="col-span-2 text-gray-800">
                  {profileData.location}
                </span>
              )}
            </motion.div>

            {/* Date of Birth */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 items-center"
            >
              <label className="flex items-center gap-2 text-gray-700">
                <Calendar size={20} /> Birth Date
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={profileData.dateOfBirth}
                  onChange={handleInputChange}
                  className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <span className="col-span-2 text-gray-800">
                  {new Date(profileData.dateOfBirth).toLocaleDateString()}
                </span>
              )}
            </motion.div>

            {/* Bio */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 items-start"
            >
              <label className="flex items-center gap-2 text-gray-700 pt-2">
                <Edit2 size={20} /> Bio
              </label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                />
              ) : (
                <span className="col-span-2 text-gray-800">
                  {profileData.bio}
                </span>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
