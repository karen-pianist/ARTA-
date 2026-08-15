const sounds = {
  button: "/ARTA/sounds/button-press.mp3",
  success: "/ARTA/sounds/success.mp3",
};

const audioCache = {};

Object.entries(sounds).forEach(([name, path]) => {
  const audio = new Audio(path);
  audio.preload = "auto";
  audioCache[name] = audio;
});

export const isSoundEnabled = () => {
  return localStorage.getItem("artaSoundsEnabled") !== "false";
};

export const setSoundsEnabled = (enabled) => {
  localStorage.setItem(
    "artaSoundsEnabled",
    enabled ? "true" : "false"
  );
};

export const playSound = (soundName) => {
  // Sound is ON by default unless explicitly disabled.
  if (!isSoundsEnabled()) {
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

