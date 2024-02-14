import { StyleSheet } from '@react-pdf/renderer';

export default StyleSheet.create({
  mainPage: { flexDirection: 'column' },
  mailboxesWrap: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    height: '547px',
    margin: '11px 0 75px',
  },
  mailboxesImage: {
    height: '507px',
    margin: '20px 10px 20px 10px',
    width: '527px',
  },
  mainPageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qrCode: {
    flexDirection: 'row',
    gap: '12px',
  },
  qrCodeImageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '4px 0 0',
    height: '92px',
    width: '92px',
  },
  qrCodeImage: {
    height: '100%',
    width: '100%',
  },
  qrCodeInfo: {
    color: '#888',
    flexDirection: 'column',
    gap: '4px',
    fontFamily: 'Montserrat',
    fontSize: '14px',
    fontWeight: 400,
  },
  qrCodeLink: {
    flexDirection: 'row',
    gap: '4px',
  },
  qrCodeLinkValue: {
    backgroundColor: '#eee',
    color: '#333',
    fontFamily: 'Montserrat',
    fontWeight: 500,
    fontSize: '14px',
    padding: '0 8px',
    textDecoration: 'none',
  },
  price: {
    alignItems: 'flex-end',
    color: '#888',
    flexDirection: 'column',
    fontFamily: 'Montserrat',
    fontWeight: 500,
    fontSize: '12px',
    gap: '4px',
  },
  priceValue: {
    color: '#005253',
    fontFamily: 'Montserrat',
    fontSize: '24px',
    fontWeight: 600,
  },
});
