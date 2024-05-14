import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Montserrat",
  fonts: [
    { src: "/configurator/fonts/cssFonts/MontserratRegular.ttf" },
    {
      src: "/configurator/fonts/cssFonts/MontserratMedium.ttf",
      fontWeight: 500,
    },
    {
      src: "/configurator/fonts/cssFonts/MontserratSemiBold.ttf",
      fontWeight: 600,
    },
    { src: "/configurator/fonts/cssFonts/MontserratBold.ttf", fontWeight: 700 },
  ],
});

export default StyleSheet.create({
  page: { padding: "24px" },
  content: { flexGrow: 1 },
  pagination: {
    color: "#888",
    fontFamily: "Montserrat",
    fontSize: "12px",
    fontWeight: 400,
    position: "absolute",
    right: 24,
    bottom: 20,
  },
});
