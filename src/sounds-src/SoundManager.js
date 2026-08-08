const sounds = {
  button: "/sounds/button-press.mp3",
  success: "/sounds/success.mp3",
};

const audioCache = {};

Object.entries(sounds).forEach(([name, path]) => {
  const audio = new Audio(path);
  audio.preload = "auto";
  audioCache[name] = audio;
});

export const isSoundEnabled = () => {
  return localStorage.getItem("artaSoundEnabled") !== "false";
};

export const setSoundEnabled = (enabled) => {
  localStorage.setItem(
    "artaSoundEnabled",
    enabled ? "true" : "false"
  );
};

export const playSound = (soundName) => {
  // Sound is ON by default unless explicitly disabled.
  if (!isSoundEnabled()) {
    return;
  }

  const audio = audioCache[soundName];

  if (!audio) {
    console.warn(`Sound "${soundName}" not found.`);
    return;
  }

  audio.currentTime = 0;
  audio.volume = 0.5;

  audio.play().catch((error) => {
    console.warn("Could not play sound:", error);
  });
};

