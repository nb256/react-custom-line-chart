import React from "react";
import { Line as LineChart } from "react-chartjs-2";
import Chart from "chart.js";
import "chartjs-plugin-annotation";

function prepareData(data) {
  return {
    labels: ["", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Female",
        backgroundColor: "rgba(124,210,207,0.93)",
        borderColor: "rgba(124,210,207,0.93)",
        data: data.female
      },
      {
        label: "Male",
        backgroundColor: "rgba(120,164,227,0.93)",
        borderColor: "rgba(120,164,227,0.93)",
        data: data.male
      }
    ]
  };
}

function prepareOptions({ maxY, average }) {
  const stepSize = maxY / 4;

  return {
    scaleShowGridLines: true,
    scaleGridLineColor: "rgba(0,0,0,.05)",
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 1,
    pointDot: false,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    legend: { display: false },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: maxY,
            stepSize: stepSize,
            suggestedMin: 0.5,
            suggestedMax: 5.5,
            fontSize: 10,
            callback: function(label, index, labels) {
              if (index === 4) {
                return "0";
              } else if (index === 0) {
                return maxY + "%";
              }
            }
          }
        }
      ],
      xAxes: [
        {
          id: "x-axis-0"
        },
        {
          id: "x-axis-1",
          type: "linear",
          ticks: {
            min: 0,
            max: 100,
            stepSize: 1
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          }
        }
      ]
    },
    elements: {
      point: {
        radius: 0
      }
    },
    tooltips: {
      mode: "index",
      intersect: false,
      yAlign: "bottom"
    },
    hover: {
      mode: "nearest",
      intersect: true
    },
    chartArea: {
      backgroundColor: "rgba(233, 236, 241, 1)"
    },
    layout: {
      padding: {
        left: 10,
        right: 15,
        top: 10,
        bottom: -45
      }
    },
    annotation: {
      events: ["mouseenter", "mouseleave"],
      annotations: [
        {
          drawTime: "afterDatasetsDraw",
          id: "vertLine",
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-1",
          value: average,
          borderColor: "rgb(130,134,137)",
          borderWidth: 3,
          label: {
            position: "top",
            content: "Facebook Average | " + average,
            enabled: false
          },
          onMouseenter: function(e) {
            console.log("enter Annotation");
            var element = this;
            element.options.label.enabled = true;
            element.chartInstance.update();
          },
          onMouseleave: function(e) {
            console.log("leave Annotation");
            var element = this;
            element.options.label.enabled = false;
            element.chartInstance.update();
          }
        }
      ]
    }
  };
}

class LineChartExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }
  componentWillMount() {
    // fill background of chart area
    Chart.pluginService.register({
      beforeDraw: function(chart, easing) {
        if (
          chart.config.options.chartArea &&
          chart.config.options.chartArea.backgroundColor
        ) {
          var ctx = chart.chart.ctx;
          var chartArea = chart.chartArea;

          ctx.save();
          ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
          ctx.fillRect(
            chartArea.left,
            chartArea.top,
            chartArea.right - chartArea.left,
            chartArea.bottom - chartArea.top
          );
          ctx.restore();
        }
      }
    });

    // draw x-gridlines in non-overflow manner
    Chart.plugins.register({
      beforeDraw: function(chart) {
        var ctx = chart.chart.ctx,
          x_axis = chart.scales["x-axis-0"],
          topY = chart.scales["y-axis-0"].top,
          bottomY = chart.scales["y-axis-0"].bottom;
        x_axis.options.gridLines.display = false;
        x_axis.ticks.forEach(function(label, index) {
          var x = x_axis.getPixelForTick(index);
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 1;
          ctx.strokeStyle = x_axis.options.gridLines.color;
          ctx.stroke();
          ctx.restore();
        });
      }
    });

    // draw y-gridlines in non-overflow manner
    Chart.plugins.register({
      beforeDraw: function(chart) {
        var ctx = chart.chart.ctx,
          y_axis = chart.scales["y-axis-0"],
          leftX = chart.scales["x-axis-0"].left,
          RightX = chart.scales["x-axis-0"].right;
        y_axis.options.gridLines.display = false;
        y_axis.ticks.forEach(function(label, index) {
          var y = y_axis.getPixelForTick(index);
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(leftX, y);
          ctx.lineTo(RightX, y);
          ctx.lineWidth = 1;
          ctx.strokeStyle = y_axis.options.gridLines.color;
          ctx.stroke();
          ctx.restore();
        });
      }
    });
  }
  componentDidMount() {
    var ctx = document.getElementsByClassName("chartjs-render-monitor");
    // set all the background colors if page has more than one charts
    for (let i = 0; i < ctx.length; i++) {
      ctx[i].style.backgroundColor = "rgba(245,246,250,255)";
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        data: prepareData(nextProps.data)
      });
    }
  }
  render() {
    return (
      <div style={{ position: "relative" }}>
        <LineChart
          data={this.state.data || {}}
          options={prepareOptions({
            maxY: this.props.maxValue > 0 ? this.props.maxValue + 10 : 40,
            average: this.props.data.average
          })}
          width={600}
          height={180}
          redraw={true}
        />
        <div
          style={{
            position: "absolute",
            transform: "rotate(-90deg)",
            top: "45%",
            left: "5px",
            fontFamily: "sans-serif",
            fontSize: "0.6em",
            color: "rgba(50,50,50,0.7)"
          }}
        >
          Viewership
        </div>
      </div>
    );
  }
}

export default LineChartExample;
