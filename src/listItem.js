import React from 'react'


class ListItem extends React.Component{
    constructor(props){
        super(props)
    }

    toggleChecked(e,index){
        this.props.list[index].checked = e.target.checked
        if(e.target.checked === false){
            console.log(e.target.checked)
            this.setState({allChecked:false},()=>{})
        }
          if(this.props.activeLable === 1){
            var allListIndex = this.props.allList.indexOf(this.props.list[index])
            this.props.list.splice(index,1)
            this.props.allList[allListIndex].checked = e.target.checked
          }else if(this.props.activeLable === 2){
            this.props.list.splice(index,1)
          }
          this.setState({
              list:this.props.list,
              allList: this.props.allList,
            },()=>{
            window.localStorage.setItem('toDoList', JSON.stringify(this.props.list));
          })
    
      }

    delect(index){
        console.log(this.props.allList)
        let allListIndex = this.props.allList.indexOf(this.props.list[index])
        this.props.list.splice(index,1)
        this.props.allList.splice(allListIndex,1)
        this.setState({
            list:this.props.list,
            allList:this.props.allList
        },()=>{
            window.localStorage.setItem('toDoList', JSON.stringify(this.props.list));
        })
      
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