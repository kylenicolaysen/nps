class NPSApp extends React.Component {
  constructor(props) {
    super(props)
    this.handleCalculate = this.handleCalculate.bind(this)
    this.state = {
      progressArray: [],
      numScoresNeeded: 0
    }
  }
  
  handleCalculate(e) {
    e.preventDefault()
    const rE = /^(-)?[0-9]\d{0,2}(\.\d{0,2})?$/
    const curScore = e.target.elements.currentScore.value
    const numScores = e.target.elements.numberScores.value
    const goalScore = e.target.elements.goalScore.value

    if(curScore < -100 || curScore >= 100 || !rE.test(curScore)) {
      e.target.elements.currentScore.value = ''
      return this.setState(() => {
        return {
          numScoresNeeded: 0,
          progressArray: [],
          error: 'Enter a valid current score'  
        }
      })
    }
    if(goalScore <= -100 || goalScore >= 100 || !rE.test(goalScore)) {
      e.target.elements.goalScore.value = ''
      return this.setState(() => {
        return {
          numScoresNeeded: 0,
          progressArray: [],
          
          error: 'Enter a valid goal score.'
        }
      })
    }
    if(curScore >= goalScore) {
      return this.setState(() => {
        return {
          numScoresNeeded: 0,
          progressArray: [],
          error: `You've already hit your goal! Congrats!`
        }
      })
    }

    let predScore = curScore
    let n = numScores
    let pA = []
    
    while (predScore < goalScore) {
      predScore = ((predScore*parseInt(n))+100)/(parseInt(n)+1)
      n++
      pA.push(Math.round(predScore*100)/100)
    }
    this.setState(() => {
      return {
        numScoresNeeded: pA.length,
        progressArray: pA,
        error: undefined
      }
    })
  }
  render() {
    return (
      <div>
        <Header/>
        <div className="row">
          <div className="column">
            <Input
              handleCalculate={this.handleCalculate}
              error={this.state.error}
            />
          </div>
          <div className="column">
            <Output 
              numScoresNeeded={this.state.numScoresNeeded} 
              progressArray={this.state.progressArray} 
            />
          </div>
        </div>
      </div>
    )
  }
}

const Header = () => {
  return (
    <div>
      <h1>NPS Calculator</h1>
      <h3>Calculates how many 100 scores you need to achieve a goal score</h3>
    </div>
  )
}

const Input = (props) => {
  return ( 
    <div className="container">
      <form onSubmit={props.handleCalculate}>
        <label htmlFor="currentScore">
          Current Score: 
          <input name="currentScore" type="text" />
        </label>
        <label htmlFor="numberScores">
          Number of Scores:
          <input name="numberScores" type="number" />
        </label>
        <label htmlFor="goalScore">
          Goal Score: 
          <input name="goalScore" type="text" />
        </label>
        <p className="error">{props.error}</p>
        <button id="calculate-button">Calculate</button>
      </form>
    </div>        
  )
}

const Output = (props) => {
  return (
    <div className="container">
      <p>Promoter Scores Needed: {props.numScoresNeeded}</p>
      {props.progressArray && <p> </p>}
      <ol>
        {props.progressArray.map((score) => <li key={score}><p>{score}</p></li>)}
      </ol>
    </div>
  )
}

ReactDOM.render(<NPSApp />, document.getElementById('app'))