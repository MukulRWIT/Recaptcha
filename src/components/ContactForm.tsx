"use client";
import { useFormik } from "formik";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
  const recaptcha = useRef<ReCAPTCHA>(null);
  const [recaptchaValue, setRecaptchaValue] = useState<string>("");
  const sitekey: string = process.env.RECAPTCHA_SITE_KEY || " ";
  const [isLoader, SetisLoader] = useState<boolean>(false);
  const [isfocus, setisfocus] = useState<boolean>(false);
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
    validate: (values: Record<string, string>) => {
      const errors: Record<string, string> = {};

      //   if (
      //     field.Type === "text" &&
      //     !/^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/.test(
      //       values[field.Name].trim()
      //     )
      //   ) {
      //     errors[field.Name] = "Name must contain only alphabets";
      //   } else if (
      //     field.Type === "telephone" &&
      //     !/^\+?[0-9]{9,15}$/.test(values["field.Name"])
      //   ) {
      //     errors[field.Name] = "Invalid phone number";
      //   } else if (
      //     field.Type === "email" &&
      //     !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values[field.Name].trim())
      //   ) {
      //     errors[field.Name] = "Invalid email address";
      //   }

      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (recaptchaValue) {
        const formCap = { ...values, "g-captcha-response": recaptchaValue };

          const res = await fetch("/__formContact.html", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formCap as any).toString(),
          });
          if (res.status === 200) {
            alert("Submit");
          } else {
            alert("Error");
          }
        //   if (!recaptchaValue) {
        //     alert("Select captcha");
        //     return;
        //   }
        //   SetisLoader(true);
        //   try {
        //     // values['form-name'] = 'contact';
        //     // values['g-recaptcha-response'] = recaptchaValue;
        //     // values['data-sitekey'] = sitekey;
        //     const formData = { ...values, "g-captcha-response": recaptchaValue };
        //     console.log(formData);
        //     const response = await fetch("/__formContact.html", {
        //       method: "POST",
        //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
        //       body: new URLSearchParams(formData).toString(),
        //       // body: encode({
        //       //   'form-name': 'contact',
        //       //   ...values,
        //       //   'g-recaptcha-response': recaptchaValue,
        //       // }),
        //     });

        //     if (!response.ok) {
        //       throw new Error("Network response was not ok");
        //     }
        //     setSubmitting(false);
        //     // router.push('/thank-you');
        //     alert("submit");
        //     resetForm();
        //   } catch (error: any) {
        //     alert(error);
        //     setSubmitting(false);
        //     console.log("Error submitting form: " + error.message);
        //   } finally {
        //     SetisLoader(false);
        //   }
      }
    },
  });

  const encode = (data: any) => {
    return Object.keys(data)
    .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
    };
    
    const onCaptchaChange = (token: string | null) => {
    if (token) {
      setRecaptchaValue(token);
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
            <input type="hidden" name="form-name" value="contact" />
            {/* <label hidden htmlFor="bot-field">
              Don&apos;t fill this out if you&apos;re human:
              <input name="bot-field" />
            </label> */}
            <div className="max-w-[1120px] mx-auto">
              <div className="grid lg:grid-cols-2 lg:gap-7 gap-6">
                <div className="flex flex-col gap-7">
                  <div className="relative">
                    <input
                      type={"text"}
                      placeholder={"enter text"}
                      className={`${
                        formik.touched["name"] && formik.errors["name"]
                          ? "border-red-500 focus:ring-transparent hover:ring-transparent hover:border-red-500 hover:outline-red-500 hover:outline-[1px]"
                          : ""
                      }`}
                      name={"name"}
                      value={formik.values["name"]}
                      onChange={formik.handleChange}
                      onBlur={(e: any) => formik.handleBlur(e)}
                    />
                    {formik.touched["name"] && formik.errors["name"] && (
                      <p className="absolute right-[10px] text-[13px] text-red-500  leading-6">
                        {formik.errors["name"]}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={"email"}
                      placeholder={"enter email"}
                      className={`${
                        formik.touched["email"] && formik.errors["email"]
                          ? "border-red-500 focus:ring-transparent hover:ring-transparent hover:border-red-500 hover:outline-red-500 hover:outline-[1px]"
                          : ""
                      }`}
                      name={"email"}
                      value={formik.values["email"]}
                      onChange={formik.handleChange}
                      onBlur={(e: any) => formik.handleBlur(e)}
                    />
                    {formik.touched["email"] && formik.errors["email"] && (
                      <p className="absolute right-[10px] text-[13px] text-red-500  leading-6">
                        {formik.errors["email"]}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="tel"
                      className={`${
                        formik.touched["phone"] && formik.errors["phone"]
                          ? `border-red-500 ${
                              isfocus ? "ring-transparent" : ""
                            } hover:ring-transparent  hover:border-red-500 hover:outline-red-500 hover:outline-[1px] ${
                              isfocus ? " hover:border-2" : ""
                            }`
                          : ""
                      }`}
                      name={"phone"}
                      placeholder="enter number"
                      value={formik.values["phone"]}
                      onChange={(e) =>
                        formik.setFieldValue("phone", e.target.value)
                      }
                      onBlur={(e) => formik.handleBlur(e)}
                    />
                    {formik.touched["phone"] && formik.errors["phone"] && (
                      <p className="absolute right-[10px] text-[13px] text-red-500  leading-6">
                        {formik.errors["phone"]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col lg:gap-7 gap-6">
                  <div className="relative">
                    <textarea
                      rows={4}
                      placeholder={"enter textarea"}
                      name={"message"}
                      className={`${
                        formik.touched["message"] && formik.errors["message"]
                          ? "border-red-500 focus:ring-transparent hover:ring-transparent hover:border-red-500 hover:outline-red-500 hover:outline-[1px]"
                          : ""
                      }`}
                      value={formik.values["message"]}
                      onChange={formik.handleChange}
                      onBlur={(e) => formik.handleBlur(e)}
                    />
                    {formik.touched["message"] && formik.errors["message"] && (
                      <p className="absolute right-[10px] text-[13px] text-red-500  leading-6">
                        {formik.errors["message"]}
                      </p>
                    )}
                  </div>

                  <ReCAPTCHA sitekey={sitekey} onChange={onCaptchaChange} />
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
