import { Text, View, Link, Svg, Path } from '@react-pdf/renderer';
import styles from './PdfFooterStyles';

const PdfFooter = () => {
  return (
    <View
      fixed
      style={styles.footer}
    >
      <View style={styles.contactInfo}>
        <View style={styles.contactInfoItem}>
          <Svg style={styles.contactInfoIcon}>
            <Path
              d="M6.5 9.3374C7.46522 9.75247 8.62122 10 10 10V8L8 7.5L6.5 9.3374ZM6.5 9.3374C4.57948 8.51152 3.41196 7.02236 2.75 5.5M2.75 5.5C2.20038 4.23599 2 2.9491 2 2H4L4.5 4L2.75 5.5Z"
              stroke="#DDDDDD"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
          <Text>07121/3177328</Text>
        </View>
        <View style={styles.contactInfoItem}>
          <Svg style={styles.contactInfoIcon}>
            <Path
              d="M10.25 4.51725C9.63714 2.76046 7.96577 1.5 6 1.5C4.23314 1.5 2.70411 2.51828 1.96776 4C1.88486 4.16681 1.81201 4.33949 1.75 4.51725M10.25 4.51725C10.412 4.98154 10.5 5.48049 10.5 6C10.5 6.51951 10.412 7.01846 10.25 7.48275M10.25 4.51725H1.75M1.75 4.51725C1.58803 4.98154 1.5 5.48049 1.5 6C1.5 6.51951 1.58803 7.01846 1.75 7.48275M1.75 7.48275C2.36286 9.23954 4.03423 10.5 6 10.5C7.96577 10.5 9.63714 9.23954 10.25 7.48275M1.75 7.48275H10.25"
              stroke="#DDDDDD"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              d="M6 10.5C8.48528 8.01472 8.48528 3.98528 6 1.5C3.51472 3.98528 3.51472 8.01472 6 10.5Z"
              stroke="#DDDDDD"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
          <Link
            src="edelstahl-tuerklingel.de"
            style={styles.contactInfoLink}
          >
            edelstahl-tuerklingel.de
          </Link>
        </View>
        <View style={styles.contactInfoItem}>
          <Svg style={styles.contactInfoIcon}>
            <Path
              d="M3.5 4.5L4.75061 5.50049C5.48105 6.08484 6.51895 6.08484 7.24939 5.50049L8.5 4.5M10.5 7.5L10.5 4.5C10.5 3.39543 9.60457 2.5 8.5 2.5L3.5 2.5C2.39543 2.5 1.5 3.39543 1.5 4.5L1.5 7.5C1.5 8.60457 2.39543 9.5 3.5 9.5L8.5 9.5C9.60457 9.5 10.5 8.60457 10.5 7.5Z"
              stroke="#DDDDDD"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
          <Text>service@metzlergmbh.de</Text>
        </View>
      </View>

      <View style={styles.contactInfo}>
        <View style={[styles.contactInfoItem, { alignItems: 'flex-start' }]}>
          <Svg style={styles.contactInfoIcon}>
            <Path
              d="M10 9V5.5C10 5.18524 9.85181 4.88885 9.6 4.7L6.6 2.45C6.24444 2.18333 5.75556 2.18333 5.4 2.45L2.4 4.7C2.14819 4.88885 2 5.18524 2 5.5V9C2 9.55228 2.44772 10 3 10H4C4.55228 10 5 9.55228 5 9V8.5C5 7.94772 5.44772 7.5 6 7.5C6.55228 7.5 7 7.94772 7 8.5V9C7 9.55228 7.44772 10 8 10H9C9.55228 10 10 9.55228 10 9Z"
              stroke="#DDDDDD"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
          <View style={styles.address}>
            <Text>Metzler GmbH</Text>
            <Text>Täleswiesenstr. 9</Text>
            <Text>72770 Reutlingen</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PdfFooter;
