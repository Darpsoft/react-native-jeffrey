import React from "react";
import { StyleSheet, ViewPropTypes } from "react-native";
import { Button, Modal, Portal, useTheme } from "react-native-paper";
import { useStyleUniversal } from "@assets/styles/styles";
import { customUseReducer } from "@utils/customHooks";
import Pdf from "react-native-pdf";

/**
 * Component for show PDF
 *
 * @param {object} params
 * @param {object} params.source Source to PDF
 * @param {string} params.source.uri URL Pdf
 * @param {boolean} params.source.cache Enable or disable cache
 * @returns
 */

const PdfModal = ({ source }) => {
  const theme = useTheme();
  const styles = { ...useStyle(theme), ...useStyleUniversal(theme) };
  const [state, dispatchComponent] = customUseReducer({ modal: false });

  const handleShowPdf = () => {
    dispatchComponent({ modal: true });
  };

  const handleHidePdf = (params) => {
    dispatchComponent({ modal: false });
  };

  return (
    <>
      <Button mode="outlined" onPress={handleShowPdf}>
        Show PDF
      </Button>
      <Portal>
        <Modal visible={state.modal} onDismiss={handleHidePdf} contentContainerStyle={[styles.containerStyleModal, styles]}>
          <Pdf
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link presse: ${uri}`);
            }}
            style={styles.pdf}
          />
          <Button mode="outlined" style={{ marginHorizontal: 16, marginTop: 16 }} onPress={handleHidePdf}>
            Cerrar modal
          </Button>
        </Modal>
      </Portal>
    </>
  );
};

PdfModal.propTypes = {
  style: ViewPropTypes.style,
};

const useStyle = (theme) =>
  StyleSheet.create({
    containerStyleModal: {
      flex: 1,
      backgroundColor: "white",
      paddingVertical: 16,
      margin: 32,
      borderRadius: 16,
    },
    pdf: {
      flex: 1,
    },
  });
export default PdfModal;
