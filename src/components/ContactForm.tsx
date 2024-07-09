"use client";
import { useFormik } from "formik";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaValue, setRecaptchaValue] = useState<string>("");
  const sitekey: string = process.env.RECAPTCHA_SITE_KEY || " ";
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const router = useRouter();

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
    "form-name": "contact_as",
    "g-captcha-response": recaptchaValue,
  } as Record<string, string>;

  const formik = useFormik({
    initialValues: initialValues,
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.name) {
        errors.name = "Name is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.phone) {
        errors.phone = "Phone is required";
      } else if (!/^\+?[0-9]{9,15}$/.test(values.phone)) {
        errors.phone = "Invalid phone number";
      }
      if (!values.message) {
        errors.message = "Message is required";
      }
      if (!recaptchaValue) {
        errors.recaptcha = "Please complete the reCAPTCHA";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (recaptchaValue) {
        setIsLoader(true);
        const formCap = { ...values, "g-captcha-response": recaptchaValue };

        try {
          const res = await fetch("/__formContact.html", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formCap as any).toString(),
          });

          if (res.status === 200) {
            alert("Submit");
            resetForm();
            router.push('/thank'); 
          } else {
            alert("Error");
          }
        } catch (e) {
          alert("Request failed");
        } finally {
          setIsLoader(false);
        }
      }
    },
  });

  const onCaptchaChange = (token: string | null) => {
    if (token) {
      setRecaptchaValue(token);
      formik.setFieldValue("g-captcha-response", token);
    }
  };

  return (
    <>
      <section>
        <div className="container mx-auto 2xl:mb-[70px] xl:mb-14 lg:mb-12 md:mb-10 mb-8">
          <form
            name="contact_as"
            className="bg-pink-100 3xl:p-[120px] 2xl:p-24 xl:p-16 lg:p-12 py-10 md:px-8 px-4 rounded-2xl overflow-hidden relative z-0"
            onSubmit={formik.handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact_as" />
            <div className="max-w-[1120px] mx-auto">
              <div className="grid lg:grid-cols-2 lg:gap-7 gap-6">
                <div className="flex flex-col gap-7">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className={`${
                        formik.touched.name && formik.errors.name
                          ? "border-red-500 focus:ring-transparent hover:ring-transparent hover:border-red-500 hover:outline-red-500 hover:outline-[1px]"
                          : ""
                      }`}
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="absolute right-[10px] text-[13px] text-red-500 leading-6">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className={`${
                        formik.touched.email && formik.errors.email
                          ? "border-red-500 focus:ring-transparent hover:ring-transparent hover:border-red-500 hover:outline-red-500 hover:outline-[1px]"
                          : ""
                      }`}
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="absolute right-[10px] text-[13px] text-red-500 leading-6">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className={`${
                        formik.touched.phone && formik.errors.phone
                          ? "border-red-500 focus:ring-transparent hover:ring-transparent hover:border-red-500 hover:outline-red-500 hover:outline-[1px]"
                          : ""
                      }`}
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="absolute right-[10px] text-[13px] text-red-500 leading-6">
                        {formik.errors.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col lg:gap-7 gap-6">
                  <div className="relative">
                    <textarea
                      rows={4}
                      placeholder="Enter your message"
                      name="message"
                      className={`${
                        formik.touched.message && formik.errors.message
                          ? "border-red-500 focus:ring-transparent hover:ring-transparent hover:border-red-500 hover:outline-red-500 hover:outline-[1px]"
                          : ""
                      }`}
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.message && formik.errors.message && (
                      <p className="absolute right-[10px] text-[13px] text-red-500 leading-6">
                        {formik.errors.message}
                      </p>
                    )}
                  </div>
                  <ReCAPTCHA sitekey={sitekey} onChange={onCaptchaChange} ref={recaptchaRef} />
                  {formik.errors.recaptcha && (
                    <p className="text-red-500">{formik.errors.recaptcha}</p>
                  )}
                  <div>
                    <button
                      type="submit"
                      className={isLoader ? "pointer-events-none" : ""}
                      disabled={isLoader}
                    >
                      Submit
                      {isLoader && (
                        <div className="flex justify-center items-center">
                          <div className="w-4 h-4 border-4 border-dashed rounded-full animate-spin border-accent"></div>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
