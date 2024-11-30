document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
  });
});

document.querySelector("#contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const subject = document.querySelector("#subject").value.trim();
  const message = document.querySelector("#message").value.trim();

  const statusMessage = document.querySelector("#statusMessage");

  if (!name || !email || !subject || !message) {
    statusMessage.style.color = "red";
    statusMessage.textContent = "All fields are required.";
    return;
  }

  statusMessage.style.color = "blue";
  statusMessage.textContent = "Sending your message...";

  try {
    const response = await fetch(
      "https://portfolio-backend1-xjpu.onrender.com/api/contact", // Updated URL
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      }
    );

    if (response.ok) {
      statusMessage.style.color = "green";
      statusMessage.textContent = "Your message has been sent successfully!";
      document.querySelector("#contactForm").reset();
    } else {
      const { error } = await response.json();
      statusMessage.style.color = "red";
      statusMessage.textContent = `Failed to send message: ${
        error || "Unknown error"
      }`;
    }
  } catch (error) {
    console.error("Error:", error);
    statusMessage.style.color = "red";
    statusMessage.textContent =
      "An error occurred while sending the message. Please try again.";
  }
});
