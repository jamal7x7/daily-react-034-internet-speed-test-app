import React, { Component } from 'react'
import speedTest from 'speedtest-net'
import FastSpeedtest from 'fast-speedtest-api'
import '../styles/App.css'


const Header = () => (
  <header className='App-header'>
    <h1 className='App-title'>Podcast App</h1>
  </header>
)

const Items = (props) => (
  <div className='tones'>

    <div className="c4" onClick={props.handleClick}>START</div>
    <div className="speed-test-result">{props.speedTestResult}</div>

  </div>
)

const ControleBar = () => (
  <div className='controle-bar'>

      

  </div>
)

class MelodyMakerApp extends Component {
  
  state = {
    speedTestResult: 0
  }

  handleClick = () => {
     
     console.log('handle click!')

  }
  
  updateSpeedTest = (s) => {
     
     console.log('!!!!!')
     this.setState( () => ({
       speedTestResult: s
     }))

  }



  componentDidMount() {
    
    // fetch('https://api.fast.com/netflix/speedtest?https=true&token=YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm&urlCount=5')
    // .then(res => res.json())
    // .then(json => console.log(json))
    // .catch(err => console.log('parsing failed', err))

    let speedtest = new FastSpeedtest({
      token: 'YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm', // required
      verbose: false, // default: false
      timeout: 10000, // default: 5000
      https: true, // default: true
      urlCount: 5, // default: 5
      bufferSize: 8, // default: 8
      unit: FastSpeedtest.UNITS.Mbps // default: Bps
    });
    
    speedtest.getSpeed().then(s => {
        console.log(`Speed: ${s} Mbps`);
        this.updateSpeedTest(s)
    }).catch(e => {
        console.error(e.message);
    })

    var test = speedTest({maxTime: 5000});
 
    test.on('data', data => {
      console.dir(data)
    })
    
    test.on('error', err => {
      console.error(err)
    })

  }


      render () {
    return (
      <div className='App-container'>

        <ControleBar />
        <Items 
          handleClick={this.handleClick}
          speedTestResult={this.state.speedTestResult}
        />

      </div>
    )
  }
}

const App = (props) => (
  <div className='App'>
    <Header />
    <MelodyMakerApp />

  </div>
)

export default App

