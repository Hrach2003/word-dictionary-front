module.exports = {
  purge: [],
  theme: {
    extend: {
      height: {
        "2/3": "66.666%",
      },
      transitionProperty: {
        height: "height",
        width: "width",
      },
      fontSize: {
        "7xl": "5rem",
      },
    },
  },
  variants: {
    opacity: ["responsive", "active", "focus", "hover", "group-hover"],
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
