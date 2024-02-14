import { Font, StyleSheet } from '@react-pdf/renderer';

Font.register({
  family: 'Montserrat',
  fonts: [
    { src: '/fonts/cssFonts/MontserratRegular.ttf' },
    { src: '/fonts/cssFonts/MontserratMedium.ttf', fontWeight: 500 },
    { src: '/fonts/cssFonts/MontserratSemiBold.ttf', fontWeight: 600 },
    { src: '/fonts/cssFonts/MontserratBold.ttf', fontWeight: 700 },
  ],
});

export default StyleSheet.create({
  page: { padding: '24px' },
  content: { flexGrow: 1 },
  pagination: {
    color: '#888',
    fontFamily: 'Montserrat',
    fontSize: '12px',
    fontWeight: 400,
    position: 'absolute',
    right: 24,
    bottom: 20,
  },
});
