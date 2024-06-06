import { defineStore } from "pinia"
import * as api from "../api/api"

const API_BASE_URL = "http://127.0.0.1:3000"

export const usePropertyTypesStore = defineStore("propertyType", {
    state: () => ({
        propertyTypes: []
    }),
    getters: {
      getPropertyTypes: (state) => state.propertyTypes
    },
    actions: {
      async fetchPropertyTypes() {
        try {
          this.propertyTypes = []
          const response = await api.get(API_BASE_URL, "propertyTypes")
          this.propertyTypes = response.data.map(type => type.type_name)
        } catch (error) {
          console.error(error)
        }
      },
    },
  });
  