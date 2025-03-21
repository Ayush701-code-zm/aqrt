"use client";

import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const menuItems = [
  {
    title: "MENU",
    color: "#4F46E5", // Indigo
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/admin",
        color: "#818CF8", // Lighter indigo
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/coupons",
        color: "#6366F1", // Medium indigo
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    color: "#10B981", // Emerald
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        color: "#34D399", // Lighter emerald
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        color: "#6EE7B7", // Very light emerald
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        color: "#F87171", // Red for logout
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  // Track active menu item for hover effects
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Section animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  // Title animation
  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  // Item animation
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Icon animation
  const iconVariants = {
    hidden: { rotate: -10, scale: 0.8 },
    visible: { rotate: 0, scale: 1 },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { type: "spring", stiffness: 500 },
    },
  };

  return (
    <motion.div
      className="mt-4 text-sm  p-4 "
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {menuItems.map((section) => (
        <motion.div
          className="flex flex-col gap-2 mb-6"
          key={section.title}
          variants={sectionVariants}
        >
          <motion.span
            className="hidden lg:block font-medium my-4 pl-2 border-l-4"
            style={{
              color: section.color,
              borderColor: section.color,
            }}
            variants={titleVariants}
          >
            {section.title}
          </motion.span>

          {section.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  onHoverStart={() => setActiveItem(item.label)}
                  onHoverEnd={() => setActiveItem(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-center lg:justify-start gap-4 py-2 md:px-4 rounded-md transition-all duration-300"
                    style={{
                      backgroundColor:
                        activeItem === item.label
                          ? `${item.color}20` // 20 is hex for 12% opacity
                          : "transparent",
                      color: activeItem === item.label ? item.color : "gray",
                    }}
                  >
                    <motion.div
                      variants={iconVariants}
                      whileHover="hover"
                      className="relative"
                    >
                      <div
                        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300"
                        style={{
                          backgroundColor: item.color,
                          opacity: activeItem === item.label ? 0.15 : 0,
                          transform: "scale(1.5)",
                        }}
                      />
                      <Image src={item.icon} alt="" width={20} height={20} />
                    </motion.div>
                    <motion.span
                      className="hidden lg:block font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {item.label}
                    </motion.span>

                    {/* Color indicator dot */}
                    <motion.div
                      className="ml-auto hidden lg:block h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ scale: 0 }}
                      animate={{
                        scale: activeItem === item.label ? 1 : 0,
                        transition: { type: "spring" },
                      }}
                    />
                  </Link>
                </motion.div>
              );
            }
            return null;
          })}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Menu;
