import React from "react";
import { StyleSheet, View } from "react-native";
import { Paragraph, useTheme } from "react-native-paper";
import { useStyleUniversal } from "@assets/styles/styles";
import moment from "moment";

const ListBooking = (params) => {
  const theme = useTheme();
  const styles = { ...useStyle(theme), ...useStyleUniversal(theme) };

  return (
    <View style={styles.containerList}>
      <View style={styles.bodyLeft}>
        <Paragraph style={styles.textBodyLeft}>{params?.bookingId}</Paragraph>
      </View>
      <View style={styles.bodyCenter}>
        <Paragraph style={styles.textTopBodyCenter}>{params?.client}</Paragraph>
        <Paragraph style={styles.textBottomBodyCenter} numberOfLines={1}>
          {params?.locationId?.streetAddress}
        </Paragraph>
      </View>
      <View style={styles.bodyRight}>
        <Paragraph style={styles.textTopBodyRight}>{params?.bookingPrice}</Paragraph>
        <Paragraph>{moment(params.bookingTime).format("YYYY-MM-DD")}</Paragraph>
      </View>
    </View>
  );
};

const useStyle = (theme) =>
  StyleSheet.create({
    containerList: { height: 48, marginVertical: 8, flexDirection: "row", borderColor: "#cecece", borderRadius: 5, borderWidth: 1, width: "100%" },
    bodyLeft: { flex: 2, justifyContent: "center", alignItems: "center", backgroundColor: "#cecece" },
    textBodyLeft: { fontSize: 18, color: theme.colors.text },
    bodyCenter: { flex: 6, justifyContent: "center", marginLeft: 8 },
    textTopBodyCenter: { fontSize: 18, fontWeight: "bold" },
    textBottomBodyCenter: { fontSize: 14 },
    bodyRight: { flex: 2, justifyContent: "center", alignItems: "flex-end", marginRight: 8 },
    textTopBodyRight: { fontSize: 18, fontWeight: "bold" },
  });

export default ListBooking;
