<!--  -->
<template>
  <div class="pie_echart">
    <div class="title">
      <el-radio-group v-model="selectKey" @change="changeKey">
        <el-radio-button label="sale_">销售</el-radio-button>
        <el-radio-button label="_money">销售额</el-radio-button>
      </el-radio-group>
      <el-select
        v-model="selectDay"
        class="m-2"
        placeholder="Select"
        @change="changeKey"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div style="width: 100%">
      <div id="main" style="width: 100%; height: 400px"></div>
      <div id="map" style="width: 100%; height: 600px"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onMounted, Ref } from "vue";
import * as echarts from "echarts";
import { getEchartsData } from "../../request/api";
import ChinaJSON from "../../../utils/china.json";
let myEchart: echarts.ECharts;
let mapEchart: echarts.ECharts;
let selectKey = ref("sale_");
let selectDay = ref("today");
const options = ref([
  {
    label: "昨天",
    value: "yesterday",
  },
  {
    label: "今天",
    value: "today",
  },
  {
    label: "前三天",
    value: "three_days",
  },
]);
let setData = (data: unknown) => {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      width: 300,
      height: 100,
      top: 20,
      right: 10,
      orient: "vertical",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        center: ["30%", "50%"],
        avoidLabelOverlap: false,
        data,
      },
    ],
  };
};
let setMapData = (data: unknown) => {
  return {
    visualMap: {
      type: "continuous",
      max: 1000000,
      min: 0,
      inRange: {
        color: ["orange", "red"],
      },
      calculable: true,
    },
    tooltip: {
      show: true,
      formatter: "{b}<br/>销量:{c}",
    },
    series: [
      {
        type: "map",
        map: "China",
        label: { show: false },
        emphasis: {
          label: { show: false },
          
        },
        itemStyle: { borderColor: "#fff" },
        data,
      },
    ],
  };
};
let resData = ref({}) as Ref<echartsData>;
const fetchData = async () => {
  let res = await getEchartsData();
  if (res.errno === 0) {
    // 饼图
    myEchart = echarts.init(document.getElementById("main") as HTMLElement);
    resData.value = res.data;
    const pieArr = res.data.salePie.map((item) => ({
      value: item.sale_today,
      name: item.name,
    }));
    myEchart.setOption(setData(pieArr));

    //  地图
    mapEchart = echarts.init(document.getElementById("map") as HTMLElement);
    echarts.registerMap("China", ChinaJSON as any);
    // 地图配置
    let mapArr = res.data.saleMap.map((item) => ({
      value: item.saleNum,
      name: item.areaName,
    }));
    console.log(mapArr);
    let mapOption = setMapData(mapArr);
    mapEchart.setOption(mapOption);
  }
};
fetchData();
const changeKey = () => {
  let key: string;
  if (selectKey.value === "sale_") {
    key = selectKey.value + selectDay.value;
  } else {
    key = selectDay.value + selectKey.value;
  }
  // console.log(key);
  const newData = resData.value.salePie.map((item) => ({
    value: item[key],
    name: item.name,
  }));
  let option = setData(newData);
  myEchart.setOption(option);
};
</script>
<style lang="less" scoped>
.pie_echart {
  .title {
    display: flex;
    justify-content: space-between;
  }
}
</style>
