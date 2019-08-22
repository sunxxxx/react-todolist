import React from 'react';
import './App.css';
import ListItem from './listItem'
// import { thisExpression } from '@babel/types';



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      toDoList:[],
      activeLable: 0,
      itemId:0,
      allChecked: false,
      projects:[],
      projectIndex: 0,
      showAddInput: false,
      draging:null,
      dragIndex: 0,
      currentIndex:0
    };
  }

  componentWillMount(){
    const toDoList = window.localStorage.getItem('toDoList') || "[]";
    const projects = window.localStorage.getItem('projects') || "[]";
    const itemId = window.localStorage.getItem('itemId') || 0;
    
    var list 
    if((JSON.parse(toDoList))[this.state.projectIndex] != null){
      list = (JSON.parse(toDoList))[this.state.projectIndex]
    }else{
      list = new Array()
    }

    this.setState({
      list: list,
      toDoList: JSON.parse(toDoList),
      itemId: JSON.parse(itemId),
      projects: JSON.parse(projects)
    },()=>{
      console.log(this.state.toDoList)
    });
  }

  componentDidMount(){
    let allChecked = this.state.list.every( item => item.checked === true)
    this.setState({allChecked:allChecked})
  }

  componentDidUpdate(){
    window.localStorage.setItem('toDoList', JSON.stringify(this.state.toDoList));
    window.localStorage.setItem('itemId', JSON.stringify(this.state.itemId));
    window.localStorage.setItem('projects', JSON.stringify(this.state.projects));
  }

  isAllChecked(data){
    this.setState({allChecked:data})
  }

  add(e){
    if(window.event.keyCode === 13 && e.target.value){
      let newItem = {
        id: this.state.projectIndex.toString() + '-' + this.state.itemId,
        value:e.target.value,
        checked: false
      }
      var itemId = this.state.itemId+1
      var allList
      if(this.state.list){
      let itemExist = this.state.list.some( item => item.value === newItem.value)
        if(!itemExist && this.state.list){
          if(this.state.toDoList[this.state.projectIndex]){
            allList = this.state.toDoList[this.state.projectIndex]
          }else{
            allList = this.state.toDoList[this.state.projectIndex] = new Array()
          }
          allList.unshift(newItem)
          
          this.setState({
            toDoList:this.state.toDoList,
            list:allList,
            itemId: itemId,
            allChecked: false
          })

          // if(this.state.activeLable === '1'){
          //   this.changeActive()
          // }
            e.target.value = '' 
          }else{
            console.log('item exist')
          }
        }else{
          allList = this.state.toDoList[this.state.projectIndex] = new Array()
          allList.unshift(newItem)
          
          this.setState({
            toDoList:this.state.toDoList,
            list:allList,
            itemId: itemId,
            allChecked: false
          })
            e.target.value = '' 
        }
      } 
  }


  changeAll(){
    let allChecked = this.state.toDoList[this.state.projectIndex].every( item => item.checked === true)
    this.setState({
      list:this.state.toDoList[this.state.projectIndex],
      activeLable:0,
      allChecked:allChecked
    })
  }

  changeActive(){
    let activeList = this.state.toDoList[this.state.projectIndex].filter(todo=>!todo.checked)
    this.setState({
      activeLable:1,
      list:activeList,
      allChecked: false,
    })
  }

  changeCompleted(){
    let completedList = this.state.toDoList[this.state.projectIndex].filter(todo=>todo.checked);
    this.setState({
      activeLable:2,
      list:completedList,
      allChecked: false,
    })
  }

//判断是否当前ListItem全选
  allChecked = (e) => {
    var toDoList = this.state.toDoList; 
    var allList = toDoList[this.state.projectIndex]
    if(this.state.activeLable === 1){
        for(let i=0;i<allList.length;i++){
            allList[i].checked = true
        }
      this.setState({
        allList: allList,
        list: [],
        toDoList: toDoList
      })
    }else if(this.state.activeLable === 2){
        for(let i=0;i<allList.length;i++){
            allList[i].checked = false
        }
      this.setState({
        allList: allList,
        list: [],
        toDoList: toDoList
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
        
        let list = toDoList[this.state.projectIndex]
        for(let i=0;i<list.length;i++){
            list[i].checked = allChecked
        }
    
        this.setState({
            list: list,
            allChecked: allChecked,
            toDoList: toDoList
        })
      }
    }  
  }

  delectAll(){
    let todoList = this.state.toDoList; 
    todoList[this.state.projectIndex]=[]

    this.setState({
        list:[],
        toDoList: todoList,
    })
  }
//新建project按钮事件
  addProject(){
    this.setState({showAddInput: true})
  }
//切换projects
  changeProject(index){
    this.setState({
      projectIndex:index,
      allList:this.state.toDoList[index],
      list: this.state.toDoList[index],
      activeLable:0
    },()=>{
      if(this.state.list){
        let itemAllChecked = this.state.list.every( item => item.checked === true)
        if(itemAllChecked){
          this.setState({allChecked: true})
        }else{
          this.setState({allChecked: false})
        }
      }
    }) 
  }
//新建project保存
  newProject(e){
    let length = this.state.projects.length
    let newItem = {
      id: length,
      value:e.target.value,
    }

    let projectExist = this.state.projects.some( item => item.value === newItem.value)
    if(!projectExist){
      if(window.event.keyCode === 13 && e.target.value){
        this.setState({
          showAddInput: false,
          projects:[...this.state.projects,newItem]
        })
      }
    }else{
      console.log("project exist!")
    }
  }

  changeParentState(val){
    var allList  = val
    var list
    this.state.toDoList[this.state.projectIndex] = allList
    switch (this.state.activeLable) {
      case 0:
        list = allList
        break;
      case 1:
        list = this.state.toDoList[this.state.projectIndex].filter(todo=>!todo.checked)
        break;
      case 2:
        list = this.state.toDoList[this.state.projectIndex].filter(todo=>todo.checked)
        break;
      default:
        list = allList;
    }
    this.setState({
      toDoList: this.state.toDoList,
      allList: allList,
      list: list
    })
  }


  //拖拉排序
  onDragStart(e){
    //firefox设置了setData后元素才能拖动
    e.dataTransfer.setData("Text", e.target.innerText); //不能使用text，firefox会打开新tab
    this.state.draging = e.target;
    var index
    for(let i=0; i<this.state.list.length; i++){
      if(this.state.list[i].value === e.target.childNodes[1].innerHTML){
        index = i
      }
    }
    var dragIndex = this.state.toDoList[this.state.projectIndex].indexOf(this.state.list[index])
    this.setState({
        dragIndex:dragIndex,
        currentIndex:index
    })
    
  }

  onDragOver(e){
      e.preventDefault();
      var target = e.target;
      if (target !== this.state.draging) {
        console.log(this._index(this.state.draging),this._index(target))
          if (this._index(this.state.draging) < this._index(target)) {
              target.parentNode.insertBefore(this.state.draging,target.nextSibling);
          } else {
              target.parentNode.insertBefore(this.state.draging, target);
          }
      }
  }

  onDragEnd(e){
      var allList = this.state.toDoList[this.state.projectIndex]
      var dragItem = allList[this.state.dragIndex]
      if (this.state.dragIndex < this._index(e.target)) {
          allList.splice(this.state.dragIndex,1)
          allList.splice(this._index(this.state.draging),0,dragItem) 
      }else if(this.state.dragIndex > this._index(e.target)){
          allList.splice(this.state.dragIndex,1)
          allList.splice(this._index(e.target),0,dragItem) 
      }
      this.changeParentState(allList) 
  }
//获取拖拉元素index，判断插入位置
  _index(el) {
      var index = 0;
      if (!el || !el.parentNode) {
          return -1;
      }
      while (el && (el = el.previousElementSibling)) {
          index++;
      }
      return index;
  }

  render(){
    return (
      <div className="App">
        <header>
          <h1>
            todos
          </h1>
        </header>
        <div className="container">
            <div className="projectBox">
              <ul className="project">
              <h5>Projects</h5>
                {this.state.projects.map((project,index) => (
                  <li key={project.id} onClick={this.changeProject.bind(this, index)} className={this.state.projectIndex === index ? "project_active":""}>{project.value}</li>
                ))}
                {this.state.showAddInput &&
                  <input className="add_project_input" placeholder="Add Your Project" onKeyDown={this.newProject.bind(this)} />
                }
                {!this.state.showAddInput &&
                  <button onClick={this.addProject.bind(this)} className="add_project_btn">Add Project</button>
                }
              </ul>
            </div>
            <div className="Box">
                <div className="inputBox">
                    <input className="input" type="text" onKeyDown={this.add.bind(this)} placeholder="What needs to be done?" />
                    {/* <i className="allChecked" onClick={this.allChecked.bind(this)}>></i> */}
                </div>
                <div className="listBox" onDragStart={this.onDragStart.bind(this)} onDragOver={this.onDragOver.bind(this)} onDragEnd={this.onDragEnd.bind(this)}>
                  {this.state.list && this.state.list.map((todo,index) => (
                    <ListItem  key={todo.id} todo={todo} index={index} toDoList={this.state.toDoList} projectIndex={this.state.projectIndex} list={this.state.list} activeLable={this.state.activeLable} isAllChecked={this.isAllChecked.bind(this)} changeParentState={this.changeParentState.bind(this)} />
                  ))}
                </div>

                {this.state.projects.length>0 &&
                <footer>
                    {this.state.list && 
                      <div>
                        <input className="checked left" type="checkbox" onChange={this.allChecked.bind(this)} checked={this.state.allChecked}  />
                        <div className="left">{this.state.list.length} items left</div>
                      </div>
                    }

                    { this.state.allChecked &&
                    <button className="delect_btn" onClick={this.delectAll.bind(this)}>Delect All</button>
                    }
                    <div className="btns right">
                        <div className={this.state.activeLable === 0 ? "activeBtn":""} onClick={this.changeAll.bind(this)}>All</div>
                        <div className={this.state.activeLable === 1 ? "activeBtn":""} onClick={this.changeActive.bind(this)}>Active</div>
                        <div className={this.state.activeLable === 2 ? "activeBtn":""} onClick={this.changeCompleted.bind(this)}>Completed</div>
                    </div>
                </footer>
                }
                {this.state.projects.length<=0 &&
                  <footer>
                    <h3>Please add your project first!</h3>
                  </footer>
                }
            </div>
        </div>
      </div>
    );
  }
}

export default App;
