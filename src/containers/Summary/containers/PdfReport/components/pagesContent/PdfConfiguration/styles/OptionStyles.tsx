import { StyleSheet } from '@react-pdf/renderer';

export default StyleSheet.create({
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '16px',
  },
  option: {
    flexDirection: 'row',
    gap: '8px',
  },
  label: {
    color: '#888',
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: '14px',
    height: '18px',
  },
  value: {
    color: '#333',
    fontFamily: 'Montserrat',
    fontWeight: 500,
    fontSize: '14px',
    height: '18px',
  },
  valuesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '32px',
    width: '100%',
  },
});
