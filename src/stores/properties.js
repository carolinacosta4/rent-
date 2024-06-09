import { defineStore } from "pinia"
import * as api from "../api/api"

const API_BASE_URL = "http://127.0.0.1:3000"

export const usePropertiesStore = defineStore("property", {
  state: () => ({
    properties: [],
    property: "",
    token: localStorage.getItem("authToken") || null,
  }),
  getters: {
    getProperties: (state) => state.properties,
    getProperty: (state) => state.property,
  },
  actions: {
    async fetchProperties() {
      try {
        this.properties = []
        const response = await api.get(API_BASE_URL, "properties")
        this.properties = response.data
      } catch (error) {
        console.error(error)
      }
    },

    async fetchProperty(id) {
      try {
        this.properties = ""
        const response = await api.get(API_BASE_URL, `properties/${id}`)
        this.property = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async create(newProperty){
      console.log(newProperty);
      try {
        const response = await api.post(API_BASE_URL, 'properties', {
          owner_username: newProperty.owner_username,
          // property_type: newProperty.property_type,
          property_type: 3,
          title: newProperty.title,
          description: newProperty.description,
          location: newProperty.location,
          map_url: newProperty.map_url,
          daily_price: newProperty.daily_price,
          guest_number: newProperty.guest_number,
          bathrooms: newProperty.bathrooms,
          bedrooms: newProperty.bedrooms,
          beds: newProperty.beds,
          amenities: newProperty.amenities,
          photos:  ['a'],
        },
        localStorage.getItem("authToken")
      );
      } catch (error) {
        throw error.message
      }
    },

    async delete(id){
      try {
        const response = await api.remove(API_BASE_URL, `properties/${id}`, this.token)
        console.log(response.msg);
      } catch (error) {
        console.error(error)
      }
    },

    async block(id) {
      console.log(id);
      try {
        const response = await api.patch(API_BASE_URL, `properties/block/${id}`)
        console.log("Property updated successfully:", response.msg);
      } catch (error) {
        console.error(error)
      }
    },
  },
});
