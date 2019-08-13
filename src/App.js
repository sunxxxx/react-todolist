import React from 'react';
import './App.css';
// import { thisExpression } from '@babel/types';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      allList: [],
      checkList: [],
      activeList: [],
      completedList: []
    };
    this.toggleChecked = this.toggleChecked.bind(this)
  }

  componentDidMount(){

  }

  add(e){
    if(window.event.keyCode === 13 && e.target.value){
      var i = this.state.allList.length
      let newItem = {
        id: i,
        value:e.target.value,
        checked: false
      }
      this.setState({allList:[...this.state.allList,newItem]})
      this.setState({list:[...this.state.allList,newItem]})
      // let {list}= this.state
      // list.push({value:e.target.value})
      // this.setState({list})
        e.target.value = '' 
      }
  }


  changeAll(){
    this.setState({list:this.state.allList})
  }

  changeActive(){
    this.state.activeList = this.state.allList.filter(function (todo) {
      return !todo.checked;
    })
    this.setState({list:this.state.activeList})
  }

  changeCompleted(){
    this.state.completedList = this.state.allList.filter(function (todo) {
      return todo.checked;
    });
    this.setState({list:this.state.completedList})
  }

  toggleChecked(e,index){
    this.state.list[index].checked = e.target.checked
    this.setState({list:this.state.list})
  }

  delect(index){
    let indexNumber = this.state.allList.indexOf(this.state.list[index])
    this.state.list.splice(index,1)
    this.state.allList.splice(indexNumber,1)
    this.setState({list:this.state.list})
    this.setState({allList:this.state.allList})
  }

  allChecked(){
    if(this.state.list[0].checked == false){
      for(let i=0;i<this.state.list.length;i++){
        this.state.list[i].checked = true
      }
    }else{
      for(let i=0;i<this.state.list.length;i++){
        this.state.list[i].checked = false
      }
    }
    this.setState({list:this.state.list})
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
            {this.state.list.map((todo,index) => (
              <div key={'li'+todo.id}>
                <input type="checkbox" onChange={(e) => this.toggleChecked(e,index)} checked={todo.checked} />
                <label className={todo.checked == true ? 'lineThrough': ''}>{todo.value}</label>
                <span className="right cancle" onClick={this.delect.bind(this,index)}>+</span>
              </div>

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
