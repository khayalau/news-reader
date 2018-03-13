import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: 'doudou',
    url: 'https://github.com/reactjs/redux',
    author: 'lalala',
    num_comments: 12,
    points: 15,
    objectID: 2,
  },
];

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        list,
      };
      this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount(){
    console.log('Mounted!');
    fetch("https://hn.algolia.com/api/v1/search_by_date")
     .then(response => response.json())
     .then(responseJson => {
       this.displayArticles(responseJson.hits);
     })
     .catch();
  }
  
  onDismiss(id) {
      function isNotId(item) {
          return item.objectID !== id;
      }
      const updatedList = this.state.list.filter(isNotId);
      this.setState({ list: updatedList });
  }

  render() {
    return (
      <div className="App">
       <Table list={this.state.list} onDismiss={this.onDismiss}/>
      </div>
    );
  }
}

const Table = (props)=> {
  return(
    <table class="table table-bordered table-dark">
     {props.list.map(item =>
      <tr key={item.objectID}>
        <td>
          <a href={item.url}>{item.title}</a>
        </td>
        <td>{item.author}</td>
        <td>{item.num_comments}</td>
        <td>{item.points}</td>
        <td>
          <button class="btn btn-outline-warning" onClick={() => props.onDismiss(item.objectID)}>clickme</button>
        </td>
      </tr>
    )}
    </table>
  )
};

const Button = (props) =>
 <button type="button" onClick={props.onClick}>
  {props.children}
</button>

export default App;
