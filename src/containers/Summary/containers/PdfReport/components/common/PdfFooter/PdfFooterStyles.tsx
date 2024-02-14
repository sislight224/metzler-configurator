import { StyleSheet } from '@react-pdf/renderer';

export default StyleSheet.create({
  footer: {
    color: '#888',
    display: 'flex',
    flexDirection: 'row',
    flexBasis: '46px',
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: '12px',
    gap: '75px',
    margin: '40px 0 0',
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  contactInfoItem: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: '7px',
  },
  contactInfoIcon: {
    height: '12px',
    width: '12px',
  },
  contactInfoLink: {
    color: '#888',
    textDecoration: 'none',
  },
  address: {
    flexDirection: 'column',
    gap: '2px',
  },
});
