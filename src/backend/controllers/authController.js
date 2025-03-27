// backend/controllers/authController.js
const { supabase } = require("../config/supabaseClient");
const bcrypt = require("bcryptjs");

const AuthController = {
  signup: async (req, res) => {
    try {
      const { email, password, name } = req.body;

      // Hash password before storing
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user in Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password: hashedPassword,
        options: {
          data: {
            name: name,
          },
        },
      });

      // Handle potential errors
      if (error) {
        return res.status(400).json({
          message: "Signup failed",
          error: error.message,
        });
      }

      // Return user information
      res.status(201).json({
        message: "User created successfully",
        user: {
          id: data.user?.id,
          email: data.user?.email,
          name: data.user?.user_metadata?.name,
        },
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Attempt to sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Handle potential errors
      if (error) {
        return res.status(401).json({
          message: "Login failed",
          error: error.message,
        });
      }

      // Return user information
      res.status(200).json({
        message: "Login successful",
        user: {
          id: data.user?.id,
          email: data.user?.email,
          name: data.user?.user_metadata?.name,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  logout: async (req, res) => {
    try {
      // Sign out using Supabase
      const { error } = await supabase.auth.signOut();

      // Handle potential errors
      if (error) {
        return res.status(400).json({
          message: "Logout failed",
          error: error.message,
        });
      }

      // Successful logout
      res.status(200).json({
        message: "Logout successful",
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email } = req.body;

      // Trigger password reset in Supabase
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        // Optional redirect to your password reset page
        redirectTo: "https://yourapp.com/reset-password",
      });

      if (error) {
        return res.status(400).json({
          message: "Password reset failed",
          error: error.message,
        });
      }

      res.status(200).json({
        message: "Password reset email sent",
      });
    } catch (error) {
      console.error("Password reset error:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Optional: Get current user profile
  getCurrentUser: async (req, res) => {
    try {
      // Assuming authMiddleware has already verified the user
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          message: "No user authenticated",
        });
      }

      res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name,
        },
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

module.exports = AuthController;
