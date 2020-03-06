const generateModel = (inf, inc, rec) => {
  const n = 100,
        s = [{ x: 0, y: 100 }],
        e = [{ x: 0, y: 0 }],
        i = [{ x: 0, y: 1 }],
        r = [{ x: 0, y: 0 }];
  for (let x = 1; x < 200; x++) { // TODO run until i = 0
    const sC = _.last(s).y,
          eC = _.last(e).y,
          iC = _.last(i).y,
          rC = _.last(r).y,
          s2e = sC * iC * inf / n,
          e2i = eC / inc,
          i2r = iC / rec;
    s.push({ x, y: sC - s2e });
    e.push({ x, y: eC + s2e - e2i });
    i.push({ x, y: iC + e2i - i2r });
    r.push({ x, y: rC + i2r });
  }
  return [ s, e, i, r ];
};

window.onLoad = () => {
  const [ s, e, i, r ] = generateModel(0.325, 7, 7),
    green = 'rgb(75, 192, 192)',
    yellow = 'rgb(255, 205, 86)',
    red = 'rgb(255, 99, 132)',
    blue = 'rgb(54, 162, 235)';

  window.lineChart = new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Susceptible',
          data: s,
          fill: false,
          backgroundColor: green,
          borderColor: green,
          pointRadius: 0,
        },
        {
          label: 'Exposed',
          data: e,
          fill: false,
          backgroundColor: yellow,
          borderColor: yellow,
          pointRadius: 0,
        },
        {
          label: 'Infected',
          data: i,
          fill: false,
          backgroundColor: red,
          borderColor: red,
          pointRadius: 0,
        },
        {
          label: 'Recovered',
          data: r,
          fill: false,
          backgroundColor: blue,
          borderColor: blue,
          pointRadius: 0,
        }
      ],
    },
    options: {
      scales: {
        xAxes: [{
          type: 'time',
          distribution: 'series',
          time: {
            parser: (x) => moment().subtract(2, 'weeks').add(x, 'days'),
            unit: 'day',
          }
        }],
      }
    },
  });
};
