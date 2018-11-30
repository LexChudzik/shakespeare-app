import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Doughnut} from 'react-chartjs-2';

class Stats extends Component {

  calculate = (string) => {
    console.log('caclutating');
    switch(string){
      case 'all' :
      case 'live':
    }
  }

  duplicatesArray = (viewList) => {
    console.log(viewList);
    
    let byPlay = {};
    for (let i = 0; i < viewList.length; i++) {
      const play_id = viewList[i].play_id;
      console.log(play_id);
      
      console.log(viewList[i]);
      
      if (!byPlay[play_id]) {
        byPlay[play_id] = [];
      }
      byPlay[play_id].push(viewList[i]);
    }
    console.log(byPlay);
    return byPlay;
  }

  

    render() {
      return (
        <div>
          <h1>Stats</h1>
          {this.props.stats.playsSeen && <p>You have seen {this.props.stats.playsSeen.length} of {this.props.plays.length} plays.</p>}
          {/* {this.props.stats.playsSeen && <Doughnut 
            data = {{
              labels: ['seen', 'not seen'],
                    datasets: [{
                      data: [this.props.stats.playsSeen.length, (this.props.plays.length - this.props.stats.playsSeen.length)],
                      backgroundColor: ['green', 'pink']
                    }]
            }}
          />} */}
          {this.props.stats.playsSeen && JSON.stringify(this.duplicatesArray(this.props.stats.seen))}
          {this.props.stats.playsSeenLive && <p>You have seen {this.props.stats.playsSeenLive.length} of {this.props.plays.length} plays live.</p>}

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