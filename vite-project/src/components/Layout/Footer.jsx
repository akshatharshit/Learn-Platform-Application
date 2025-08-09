import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Mail,
  ArrowUp
} from "lucide-react";

const navLinks = [
  { name: "Courses", to: "/courses" },
  { name: "Tests", to: "/tests" },
  { name: "Books", to: "/books" },
  { name: "News", to: "/news" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" }
];

const infoLinks = [
  { name: "Pricing", to: "/pricing" },
  { name: "FAQ", to: "/faq" },
  { name: "Terms", to: "/terms" },
  { name: "Privacy", to: "/privacy" },
  { name: "Support", to: "/contact" }
];

const socials = [
  { icon: Facebook, url: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, url: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, url: "https://linkedin.com", label: "LinkedIn" },
  { icon: Github, url: "https://github.com", label: "GitHub" },
  { icon: Mail, url: "mailto:support@example.com", label: "Support Email" }
];

const Footer = () => {
  const emailRef = useRef();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const subscribeNewsletter = (e) => {
    e.preventDefault();
    if (emailRef.current) emailRef.current.value = "";
    alert("Thank you for subscribing!");
  };

  return (
    <footer className="relative bg-base-200 border-t border-base-300 z-[5] overflow-hidden py-0">
      {/* Decorative blurred shapes */}
      <div className="absolute inset-0 opacity-20 z-0 pointer-events-none">
        <div className="absolute w-[30rem] h-[22rem] bg-primary left-[-15%] top-[-22%] rounded-b-full blur-3xl" />
        <div className="absolute w-[20rem] h-[18rem] bg-secondary right-[-12%] bottom-[-12%] rounded-t-full blur-3xl" />
      </div>

      {/* "Back to Top" Button
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 text-white p-3 rounded-xl bg-gradient-to-tr from-primary to-secondary shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/10"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button> */}

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 grid grid-cols-1 md:grid-cols-5 gap-10 relative z-10">
        {/* Brand/About & Socials */}
        <div className="md:col-span-2 flex flex-col justify-between min-h-[220px]">
          <Link to="/" className="flex items-center gap-3 mb-3 group">
            <div className="w-12 h-12 bg-gradient-to-tr from-primary to-secondary text-primary-content rounded-2xl flex items-center justify-center text-2xl font-black shadow group-hover:scale-105 transition">
              E
            </div>
            <span className="text-2xl font-extrabold text-base-content tracking-tight group-hover:text-primary duration-150">
              Learn
            </span>
          </Link>
          <p className="text-base-content/70 text-sm mb-3 leading-snug max-w-sm">
            Empowering learners and educators with AI, interactive resources, and a seamless experience.
          </p>
          <div className="flex gap-3 mt-2">
            {socials.map(({ icon: Icon, url, label }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-base-100 border border-base-300 hover:bg-primary hover:text-primary-content hover:scale-110 transition-all shadow-sm"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h6 className="font-extrabold mb-3 text-base-content/80 tracking-widest uppercase text-[1rem]">Explore</h6>
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ name, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="block rounded px-2 py-1 text-base-content/80 hover:text-primary hover:bg-primary/10 focus:bg-primary/20 focus:outline-none text-sm font-semibold transition"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support/Info */}
        <div>
          <h6 className="font-extrabold mb-3 text-base-content/80 tracking-widest uppercase text-[1rem]">Support</h6>
          <ul className="flex flex-col gap-1">
            {infoLinks.map(({ name, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="block rounded px-2 py-1 text-base-content/80 hover:text-primary hover:bg-primary/10 focus:bg-primary/20 focus:outline-none text-sm font-semibold transition"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter / Call To Action */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <h6 className="font-extrabold mb-2 text-base-content/80 tracking-widest uppercase text-[1rem]">
            Newsletter
          </h6>
          <p className="text-sm text-base-content/60 mb-1">Get monthly updates and resources for free.</p>
          <form onSubmit={subscribeNewsletter} className="flex flex-col sm:flex-row gap-2">
            <input
              ref={emailRef}
              type="email"
              className="input input-sm bg-base-100 border base-300 focus:border-primary focus:ring-1 focus:ring-primary w-full"
              placeholder="Email address"
              required
              aria-label="Email address"
            />
            <button
              type="submit"
              className="btn btn-sm bg-gradient-to-tr from-primary to-secondary text-primary-content font-bold hover:from-secondary hover:to-primary duration-200 px-4 whitespace-nowrap shadow"
            >
              Subscribe
            </button>
          </form>
          <div className="text-xs text-base-content/40 mt-1">We respect your privacy. No spam ever.</div>
        </div>
      </div>

      {/* Separator */}
      <div className="h-px bg-base-300 opacity-40 w-full mb-4" />

      {/* Copyright & Extra */}
      <div className="relative z-10 text-center text-sm text-base-content/60 pb-5">
        <div>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-primary font-bold">EduPlatform</span>.
          All rights reserved.
          <span className="mx-2 text-base-content/30">|</span>
          <span>
            Built with <span className="text-red-400 font-bold">♥</span> for learners &amp; teachers.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
