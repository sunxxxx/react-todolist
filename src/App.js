import React from 'react';
import './App.css';
import ListItem from './listItem'
// import { thisExpression } from '@babel/types';



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      allList: [],
      activeLable: 0,
      itemId:0,
      allChecked: false
    };
  }

  componentWillMount(){
    const toDoList = window.localStorage.getItem('toDoList') || '[]';
    const itemId = window.localStorage.getItem('itemId') || 0;
    this.setState(
		  {
            list: JSON.parse(toDoList),
            allList: JSON.parse(toDoList),
            itemId: JSON.parse(itemId)
		  }
	  );
  }

  componentDidMount(){
    let allChecked = this.state.list.every( item => item.checked === true)
    this.setState({allChecked:allChecked},()=>{})
  }

  isAllChecked(data){
    this.setState({allChecked:data})
  }

  add(e){
    if(window.event.keyCode === 13 && e.target.value){
      let newItem = {
        id: this.state.itemId,
        value:e.target.value,
        checked: false
      }

      let itemExist = this.state.list.some( item => item.value === newItem.value)
      if(!itemExist){
        var itemId = this.state.itemId+1

        this.setState({
          allList:[...this.state.allList,newItem],
          list:[...this.state.list,newItem],
          itemId: itemId,
          allChecked: false
        },()=>{
          window.localStorage.setItem('toDoList', JSON.stringify(this.state.allList));
          window.localStorage.setItem('itemId', JSON.stringify(this.state.itemId));
        })

        // if(this.state.activeLable === '1'){
        //   this.changeActive()
        // }
          e.target.value = '' 
        }else{
          console.log('item exist')
        }
      }   
  }


  changeAll(){
    let allChecked = this.state.allList.every( item => item.checked === true)
    this.setState({
      list:this.state.allList,
      activeLable:0,
      allChecked:allChecked
    },()=>{})
  }

  changeActive(){
    let activeList = this.state.allList.filter(todo=>!todo.checked)
    this.setState({
      activeLable:1,
      list:activeList,
      allChecked: false,
    },()=>{})
  }

  changeCompleted(){
    let completedList = this.state.allList.filter(todo=>todo.checked);
    this.setState({
      activeLable:2,
      list:completedList,
      allChecked: false,
    },()=>{})
  }


  allChecked = (e) => {
    if(this.state.activeLable === 1){
      this.setState({
        allList: this.state.allList.map((item) => ({...item, 'checked': true})),
        list: []
      },()=>{
        window.localStorage.setItem('toDoList', JSON.stringify(this.state.allList));
      })
    }else if(this.state.activeLable === 2){
      this.setState({
        allList: this.state.allList.map((item) => ({...item, 'checked': false})),
        list: []
      },()=>{
        window.localStorage.setItem('toDoList', JSON.stringify(this.state.allList));
      })
    }else{
      if(this.state.list.length>0){
        let allChecked = e.target.checked
  
        let itemAllChecked = this.state.list.every( item => item.checked === true)
  
        if(!itemAllChecked){
          allChecked = true;
        }else{
          allChecked = false
        }
  
        this.setState({
            list: this.state.list.map((item) => ({...item, 'checked': allChecked})),
            allChecked: allChecked
        },()=>{
          window.localStorage.setItem('toDoList', JSON.stringify(this.state.list));
        })
      }
    }
    
  }

  delectAll(){
    this.setState({
        list:[],
        allList: [],
    })
    window.localStorage.setItem('toDoList', []);
  }

  render(){
    return (
      <div className="App">
        <header>
          <h1>
            todos
          </h1>
        </header>
        <div className="Box">
          <div className="inputBox">
            <input className="input" type="text" onKeyDown={this.add.bind(this)} placeholder="What needs to be done?" />
            {/* <i className="allChecked" onClick={this.allChecked.bind(this)}>></i> */}
          </div>


          <ListItem allList={this.state.allList} list={this.state.list} activeLable={this.state.activeLable} changeActive={this.changeActive} changeCompleted={this.changeCompleted} isAllChecked={this.isAllChecked.bind(this)} />

        
            <footer>
                <input className="checked left" type="checkbox" onChange={(e)=>this.allChecked(e)} checked={this.state.allChecked}  />
                <div className="left">{this.state.list.length} items left</div>
            
                { this.state.allChecked &&
                <button className="delect_btn" onClick={this.delectAll.bind(this)}>Delect All</button>
                }
                <div className="btns right">
                    <div className={this.state.activeLable === 0 ? 'activeBtn':''} onClick={this.changeAll.bind(this)}>All</div>
                    <div className={this.state.activeLable === 1 ? 'activeBtn':''} onClick={this.changeActive.bind(this)}>Active</div>
                    <div className={this.state.activeLable === 2 ? 'activeBtn':''} onClick={this.changeCompleted.bind(this)}>Completed</div>
                </div>
            </footer>
        </div>
      </div>
    );
  }
}

export default App;
