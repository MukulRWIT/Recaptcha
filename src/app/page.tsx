"use client";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
const Firstform = () => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: [],
    message: "",
    "form-name": "contact",
    "g-recaptcha-response": "",
  });
  const handleChange = (e: any) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === "select-multiple") {
      const values = Array.from(selectedOptions, (option: any) => option.value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: values,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  function handleToken(token: any) {
    setFormData((prevData) => ({
      ...prevData,
      ["g-recaptcha-response"]: token,
    }));
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      if (res.status === 200) {
        alert("Submit");
      } else {
        alert("Error");
      }
    } catch (e) {
      alert("Request failed");
    }
  };
  return (
    <div>
      <form name="contact" onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>
            Your Name:
            <input
              type="text"
              name="name"
              className="border-2"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            Your Email:
            <input
              type="email"
              name="email"
              className="border-2"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            Your Role:{" "}
            <select
              name="role"
              multiple
              className="border-2"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="leader">Leader</option>
              <option value="follower">Follower</option>
            </select>
          </label>
        </p>
        <p>
          <label>
            Message:
            <textarea
              name="message"
              className="border-2"
              value={formData.message}
              onChange={handleChange}
            />
          </label>
        </p>
        <ReCAPTCHA sitekey={siteKey || ""} onChange={handleToken} />
        <p>
          <button
            type="submit"
            className="border bg-red-500 hover:bg-red-700 text-white w-[200px] h-[40px]"
          >
            Send
          </button>
        </p>
      </form>
    </div>
  );
};
export default Firstform;
