import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import getTodos from '../../services/getTodos';

const PieChart = () => {
  useLayoutEffect(() => {
    let root = am5.Root.new("PieChartdiv");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270
      })
    );

    // Create series
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "duration",
        categoryField: "task",
        endAngle: 270
      })
    );

    series.states.create("hidden", {
      endAngle: -90
    });

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data

    const allTodos = getTodos();
    const doneTodos = allTodos.filter((todo) => todo.done);

    const data = doneTodos.map((todo) => {
      return { task: todo.title, duration: todo.duration };
    });

    series.data.setAll(data);

    series.appear(1000, 100);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    return () => {
      root.dispose();
    };
  }, []);


  return (
    <div id="PieChartdiv" style={{ width: "100%", height: "500px" }}></div>
  )
}

export default PieChart