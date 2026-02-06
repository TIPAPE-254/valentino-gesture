const yesButton = document.querySelector(".heart-btn.yes");
const noButton = document.querySelector(".heart-btn.no");
const heartsLayer = document.querySelector(".hearts");
const teddyImage = document.querySelector(".teddy");

let yesScale = 1;
let noScale = 1;
let noClicks = 0;

const message = "I said YES 💖I will be your valentine .... I LOOOVE YOU";

const getWhatsappLink = () => {
  const params = new URLSearchParams(window.location.search);
  const rawNumber = params.get("to");
  const phone = rawNumber ? rawNumber.replace(/[^0-9]/g, "") : "";
  const text = encodeURIComponent(message);
  if (phone) {
    return `https://wa.me/${phone}?text=${text}`;
  }
  return `https://wa.me/?text=${text}`;
};

const setButtonScale = (button, scale) => {
  button.style.transform = `scale(${scale})`;
};

const spawnHearts = () => {
  for (let i = 0; i < 16; i += 1) {
    const heart = document.createElement("div");
    heart.className = "heart";
    const left = Math.random() * 100;
    const size = 12 + Math.random() * 16;
    const duration = 1.8 + Math.random() * 1.2;

    heart.style.left = `${left}%`;
    heart.style.bottom = "-10px";
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.animationDuration = `${duration}s`;

    heartsLayer.appendChild(heart);

    heart.addEventListener("animationend", () => {
      heart.remove();
    });
  }
};

noButton.addEventListener("click", () => {
  noClicks += 1;
  const step = noClicks;

  yesScale = 1 + step * 0.12;
  noScale = Math.max(0.6, 1 - step * 0.05);

  setButtonScale(yesButton, yesScale);
  setButtonScale(noButton, noScale);

  noButton.classList.remove("wobble");
  void noButton.offsetWidth;
  noButton.classList.add("wobble");
});

yesButton.addEventListener("click", () => {
  if (teddyImage) {
    teddyImage.src = "images/b2.jpeg";
  }
  spawnHearts();
  yesButton.disabled = true;
  noButton.disabled = true;

  setTimeout(() => {
    window.location.href = getWhatsappLink();
  }, 700);
});
