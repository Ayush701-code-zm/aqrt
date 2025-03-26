"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Lock, Mail, User, CheckCircle2 } from "lucide-react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check password match
    if (name === "confirmPassword" || name === "password") {
      setPasswordMatch(formData.password === value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    // Add signup logic here
    console.log("Signup attempted", formData);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Image Section */}
        <div className="hidden md:block bg-indigo-50">
          <motion.img
            src="/api/placeholder/600/800"
            alt="Signup Illustration"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Signup Form Section */}
        <motion.div
          className="p-8 md:p-12 flex flex-col justify-center"
          variants={itemVariants}
        >
          <motion.h1
            className="text-3xl font-bold text-center text-indigo-600 mb-8"
            variants={itemVariants}
          >
            Create Account
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 
                    ${
                      passwordMatch
                        ? "border-gray-300 focus:ring-indigo-500"
                        : "border-red-500 focus:ring-red-500"
                    }`}
                  required
                />
                {!passwordMatch && (
                  <p className="text-red-500 text-sm mt-1">
                    Passwords do not match
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-lg font-semibold"
              >
                Sign Up
              </button>
            </motion.div>
          </form>

          <motion.div
            className="text-center mt-6 text-sm"
            variants={itemVariants}
          >
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Login
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
