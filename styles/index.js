// styles/index.js
import {
  typography,
  textVariants,
  textColors,
  textModifiers,
} from "./typography";
import { buttonStyles, buttonTypes } from "./buttons";
import { components } from "./components";
import { navigationStyles } from "./navigation";
import { modalStyles } from "./modals";
import { loadingStyles } from "./loading";
import { toastStyles } from "./toasts";
import { listStyles } from "./lists";
import { formStyles } from "./forms";
import { animationStyles, animatedStyles } from "./animations";
import { utilities } from "./utilities";
import { settingsStyles } from "./settings";
import { emergencyStyles } from "./emergencyPlaces";
import { termsStyles } from "./terms";
import * as tokens from "./tokens";

// API limpia y organizada
const styles = {
  // Tokens (valores fundamentales)
  ...tokens,

  // Tipografía
  typography,
  text: {
    variants: textVariants,
    colors: textColors,
    modifiers: textModifiers,
  },

  // Componentes
  components: {
    ...components,
    buttons: {
      styles: buttonStyles,
      types: buttonTypes,
    },
  },

  // Pantallas
  screens: {
    settings: settingsStyles,
    emergency: emergencyStyles,
    terms: termsStyles,
  },

  // Módulos específicos
  navigation: navigationStyles,
  modals: modalStyles,
  loading: loadingStyles,
  toasts: toastStyles,
  lists: listStyles,
  forms: formStyles,
  animations: {
    timing: animationStyles,
    styles: animatedStyles,
  },
  utilities,
};

export default styles;

// Exportaciones individuales para importaciones específicas
export {
  tokens,
  typography,
  textVariants,
  textColors,
  textModifiers,
  buttonStyles,
  buttonTypes,
  components,
  navigationStyles,
  modalStyles,
  loadingStyles,
  toastStyles,
  listStyles,
  formStyles,
  animationStyles,
  animatedStyles,
  utilities,
  settingsStyles,
  emergencyStyles,
  termsStyles,
};
