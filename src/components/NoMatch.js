import React, { Component } from 'react';

class NoMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: props.hidden,
      intervalId: null
    };
  }

  componentDidMount() {
    this.state.hidden && this.startRenderTimer();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  startRenderTimer = () =>
    this.setState({
      intervalId: setInterval(() => this.setState({ hidden: false }), 500)
    });

  render() {
    const { hidden } = this.state;
    return hidden ? (
      <div className="no-match hidden">
        <h3>
          No match for <code>{this.props.location.pathname}</code>
        </h3>
      </div>
    ) : (
      <div className="no-match">
        <h3>
          No match for <code>{this.props.location.pathname}</code>
        </h3>
      </div>
    );
  }
}

export default NoMatch;
