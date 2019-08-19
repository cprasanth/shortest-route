import React from 'react';
import Dijkstra from './dijkstra';

it('returns shortest route', () => {
    let dijkstra = new Dijkstra();
    expect(dijkstra.findShortestRoute('B', 'H')).toStrictEqual(['B', 'D', 'G', 'H', '10']);
});
