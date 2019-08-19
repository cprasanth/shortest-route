class NodeVertex {
  nameOfVertex: string = "";
  weight: number = 0;
}

class Vertex {
  name: string;
  nodes: NodeVertex[];
  weight: number;

  constructor(theName: string, theNodes: NodeVertex[], theWeight: number) {
    this.name = theName;
    this.nodes = theNodes;
    this.weight = theWeight;
  }
}

export default class Dijkstra {

  vertices: any;
  constructor() {
    this.vertices = {};
    //TODO: option to add vertices from the app
    this.vertices['A'] = new Vertex('A', [{ nameOfVertex: 'C', weight: 2 }], 1);
    this.vertices['B'] = new Vertex("B", [{ nameOfVertex: "D", weight: 4 }, { nameOfVertex: "E", weight: 7 }], 1);
    this.vertices['C'] = new Vertex("C", [{ nameOfVertex: "A", weight: 2 }, { nameOfVertex: "D", weight: 1 }, { nameOfVertex: "F", weight: 4 }], 1);
    this.vertices['D'] = new Vertex("D", [{ nameOfVertex: "F", weight: 1 }, { nameOfVertex: "G", weight: 2 }, { nameOfVertex: "B", weight: 4 }, { nameOfVertex: "C", weight: 1 }], 1);
    this.vertices['E'] = new Vertex("E", [{ nameOfVertex: "H", weight: 10 }, { nameOfVertex: "B", weight: 7 }], 1);
    this.vertices['F'] = new Vertex("F", [{ nameOfVertex: "G", weight: 3 }, { nameOfVertex: "D", weight: 1 }, { nameOfVertex: "C", weight: 4 }], 1);
    this.vertices['G'] = new Vertex("G", [{ nameOfVertex: "H", weight: 4 }, { nameOfVertex: "D", weight: 2 }, { nameOfVertex: "F", weight: 3 }], 1);
    this.vertices['H'] = new Vertex("H", [{ nameOfVertex: "G", weight: 4 }, { nameOfVertex: "E", weight: 10 }], 1);
  }

  findRoute(start: string, finish: string, weight: number): string[] {

    let nextVertex: string = finish;
    let arrayWithVertex: string[] = [];
    while (nextVertex !== start) {

      let minWeight: number = Number.MAX_VALUE;
      let minVertex: string = "";
      for (let i of this.vertices[nextVertex].nodes) {
        if (i.weight + this.vertices[i.nameOfVertex].weight < minWeight) {
          minWeight = this.vertices[i.nameOfVertex].weight;
          minVertex = i.nameOfVertex;
        }
      }
      arrayWithVertex.push(minVertex);
      nextVertex = minVertex;
    }
    return arrayWithVertex;
  }


  findShortestRoute(start: string, finish: string): string[] {

    let nodes: any = {};
    for (let i in this.vertices) {
      if (this.vertices[i].name === start) {
        this.vertices[i].weight = 0;

      } else {
        this.vertices[i].weight = Number.MAX_VALUE;
      }
      nodes[this.vertices[i].name] = this.vertices[i].weight;
    }

    while (Object.keys(nodes).length !== 0) {
      let sortedVisitedByWeight: string[] = Object.keys(nodes).sort((a, b) => this.vertices[a].weight - this.vertices[b].weight);
      let currentVertex: Vertex = this.vertices[sortedVisitedByWeight[0]];
      for (let j of currentVertex.nodes) {
        const calculateWeight: number = currentVertex.weight + j.weight;
        if (calculateWeight < this.vertices[j.nameOfVertex].weight) {
          this.vertices[j.nameOfVertex].weight = calculateWeight;
        }
      }
      delete nodes[sortedVisitedByWeight[0]];
    }
    const finishWeight: number = this.vertices[finish].weight;
    let arrayWithVertex: string[] = this.findRoute(start, finish, finishWeight).reverse();
    arrayWithVertex.push(finish, finishWeight.toString());
    return arrayWithVertex;
  }
}