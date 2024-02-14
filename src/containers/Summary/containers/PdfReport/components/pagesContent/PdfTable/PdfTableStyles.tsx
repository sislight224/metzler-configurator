import { StyleSheet } from '@react-pdf/renderer';

export default StyleSheet.create({
  mainTitle: {
    color: '#333',
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: '18px',
    height: '24px',
    margin: '24px 0 0 9px',
  },
  table: { flexDirection: 'column' },
  row: {
    alignItems: 'center',
    height: '36px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '8px',
    width: '100%',
  },
  darkRow: { backgroundColor: '#F6F6F6' },
  bodyRow: {
    flexDirection: 'column',
    gap: '2px',
    padding: '8px',
  },
  dimensionCell: { flexBasis: '163px' },
  artikelnummerCell: { flexBasis: '103px' },
  stuckpreisCell: { flexBasis: '96px' },
  anzahlCell: { flexBasis: '40px' },
  gesamtpreisCell: {
    flexBasis: '96px',
    textAlign: 'right',
  },
  headCell: {
    color: '#005253',
    fontFamily: 'Montserrat',
    fontWeight: 500,
    fontSize: '10px',
    letterSpacing: '0.1px',
  },
  moduleName: {
    color: '#333',
    fontFamily: 'Montserrat',
    fontWeight: 500,
    fontSize: '12px',
    padding: '2px 0',
    letterSpacing: '0.5px',
    maxWidth: '275px',
  },
  moduleData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyCell: {
    color: '#888',
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: '12px',
    letterSpacing: '0.5px',
  },
  bodyPriceCell: {
    color: '#333',
    fontFamily: 'Montserrat',
    fontWeight: 500,
    fontSize: '12px',
    letterSpacing: '0.5px',
  },
});
