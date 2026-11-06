const signupDialog = document.querySelector(".signup-dialog");
const signupForm = document.querySelector(".signup-form");
const formMessage = document.querySelector(".form-message");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

document.querySelectorAll("[data-open-signup]").forEach((button) => {
  button.addEventListener("click", () => {
    formMessage.textContent = "";
    formMessage.classList.remove("is-error");
    signupDialog.showModal();
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => signupDialog.close());
signupDialog.addEventListener("click", (event) => {
  if (event.target === signupDialog) signupDialog.close();
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!signupForm.reportValidity()) return;

  const name = new FormData(signupForm).get("name").trim();
  formMessage.textContent = `You're on the list, ${name}! We'll be in touch soon.`;
  formMessage.classList.remove("is-error");
  signupForm.reset();
});

document.querySelectorAll(".filter-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const category = chip.dataset.filter;
    let visibleCount = 0;

    document.querySelectorAll(".filter-chip").forEach((item) => {
      const active = item === chip;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    document.querySelectorAll(".sport-card").forEach((card) => {
      const visible = category === "all" || card.dataset.category === category;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    document.querySelector(".filter-empty").hidden = visibleCount > 0;
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  primaryNav.classList.toggle("is-open", !isOpen);
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});
