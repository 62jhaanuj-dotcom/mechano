import React, { useState } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";

const Contact = () => {

  const [isSent, setIsSent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await addDoc(collection(db, "contactMessages"), {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        createdAt: new Date(),
      });

      setIsSent(true);

      setTimeout(() => {
        setIsSent(false);
      }, 3000);

      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });

    } catch (error) {
      console.log("Error saving message:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white min-h-screen">

      {/* Page Header */}
      <div className="mb-16 text-center md:text-left">

        <h1 className="text-5xl font-black text-black tracking-tight uppercase mb-4 border-b-[6px] border-red-600 pb-3 inline-block">
          Get In Touch
        </h1>

        <p className="text-black/60 font-bold uppercase tracking-[0.2em] mt-2">
          We are here to help you
        </p>

      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-stretch">

        {/* Contact Info */}
        <div className="w-full lg:w-1/3 bg-black text-gray-200 rounded-[3rem] p-10 shadow-2xl border-t-8 border-red-600 flex flex-col justify-between">

          <div className="space-y-12">

            <div>
              <h3 className="text-2xl font-black text-white uppercase mb-2">
                Contact Info
              </h3>
              <p className="text-gray-400 text-sm">
                Reach out to our support team directly.
              </p>
            </div>

            <div className="space-y-8">

              <div>
                <p className="text-xs text-gray-500 font-bold uppercase mb-2">
                  Our Garage
                </p>
                <p className="text-lg font-bold text-white">
                  123 Auto Hub Street
                </p>
                <p className="text-sm text-gray-400">
                  Downtown District
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 font-bold uppercase mb-2">
                  Call Us
                </p>
                <p className="text-xl font-bold text-red-600">
                  +91 9876543210
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 font-bold uppercase mb-2">
                  Email Support
                </p>
                <p className="text-lg font-bold text-white">
                  support@mechano.com
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-2/3 bg-white border border-black/10 rounded-[2.5rem] p-10 lg:p-14 shadow-xl">

          <h3 className="text-3xl font-black text-black mb-10">
            Send us a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-7">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold text-black">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-5 py-3 rounded-xl border border-black/20"
                  required
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold text-black">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full px-5 py-3 rounded-xl border border-black/20"
                />
              </div>

            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">

              <label className="text-lg font-semibold text-black">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-5 py-3 rounded-xl border border-black/20"
                required
              />

            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2">

              <label className="text-lg font-semibold text-black">
                Subject
              </label>

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl border border-black/20"
              >
                <option>General Inquiry</option>
                <option>Booking Issue</option>
                <option>Service Feedback</option>
                <option>Partnership</option>
              </select>

            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">

              <label className="text-lg font-semibold text-black">
                Your Message
              </label>

              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="w-full px-5 py-3 rounded-xl border border-black/20 resize-none"
                required
              ></textarea>

            </div>

            {/* Button */}
            <button
              type="submit"
              className={`w-full py-4 rounded-xl font-bold text-sm transition ${
                isSent
                  ? "bg-green-600 text-white"
                  : "bg-black text-white hover:bg-black/90"
              }`}
            >
              {isSent ? "Message Sent Successfully ✓" : "Send Message"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Contact;