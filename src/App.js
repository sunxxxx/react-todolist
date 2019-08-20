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
      projectIndex: 1,
      showAddInput: false
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
    });
  }

  componentDidMount(){
    let allChecked = this.state.list.every( item => item.checked === true)
    this.setState({allChecked:allChecked})
  }

  componentDidUpdate(){
    window.localStorage.setItem('toDoList', JSON.stringify(this.state.toDoList));
    window.localStorage.setItem('itemId', JSON.stringify(this.state.itemId));
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

      if(this.state.list){
      let itemExist = this.state.list.some( item => item.value === newItem.value)
        if(!itemExist && this.state.list){
          var itemId = this.state.itemId+1
          var allList
          if(this.state.toDoList[this.state.projectIndex]){
            allList = this.state.toDoList[this.state.projectIndex]
          }else{
            allList = this.state.toDoList[this.state.projectIndex] = new Array()
          }
          allList.unshift(newItem)
          
          this.setState({
            toDoList:this.state.toDoList,
            list:[...this.state.list,newItem].reverse(),
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
          var allList
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


  allChecked = (e) => {
    if(this.state.activeLable === 1){
      this.setState({
        allList: this.state.toDoList[this.state.projectIndex].map((item) => ({...item, 'checked': true})),
        list: []
      })
    }else if(this.state.activeLable === 2){
      this.setState({
        allList: this.state.toDoList[this.state.projectIndex].map((item) => ({...item, 'checked': false})),
        list: []
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

        let todoList = this.state.toDoList; 
        let project = todoList[this.state.projectIndex]
        project.map((item)=>({...item,'checked': allChecked}))
        
        for(let i=0;i<project.length;i++){
          project[i].checked = allChecked
        }
    
        this.setState({
            list: this.state.list.map((item) => ({...item, 'checked': allChecked})),
            allChecked: allChecked,
            toDoList: todoList
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

  addProject(){
    this.setState({showAddInput: true})
  }

  changeProject(index){
    this.setState({
      projectIndex:index,
      list: this.state.toDoList[this.state.projectIndex]
    })
    let itemAllChecked = this.state.list.every( item => item.checked === true)
    if(itemAllChecked){
      this.setState({allChecked: true})
    }else{
      this.setState({allChecked: false})
    }
  }

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
        },()=>{
          window.localStorage.setItem('projects', JSON.stringify(this.state.projects));
        })
      }
    }else{
      console.log("project exist!")
    }
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
                  <li key={project.id} onClick={this.changeProject.bind(this,index)} className={this.state.projectIndex === index ? "project_active":""}>{project.value}</li>
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

                
                <ListItem allList={this.state.toDoList[this.state.projectIndex]} projectIndex={this.state.projectIndex} list={this.state.list} activeLable={this.state.activeLable} changeActive={this.changeActive} changeCompleted={this.changeCompleted} isAllChecked={this.isAllChecked.bind(this)} />

                {this.state.projects.length>0 &&
                <footer>
                    <input className="checked left" type="checkbox" onChange={(e)=>this.allChecked(e)} checked={this.state.allChecked}  />
                    {this.state.list && 
                      <div className="left">{this.state.list.length} items left</div>
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
