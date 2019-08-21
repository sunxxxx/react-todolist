import React from 'react'
import { all } from 'q';


class ListItem extends React.Component{
    constructor(props){
        super(props)
        this.state={
            draging:null,
            dragIndex: 0,
            currentIndex:0
        }
    }

    toggleChecked(e,index){
        this.props.list[index].checked = e.target.checked
        if(e.target.checked === false){
            //设置全选是否选中状态
            this.props.isAllChecked(false)
        }else{
            let allChecked = this.props.list.every( item => item.checked === true)
            if(allChecked){
                this.props.isAllChecked(true)
            }
        }

          if(this.props.activeLable === 1){
            var allListIndex = this.props.toDoList[this.props.projectIndex].indexOf(this.props.list[index])
            this.props.list.splice(index,1)
            this.props.toDoList[this.props.projectIndex][allListIndex].checked = e.target.checked
            this.props.isAllChecked(false)
          }else if(this.props.activeLable === 2){
            this.props.list.splice(index,1)
            this.props.isAllChecked(false)
          }
          this.setState({
              list:this.props.list,
              allList: this.props.toDoList[this.props.projectIndex],
          })
    
      }

    delect(e,index){
        var listIndex = this.props.toDoList[this.props.projectIndex].indexOf(this.props.list[index])
        var list = this.props.toDoList[this.props.projectIndex].filter( item => item.value !== this.props.list[index].value)
        var allList = this.props.toDoList[this.props.projectIndex]
        allList.splice(listIndex,1)
        window.localStorage.setItem('toDoList', JSON.stringify(this.props.toDoList));
        this.props.changeParentState(allList)
    }

    onDragStart(e,index){
        //firefox设置了setData后元素才能拖动
        e.dataTransfer.setData("Text", e.target.innerText); //不能使用text，firefox会打开新tab
        this.state.draging = e.target;
        var dragIndex = this.props.toDoList[this.props.projectIndex].indexOf(this.props.list[index])
        this.setState({
            dragIndex:dragIndex,
            currentIndex:index
        })
    }

    onDragOver(e,index){
        e.preventDefault();
        var target = e.target;
        if (target.nodeName === "DIV"&&target !== this.state.draging) {
            if (this._index(this.state.draging) < this._index(target)) {
                target.parentNode.insertBefore(this.state.draging,target.nextSibling);
            } else {
                target.parentNode.insertBefore(this.state.draging, target);
            }
        }
    }

    onDragEnd(e,index){
        var allList = this.props.toDoList[this.props.projectIndex]
        var list = this.props.list
        var dragItem = allList[this.state.dragIndex]
        if (this.state.dragIndex < this._index(e.target)) {
            allList.splice(this.state.dragIndex,1)
            allList.splice(this._index(this.state.draging),0,dragItem) 
        }else if(this.state.dragIndex > this._index(e.target)){
            allList.splice(this.state.dragIndex,1)
            allList.splice(this._index(e.target),0,dragItem) 
        }
        this.props.changeParentState(allList)
        
    }

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
            <div className="listBox">
                {this.props.list && this.props.list.map((todo,index) => (
                <div key={todo.id} draggable="true" onDragStart={(e)=>{this.onDragStart(e,index)}} onDragOver={(e)=>{this.onDragOver(e,index)}} onDragEnd={(e)=>{this.onDragEnd(e,index)}}>
                    <input className="checked item_checked" type="checkbox" onChange={(e) => this.toggleChecked(e,index)} checked={todo.checked} />
                    <label className={todo.checked === true ? 'line_through': ''}>{todo.value}</label>
                    <span className="right cancle" onClick={(e)=>this.delect(e,index)}>+</span>
                </div>

                ))}
            </div>
        )
       
    }
}

export default ListItem;