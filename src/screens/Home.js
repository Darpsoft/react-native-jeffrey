import React, { useEffect, useMemo } from "react";
import { FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Paragraph, Searchbar, useTheme } from "react-native-paper";
import { useStyleUniversal } from "@assets/styles/styles";
import { requestHomeStart } from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "@components/Wrapper";
import ListBooking from "@components/ListBooking";
import { customUseReducer } from "@utils/customHooks";
import Icon from "react-native-vector-icons/FontAwesome";
import { set } from "lodash";

const getDataSource = (values) =>
  values?.map((values, key) => ({
    key,
    ...values,
    client: `${values.tutenUserClient.firstName} ${values.tutenUserClient.lastName}`,
  }));

const initialState = {
  textSearch: "",
  dataSource: [],
  loading: false,
  _sort: {
    bookingPrice: true,
    bookingId: true,
  },
};

let debounce = null;

const Home = () => {
  const theme = useTheme();
  const styles = { ...useStyle(theme), ...useStyleUniversal(theme) };

  const [state, dispatchComponent] = customUseReducer(initialState);
  const dispatch = useDispatch();
  const { home } = useSelector((store) => store);

  useEffect(() => {
    initialRequest();
  }, []);

  useEffect(() => {
    dispatchComponent({ dataSource: home.data });
  }, [home.data]);

  const handleSearch = (params) => {
    clearTimeout(debounce);
    dispatchComponent({ loading: true, textSearch: params });

    debounce = setTimeout(() => {
      dispatchComponent({
        dataSource: home.data.filter(({ tutenUserClient, bookingId }) => {
          return tutenUserClient.firstName.includes(params) || tutenUserClient.lastName.includes(params) || bookingId.toString().includes(params);
        }),
        loading: false,
      });
    }, 1000);
  };

  const handleSort = (field) => {
    const sort = !state._sort[field];
    dispatchComponent((state) => {
      return {
        ...set(state, `_sort.${field}`, sort),
        dataSource: state.dataSource.sort((a, b) => {
          return !sort ? a[field] - b[field] : b[field] - a[field];
        }),
      };
    });
  };

  const dataSource = useMemo(() => getDataSource(state.dataSource), [state.dataSource, state._sort.bookingId, state._sort.bookingPrice]);

  const initialRequest = async () => {
    dispatch(requestHomeStart());
  };

  return (
    <Wrapper scrollview={false}>
      <Searchbar
        placeholder="Nombre ó Número de Reservación"
        icon={{ source: "search", direction: "rtl" }}
        clearIcon={{ source: "times", direction: "rtl" }}
        style={{ marginTop: 16, marginBottom: 8, elevation: 0, borderColor: "#cecece", borderWidth: 1 }}
        onChangeText={handleSearch}
        value={state.textSearch}
      />
      <Paragraph style={{ fontSize: 18, fontWeight: "bold" }}>Filtros</Paragraph>
      <View style={{ height: 40, width: "100%", flexDirection: "row" }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <View style={{ borderRadius: 8, borderWidth: 1, borderColor: "#cecece", height: 40, flexDirection: "row" }}>
            <View style={{ flex: 7, justifyContent: "center", alignItems: "center" }}>
              <Paragraph style={{ fontSize: 18, fontWeight: "bold" }}>Booking</Paragraph>
            </View>
            <TouchableOpacity
              onPress={() => handleSort("bookingId")}
              style={{ flex: 3, justifyContent: "center", alignItems: "center", borderLeftColor: "#cecece", borderLeftWidth: 1 }}
            >
              <Icon name={state._sort.bookingId ? "arrow-up" : "arrow-down"} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <View style={{ borderRadius: 8, borderWidth: 1, borderColor: "#cecece", height: 40, flexDirection: "row" }}>
            <View style={{ flex: 7, justifyContent: "center", alignItems: "center" }}>
              <Paragraph style={{ fontSize: 18, fontWeight: "bold" }}>Precio</Paragraph>
            </View>
            <TouchableOpacity
              onPress={() => handleSort("bookingPrice")}
              style={{ flex: 3, justifyContent: "center", alignItems: "center", borderLeftColor: "#cecece", borderLeftWidth: 1 }}
            >
              <Icon name={state._sort.bookingPrice ? "arrow-up" : "arrow-down"} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Paragraph style={{ fontSize: 14 }}>Presione en las flechas para ordenar</Paragraph>
      <Divider style={{ marginVertical: 8 }} />
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl colors={["#000"]} refreshing={state.loading} onRefresh={initialRequest} />}
        data={dataSource}
        renderItem={({ item, index }) => <ListBooking key={index} {...item} />}
        keyExtractor={(item) => item?.bookingId?.toString()}
      />
    </Wrapper>
  );
};

const useStyle = (theme) => StyleSheet.create({});

export default Home;
