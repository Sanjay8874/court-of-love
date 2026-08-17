const APP_CONFIG = {
  boyfriendName: "Your Boyfriend",
  girlfriendName: "My Love"
};

const EMAILJS_CONFIG = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID"
};

const state = {
  step: 0,
  noAttempts: 0,
  dinnerNoAttempts: 0
};

const screens = [
  {
    id: "landing",
    progress: 0,
    caseLabel: "Case #143",
    render: () => `
      <p class="eyebrow">⚖️ THE COURT OF LOVE</p>
      <h1>The Court<br>of Love</h1>
      <p>"The Case of the Stupid Boyfriend"</p>
      <p><strong>THE DEFENDANT:</strong><br><span data-boyfriend>${APP_CONFIG.boyfriendName} ❤</span></p>
      <ul class="charge-list" aria-label="Charges">
        <li><span>😤</span><span>Making you angry</span></li>
        <li><span>🥺</span><span>Hurting your feelings</span></li>
        <li><span>🤦‍♂️</span><span>Being an idiot sometimes</span></li>
        <li><span>❤</span><span>Loving you way too much</span></li>
      </ul>
      <p>The defendant would like to plead...</p>
      <h2 class="hero-plea">🙏 Please Forgive Me</h2>
      <div class="actions">
        <button class="btn" data-next>Enter the Court ❤</button>
      </div>
    `
  },
  {
    id: "forgive",
    progress: 14,
    caseLabel: "Hearing 1 of 7",
    title: "YOUR HONOUR, I HAVE ONE QUESTION... 🥺",
    question: "Will you forgive this idiot?",
    yes: "YES ❤",
    no: "NO 😤",
    noMode: "runaway",
    noMessages: [
      "Objection! The NO button has escaped! 😂",
      "Nice try 😏",
      "The court refuses to accept that answer.",
      "Are you really sure? 🥺❤"
    ]
  },
  {
    id: "chance",
    progress: 28,
    caseLabel: "Hearing 2 of 7",
    title: "A VERY SERIOUS PROMISE",
    question: "If I promise to be a little less stupid...\n\nWill you give me another chance? 🥺❤",
    yes: "YES ❤",
    no: "NO 😤",
    noMode: "soft-runaway",
    noMessages: ["The court suggests reconsidering. ❤", "One tiny chance? 🥺", "That answer needs more evidence."]
  },
  {
    id: "miss",
    progress: 42,
    caseLabel: "Hearing 3 of 7",
    title: "BE HONEST...",
    question: "Do you miss me even a little bit? 👀❤",
    yes: "YES, A LOT 🥰",
    alt: "Maybe... 😏",
    altMessage: "Maybe has been recorded as:\nYES, BUT SHE'S TOO SHY TO ADMIT IT. 😌❤"
  },
  {
    id: "phone",
    progress: 56,
    caseLabel: "Hearing 4 of 7",
    title: "EXHIBIT A: THE PHONE",
    question: "Do you still get a little happy when you see my name pop up on your phone? 📱❤",
    yes: "YES 🥰",
    alt: "NO 😤",
    altMessage: "ERROR 404:\nI don't believe you. 😂❤"
  },
  {
    id: "hug",
    progress: 70,
    caseLabel: "Hearing 5 of 7",
    title: "THE HUG TEST",
    question: "If I were standing in front of you right now...\n\nWould you give me a hug? 🥺",
    yes: "BIG HUG 🤗",
    alt: "NOPE 😤",
    altMessage: "ERROR 404:\n'No hug' could not be processed.\nPlease try again. 😂❤"
  },
  {
    id: "special",
    progress: 82,
    caseLabel: "Hearing 6 of 7",
    title: "ONE THING I NEED YOU TO KNOW",
    question: "Do you know how special you are to me? ❤",
    yes: "YES 🥰",
    alt: "TELL ME... 👀",
    altMessage: "You're not just someone I love.\n\nYou're someone whose smile can completely change my day.\n\nAnd honestly...\n\nI don't want to lose that. ❤"
  },
  {
    id: "choose-us",
    progress: 92,
    caseLabel: "Hearing 7 of 7",
    title: "ONE LAST HEART QUESTION",
    question: "If we could forget about this silly fight for one moment...\n\nWould you choose us again? ❤",
    yes: "YES ❤",
    alt: "I NEED TO THINK 😤",
    altMessage: "That's okay.\n\nI'll give you a little time...\n\nBut I'm still hoping for a YES. 🥺❤"
  },
  {
    id: "verdict",
    progress: 100,
    caseLabel: "Final Verdict",
    render: () => `
      <p class="eyebrow">🔨 COURT IS NOW IN SESSION</p>
      <div class="romantic-block">
        <p>After carefully reviewing the evidence...</p>
        <p>The Court has determined that the defendant is...</p>
      </div>
      <h2 class="verdict">Guilty of Loving You Too Much. ❤</h2>
      <div class="romantic-block">
        <p>However...</p>
        <p>The defendant has been granted ONE SPECIAL REQUEST.</p>
      </div>
      <div class="actions">
        <button class="btn" data-next>Hear the Request ❤</button>
      </div>
    `
  },
  {
    id: "dinner",
    progress: 100,
    caseLabel: "Final Question",
    render: () => `
      <p class="eyebrow">🍽️ FINAL QUESTION ❤</p>
      <h2>Will you have dinner with me?</h2>
      <div class="romantic-block">
        <p>Just you ❤<br>Just me ❤<br>And hopefully...<br>no fighting this time. 😌</p>
      </div>
      <p class="message" id="message"></p>
      <div class="actions">
        <button class="btn" data-dinner-yes>YES ❤</button>
        <button class="btn secondary runaway" data-dinner-no>NO 😭</button>
      </div>
    `
  },
  {
    id: "success",
    progress: 100,
    caseLabel: "Court Adjourned",
    render: () => `
      <p class="eyebrow">🎉 COURT ADJOURNED! 🎉</p>
      <h2 class="verdict">❤ She Said Yes! ❤</h2>
      <div class="romantic-block">
        <p>The defendant has officially been forgiven.</p>
        <p>Dinner date unlocked 🍽️🥰</p>
        <p>And one more thing...</p>
        <p><strong>I LOVE YOU. ❤</strong></p>
        <p class="small-note">Now you can't escape me at dinner. 😌❤</p>
      </div>
    `
  }
];

const screenEl = document.querySelector("#screen");
const progressFill = document.querySelector("#progress-fill");
const caseLabel = document.querySelector("#case-label");

function isEmailConfigured() {
  return Object.values(EMAILJS_CONFIG).every((value) => value && !value.startsWith("YOUR_"));
}

function render() {
  const current = screens[state.step];
  state.noAttempts = 0;
  caseLabel.textContent = current.caseLabel;
  progressFill.style.width = `${current.progress}%`;
  screenEl.classList.remove("is-active");
  void screenEl.offsetWidth;
  screenEl.innerHTML = current.render ? current.render() : renderQuestion(current);
  screenEl.classList.add("is-active");
  bindCurrentScreen(current);
}

function renderQuestion(current) {
  return `
    <p class="eyebrow">⚖️ THE COURT OF LOVE</p>
    <h2 class="question-title">${current.title}</h2>
    <p>${formatLines(current.question)}</p>
    <p class="message" id="message"></p>
    <div class="actions">
      <button class="btn" data-next>${current.yes}</button>
      ${
        current.no
          ? `<button class="btn secondary runaway" data-no>${current.no}</button>`
          : `<button class="btn secondary" data-alt>${current.alt}</button>`
      }
    </div>
  `;
}

function formatLines(text) {
  return text.split("\n").map((line) => line.trim()).join("<br>");
}

function bindCurrentScreen(current) {
  screenEl.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", nextScreen);
  });

  const noButton = screenEl.querySelector("[data-no]");
  if (noButton) {
    noButton.addEventListener("pointerenter", () => moveNoButton(noButton, current));
    noButton.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      moveNoButton(noButton, current);
    });
    noButton.addEventListener("focus", () => showMessage("You can still choose YES with the keyboard. ❤"));
  }

  const altButton = screenEl.querySelector("[data-alt]");
  if (altButton) {
    altButton.addEventListener("click", () => {
      showMessage(current.altMessage);
      altButton.textContent = "CONTINUE ❤";
      altButton.classList.remove("secondary");
      altButton.removeAttribute("data-alt");
      altButton.addEventListener("click", nextScreen, { once: true });
    }, { once: true });
  }

  const dinnerYes = screenEl.querySelector("[data-dinner-yes]");
  if (dinnerYes) {
    dinnerYes.addEventListener("click", acceptDinner);
  }

  const dinnerNo = screenEl.querySelector("[data-dinner-no]");
  if (dinnerNo) {
    dinnerNo.addEventListener("pointerenter", () => moveDinnerNo(dinnerNo));
    dinnerNo.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      moveDinnerNo(dinnerNo);
    });
    dinnerNo.addEventListener("focus", () => showMessage("The court recommends the YES button, but no pressure. ❤"));
  }
}

function nextScreen() {
  state.step = Math.min(state.step + 1, screens.length - 1);
  render();
}

function showMessage(text) {
  const message = screenEl.querySelector("#message");
  if (!message) return;
  message.innerHTML = formatLines(text);
  message.classList.add("has-text");
}

function moveNoButton(button, current) {
  state.noAttempts += 1;
  const messages = current.noMessages || ["Nice try 😏"];
  showMessage(messages[(state.noAttempts - 1) % messages.length]);
  moveButtonSafely(button, current.noMode === "soft-runaway" ? 95 : 145);
}

function moveDinnerNo(button) {
  state.dinnerNoAttempts += 1;
  const messages = [
    "Objection! Dinner is clearly the correct verdict. 😌❤",
    "The NO button is considering its life choices.",
    "Just one dinner? Pretty please? 🥺",
    "Okay, okay, the court will behave."
  ];
  showMessage(messages[(state.dinnerNoAttempts - 1) % messages.length]);
  moveButtonSafely(button, state.dinnerNoAttempts > 5 ? 65 : 140);
}

function moveButtonSafely(button, distance) {
  const rect = button.getBoundingClientRect();
  const padding = 12;
  const maxX = Math.max(padding, window.innerWidth - rect.width - padding);
  const maxY = Math.max(padding, window.innerHeight - rect.height - padding);
  const currentX = rect.left;
  const currentY = rect.top;
  const angle = Math.random() * Math.PI * 2;
  const targetX = clamp(currentX + Math.cos(angle) * distance, padding, maxX);
  const targetY = clamp(currentY + Math.sin(angle) * distance, padding, maxY);

  button.style.position = "fixed";
  button.style.left = `${targetX}px`;
  button.style.top = `${targetY}px`;
  button.style.zIndex = "5";
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

async function acceptDinner() {
  nextScreen();
  fireConfetti();
  await sendDinnerEmail();
}

async function sendDinnerEmail() {
  const params = {
    subject: "❤ SHE SAID YES TO DINNER!",
    message: `Good news! ❤\n\nShe completed the Court of Love and said YES to dinner! 🍽️❤\n\nTime:\n${new Date().toLocaleString()}\n\nThe defendant has officially been forgiven. 😌`,
    girlfriend_name: APP_CONFIG.girlfriendName,
    boyfriend_name: APP_CONFIG.boyfriendName
  };

  if (!isEmailConfigured() || !window.emailjs) {
    console.info("EmailJS configuration is missing. Success page shown without sending an email.", params);
    return;
  }

  try {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, params);
    console.info("EmailJS dinner notification sent successfully.");
  } catch (error) {
    console.error("EmailJS dinner notification failed. Success page was still shown.", error);
  }
}

function fireConfetti() {
  const layer = document.createElement("div");
  layer.className = "confetti";
  layer.setAttribute("aria-hidden", "true");
  document.body.append(layer);

  const colors = ["#e73b72", "#f6b64b", "#7b2cbf", "#ffffff", "#ff8fab"];
  for (let i = 0; i < 90; i += 1) {
    const piece = document.createElement("i");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.65}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    layer.append(piece);
  }

  window.setTimeout(() => layer.remove(), 3600);
}

render();
