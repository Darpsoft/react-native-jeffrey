import AsyncStorage from "@react-native-async-storage/async-storage";

const methods = (nameStorage) => ({
  remove: async function () {
    try {
      await AsyncStorage.removeItem(nameStorage, (error) => {
        if (error === null) {
          console.warn(`Se eliminó con éxito el storage ${nameStorage}`);
        } else {
          throw new Error(error);
        }
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  delete: async function ({ index, value }) {
    try {
      const requestValues = await this.get();
      const deleteSuccess = requestValues.filter((object) => !object[index] === value);
      await this.set(deleteSuccess, "object");
      return true;
    } catch (error) {
      return false;
    }
  },
  /**
   * Obtener datos del Storage
   *
   * @param {string} type "array" | "object". Significa que tipo de datos quieres
   *
   * @return {object|[any]} Retorna un objecto o un arreglo, depende del tipo de datos que quieras obtener
   */
  get: async function (type = "array") {
    const returnUndefined = type === "array" ? [] : {};
    try {
      const values = await AsyncStorage.getItem(nameStorage);
      return values ? JSON.parse(values) : returnUndefined;
    } catch (e) {
      console.log(e);
      return returnUndefined;
    }
  },
  /**
   * Insertar datos en el Storage
   *
   * @param {object|[any]} values puede enviar Objetos o Arreglos
   * @param {string} type  "array" | "object". Significa que tipo de datos insertaras
   *
   * @return {object|[any]} Retorna un objecto o un arreglo, depende del tipo de datos que estés insertando
   */
  set: async function (values, type = "array") {
    try {
      switch (type) {
        case "object":
          // "Object" significa que modifica todo el storage
          await AsyncStorage.setItem(nameStorage, JSON.stringify(values));
          break;
        case "array":
          // "Array" significa que va a obtener todo lo que existe y agrega uno nuevo
          const requestValues = await this.get();
          await AsyncStorage.setItem(nameStorage, JSON.stringify([...requestValues, values]));
          break;
      }
      return values;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  /**
   *
   * @param {*} Filter
   *
   * @returns {object[]} Retorna un arreglo con la información encontrada
   */
  filter: async function ({ index = "", value }) {
    const values = await this.get();
    return values.filter((object) => object[index] === value);
  },
  update: async function ({ index, find, value }) {
    try {
      const values = await this.get();
      const updated = values.map((object) => (object[index] === find ? { ...object, ...value } : object));
      await this.set(updated);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
});

const extraTrainings = {
  getCategory: function () {},
};

export const database = {
  auth: methods("auth"),
  settings: methods("settings"),
};
