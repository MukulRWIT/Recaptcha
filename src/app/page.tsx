"use client";

import React, { createRef, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Home() {
  const [captchaValue, setCaptchaValue] = useState(null);
  const [formCap, setForm] = useState({
    name: "",
    email: "",
    message: "",
    "form-name": "contact",
    "g-captcha-response": "",
  });
  const onChange = (val: any) => {
    setForm((prevData) => ({
      ...prevData,
      ["g-recaptcha-response"]: val,
    }));
  };
  const handleChange = (e: any) => {
    const { name, type, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const res = await fetch("/__form.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formCap as any).toString(),
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
    <main className="flex flex-col gap-10 items-center justify-center h-[100vh]">
      <h1 className="text-2xl ">FORM</h1>
      <form
        className="send_form flex flex-col gap-2 items-center justify-center "
        name="contact"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        {/* <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p> */}
        <p>
          <label>
            Your Name:{" "}
            <input
              className="border-solid border-2 border-black "
              type="text"
              name="name"
              value={formCap.name}
              onChange={handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            Your Email:{" "}
            <input
              className="border-solid border-2 border-black "
              type="email"
              name="email"
              value={formCap.email}
              onChange={handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            Message:{" "}
            <textarea
              className="border-solid border-2 border-black "
              name="message"
              value={formCap.message}
              onChange={handleChange}
            ></textarea>
          </label>
        </p>
        <ReCAPTCHA
          sitekey={(process.env.RECAPTCHA_SITE_KEY! as string) || ""}
          onChange={onChange}
        />
        <p>
          <button className="border-solid border-2 border-black " type="submit">
            Send
          </button>
        </p>
      </form>
    </main>
  );
}
