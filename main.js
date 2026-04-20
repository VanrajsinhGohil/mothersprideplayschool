// Constants
const WHATSAPP_NUMBER = "916352636809"; // User's requested number

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = menuToggle.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });

    // Close menu when link is clicked
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      });
    });
  }

  // Scroll Reveal Animations
  const reveals = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    let windowHeight = window.innerHeight;
    let revealPoint = 100;

    reveals.forEach(reveal => {
      let revealTop = reveal.getBoundingClientRect().top;
      if (revealTop < windowHeight - revealPoint) {
        reveal.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger on load

  // Active Link Highlighting
  const activePage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === activePage || (activePage === "" && link.getAttribute("href") === "index.html")) {
      link.classList.add("active");
    }
  });

  // WhatsApp Floating Chat Functionality
  const waBtn = document.getElementById("wa-trigger-btn");
  const waBox = document.getElementById("wa-chat-box");
  const closeWa = document.getElementById("close-wa");
  const waInput = document.getElementById("wa-message-input");
  const waSend = document.getElementById("wa-send-btn");

  if (waBtn && waBox) {
    waBtn.addEventListener("click", () => {
      waBox.classList.toggle("open");
    });

    closeWa.addEventListener("click", () => {
      waBox.classList.remove("open");
    });

    const sendWhatsAppMsg = () => {
      const msg = waInput.value.trim();
      if (msg) {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
        waInput.value = '';
        waBox.classList.remove("open");
      }
    };

    waSend.addEventListener("click", sendWhatsAppMsg);
    waInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendWhatsAppMsg();
      }
    });
  }

  // Developer Tools Protection
  document.addEventListener('keydown', function (e) {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) ||
      (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
    ) {
      e.preventDefault();
      window.location.href = '404.html';
    }
  });

  // Basic right-click prevention
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    // Optional: show a styled alert or just ignore
  });
});
