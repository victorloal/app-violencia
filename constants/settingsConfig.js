// constants/settingsConfig.js

export const adjustableConfig = [
  {
    name: "Tamaño de letra",
    key: "fontSize",
    min: 15,
    max: 30,
    step: 2,
    unit: "px",
  },
];

export const STORAGE_KEYS = {
  FONT_SIZE: "fontSize",
  CONTRAST: "contrast",
  BRIGHTNESS: "brightness",
  VOICE: "isVoiceOn",
  CAMOUFLAGE: "isCamouflageOn",
};
