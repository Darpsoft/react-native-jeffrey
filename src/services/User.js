import request, { getOptions } from "@utils/request";
import Config from "react-native-config";
import { storage } from "../../index";

export class UserServices {
  constructor() {
    this.storage = storage.getState();
    this.URL_API = `${Config.URL_API}/rest/user`;
  }

  async getBookins() {
    const email = "contacto@tuten.cl";
    try {
      const url = `${this.URL_API}/${email}/bookings?current=true`;
      const options = getOptions("GET", { Adminemail: "testapis@tuten.cl" });
      return request(url, options);
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
