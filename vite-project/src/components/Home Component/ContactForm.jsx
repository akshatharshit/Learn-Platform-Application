import React, { useRef, useState } from "react";
import { Mail, User, FileText, MessageCircle, Send } from "lucide-react";

const ContactForm = () => {
  const [sent, setSent] = useState(false);
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    formRef.current.reset();
  };

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-base-200 px-2 py-16">
      <div className="absolute left-[-10vw] top-[-60px] w-96 h-72 bg-primary/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute right-[-10vw] bottom-[-60px] w-80 h-72 bg-secondary/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="z-10 max-w-4xl w-full mx-auto">
        <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 flex flex-col md:flex-row overflow-hidden">
          {/* Left: Message/Info */}
          <div className="md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-br from-base-100 to-primary/10">
            <div className="mb-2 flex items-center gap-3 text-primary">
              <Mail className="w-7 h-7" />
              <span className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Let's Talk!
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-base-content leading-tight mb-4">
              Contact Us
            </h2>
            <p className="text-base-content/70 text-[1.08rem] mb-6">
              Our team is ready to answer your questions, hear feedback, or help you join our community. Reach out and we’ll be in touch soon!
            </p>
            <ul className="text-base-content/50 flex flex-col gap-2 text-sm">
              <li className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-primary" />
                support@example.com
              </li>
              <li className="flex gap-2 items-center">
                <User className="w-4 h-4 text-primary" /> Monday-Friday: 9am-6pm IST
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              <a
                href="mailto:support@example.com"
                className="btn btn-sm bg-primary text-primary-content hover:bg-secondary rounded-xl shadow-sm font-semibold"
              >
                <Mail className="w-4 h-4 mr-1" /> Email Us
              </a>
            </div>
          </div>
          
          {/* Right: Form */}
          <div className="md:w-1/2 p-8 md:p-10 bg-base-100 flex items-center">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-5"
            >
              {/* Name */}
              <label className="flex flex-col gap-1">
                <span className="font-semibold flex items-center gap-2 text-base-content">
                  <User className="w-4 h-4 text-primary" /> Name
                </span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  className="input input-md bg-base-200 border-base-300 focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Your name"
                />
              </label>
              {/* Email */}
              <label className="flex flex-col gap-1">
                <span className="font-semibold flex items-center gap-2 text-base-content">
                  <Mail className="w-4 h-4 text-primary" /> Email
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="input input-md bg-base-200 border-base-300 focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="you@email.com"
                />
              </label>
              {/* Subject */}
              <label className="flex flex-col gap-1">
                <span className="font-semibold flex items-center gap-2 text-base-content">
                  <FileText className="w-4 h-4 text-primary" /> Subject
                </span>
                <input
                  type="text"
                  name="subject"
                  required
                  className="input input-md bg-base-200 border-base-300 focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Subject"
                />
              </label>
              {/* Message */}
              <label className="flex flex-col gap-1">
                <span className="font-semibold flex items-center gap-2 text-base-content">
                  <MessageCircle className="w-4 h-4 text-primary" /> Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Type your message..."
                  className="textarea textarea-md bg-base-200 border-base-300 focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
              </label>
              {/* Button */}
              <button
                type="submit"
                className="mt-2 btn bg-gradient-to-r from-primary to-secondary text-white font-bold px-7 py-2 flex items-center gap-3 rounded-xl shadow hover:shadow-xl hover:scale-[1.04] transition-all text-base"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
              {sent && (
                <div className="alert alert-success shadow flex items-center gap-2 justify-center mt-2 transition-all">
                  <Mail className="w-5 h-5" />
                  Your message has been sent!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
