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
      completedList: [],
      activeLable: 0,
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
      this.setState({activeList:[...this.state.activeList,newItem]})

      if(this.state.activeLable === '0'){
        this.setState({list:[...this.state.allList,newItem]})
      }else if(this.state.activeLable === '1'){
        this.setState({list:[...this.state.activeList,newItem]})
      }
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
    this.state.activeLable = '1'
    let activeList = this.state.allList.filter(todo=>!todo.checked)
    this.setState({list:activeList})
  }

  changeCompleted(){
    this.state.activeLable = '2'
    let completedList = this.state.allList.filter(todo=>todo.checked);
    this.setState({list:completedList})
  }

  toggleChecked(e,index){
    this.state.list[index].checked = e.target.checked
    if(this.state.activeLable !== '0'){
      this.state.list.splice(index,1)
      if(this.state.activeLable !== '1'){
        this.changeActive()
      }else if(this.state.activeLable !== '2'){
        this.changeCompleted()
      }
    }
    this.setState({list:this.state.list})
  }

  delect(index){
    let allListIndex = this.state.allList.indexOf(this.state.list[index])
    let activeIndex = this.state.activeList.indexOf(this.state.list[index])
    console.log(activeIndex)
    this.state.list.splice(index,1)
    this.state.allList.splice(allListIndex,1)
    this.state.activeList.splice(activeIndex,1)
    this.setState({list:this.state.list})
    this.setState({allList:this.state.allList})
    this.setState({activeList:this.state.activeList})
  }

  allChecked(){
    if(this.state.list[0].checked === false){
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
                <label className={todo.checked === true ? 'lineThrough': ''}>{todo.value}</label>
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
