// Read this blog post about how to set timers in JS:
// https://www.freecodecamp.org/news/javascript-timers-everything-you-need-to-know-5f31eaa37162/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seshLen: 25,
      brkLen: 5,
      working: true,
      active: false,
      time: 1500 };


    // Bind methods here
    this.reset = this.reset.bind(this);
    this.seshInc = this.seshInc.bind(this);
    this.seshDec = this.seshDec.bind(this);
    this.brkInc = this.brkInc.bind(this);
    this.brkDec = this.brkDec.bind(this);
    this.formatTimer = this.formatTimer.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.doIt = this.doIt.bind(this);
    this.playSound = this.playSound.bind(this);
    this.stopSound = this.stopSound.bind(this);
  }

  reset() {
    clearInterval(this.timerId);
    this.setState({
      seshLen: 25,
      brkLen: 5,
      working: true,
      active: false,
      time: 1500 });

    const sound = document.getElementById("beep");
    this.stopSound(sound);
  }

  formatTimer() {
    let minutes = Math.floor(this.state.time / 60);
    let seconds = this.state.time - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ":" + seconds;
  }

  playSound(arg) {
    arg.currentTime = 0;
    arg.play();
  }

  stopSound(arg) {
    arg.pause();
    arg.currentTime = 0;
  }

  seshInc() {
    if (this.state.active == false) {
      this.state.seshLen < 60 ? this.setState({
        seshLen: this.state.seshLen + 1,
        brkLen: this.state.brkLen,
        working: this.state.working,
        active: this.state.active,
        time: this.state.time + 60 }) :
      false;
    }
  }

  seshDec() {
    if (this.state.active == false) {
      this.state.seshLen > 1 ? this.setState({
        seshLen: this.state.seshLen - 1,
        brkLen: this.state.brkLen,
        working: this.state.working,
        active: this.state.active,
        time: this.state.time - 60 }) :
      false;
    }
  }

  brkInc() {
    if (this.state.active == false) {
      this.state.brkLen < 60 ? this.setState({
        seshLen: this.state.seshLen,
        brkLen: this.state.brkLen + 1,
        working: this.state.working,
        active: this.state.active,
        time: this.state.time }) :
      false;
    }
  }

  brkDec() {
    if (this.state.active == false) {
      this.state.brkLen > 1 ? this.setState({
        seshLen: this.state.seshLen,
        brkLen: this.state.brkLen - 1,
        working: this.state.working,
        active: this.state.active,
        time: this.state.time }) :
      false;
    }
  }

  doIt() {
    if (this.state.active == false) {
      this.setState({
        seshLen: this.state.seshLen,
        brkLen: this.state.brkLen,
        working: this.state.working,
        active: true,
        time: this.state.time });


      this.timerId = setInterval(this.runTimer, 1000);
    } else if (this.state.active == true) {
      this.setState({
        seshLen: this.state.seshLen,
        brkLen: this.state.brkLen,
        working: this.state.working,
        active: false,
        time: this.state.time });

      clearInterval(this.timerId);
    }
  }



  runTimer() {
    if (this.state.active == true && this.state.time > 0 && this.state.working == true) {
      this.setState({
        seshLen: this.state.seshLen,
        brkLen: this.state.brkLen,
        working: this.state.working,
        active: this.state.active,
        time: this.state.time - 1 });

    } else if (this.state.active == true && this.state.time > 0 && this.state.working == false) {
      this.setState({
        seshLen: this.state.seshLen,
        brkLen: this.state.brkLen,
        working: this.state.working,
        active: this.state.active,
        time: this.state.time - 1 });

    } else if (this.state.active == true && this.state.time == 0) {
      console.log("Timer done!");
      const sound = document.getElementById("beep");
      console.log(sound);
      this.playSound(sound);
      let time = 0;
      this.state.working == true ? time = this.state.brkLen * 60 : time = this.state.seshLen * 60;
      this.setState({
        seshLen: this.state.seshLen,
        brkLen: this.state.brkLen,
        working: !this.state.working,
        active: this.state.active,
        time: time });

    }
  }

  // render the app here

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "main" }, /*#__PURE__*/
      React.createElement("audio", { id: "beep", src: "https://www.myinstants.com/media/sounds/dj-khaled-baby-you-smart-you-very-smart.mp3" }), /*#__PURE__*/

      React.createElement("h1", null, "FCC 25 + 5 Clock"), /*#__PURE__*/
      React.createElement("div", { id: "container" }, /*#__PURE__*/

      React.createElement("div", { id: "timer-controls" }, /*#__PURE__*/
      React.createElement("div", { id: "start_stop", className: "timer-controls btn-text", onClick: this.doIt }, " START"), /*#__PURE__*/

      React.createElement("div", { id: "reset", className: "timer-controls btn-text", onClick: this.reset }, " RESET")), /*#__PURE__*/


      React.createElement("div", { id: "timer-label" }, /*#__PURE__*/
      React.createElement("p", null, this.state.working == true ? "Session" : "Break"), /*#__PURE__*/
      React.createElement("div", { id: "time-left" },
      this.formatTimer())), /*#__PURE__*/


      React.createElement("div", { id: "controls-time" }, /*#__PURE__*/
      React.createElement("div", { className: "ctrl-txt" }, " Session", /*#__PURE__*/
      React.createElement("div", { id: "session-label" }, /*#__PURE__*/
      React.createElement("div", { id: "session-increment", className: "btn-txt", onClick: this.seshInc }, " +"), /*#__PURE__*/

      React.createElement("div", { id: "session-length", className: "btn-txt" }, " ", this.state.seshLen), /*#__PURE__*/

      React.createElement("div", { id: "session-decrement", className: "btn-txt", onClick: this.seshDec }, " -"))), /*#__PURE__*/



      React.createElement("div", { className: "ctrl-txt" }, " Break", /*#__PURE__*/
      React.createElement("div", { id: "break-label" }, /*#__PURE__*/
      React.createElement("div", { id: "break-increment", className: "btn-txt", onClick: this.brkInc }, " +"), /*#__PURE__*/

      React.createElement("div", { id: "break-length", className: "btn-txt" }, " ", this.state.brkLen), /*#__PURE__*/

      React.createElement("div", { id: "break-decrement", className: "btn-txt", onClick: this.brkDec }, " -")))))));







  }}


const lmnt = document.querySelector("#root");
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), lmnt);