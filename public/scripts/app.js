"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var NPSApp = /*#__PURE__*/function (_React$Component) {
  _inherits(NPSApp, _React$Component);

  var _super = _createSuper(NPSApp);

  function NPSApp(props) {
    var _this;

    _classCallCheck(this, NPSApp);

    _this = _super.call(this, props);
    _this.handleCalculate = _this.handleCalculate.bind(_assertThisInitialized(_this));
    _this.state = {
      progressArray: [],
      numScoresNeeded: 0
    };
    return _this;
  }

  _createClass(NPSApp, [{
    key: "handleCalculate",
    value: function handleCalculate(e) {
      e.preventDefault();
      var rE = /^(-)?[0-9]\d{0,2}(\.\d{0,2})?$/;
      var curScore = e.target.elements.currentScore.value;
      var numScores = e.target.elements.numberScores.value;
      var goalScore = e.target.elements.goalScore.value;

      if (curScore < -100 || curScore >= 100 || !rE.test(curScore)) {
        e.target.elements.currentScore.value = '';
        return this.setState(function () {
          return {
            numScoresNeeded: 0,
            progressArray: [],
            error: 'Enter a valid current score'
          };
        });
      }

      if (goalScore <= -100 || goalScore >= 100 || !rE.test(goalScore)) {
        e.target.elements.goalScore.value = '';
        return this.setState(function () {
          return {
            numScoresNeeded: 0,
            progressArray: [],
            error: 'Enter a valid goal score.'
          };
        });
      }

      if (curScore >= goalScore) {
        return this.setState(function () {
          return {
            numScoresNeeded: 0,
            progressArray: [],
            error: "You've already hit your goal! Congrats!"
          };
        });
      }

      var predScore = curScore;
      var n = numScores;
      var pA = [];

      while (predScore < goalScore) {
        predScore = (predScore * parseInt(n) + 100) / (parseInt(n) + 1);
        n++;
        pA.push(Math.round(predScore * 100) / 100);
      }

      this.setState(function () {
        return {
          numScoresNeeded: pA.length,
          progressArray: pA,
          error: undefined
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "column"
      }, /*#__PURE__*/React.createElement(Input, {
        handleCalculate: this.handleCalculate,
        error: this.state.error
      })), /*#__PURE__*/React.createElement("div", {
        className: "column"
      }, /*#__PURE__*/React.createElement(Output, {
        numScoresNeeded: this.state.numScoresNeeded,
        progressArray: this.state.progressArray
      }))));
    }
  }]);

  return NPSApp;
}(React.Component);

var Header = function Header() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "NPS Calculator"), /*#__PURE__*/React.createElement("h3", null, "Calculates how many 100 scores you need to achieve a goal score"));
};

var Input = function Input(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: props.handleCalculate
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "currentScore"
  }, "Current Score:", /*#__PURE__*/React.createElement("input", {
    name: "currentScore",
    type: "text"
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "numberScores"
  }, "Number of Scores:", /*#__PURE__*/React.createElement("input", {
    name: "numberScores",
    type: "number"
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "goalScore"
  }, "Goal Score:", /*#__PURE__*/React.createElement("input", {
    name: "goalScore",
    type: "text"
  })), /*#__PURE__*/React.createElement("p", {
    className: "error"
  }, props.error), /*#__PURE__*/React.createElement("button", {
    id: "calculate-button"
  }, "Calculate")));
};

var Output = function Output(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("p", null, "Promoter Scores Needed: ", props.numScoresNeeded), props.progressArray && /*#__PURE__*/React.createElement("p", null, " "), /*#__PURE__*/React.createElement("ol", null, props.progressArray.map(function (score) {
    return /*#__PURE__*/React.createElement("li", {
      key: score
    }, /*#__PURE__*/React.createElement("p", null, score));
  })));
};

ReactDOM.render( /*#__PURE__*/React.createElement(NPSApp, null), document.getElementById('app'));
