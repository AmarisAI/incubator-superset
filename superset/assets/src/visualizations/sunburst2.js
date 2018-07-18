/* eslint-disable no-shadow, no-param-reassign, no-underscore-dangle, no-use-before-define */
import d3 from 'd3';
import echarts from 'echarts';
import { getColorFromScheme } from '../modules/colors';

//require('./sunburst2.css');

/**
 * https://ecomfe.github.io/echarts-examples/public/editor.html?c=sunburst-drink
 */
function sunburst2(slice, payload) {
  // eg. [hierarchy1_val, hierarchy2_val, hierarchy3_val, metric1_val]
  const raw = payload.data;

  // Required shape: [{ name, itemStyle: { color }, children: [*recursive] }]
  const multiNest = d3
    .nest()
    .key(d => d[0])
    .key(d => d[1])
    .key(d => d[2])
    .rollup(v => v[0][3])
    .map(raw);

  const data = Object.keys(multiNest).map(k1 => ({
    name: k1,
    itemStyle: {
      color: getColorFromScheme(k1, slice.formData.color_scheme),
    },
    children: Object.keys(multiNest[k1]).map(k2 => ({
      name: k2,
      itemStyle: {
        color: getColorFromScheme(k2, slice.formData.color_scheme),
      },
      value: multiNest[k1][k2]
      /*
      children: Object.keys(multiNest[k1][k2]).map(k3 => ({
        name: k3,
        itemStyle: {
          color: getColorFromScheme(k3, slice.formData.color_scheme),
        },
        value: multiNest[k1][k2][k3],
      })),*/
    })),
  }));

  const selector = d3
    .select(slice.selector)
    .style('display', 'flex')
    .style('justify-content', 'center')
    .style('align-items', 'center');

  selector
    .append('div')
    .attr('id', 'echart')
    .style('height', '600px')
    .style('width', '600px');

  const chart = echarts.init(document.getElementById('echart'));
  const option = {
    series: {
      type: 'sunburst',
      highlightPolicy: 'ancestor',
      data,
      radius: [0, '95%'],
      sort: null,
      levels: [
        {},
        {
          r0: '15%',
          r: '35%',
          itemStyle: {
            borderWidth: 2,
          },
          label: {
            rotate: 'tangential',
          },
        },
        {
          r0: '35%',
          r: '70%',
          label: {
            align: 'right',
          },
        },
        {
          r0: '70%',
          r: '72%',
          label: {
            position: 'outside',
            padding: 3,
            silent: false,
          },
          itemStyle: {
            borderWidth: 3,
          },
        },
      ],
    },
  };

  chart.setOption(option);
}

module.exports = sunburst2;
