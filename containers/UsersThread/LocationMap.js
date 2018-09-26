import React from 'react'
// TODO import it globaly, g2 is too big to load in time (> 400KB)
// import G2 from 'g2'
import ReactResizeDetector from 'react-resize-detector'
import { withTheme } from 'styled-components'
import fetchGeoData from './geo_data'
import { fetch } from 'whatwg-fetch'

import { Margin } from '../../components'
import { makeDebugger, uid, theme as themeHelper } from '../../utils'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:LocationMap')
/* eslint-enable no-unused-vars */

class LocationMap extends React.Component {
  constructor(props) {
    super(props)
    this.chart = null
    this.chartId = uid.gen()
  }

  componentDidMount() {
    try {
      this.initG2()
    } catch (e) {
      // TODO: tell toast
      debug('G2 is not load', e)
    }
  }

  onResize(width) {
    const newWidth = Math.ceil(width)
    const height = Math.ceil(newWidth * 0.625)

    if (this.chart) this.chart.changeSize(newWidth, height)
  }

  /* eslint-disable no-undef */
  configG2() {
    G2.track(false)

    this.chart.forceFit()
    // animate it's to "dragy"
    this.chart.animate(false)
    this.chart.legend(false)
    this.chart.tooltip({
      title: null,
      map: {
        name: 'name',
      },
    })

    this.chart.coord('map', {
      projection: 'albers',
      basic: [110, 0, 25, 47], // 指定投影方法的基本参数，[λ0, φ0, φ1, φ2] 分别表示中央经度、坐标起始纬度、第一标准纬度、第二标准纬度
      max: [16.573, -13.613], // 指定投影后最大的坐标点
      min: [-27.187, -49.739], // 指定投影后最小的坐标点
    })
  }

  initG2() {
    const { theme } = this.props

    const oceanColor = themeHelper('locationMap.oceanColor')({ theme })
    const regionBg = themeHelper('locationMap.regionBg')({ theme })
    const restRegionBg = themeHelper('locationMap.restRegionBg')({ theme })
    const borderStroke = themeHelper('locationMap.borderStroke')({ theme })

    const { Stat } = G2

    fetchGeoData()
      .then(mapData => {
        const map = []
        const { features } = mapData
        for (let i = 0; i < features.length; i += 1) {
          const { name } = features[i].properties
          map.push({ name })
        }

        this.chart = new G2.Chart({
          id: this.chartId,
          height: 500,
          plotCfg: {
            margin: [10, 105],
            border: {
              fill: oceanColor,
            },
          },
        })

        this.configG2()

        const bgView = this.chart.createView()
        bgView.source(map)
        bgView.tooltip(false)
        bgView.axis(false)
        bgView
          .polygon()
          .position(Stat.map.region('name', mapData))
          .color('name', val => {
            if (val === 'China') {
              return regionBg
            }
            return restRegionBg
          })
          .style({
            stroke: borderStroke,
            lineWidth: 1,
          })

        // TODO: should from server
        fetch('http://antvis.github.io/static/data/china-pm.json')
          .then(response => response.json())
          .then(data => {
            const pointView = this.chart.createView()
            pointView.source(data)
            pointView
              .point()
              .position(Stat.map.location('long*lant'))
              .size('value', 12, 1)
              .color('value', () => '#C2DEB6')
              .tooltip('name*value')
              .shape('value', () => 'circle')
              .style({
                shadowBlur: 10,
                shadowColor: '#C2DEB6',
              })
            this.chart.render()
            const curWidth = document.getElementById(this.chartId).offsetWidth
            this.onResize(curWidth)
          })
      })
      .catch(ex => debug('parsing failed', ex))
  }
  /* eslint-enable no-undef */

  render() {
    return (
      <div>
        <ReactResizeDetector
          handleWidth
          refreshMode="debounce"
          refreshRate={500}
          skipOnMount={false}
          resizableElementId={this.chartId}
          onResize={this.onResize.bind(this)}
        />
        <div id={this.chartId} />
        <Margin bottom="10px" />
      </div>
    )
  }
}

export default withTheme(LocationMap)
