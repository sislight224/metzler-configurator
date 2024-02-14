import Colors from '../enums/data/Colors';

export type ColorListType = {
  value: Colors;
  title: string;
  color: string;
  tip?: string;
};

const BeleuchtungColorList: ColorListType[] = [
  {
    value: Colors.BLUE,
    title: 'Blau',
    color: '#338DE9',
  },
  {
    value: Colors.GREEN,
    title: 'Grün',
    color: '#75A541',
  },
  {
    value: Colors.YELLOW,
    title: 'Gelb',
    color: '#FFDD33',
  },
  {
    value: Colors.WHITE,
    title: 'Weiß',
    color: '#FFFFFF',
  },
  {
    value: Colors.RED,
    title: 'Rot',
    color: '#DD5450',
  },
];

export default BeleuchtungColorList;
