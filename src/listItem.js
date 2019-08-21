import React from 'react'


class ListItem extends React.Component{
    constructor(props){
        super(props)
    }

    componentWillReceiveProps(){} //??什么情况会用到

    toggleChecked(e,index){
        var allList = this.props.toDoList[this.props.projectIndex]
        var allListIndex = allList.indexOf(this.props.list[index])  // ？-1

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
        
        if(this.props.activeLable !== 0){
            this.props.list.splice(index,1)
            this.props.isAllChecked(false)
        }else{
            this.props.changeParentState(allList)
        }
        // this.setState({})  // ??setState触发更新,即使参数为空
    
      }

    delect(e,index){
        var listIndex = this.props.toDoList[this.props.projectIndex].indexOf(this.props.list[index])
        var list = this.props.toDoList[this.props.projectIndex].filter( item => item.value !== this.props.list[index].value)
        var allList = this.props.toDoList[this.props.projectIndex]
        allList.splice(listIndex,1)
        window.localStorage.setItem('toDoList', JSON.stringify(this.props.toDoList));
        this.props.changeParentState(allList)
    }


    render(){
        return (
            <div draggable="true">
                <input className="checked item_checked" type="checkbox" onChange={(e) => this.toggleChecked(e,this.props.index)} checked={this.props.todo.checked} />
                <label className={this.props.todo.checked === true ? 'line_through': ''}>{this.props.todo.value}</label>
                <span className="right cancle" onClick={(e)=>this.delect(e,this.props.index)}>+</span>
            </div>  
        )
    }
}

export default ListItem;
