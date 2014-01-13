$(document).ready(function () {
    new Highcharts.Chart({
        chart: {
            type: 'column',
            renderTo: 'container',
            events: {
              load: function () {
                  // Draw the flow chart
                  var ren = this.renderer;
                  var xOffset = 60;
                  var yOffset = 10;
                  var cols = this.container.children[0].children[8].children[0].children;
                  
                  for (i=0; i<(cols.length-1); i++) {
                      x1 = cols[i].x.baseVal.value;
                      x2 = cols[i+1].x.baseVal.value;
                      y1 = cols[i].y.baseVal.value;
                      y2 = cols[i+1].y.baseVal.value;
                      w = cols[i].width.baseVal.value/2;
                      if(y1>y2){
                          diff = (this.series[0].data[i+1].y - this.series[0].data[i].y).toFixed(0);
                          draw_rise(ren, x1, y1, x2, y2, w, xOffset, yOffset, diff);
                      } else if (y1 < y2) {
                          diff = (this.series[0].data[i].y - this.series[0].data[i+1].y).toFixed(0);
                          draw_dipp(ren, x1, y1, x2, y2, w, xOffset, yOffset, diff);
                      }
                  }

                }
            }
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                  enabled: true,
                  inside: true,
                  color: 'silver'
                }
            }
        },
        series: [{
            name: 'Tokyo',
            data: [50, 60, 30, 25]

        }]
    });
});

function draw_dipp(ren, x1, y1, x2, y2, w, xOffset, yOffset, diff){
  ren.path(['M', (x1+(w*2)+xOffset), y1+yOffset, 'L', x2+w+xOffset, y1+yOffset])
      .attr({
          'stroke-width': 2,
          stroke: 'red',
          dashstyle: 'dash'
       })
       .add();
  ren.path(['M', (x2+w+xOffset), y1+yOffset, 'L', (x2+w+xOffset-5), y1+yOffset+5, 'M',(x2+w+xOffset), y1+yOffset, 'L', (x2+w+xOffset+5), y1+yOffset+5])
       .attr({
          'stroke-width': 2,
          stroke: 'red'
       })
       .add();
  ren.path(['M', (x2+w+xOffset), y2+yOffset, 'L', (x2+w+xOffset-5), y2+5, 'M',(x2+w+xOffset), y2+yOffset, 'L', (x2+w+xOffset+5), y2+5])
       .attr({
          'stroke-width': 2,
          stroke: 'red'
       })
       .add();
  ren.path(['M', (x2+w+xOffset), y1+yOffset, 'L', (x2+w+xOffset), y2+yOffset])
       .attr({
          'stroke-width': 2.5,
          stroke: 'red'
       })
       .add();
  ren.label( diff + ' mm Dipp', (x2+w+xOffset), y2 + (y1-y2)/2)
      .css({
          color: 'red',
          fontSize: '10px'
      })
      .add();
}

function draw_rise(ren, x1, y1, x2, y2, w, xOffset, yOffset, diff){
  ren.path(['M', (x1+w+xOffset), y2+yOffset, 'L', x2+xOffset, y2+yOffset])
      .attr({
          'stroke-width': 2,
          stroke: 'green',
          dashstyle: 'dash'
       })
       .add();
  ren.path(['M', (x1+w+xOffset), y2+yOffset, 'L', (x1+w+xOffset-5), y2+yOffset+5, 'M',(x1+w+xOffset), y2+yOffset, 'L', (x1+w+xOffset+5), y2+yOffset+5])
       .attr({
          'stroke-width': 2,
          stroke: 'green'
       })
       .add();
  ren.path(['M', (x1+w+xOffset), y1+yOffset, 'L', (x1+w+xOffset-5), y1+5, 'M',(x1+w+xOffset), y1+yOffset, 'L', (x1+w+xOffset+5), y1+5])
       .attr({
          'stroke-width': 2,
          stroke: 'green'
       })
       .add();
  ren.path(['M', (x1+w+xOffset), y2+yOffset, 'L', (x1+w+xOffset), y1+yOffset])
       .attr({
          'stroke-width': 2.5,
          stroke: 'green'
       })
       .add();
  ren.label( diff + ' mm Rise', (x1-w+xOffset), y1 + (y2-y1)/2)
      .css({
          color: 'green',
          fontSize: '10px'
      })
      .add();
}