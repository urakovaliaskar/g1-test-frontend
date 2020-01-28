<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 p-2">
        <controls :control="currentControl" @change-control="setControl" />
      </div>
      <div class="col-9 p-2">
        <vc-date-picker
          is-expanded
          :columns="$screens({ default: 1, lg: 2 })"
          mode="range"
          :value="{ start: startDate, end: endDate }"
          :min-date="new Date(1881, 0, 1)"
          :max-date="new Date(2006, 11, 31)"
          @input="setDateRange"
        />
        <line-chart
          v-if="getFilteredArray"
          :chart-data="getFilteredArray"
          :currentControl="currentControl"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Controls from "@/components/Controls.vue";
import LineChart from "@/components/LineChart.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "home",
  components: {
    Controls,
    LineChart
  },
  mounted() {
    this.getTemperatures();
    this.getPrecipitations();
  },
  computed: {
    ...mapGetters([
      "temperatures",
      "precipitations",
      "currentControl",
      "startDate",
      "endDate"
    ]),
    getFilteredArray() {
      const array =
        this.currentControl === "temperature"
          ? this.temperatures
          : this.precipitations;
      if (!array) return;
      const filtered = array.filter(
        item =>
          new Date(item.t) >= new Date(this.startDate) &&
          new Date(item.t) <= new Date(this.endDate)
      );
      if (!filtered) return;
      return {
        //Data to be represented on x-axis
        labels: filtered.map(item => item.t).sort(),
        datasets: [
          {
            showLine: filtered.length > 100 ? false : true,
            label: this.currentControl,
            backgroundColor: "transparent",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor:
              this.currentControl === "temperature" ? "#249EBF" : "#CA3B69",
            //Data to be represented on y-axis
            data: filtered.map(item => item.v).sort()
          }
        ]
      };
    }
  },
  filters: {},
  methods: {
    ...mapActions(["getTemperatures", "getPrecipitations"]),
    ...mapMutations(["setControl", "setDateRange"])
  }
};
</script>

<style scoped>
.row {
  height: 100vh;
}
</style>
