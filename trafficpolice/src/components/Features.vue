<template>
  <div id="features">
    <weather></weather>
    <selectStatus></selectStatus>
    <menuSelect></menuSelect>
  </div>
</template>

<script>
import Weather from "./Weather";
import SelectStatus from "./SelectStatus";
import MenuSelect from "./MenuSelect";
export default {
  name: "features",
  data(){
      return {
          area: ''
      }
  },
  components: {
    weather: Weather,
    selectStatus: SelectStatus,
    menuSelect: MenuSelect
  },
  props: ["district"],
  mounted(){
      this.area = this.district
  }
};
</script>