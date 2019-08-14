import React from 'react';
import './App.css';
import ListItem from './listItem'
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
        itemId: JSON.parse(itemId)
			}
		);
  }



  add(e){
    if(window.event.keyCode === 13 && e.target.value){
      let newItem = {
        id: this.state.itemId,
        value:e.target.value,
        checked: false
      }

      let itemExist
      for(let i=0;i<this.state.allList.length;i++){
        itemExist = (this.state.allList[i].value === newItem.value?true:false)
      }
      console.log(itemExist)
      if(!itemExist){
        var itemId = this.state.itemId+1

        this.setState({
          allList:[...this.state.allList,newItem],
          list:[...this.state.list,newItem],
          itemId: itemId
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
      
      // this.setState({list:[...this.state.list,newItem]},()=>{
        
      // })


      
  }




  changeAll(){
    // this.setState({})
    this.setState({list:this.state.allList,activeLable:0},()=>{
    })
  }

  changeActive(){
    this.setState({activeLable:1},()=>{
      console.log(this.state.activeLable)
    })
    // this.state.activeLable = 1
    let activeList = this.state.allList.filter(todo=>!todo.checked)
    this.setState({list:activeList})
  }

  changeCompleted(){
    this.setState({activeLable:2},()=>{
      console.log(this.state.activeLable)
    })
    // this.state.activeLable = 2
    let completedList = this.state.allList.filter(todo=>todo.checked);
    this.setState({list:completedList})
  }


  allChecked = (e) => {
    if(this.state.list.length>0){
      let allChecked = e.target.checked
      if(this.state.list[0].checked === false){
          allChecked = true        
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

  delectAll(){
    this.setState({list:[]})
    window.localStorage.setItem('toDoList', []);
  }

  render(){
    return (
      <div className="App">
        <header>
          <h1>
            To Do List
          </h1>
        </header>
        <div className="class">
          <div className="inputBox">
            <input className="input" type="text" onKeyDown={this.add.bind(this)} placeholder="What needs to be done?" />
            <i className="allChecked" onClick={this.allChecked.bind(this)}>></i>
          </div>


          <ListItem allList={this.state.allList} list={this.state.list} activeLable={this.state.activeLable} changeActive={this.changeActive} changeCompleted={this.changeCompleted} />

        </div>
        <footer>
            <input className="all_checked left" type="checkbox" onClick={(e)=>this.allChecked(e)}  />
            <div className="left">{this.state.list.length} items left</div>
            {this.state.allChecked}
            { this.state.allChecked &&
              <button onClick={this.delectAll.bind(this)}>Delect All</button>
            }
            <div className="btns right">
                <div className={this.state.activeLable === 0 ? 'activeBtn':''} onClick={this.changeAll.bind(this)}>All</div>
                <div className={this.state.activeLable === 1 ? 'activeBtn':''} onClick={this.changeActive.bind(this)}>Active</div>
                <div className={this.state.activeLable === 2 ? 'activeBtn':''} onClick={this.changeCompleted.bind(this)}>Completed</div>
            </div>
        </footer>
      </div>
    );
  }
}

export default App;
