import React from 'react';
import Dijkstra from './dijkstra';

class App extends React.Component {
  state = {
    startVertex: '',
    endVertex: '',
    route: [],
  }
  dijkstra = new Dijkstra();

  setEndVertex = (vertex: string) => {
    if (this.state.startVertex !== '' && this.state.endVertex !== '') {
      this.setState({ startVertex: vertex, endVertex: '', route: [] });
    } else if (this.state.startVertex !== '') {
      this.setState({ endVertex: vertex, route: this.dijkstra.findShortestRoute(this.state.startVertex, vertex) });
    } else {
      this.setState({ startVertex: vertex, route: [] });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Shortest Route Finder</h1>
        <h2>Select a start and end point</h2>
        <button onClick={() => this.setEndVertex('A')}>A</button>
        <button onClick={() => this.setEndVertex('B')}>B</button>
        <button onClick={() => this.setEndVertex('C')}>C</button>
        <button onClick={() => this.setEndVertex('D')}>D</button>
        <button onClick={() => this.setEndVertex('E')}>E</button>
        <button onClick={() => this.setEndVertex('F')}>F</button>
        <button onClick={() => this.setEndVertex('G')}>G</button>
        <button onClick={() => this.setEndVertex('H')}>H</button>
        <p>Start: {this.state.startVertex}</p>
        <p>End: {this.state.endVertex}</p>
        <div>Route: {this.state.route}</div>
      </div>
    );
  }
}

export default App;
