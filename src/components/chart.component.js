import React, { useState, useRef, useLayoutEffect } from 'react'
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import getTodos from '../services/getTodos';

const Chart = () => {

  useLayoutEffect(() => {

    let root = am5.Root.new("chartdiv");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panY",
        wheelY: "zoomY",
        layout: root.verticalLayout
      })
    );

    // Add scrollbar
    chart.set("scrollbarY", am5.Scrollbar.new(root, {
      orientation: "vertical"
    }));

    // Define data
    const allTodos = getTodos();
    const doneTodos = allTodos.filter((todo) => todo.done);

    const data = {};
    data.year = "2021"
    // const data = doneTodos.map((todo) => {
    //   return { [todo.title]: todo.duration };
    // });
    doneTodos.forEach(todo => {
      let title = todo.title;
      let duration = todo.duration;
      console.log(duration);
      data[title] = parseFloat(duration.toFixed(2));
    });
    const newData = []
    newData.push(data)
    console.log(newData);

    // data.push({ "year": "2021" })
    // var dummyData = [{
    //   "year": "2021",
    //   "europe": 2.5,
    //   "namerica": 2.5,
    //   "asia": 2.1,
    //   "lamerica": 1,
    //   "meast": 0.8,
    //   "africa": 0.4
    // }, {
    //   "year": "2022",
    //   "europe": 2.6,
    //   "namerica": 2.7,
    //   "asia": 2.2,
    //   "lamerica": 0.5,
    //   "meast": 0.4,
    //   "africa": 0.3
    // }, {
    //   "year": "2023",
    //   "europe": 2.8,
    //   "namerica": 2.9,
    //   "asia": 2.4,
    //   "lamerica": 0.3,
    //   "meast": 0.9,
    //   "africa": 0.5
    // }]
    // console.log(dummyData);

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      })
    );
    yAxis.data.setAll(newData);

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {})
      })
    );

    // Add legend
    var legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50
    }));

    // Create series
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName) {
      var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: name,
        stacked: true,
        xAxis: xAxis,
        yAxis: yAxis,
        baseAxis: yAxis,
        valueXField: fieldName,
        categoryYField: "year"
      }));

      series.columns.template.setAll({
        tooltipText: "{name}, {categoryY}: {valueX}",
        tooltipY: am5.percent(90)
      });
      series.data.setAll(newData);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            text: "{valueX}",
            fill: root.interfaceColors.get("alternativeText"),
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true
          })
        });
      });

      legend.data.push(series);
    }

    doneTodos.forEach(todo => {
      makeSeries(todo.title, todo.title)
    });
    // makeSeries("Europe", "europe");
    // makeSeries("North America", "namerica");
    // makeSeries("Asia", "asia");
    // makeSeries("Latin America", "lamerica");
    // makeSeries("Middle East", "meast");
    // makeSeries("Africa", "africa");
    chart.appear(1000, 100);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    return () => {
      root.dispose();
    };
  }, []);


  return (
    <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    // <>
    //   {console.log(doneTodos)}
    //   <p>{doneTodos.timeTaken}</p>
    // </>
  )
}

export default Chart