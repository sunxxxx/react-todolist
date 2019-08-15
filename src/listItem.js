import React from 'react'


class ListItem extends React.Component{
    constructor(props){
        super(props)
    }

    toggleChecked(e,index){
        this.props.list[index].checked = e.target.checked
        if(e.target.checked === false){
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
            window.localStorage.setItem('toDoList', JSON.stringify(this.props.allList));
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
                window.localStorage.setItem('toDoList', JSON.stringify(this.props.list));
            })
        }else{
            this.props.list.splice(index,1)
            this.props.allList.splice(listIndex,1)
            this.setState({
                list:this.props.list,
                allList:this.props.allList
            },()=>{
                window.localStorage.setItem('toDoList', JSON.stringify(this.props.allList));
            })
        }
    }

    render(){
        return (
            <div className="listBox">
                {this.props.list.map((todo,index) => (
                <div key={'li'+todo.id}>
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