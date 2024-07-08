"use client";
export default function Home() {
  const handleSubmit = (event: any) => {
    event.preventDefault();

    const myForm = event.target;
    const formData = new FormData(myForm);

    fetch("/__form.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => console.log("Form successfully submitted"))
      .catch((error) => alert(error));
  };

  return (
    <main className="flex flex-col gap-10 items-center justify-center h-[100vh]">
      <h1 className="text-2xl ">FORM</h1>
      <form
        className="send_form flex flex-col gap-2 items-center justify-center "
        name="contact"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
        <p>
          <label>
            Your Name:{" "}
            <input
              className="border-solid border-2 border-black "
              type="text"
              name="name"
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
            />
          </label>
        </p>
        <p>
          <label>
            Message:{" "}
            <textarea
              className="border-solid border-2 border-black "
              name="message"
            ></textarea>
          </label>
        </p>
        <div data-netlify-recaptcha="true"></div>
        <p>
          <button className="border-solid border-2 border-black " type="submit">
            Send
          </button>
        </p>
      </form>
    </main>
  );
}
