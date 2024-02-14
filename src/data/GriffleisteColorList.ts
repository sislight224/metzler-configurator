import Colors from '../enums/data/Colors';
import { ColorListType } from './BeleuchtungColorList';

const GriffleisteColorList: ColorListType[] = [
  {
    value: Colors.ANTRAHZIT,
    title: 'Anthrazit',
    color: 'linear-gradient(180deg, #353C42 0%, #90A0AF 52.08%, #353C42 100%)',
    tip: 'Pulverbeschichtet Anthrazit',
  },
  {
    value: Colors.STAINLESS_STEEL,
    title: 'Edelstahl',
    color: 'linear-gradient(180deg, #C0C0C0 0%, #F3F3F3 51.56%, #B7B7B7 100%)',
    tip: 'Gebürsteter Edelstahl',
  },
];

export default GriffleisteColorList;
