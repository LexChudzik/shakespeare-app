import React, { Component } from 'react';
import {connect} from 'react-redux';
import './stats.css'
import {Doughnut, HorizontalBar} from 'react-chartjs-2';

class Stats extends Component {

  // state = {
  //   liveOnly: false
  // }

  // handleChange = (event) => {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;
  //   this.setState({
  //     [name]: value
  //   });
  // }
  // calculate = (string) => {
  //   console.log('caclutating');
  //   switch(string){
  //     case 'all' :
  //     case 'live':
  //   }
  // }
  
  render() {
    return (
      <div>
        <h1>Stats</h1>
        {this.props.stats.playsSeen &&<div className="charts-container">
        {/* <label>Show live productions only:<input type="checkbox" name="liveOnly" checked={this.state.liveOnly} onChange={this.handleChange}/></label> */}
          <div className="donut-container">
            <Doughnut
              data = {{
                labels: ['seen', 'not seen'],
                      datasets: [{
                        data: 
                          [this.props.stats.playsSeen.length, (this.props.plays.length - this.props.stats.playsSeen.length)],
                        backgroundColor: ['green', 'pink']
                      }]
              }}
              options={{
                legend: {
                  display: false
               },
                title: {
                  display: true,
                  fontSize: 16,
                  text: 'Total Seen',
                  fontFamily: 'IM Fell DW Pica',
                }
              }}
            />

            <Doughnut
              data = {{
                labels: ['tragedies seen', 'comedies seen', 'histories seen', 'tragedies not seen', 'comedies not seen', 'histories not seen'],
                      datasets: [{
                        data: 
                          [this.props.stats.tSeen.length, 
                            this.props.stats.cSeen.length,
                            this.props.stats.hSeen.length,
                            (this.props.plays.filter(p => p.genre === 't').length - this.props.stats.tSeen.length),
                            (this.props.plays.filter(p => p.genre === 'c').length - this.props.stats.cSeen.length),
                            (this.props.plays.filter(p => p.genre === 'h').length - this.props.stats.hSeen.length),

                        ],
                        backgroundColor: ['purple', 'green', 'blue', 'lavender', 'lightgreen', 'lightblue' ]
                      }]
              }}
              options={{
                legend: {
                  display: false
               },
                title: {
                  display: true,
                  fontSize: 16,
                  text: 'By Genre',
                  fontFamily: 'IM Fell DW Pica',
                }
              }}
            />
          </div>

          <h2 className="chart-title">Seen Multiple Times</h2>

          <div className="bar-container">
            <HorizontalBar
              data = {{
                labels: this.props.stats.allDuplicates.map(p => {return p.title}),
                      datasets: [{
                        data: this.props.stats.allDuplicates.map(p => {return p.number}),
                        backgroundColor: "#724F5C"
                      }]
              }}
              options={{
                legend: {
                  display: false
               },
                scales: {
                  xAxes: [{
                    gridLines: {
                      display: false,
                      color: "black"
                    },
                    ticks: {
                      beginAtZero: true,
                      stepSize: 1
                    }
                  }],
                  yAxes: [{
                    gridLines: {
                      display: false,
                      color: "black"
                    },
                    ticks: {
                      beginAtZero: true,
                      stepSize: 1
                    }
                  }],
              }
              }}
            />
          </div>
          
        </div>}

      </div>
      )
    }
  }
  
  const mapStateToProps = state => ({
    productions: state.production,
    plays: state.plays,
    stats: state.stats
  });
  
  export default connect(mapStateToProps)(Stats);