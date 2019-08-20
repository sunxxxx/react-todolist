import React from 'react'


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
            var allListIndex = this.props.allList.indexOf(this.props.list[index])
            this.props.list.splice(index,1)
            this.props.allList[allListIndex].checked = e.target.checked
            this.props.isAllChecked(false)
          }else if(this.props.activeLable === 2){
            this.props.list.splice(index,1)
            this.props.isAllChecked(false)
          }
          this.setState({
              list:this.props.list,
              allList: this.props.allList,
            },()=>{
            // window.localStorage.setItem('toDoList', JSON.stringify(this.props.allList));
          })
    
      }

    delect(e,index){
        var listIndex = this.props.allList.indexOf(this.props.list[index])
        if(this.props.activeLable === 0){
            this.props.list.splice(index,1)
            this.setState({
                list:this.props.list,
                allList:this.props.list
            },()=>{
                // window.localStorage.setItem('toDoList', JSON.stringify(this.props.list));
            })
        }else{
            this.props.list.splice(index,1)
            this.props.allList.splice(listIndex,1)
            this.setState({
                list:this.props.list,
                allList:this.props.allList
            },()=>{
                // window.localStorage.setItem('toDoList', JSON.stringify(this.props.allList));
            })
        }
    }

    onDragStart(e,index){
        //firefox设置了setData后元素才能拖动
        e.dataTransfer.setData("Text", e.target.innerText); //不能使用text，firefox会打开新tab
        this.state.draging = e.target;
        var dragIndex = this.props.allList.indexOf(this.props.list[index])
        console.log(dragIndex)
        this.setState({
            dragIndex:dragIndex,
            currentIndex:index
        })
    }

    onDragOver(e,index){
        e.preventDefault();
        var target = e.target;
        if (target.nodeName === "DIV"&&target !== this.state.draging) {
            var allList = this.props.allList
            var list = this.props.list
            if (this._index(this.state.draging) < this._index(target)) {
                target.parentNode.insertBefore(this.state.draging,target.nextSibling);
                allList.splice(this.state.dragIndex,1)
                
                console.log(this.state.dragIndex)
                setTimeout(()=>{
                    allList.splice(this._index(target),0,this.props.list[this.state.currentIndex])
                    console.log(allList)  
                },5000)
                // allList.splice(this.state.dragIndex,1)
                // list.splice(this.state.currentIndex,1)
                
            } else {
                target.parentNode.insertBefore(this.state.draging, target);
            }
            // this.props.changeList(list)
            // this.props.changeList(allList)
        }
    }

    onDrag(e,index){
        
        console.log(e.dataTransfer.getData("Text"))
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
            <div className="listBox" >
                {this.props.list && this.props.list.map((todo,index) => (
                <div key={todo.id} draggable="true" onDragStart={(e)=>{this.onDragStart(e,index)}} onDragOver={(e)=>{this.onDragOver(e,index)}} onDrag={(e)=>{this.onDrag(e,index)}}>
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