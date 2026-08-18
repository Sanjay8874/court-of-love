const APP_CONFIG = {
  boyfriendName: "Your Boyfriend",
  girlfriendName: "My Love"
};

const EMAILJS_CONFIG = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID",
  destinationEmail: "sanjay7678160100@gmail.com"
};

const ROMANCE_GIFS = {
  hug: "https://media.giphy.com/media/3o7TKG0aUjTk8DXNXG/giphy.gif",
  kiss: "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif"
};

const state = {
  step: 0,
  noAttempts: 0,
  dinnerNoAttempts: 0,
  activeRunaway: null,
  answers: {
    forgiveness: "",
    secondChance: "",
    missMe: "",
    phoneName: "",
    hug: "",
    special: "",
    magicHug: "",
    goodMoments: "",
    beautifulMemory: "",
    makeSmile: "",
    chooseUsAgain: "",
    dinner: ""
  }
};

const playfulNoMessages = [
  "Nice try 😂",
  "Objection! You can't escape that easily. ⚖️",
  "Are you REALLY sure? 🥺",
  "The NO button is nervous. 😂",
  "Your Honour, she's trying to reject me! 😭",
  "Please reconsider. ❤"
];

const screens = [
  {
    id: "landing",
    progress: 0,
    caseLabel: "Case #143",
    render: () => `
      <p class="eyebrow">⚖️ THE COURT OF LOVE</p>
      <h1>The Court<br>of Love</h1>
      <p>"The Case of the Stupid Boyfriend"</p>
      <p><strong>THE DEFENDANT:</strong><br><span data-boyfriend>${APP_CONFIG.boyfriendName} <span class="heart-beat">❤</span></span></p>
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
    progress: 8,
    caseLabel: "Hearing 1 of 11",
    title: "YOUR HONOUR, I HAVE ONE QUESTION... 🥺",
    question: "Will you forgive this idiot?",
    answerKey: "forgiveness",
    yes: "YES ❤",
    no: "NO 😤",
    noMode: "runaway"
  },
  {
    id: "chance",
    progress: 16,
    caseLabel: "Hearing 2 of 11",
    title: "A VERY SERIOUS PROMISE",
    question: "If I promise to be a little less stupid...\n\nWill you give me another chance? 🥺❤",
    answerKey: "secondChance",
    yes: "YES ❤",
    no: "NO 😤",
    noMode: "soft-runaway"
  },
  {
    id: "miss",
    progress: 24,
    caseLabel: "Hearing 3 of 11",
    title: "BE HONEST...",
    question: "I am missing you a lot 🥲 \n\n Do you miss me even a little bit? 👀❤",
    answerKey: "missMe",
    yes: "YES, A LOT 🥰",
    alt: "Maybe... 😏",
    altMessage: "Maybe has been recorded as:\nYES 😌❤"
  },
  {
    id: "phone",
    progress: 32,
    caseLabel: "Hearing 4 of 11",
    title: "EXHIBIT A: THE PHONE",
    question: "Do you still get a little happy when you see my message pop up on your phone? 📱❤",
    answerKey: "phoneName",
    yes: "YES 🥰",
    alt: "NO 😤",
    altMessage: "ERROR 404:\nI don't believe you. 😘❤"
  },
  {
    id: "hug",
    progress: 40,
    caseLabel: "Hearing 5 of 11",
    title: "THE HUG TEST",
    question: "If I were standing in front of you right now...\n\nWould you give me a hug? 🥺",
    answerKey: "hug",
    yes: "BIG HUG 🤗",
    no: "NOPE 😤",
    noMode: "soft-runaway"
  },
  {
    id: "special",
    progress: 48,
    caseLabel: "Hearing 6 of 11",
    title: "ONE THING I NEED YOU TO KNOW",
    question: "Do you know how special you are to me ? ❤ \n How much I care about you ? ❤ \n How much I love you ? ❤",
    answerKey: "special",
    yes: "YES 🥰",
    alt: "TELL ME... 👀",
    altMessage: "You're not just someone I love.\nYou're someone whose smile can completely change my day.\nAnd honestly...\nI don't want to lose that ❤.\nI don't want to lose you ❤.-\n Maybe I don't always show it through my actions or say it the way I should, but please believe me... I love you more deeply than I sometimes know how to express.❤️\nYou have this special place in my heart that no one else can take.❤️ \n You make ordinary moments feel special just by being there. ❤️\nMaybe I don't say it enough...\n\nBut you mean more to me than you probably realize. ❤",
    emotional: true
  },
  {
    id: "magic-hug",
    progress: 56,
    caseLabel: "Hearing 7 of 11",
    title: "A TINY BIT OF MAGIC",
    question: "If I could magically appear beside you right now...\n\nWould you want me to give you a hug? 🤗❤",
    answerKey: "magicHug",
    yes: "YES, COME HERE ❤",
    no: "NO 😤",
    noMode: "runaway"
  },
  {
    id: "good-moments",
    progress: 64,
    caseLabel: "Hearing 8 of 11",
    title: "THE GOOD MOMENTS",
    question: "Do you still smile sometimes when you remember our good moments together? 🥰",
    answerKey: "goodMoments",
    yes: "YES ❤",
    alt: "Maybe 😏",
    altMessage: "The court accepts Maybe as a shy little YES. 😌❤"
  },
  {
    id: "beautiful-memory",
    progress: 72,
    caseLabel: "Hearing 9 of 11",
    title: "ONE BETTER MEMORY",
    question: "If I asked you to forget this silly fight and make a beautiful memory with me...\n\nWould you say yes? ❤",
    answerKey: "beautifulMemory",
    yes: "YES 🥰",
    alt: "Let me think 😤",
    altMessage: "Thinking time granted.\n\nBut the defendant is softly hoping the answer becomes yes. 🥺❤"
  },
  {
    id: "make-smile",
    progress: 80,
    caseLabel: "Hearing 10 of 11",
    title: "THE SMILE REQUEST",
    question: "Can I be the person who makes you smile again? 🥺❤",
    answerKey: "makeSmile",
    yes: "YES ❤",
    alt: "Convince me 😏",
    altMessage: "Then I guess I'll have to take you to dinner. 🍽️❤"
  },
  {
    id: "choose-us",
    progress: 88,
    caseLabel: "Hearing 11 of 11",
    title: "ONE LAST HEART QUESTION",
    question: "If we could forget about this silly fight for one moment...\n\nWould you choose us again? ❤",
    answerKey: "chooseUsAgain",
    yes: "YES ❤",
    alt: "I NEED TO THINK 😤",
    altMessage: "That's okay.\n\nI'll give you a little time...\n\nBut I'm still hoping for a YES. 🥺❤"
  },
  {
    id: "memory",
    progress: 92,
    caseLabel: "Before Final Verdict",
    render: () => `
      <p class="eyebrow">Before the final verdict...</p>
      <h2>Let's remember something...</h2>
      <div class="memory-card">
        <p>Whatever silly fights we have...</p>
        <p>I still want to remember the laughs.</p>
        <p>The conversations.</p>
        <p>The little moments.</p>
        <p>The stupid jokes.</p>
        <p>The hugs.</p>
        <p>The smiles.</p>
        <p>And all the moments that made "us"...</p>
        <p><strong>Because I don't want one bad moment to erase all the good ones. ❤</strong></p>
      </div>
      <div class="actions">
        <button class="btn" data-next>CONTINUE ❤</button>
      </div>
    `
  },
  {
    id: "letter",
    progress: 96,
    caseLabel: "One Last Thing",
    render: () => `
      <p class="eyebrow">One Last Thing...</p>
      <div class="letter-block">
        <p>I know I'm not perfect.</p>
        <p>Sometimes I say the wrong thing.</p>
        <p>Sometimes I make mistakes.</p>
        <p>But one thing I'm sure about...</p>
        <p>I care about you.</p>
        <p>I love seeing you smile.</p>
        <p>I love the little things about you.</p>
        <p>And even when we're angry at each other...</p>
        <p>I still don't want a day where you're not part of my life.</p>
        <p>So today, instead of giving you another excuse...</p>
        <p>I'm giving you a question.</p>
      </div>
      <h2 class="question-title">Can I make it up to you? ❤</h2>
      <div class="actions">
        <button class="btn" data-next>YES, YOU CAN ❤</button>
      </div>
    `
  },
  {
    id: "dinner",
    progress: 100,
    caseLabel: "Final Verdict",
    render: () => `
      <p class="eyebrow gavel">⚖️ FINAL VERDICT</p>
      <div class="romantic-block">
        <p>After carefully reviewing all evidence...</p>
        <p>The Court has determined that the defendant is...</p>
      </div>
      <h2 class="verdict">Guilty of Loving You Too Much ❤</h2>
      <div class="romantic-block">
        <p>However...</p>
        <p>The Court has granted the defendant ONE FINAL REQUEST.</p>
      </div>
      <h2 class="question-title">🍽️ Will you have dinner with me?</h2>
      <div class="romantic-block">
        <p>Just you ❤<br>Just me ❤<br>Good food 🍽️<br>Good conversation 💕<br>And hopefully...<br>no fighting this time. 😌</p>
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
    caseLabel: "Case Closed ❤",
    render: () => `
      <p class="eyebrow">🎉 COURT ADJOURNED! 🎉</p>
      <h2 class="verdict">❤ She Said Yes! ❤</h2>
      <div class="romantic-block">
        <p>The defendant has officially been forgiven.</p>
        <p>Dinner date unlocked 🍽️🥰</p>
        <p>And one more thing...</p>
        <p><strong>I LOVE YOU. ❤</strong></p>
        <p>Thank you for giving me another chance.</p>
        <p>Now I have only one job left...</p>
        <p><strong>Make you smile when we meet. ❤</strong></p>
      </div>
      <button class="ps-link" data-secret aria-label="Open a small romantic postscript">M.S. ❤</button>
      <p class="message secret-message" id="message"></p>
    `
  }
];

const answerLabels = [
  ["Will you forgive this idiot?", "forgiveness"],
  ["Will you give me another chance?", "secondChance"],
  ["Do you miss me even a little bit?", "missMe"],
  ["Do you still get happy when you see my name?", "phoneName"],
  ["Would you give me a hug?", "hug"],
  ["Do you know how special you are to me?", "special"],
  ["Would you want me to magically appear and give you a hug?", "magicHug"],
  ["Do you still smile at our good moments?", "goodMoments"],
  ["Would you make a beautiful memory with me?", "beautifulMemory"],
  ["Can I be the person who makes you smile again?", "makeSmile"],
  ["Would you choose us again?", "chooseUsAgain"],
  ["Will you have dinner with me?", "dinner"]
];

const screenEl = document.querySelector("#screen");
const progressFill = document.querySelector("#progress-fill");
const progressLabel = document.querySelector("#progress-label");
const caseLabel = document.querySelector("#case-label");

function isEmailConfigured() {
  return [EMAILJS_CONFIG.publicKey, EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId]
    .every((value) => value && !value.startsWith("YOUR_"));
}

function render() {
  const current = screens[state.step];
  state.noAttempts = 0;
  state.activeRunaway = null;
  caseLabel.textContent = current.caseLabel;
  progressLabel.textContent = current.id === "success" ? "Case Closed ❤" : "Case Progress";
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
    <p class="message ${current.emotional ? "emotional-message" : ""}" id="message"></p>
    <div class="actions">
      <button class="btn" data-answer="${escapeAttr(current.yes)}" data-next>${current.yes}</button>
      ${
        current.no
          ? `<button class="btn secondary runaway" data-answer="${escapeAttr(current.no)}" data-no>${current.no}</button>`
          : `<button class="btn secondary" data-answer="${escapeAttr(current.alt)}" data-alt>${current.alt}</button>`
      }
    </div>
  `;
}

function formatLines(text) {
  return text.split("\n").map((line) => line.trim()).join("<br>");
}

function escapeAttr(text) {
  return text.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function handlePositiveAnswer(current, button) {
  const answerText = button.dataset.answer || button.textContent.trim();
  recordAnswer(current, answerText);

  if (current.id === "hug") {
    showRomanceModal({
      gifUrl: ROMANCE_GIFS.hug,
      message: "Big hug received! 🤗❤️ I really needed that.",
      altText: "Cute hug animation"
    });
    return;
  }

  showRomanceModal({
    gifUrl: ROMANCE_GIFS.kiss,
    message: "That YES deserves a kiss. 😘❤️",
    altText: "Cute kiss animation"
  });
}

function bindCurrentScreen(current) {
  screenEl.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", () => {
      if (current.answerKey) {
        handlePositiveAnswer(current, button);
        return;
      }

      recordAnswer(current, button.dataset.answer || button.textContent.trim());
      nextScreen();
    });
  });

  const noButton = screenEl.querySelector("[data-no]");
  if (noButton) {
    state.activeRunaway = { button: noButton, current };
    noButton.addEventListener("pointerenter", () => moveNoButton(noButton, current));
    noButton.addEventListener("pointermove", () => moveNoButton(noButton, current));
    noButton.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      recordAnswer(current, noButton.dataset.answer || noButton.textContent.trim());
      moveNoButton(noButton, current);
    });
    noButton.addEventListener("click", (event) => event.preventDefault());
    noButton.addEventListener("focus", () => showMessage("You can still choose the romantic answer with the keyboard. ❤"));
  }

  const altButton = screenEl.querySelector("[data-alt]");
  if (altButton) {
    altButton.addEventListener("click", () => {
      recordAnswer(current, altButton.dataset.answer || altButton.textContent.trim());
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
    state.activeRunaway = { button: dinnerNo, current: { id: "dinner", noMode: "runaway" } };
    dinnerNo.addEventListener("pointerenter", () => moveDinnerNo(dinnerNo));
    dinnerNo.addEventListener("pointermove", () => moveDinnerNo(dinnerNo));
    dinnerNo.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      moveDinnerNo(dinnerNo);
    });
    dinnerNo.addEventListener("click", (event) => event.preventDefault());
    dinnerNo.addEventListener("focus", () => showMessage("The court recommends the YES button, but no pressure. ❤"));
  }

  const secret = screenEl.querySelector("[data-secret]");
  if (secret) {
    secret.addEventListener("click", () => {
      showMessage("Okay... one last confession.\n\nI was already planning to make you smile before you even opened this website. 😌❤");
    });
  }
}

document.addEventListener("pointermove", (event) => {
  if (!state.activeRunaway || event.pointerType === "touch") return;
  const { button, current } = state.activeRunaway;
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
  if (distance < 96) {
    current.id === "dinner" ? moveDinnerNo(button) : moveNoButton(button, current);
  }
});

function recordAnswer(current, answer) {
  if (!current || !current.answerKey) return;
  const existing = state.answers[current.answerKey];
  if (existing && existing !== answer && !existing.includes(answer)) {
    state.answers[current.answerKey] = `${existing} (attempted), then ${answer}`;
    return;
  }
  state.answers[current.answerKey] = answer;
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

function showRomanceModal({ gifUrl, message, altText }) {
  const existingModal = document.getElementById("romance-modal");
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement("div");
  modal.id = "romance-modal";
  modal.className = "romance-modal";
  modal.innerHTML = `
    <div class="romance-backdrop" data-close-modal>
      <div class="romance-dialog" role="dialog" aria-modal="true" aria-label="Romantic surprise">
        <img class="romance-gif" src="${gifUrl}" alt="${altText}">
        <p class="romance-message">${formatLines(message)}</p>
        <button class="btn romance-continue" data-continue-modal>CONTINUE ❤️</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const continueButton = modal.querySelector("[data-continue-modal]");
  const backdrop = modal.querySelector("[data-close-modal]");

  continueButton.addEventListener("click", () => {
    modal.remove();
    nextScreen();
  });

  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) {
      modal.remove();
      nextScreen();
    }
  });
}

function moveNoButton(button, current) {
  state.noAttempts += 1;
  const messages = current.noMessages || playfulNoMessages;
  showMessage(messages[(state.noAttempts - 1) % messages.length]);
  moveButtonSafely(button, current.noMode === "soft-runaway" ? 110 : 170);
}

function moveDinnerNo(button) {
  state.dinnerNoAttempts += 1;
  const messages = [
    "Objection! Dinner is clearly the correct verdict. 😌❤",
    "The NO button is nervous. 😂",
    "Just one dinner? Pretty please? 🥺",
    "Your Honour, she's trying to reject me! 😭",
    "Please reconsider. ❤"
  ];
  showMessage(messages[(state.dinnerNoAttempts - 1) % messages.length]);
  moveButtonSafely(button, state.dinnerNoAttempts > 6 ? 90 : 170);
}

function moveButtonSafely(button, distance) {
  const rect = button.getBoundingClientRect();
  const padding = 14;
  const maxX = Math.max(padding, window.innerWidth - rect.width - padding);
  const maxY = Math.max(padding, window.innerHeight - rect.height - padding);
  const safeTop = Math.min(maxY, Math.max(padding, window.innerHeight * 0.2));
  const safeBottom = Math.max(safeTop, window.innerHeight - rect.height - padding);
  let targetX = rect.left;
  let targetY = rect.top;

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const angle = Math.random() * Math.PI * 2;
    const candidateX = clamp(rect.left + Math.cos(angle) * distance, padding, maxX);
    const candidateY = clamp(rect.top + Math.sin(angle) * distance, safeTop, safeBottom);
    if (Math.hypot(candidateX - rect.left, candidateY - rect.top) > 44) {
      targetX = candidateX;
      targetY = candidateY;
      break;
    }
  }

  button.style.position = "fixed";
  button.style.left = `${targetX}px`;
  button.style.top = `${targetY}px`;
  button.style.zIndex = "5";
  button.classList.remove("is-jumping");
  void button.offsetWidth;
  button.classList.add("is-jumping");
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

async function acceptDinner() {
  state.answers.dinner = "YES ❤";
  nextScreen();
  fireConfetti();
  await sendDinnerEmail();
}

async function sendDinnerEmail() {
  const answerSummary = buildAnswerSummary();
  const params = {
    to_email: EMAILJS_CONFIG.destinationEmail,
    destination_email: EMAILJS_CONFIG.destinationEmail,
    subject: "❤ SHE SAID YES TO DINNER! — Court of Love",
    message: `❤ COURT OF LOVE — FINAL VERDICT ❤\n\nShe completed the entire Court of Love.\n\nHer answers:\n\n${answerSummary}\n\nTime:\n${new Date().toLocaleString()}\n\nFinal verdict:\nGUILTY OF LOVING YOU TOO MUCH. ❤`,
    answers: answerSummary,
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
    console.info("EmailJS dinner notification sent successfully.", params);
  } catch (error) {
    console.error("EmailJS dinner notification failed. Success page was still shown.", error);
  }
}

function buildAnswerSummary() {
  return answerLabels
    .map(([question, key], index) => `${index + 1}. ${question}\n   Answer: ${state.answers[key] || "Not answered"}`)
    .join("\n\n");
}

function fireConfetti() {
  const layer = document.createElement("div");
  layer.className = "confetti";
  layer.setAttribute("aria-hidden", "true");
  document.body.append(layer);

  const colors = ["#e73b72", "#f6b64b", "#7b2cbf", "#ffffff", "#ff8fab"];
  for (let i = 0; i < 120; i += 1) {
    const piece = document.createElement("i");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.65}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    layer.append(piece);
  }

  window.setTimeout(() => layer.remove(), 3800);
}

render();
