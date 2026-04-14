const xyValues = [
  { x: 50, y: 7 },
  { x: 60, y: 8 },
  { x: 70, y: 8 },
  { x: 80, y: 9 },
  { x: 90, y: 9 },
  { x: 100, y: 9 },
  { x: 110, y: 10 },
  { x: 120, y: 11 },
  { x: 130, y: 14 },
  { x: 140, y: 14 },
  { x: 150, y: 15 },
];
const scatterChart = new Chart("scatter-chart", {
  type: "scatter",
  data: {
    datasets: [
      {
        pointRadius: 2,
        pointBackgroundColor: "rgb(255, 0, 0)",
        data: xyValues,
      },
    ],
  },
});
const xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
const yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

const lineChart = new Chart("line-chart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: "rgba(0, 0, 255, 0)",
        borderColor: "rgb(0, 155, 0)",
        data: yValues,
      },
    ],
  },
});
