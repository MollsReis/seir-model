((_, Chart, moment) => {
  const generateModel = (inf, inc, rec) => {
    const n = 100,
          s = [{ x: 0, y: 100 }],
          e = [{ x: 0, y: 0 }],
          i = [{ x: 0, y: 1 }],
          r = [{ x: 0, y: 0 }];

    for (let x = 1; x < 365; x++) {
      const sC = _.last(s).y,
        eC = _.last(e).y,
        iC = _.last(i).y,
        rC = _.last(r).y,
        s2e = sC * iC * inf / n,
        e2i = eC / inc,
        i2r = iC / rec;
      s.push({ x, y: _.round(sC - s2e, 2) });
      e.push({ x, y: _.round(eC + s2e - e2i, 2) });
      i.push({ x, y: _.round(iC + e2i - i2r, 2) });
      r.push({ x, y: _.round(rC + i2r, 2) });

      if (_.last(i).y < 0.1) break;
    }

    return [ s, e, i, r ];
  };

  const ctx = document.getElementById('lineChart');

  const chartConfig = {
    type: 'line',
    data: {
      datasets: [{
        label: 'Susceptible',
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgb(75, 192, 192)',
        pointRadius: 0,
      }, {
        label: 'Exposed',
        fill: false,
        backgroundColor: 'rgb(255, 205, 86)',
        borderColor: 'rgb(255, 205, 86)',
        pointRadius: 0,
      }, {
        label: 'Infected',
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        pointRadius: 0,
      }, {
        label: 'Recovered',
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgb(54, 162, 235)',
        pointRadius: 0,
      }],
    },
    options: {
      legend: {
        position: 'bottom',
        labels: { padding: 20 },
      },
      scales: {
        xAxes: [{
          type: 'time',
          distribution: 'series',
          time: {
            parser: x => moment(document.getElementById('startDate').value).add(x, 'days'),
            unit: 'day',
          },
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: '% of population',
          },
        }],
      },
    },
  };

  const lineChart = new Chart(ctx, chartConfig);

  const updateChart = () => {
    const inf = document.getElementById('r0').valueAsNumber / document.getElementById('rec').valueAsNumber,
          inc = document.getElementById('inc').valueAsNumber,
          rec = document.getElementById('rec').valueAsNumber,
          [ s, e, i, r ] = generateModel(inf, inc, rec);
    lineChart.data.datasets[0].data = s;
    lineChart.data.datasets[1].data = e;
    lineChart.data.datasets[2].data = i;
    lineChart.data.datasets[3].data = r;
    lineChart.update();
  };

  document.getElementById('startDate').onchange = updateChart;
  document.getElementById('r0').onchange = updateChart;
  document.getElementById('inc').onchange = updateChart;
  document.getElementById('rec').onchange = updateChart;
  updateChart();

})(_, Chart, moment);
