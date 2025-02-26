"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button, Modal, message } from "antd";
import { Menu, X, Twitter, Linkedin, Instagram } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Open the modal for login or signup
  const showAuthModal = (type: "login" | "signup") => {
    setAuthType(type);
    setIsAuthModalOpen(true);
    // Reset form fields when opening modal
    setEmail("");
    setPassword("");
    setUsername("");
  };

  // Close the modal
  const handleAuthModalCancel = () => {
    setIsAuthModalOpen(false);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authType === "login") {
        // Login request
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          message.success("Login successful!");
          setIsAuthModalOpen(false);

          // Store the token in local storage
          localStorage.setItem("token", data.token);

          // Redirect to dashboard
          router.push("/dashboard");
        } else {
          message.error(
            data.error || "Login failed. Please check your credentials."
          );
        }
      } else {
        // Signup request
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            username, // Include username if needed
          }),
        });

        const data = await response.json();

        if (response.ok) {
          message.success("Account created successfully! Please log in.");
          setAuthType("login"); // Switch to login form
        } else {
          message.error(data.error || "Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      message.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground p-1 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 8V4H8" />
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M2 14h2" />
                <path d="M20 14h2" />
                <path d="M15 13v2" />
                <path d="M9 13v2" />
              </svg>
            </div>
            <span className="font-bold text-xl">BotBuilder</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {/* Social Media Icons */}
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primary transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primary transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primary transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </Link>

          {/* Auth Buttons */}
          <Button onClick={() => showAuthModal("login")}>Log In</Button>
          <Button onClick={() => showAuthModal("signup")}>Sign Up</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t py-4">
          <nav className="container flex flex-col space-y-4">
            <Link
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button className="w-full" onClick={() => showAuthModal("login")}>
                Log In
              </Button>
              <Button
                className="w-full"
                onClick={() => showAuthModal("signup")}
              >
                Sign Up
              </Button>
            </div>

            {/* Social Media Icons (Mobile) */}
            <div className="flex items-center gap-4 pt-4">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Auth Modal */}
      <Modal
        title={authType === "login" ? "Log In" : "Sign Up"}
        open={isAuthModalOpen}
        onCancel={handleAuthModalCancel}
        footer={null} // Remove default footer buttons
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Sign Up Additional Field */}
            {authType === "signup" && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full p-2 border rounded-md"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            )}

            {/* Submit Button */}
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              {authType === "login" ? "Log In" : "Sign Up"}
            </Button>

            {/* Toggle between login and signup */}
            <div className="text-center mt-4">
              {authType === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setAuthType("signup");
                    }}
                    className="text-primary hover:underline"
                  >
                    Sign up
                  </a>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setAuthType("login");
                    }}
                    className="text-primary hover:underline"
                  >
                    Log in
                  </a>
                </p>
              )}
            </div>
          </div>
        </form>
      </Modal>
    </header>
  );
}
