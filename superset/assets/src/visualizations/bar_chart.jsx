import d3 from 'd3';
import echarts from 'echarts';
import { getColorFromScheme } from '../modules/colors';
import React from 'react';
import ReactDOM from 'react-dom';
import entityModal from '../components/entityModal';
import { Modal} from 'react-bootstrap';

let modalComponent;
let modalContainer;



function close_modal(){
    ReactDOM.render(<div></div>, modalContainer.node());
}

/**
 * https://ecomfe.github.io/echarts-examples/public/editor.html?c=bar-brush
 */
function bar_chart(slice, payload) {
  const raw = payload.data;
  var itemStyle = {
    normal: {
    },
    emphasis: {
        barBorderWidth: 1,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0,0,0,0.5)'
    }
  };

  const fullData = raw.map((d)=>{
    let values = d.values;
    let key = d.key;
    return {
      'seriesData':{
          name: 'bar',
          type: 'bar',
          stack: 'one',
          itemStyle: itemStyle,
          data: values.map((v)=>(v.y))
      },
      'yAxisKey': key,
      'axisData':values.map((v)=>(v.x))
    }
  })[0];

  const selector = d3
    .select(slice.selector)
    .html("")
    .style('display', 'flex')
    .style('justify-content', 'center')
    .style('align-items', 'center');

  selector
    .append('div')
    .attr('id', 'echart')
    .style('min-height', '600px')
    .style('width', '100%');
  selector
    .append('div')
    .attr('id', 'modal')

  modalContainer = d3.select('#modal');
  const chart = echarts.init(document.getElementById('echart'));
  app.title = 'Bar Chart';

  var xAxisData = [];
  var data1 = [];


  for (var i = 0; i < 10; i++) {
    xAxisData.push('Class' + i);
    data1.push((Math.random() * 2).toFixed(2));
  }

  const option = {
    tooltip: {},
    xAxis: {
        splitLine: {show: false},
        axisLabel: {
          interval: 0,
          rotate: -45
        },
        data: fullData.axisData,
        type: 'category'
    },
    yAxis: {
        name: fullData.yAxisKey,
        splitArea: {show: false}
    },
    grid: {
        left: 100
    },
    series: fullData.seriesData
  };
  console.log(option);
  chart.setOption(option);
  chart.on('click', function (params) {
      //console.log("click",params);
      modalComponent = entityModal(close_modal,params.name);
      ReactDOM.render(modalComponent, modalContainer.node());

  });


}

module.exports = bar_chart;
