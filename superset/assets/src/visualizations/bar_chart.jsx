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
  console.log(payload);

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
  var i=1;
  const colors = raw.reduce((accu,d)=>{
    accu.push(getColorFromScheme(i, slice.formData.color_scheme));
    i++;
    return accu;
  },[]);
  const seriesData = raw.reduce((accu,d)=>{
    let values = d.values;
    accu.push({
      name: d.key,
      type: 'bar',
      barGap: 0,
      itemStyle: itemStyle,
      data: values.map((v)=>(v.x,v.y))
    });
    return accu;
  },[]);
  const yAxisParams = raw.reduce((accu,d)=>{
    accu.push({
        name: d.key,
        splitArea: {show: false}
    });
    return accu;
  },[]);
  const xAxisData = raw.reduce((accu,d)=>{
    let values = d.values;
    accu.push(values.map((v)=>(v.x)));
    return accu;
  },[])[0];

  const selector = d3
    .select(slice.selector)
    .html("")
    .style('display', 'flex')
    .style('justify-content', 'center')
    .style('align-items', 'center');

  selector
    .append('div')
    .attr('id', 'echart')
    .style('min-height', '300px')
    .style('width', '100%');
  selector
    .append('div')
    .attr('id', 'modal')

  modalContainer = d3.select('#modal');
  const chart = echarts.init(document.getElementById('echart'));
  app.title = 'Bar Chart';

  const option = {
    color: colors,
    tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: true
                }
            }
    },
    xAxis: {
        data:xAxisData,
        splitLine: {show: false},
        axisLabel: {
          interval: 0,
          rotate: -45,
          show:true,
          formatter: function (value, index) {
            if(value.length > 7){
              return value.substring(0, 7) + '...';
            }else{
              return value;
            }
          }
        },
        type: 'category'
    },
    yAxis: yAxisParams,
    grid: {
        left: 100
    },
    series: seriesData
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
