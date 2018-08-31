import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


class Title extends React.Component{
  render(){
    return(
        <div className="title">
          <button onClick={() => this.props.nextPhase()}>
            はじめる
          </button>
        </div>
      )
  }
}

class Timer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      timer : 10
    }
    this.countdown = this.countdown.bind(this)
    this.starttimer = this.starttimer.bind(this)
    this.a = 0
  }
  
  countdown() {
    // console.log(this.state.timer)
    if(this.state.timer > 0){
      this.setState({ timer: this.state.timer -1 });
    }else if(this.state.timer === 0){
      this.props.nextQuiz();
      this.setState({ timer: this.state.timer + 10})
    }
  }
  
  starttimer(){
    clearInterval(this.a)
    this.a = setInterval(this.countdown, 1000);
  }
  
  resettimer(){
    this.setState({ timer: 10})
    console.log("w")
  }
  
  render(){
    return(
      <div className="timer">
        {this.starttimer()}
        {this.state.timer}
      </div>
      )
  }
}

class ShowQuiz extends React.Component{
  constructor(props){
    super(props);

    this.answerData = [
      "水のペットボトル",
      "1997",
      "渋谷",
      "29",
      "53",
      "12億"
      ]
    this.quizData = [
      "楽天市場で最も売れた商品（2018上半期）",
      "楽天市場ができた年はいつでしょう。",
      "今までで楽天本社が移転していない場所",
      "楽天が展開している国の数は？",
      "楽天の社長、三木谷浩史の年齢は？",
      "楽天グループサービスの利用者数は？",
    ];
    this.answerCorrect = [
      "4",
      "3",
      "4",
      "4",
      "3",
      "2"
      ];
    this.answerData1 = [
      "パソコン",
      "1977年",
      "二子玉川",
      "5",
      "35",
      "1億"
    ];
    this.answerData2 = [
      "トイレットペーパー",
      "1987年",
      "品川",
      "12",
      "43",
      "12億",
    ];
    this.answerData3 = [
      "鉛筆",
      "1997年",
      "六本木",
      "20",
      "53",
      "50億"
    ];
    this.answerData4 = [
      "水のペットボトル",
      "2007年",
      "渋谷",
      "29",
      "60",
      "100億"
    ];
  }
  
  showQuestion(qNumber){
    return this.quizData[qNumber]
  }
  
  show1(qNumber){
    return this.answerData1[qNumber]
  }
  
  show2(qNumber){
    return this.answerData2[qNumber]
  }
  
  show3(qNumber){
    return this.answerData3[qNumber]
  }
  
  show4(qNumber){
    return this.answerData4[qNumber]
  }
  
  checkAnswer(field){
    if(field === this.answerCorrect[this.props.qNumber]){
      alert("正解！クリックで次へ");
      this.props.addPoint();
    }else{
      var a = this.answerData[this.props.qNumber];
      alert("不正解。正解は" + a + "でした");
    }
    this.props.nextQuiz();

  }
  
  render(){
      const style1 = {
        'backgroundColor' : '#E44175'
      };
      const style2 = {
        'backgroundColor' : '#313198'
      };
      const style3 = {
        'backgroundColor' : '#EFA92A'
      };
      const style4 = {
        'backgroundColor' : '#178D56'
      };
    return(
      <div className="showquiz">
        question number:
        {this.props.qNumber}
        <button onClick={() => this.props.nextQuiz()}>
          次の問題
        </button>
        <br />
        <div id="quizData">
          {this.showQuestion(this.props.qNumber)}
        </div>
        <DragDropContainer>
        <img src="./circle.png" id="circle" alt="circle" draggable="true"></img>
        </DragDropContainer>
        <div className="container-fluid">
          <div className="row">
          
            <div className="col-sm-3" style={style1}>
              <DropTarget onHit={() => this.checkAnswer("1")}>
                <div id={"answerData1"}>
                    {this.show1(this.props.qNumber)}
                </div>
              </DropTarget>
            </div>
            
            
            <div className="col-sm-3" style={style2}>
              <DropTarget onHit={() => this.checkAnswer("2")}>
                <div id={"answerData2"}>
                    {this.show2(this.props.qNumber)}
                </div>
              </DropTarget>
            </div>
            
            <div className="col-sm-3" style={style3}>
              <DropTarget onHit={() => this.checkAnswer("3")}>
                <div id={"answerData3"}>
                    {this.show3(this.props.qNumber)}
                </div>
              </DropTarget>
            </div>
            
            <div className="col-sm-3" style={style4}>
              <DropTarget onHit={() => this.checkAnswer("4")}>
                <div id={"answerData4"}>
                    {this.show4(this.props.qNumber)}
                </div>
              </DropTarget>
            </div>
          </div>
       </div>
       
      </div>
      )
  }
}

class Quiz extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      qNumber : 0,
      score : 0
    };
    this.child = React.createRef();
    this.nextQuiz = this.nextQuiz.bind(this);
    this.addPoint = this.addPoint.bind(this);
  }
  
  nextQuiz(){
    if(this.state.qNumber < 5){
      this.setState({
        qNumber : this.state.qNumber + 1
      });
      this.props.setScore(this.state.score)
      this.child.current.resettimer();
    }else{
      
      this.props.nextPhase()
    }
  }
  
  addPoint(){
    this.setState({score : this.state.score + 1})
  }

  render(){
    return(
      <div className="game">
        Game page
        Score:
        {this.state.score}
        <Timer
          nextQuiz = {this.nextQuiz}
          ref={this.child}
        />
        <ShowQuiz
          qNumber={this.state.qNumber}
          nextQuiz={this.nextQuiz}
          addPoint={this.addPoint}
        />
        Qnumber{this.state.qNumber}
      </div>
      )
  }
}

class Score extends React.Component{
  render(){
    return(
        <div className="score">
              <div id="finalscore1">おわりあなたのスコアは：</div>
              <div id="finalscore">{this.props.score}</div>
        </div>
      )
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.nextPhase = this.nextPhase.bind(this);
    this.setScore = this.setScore.bind(this);
    this.state = {
      gamePhase : 1,
      finalscore : 0
    };
  }
  
  nextPhase(){
    this.setState({
      gamePhase : this.state.gamePhase + 1
    })
  }
  
  setScore(score){
    this.setState({finalscore : score})
  }
  
  render(){
    let gameScreen;
    if(this.state.gamePhase === 1){
      gameScreen = <Title nextPhase={this.nextPhase}/>
    }else if(this.state.gamePhase === 2){
      gameScreen = <Quiz
      setScore={this.setScore}
      nextPhase={this.nextPhase}
      />
    }else{
      gameScreen = <Score
        score={this.state.finalscore}
      />
    }
    
    return(
        <div className="game">
          {gameScreen}
        </div>
      )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);