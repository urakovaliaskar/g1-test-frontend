import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

const baseUrl = "http://localhost:8000";

export default new Vuex.Store({
  state: {
    temperatures: null,
    precipitations: null,
    currentControl: "temperature",
    startDate: new Date(1881, 0, 1),
    endDate: new Date(2006, 0, 31)
  },
  mutations: {
    setTemperatures(state, data) {
      state.temperatures = data.temperature;
    },
    setPrecipitations(state, data) {
      state.precipitations = data.precipitation;
    },
    setControl(state, control) {
      state.currentControl = control;
    },
    setDateRange(state, dateRange) {
      state.startDate = dateRange.start;
      state.endDate = dateRange.end;
    }
  },
  actions: {
    async getTemperatures(context) {
      let data = (await Axios.get(`${baseUrl}/temperatures`)).data;
      context.commit("setTemperatures", data);
    },
    async getPrecipitations(context) {
      let data = (await Axios.get(`${baseUrl}/precipitations`)).data;
      context.commit("setPrecipitations", data);
    }
  },
  getters: {
    temperatures: state => state.temperatures,
    precipitations: state => state.precipitations,
    currentControl: state => state.currentControl,
    startDate: state => state.startDate,
    endDate: state => state.endDate
  },
  modules: {}
});
