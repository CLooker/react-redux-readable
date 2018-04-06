import React from 'react';
import Loader from 'react-dots-loader';
import 'react-dots-loader/index.css';

class Loading extends React.Component {
  render() {
    return (
      <div
        className="loading"
        style={this.props.style || { marginTop: '120px' }}
      >
        <h4>Loading</h4>
        <div>
          <Loader size={5} />
        </div>
      </div>
    );
  }
}

export default Loading;
