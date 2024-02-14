import { observer } from 'mobx-react-lite';
import { View, Text } from '@react-pdf/renderer';
import styles from './PdfTableStyles';
import {
  useMontagePanelStore,
  useZusatzmodulPanelStore,
  useZusatzmodulErweiterunPanelStore,
  useKlingeltableuPanelStore,
  useLichttasterPanelState,
  useInnestationPanelStore,
  useRFIDPanelStore,
  useBriefkastenPanelStore,
  useTextleistePanelStore,
} from 'hooks/store/usePanelsStore';

const PdfFooter = observer(() => {
  const { state: montageState } = useMontagePanelStore();
  const { state: zusatzmodulStore } = useZusatzmodulPanelStore();
  const { state: zusatzmodulErweiterunStore } = useZusatzmodulErweiterunPanelStore();
  const { state: klingeltableuStore } = useKlingeltableuPanelStore();
  const { state: lichttasterStore } = useLichttasterPanelState();
  const { state: innestationStore } = useInnestationPanelStore();
  const { state: RFIDStore } = useRFIDPanelStore();
  const { state: briefkastenStore } = useBriefkastenPanelStore();
  const { state: textleisteStore } = useTextleistePanelStore();
  const tableData = [ // todo: сделать рефакторинг, когда станет известна логика получения цены
    {
      moduleName: montageState.panelTitle,
      dimension: '241.0 x 386.0 x 278.0',
      artikelnummer: 12102,
      stuckpreis: 6000,
      anzahl: 2,
      gesamtpreis: '',
    },
    {
      moduleName: zusatzmodulStore.panelTitle,
      dimension: '241.0 x 386.0 x 278.0',
      artikelnummer: 12102,
      stuckpreis: 5000,
      anzahl: 3,
      gesamtpreis: '',
    },
    {
      moduleName: zusatzmodulErweiterunStore.panelTitle,
      dimension: '241.0 x 386.0 x 278.0',
      artikelnummer: 12102,
      stuckpreis: 5000,
      anzahl: 3,
      gesamtpreis: '',
    },
    {
      moduleName: klingeltableuStore.panelTitle,
      dimension: '241.0 x 386.0 x 278.0',
      artikelnummer: 12102,
      stuckpreis: 5000,
      anzahl: 3,
      gesamtpreis: '',
    },
    {
      moduleName: lichttasterStore.panelTitle,
      dimension: '241.0 x 386.0 x 278.0',
      artikelnummer: 12102,
      stuckpreis: 5000,
      anzahl: 3,
      gesamtpreis: '',
    },
    {
      moduleName: innestationStore.panelTitle,
      dimension: '241.0 x 386.0 x 278.0',
      artikelnummer: 12102,
      stuckpreis: 5000,
      anzahl: 3,
      gesamtpreis: '',
    },
    {
      moduleName: RFIDStore.panelTitle,
      dimension: '241.0 x 386.0 x 278.0',
      artikelnummer: 12102,
      stuckpreis: 5000,
      anzahl: 3,
      gesamtpreis: '',
    },
    {
      moduleName: briefkastenStore.panelTitle,
      dimension: '241.0 x 386.0 x 278.0',
      artikelnummer: 12102,
      stuckpreis: 5000,
      anzahl: 3,
      gesamtpreis: '',
    },
    {
      moduleName: textleisteStore.panelTitle,
      dimension: '241.0 x 386.0 x 278.0',
      artikelnummer: 12102,
      stuckpreis: 5000,
      anzahl: 3,
      gesamtpreis: '',
    },
  ];

  return (
    <View>
      <Text style={styles.mainTitle}>
        Zusammenfassung
      </Text>

      <View style={styles.table}>
        <View
          wrap={false}
          style={[styles.row, styles.darkRow]}
        >
          <Text style={[styles.headCell, styles.dimensionCell]}>
            Dimension (WxHxD, mm)
          </Text>
          <Text style={[styles.headCell, styles.artikelnummerCell]}>
            Artikelnummer
          </Text>
          <Text style={[styles.headCell, styles.stuckpreisCell]}>
            Stückpreis (€)
          </Text>
          <Text style={[styles.headCell, styles.anzahlCell]}>
            Anzahl
          </Text>
          <Text style={[styles.headCell, styles.gesamtpreisCell]}>
            Gesamtpreis (€)
          </Text>
        </View>

        {tableData.filter(Boolean).map((item, index) => {
          return (
            <View
              key={item.moduleName}
              wrap={false}
              style={[styles.bodyRow, index % 2 !== 0 ? styles.darkRow : {}]}
            >
              <Text style={styles.moduleName}>{item.moduleName}</Text>
              <View style={styles.moduleData}>
                <Text style={[styles.bodyCell, styles.dimensionCell]}>
                  {item.dimension}
                </Text>
                <Text style={[styles.bodyCell, styles.artikelnummerCell]}>
                  {item.artikelnummer}
                </Text>
                <Text style={[styles.bodyCell, styles.stuckpreisCell]}>
                  {item.stuckpreis}
                </Text>
                <Text style={[styles.bodyCell, styles.anzahlCell]}>
                  {item.anzahl}
                </Text>
                <Text style={[styles.bodyPriceCell, styles.gesamtpreisCell]}>
                  {item.gesamtpreis}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
});

export default PdfFooter;
