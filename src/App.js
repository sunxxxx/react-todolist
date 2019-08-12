import React from 'react';
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      checkList: [],
      defaultChecked: false
    };
    this.toggleChecked = this.toggleChecked.bind(this)
  }

  componentDidMount(){

  }

  add(e){
    if(window.event.keyCode === 13 && e.target.value){
      this.setState({list:[...this.state.list,e.target.value]})
        e.target.value = '' 
      }
  }


  changeAll(){

  }

  changeActive(){
    var newList = this.state.list.filter(function (todo) {
      return !todo.completed;
    })

    this.setState(this.state.list,newList)
  }

  changeCompleted(){
    this.state.list = this.state.list.filter(function (todo) {
			return todo.completed;
		});
  }

  toggleChecked(e,index){
    console.log(index)
    this.state.list[index].checked = e.target.checked
    this.setState({list:this.state.list},()=>{
      console.log(this.state.list)
    })
  }

  cancle(e,index){
    console.log(e,index)
  }

  allChecked(e){
    // this.setState(state => {
    //   return { counters: [...state.counters, obj] };
    // });
  }

  render(){
    return (
      <div className="App">
        <header>
          <p>
            To DO List
          </p>
        </header>
        <div className="class">
          <div className="inputBox">
            <input className="input" type="text" onKeyDown={this.add.bind(this)} placeholder="What needs to be done?" />
            <i className="allChecked" onClick={this.allChecked.bind(this)}>></i>
          </div>
          <div className="listBox">
            {this.state.list.map((todo,index,key) => (
              <li key={todo.id}>{todo}
                <input type="checkbox" onChange={(e) => this.toggleChecked(e,index)} checked={this.state.defaultChecked} />
                <span className="right cancle" onClick={this.cancle.bind(this,todo.id)}>+</span>
              </li>

            ))}
          </div>
        </div>
        <footer>
            <div className="left">{this.state.list.length} items left</div>
            <div className="btns right">
                <div onClick={this.changeAll.bind(this)}>All</div>
                <div onClick={this.changeActive.bind(this)}>Active</div>
                <div onClick={this.changeCompleted.bind(this)}>Completed</div>
            </div>
        </footer>
      </div>
    );
  }
}

export default App;
