import React, { Component } from 'react';
import SimpleStorage from "react-simple-storage";


class App extends Component {

constructor(props){
  super(props);
  this.state={
    items: [],
    userinput:'',
    time: setInterval(() => this.setState({ time: new Date().toLocaleTimeString() }), 1000),
    done:[],
    temperature: 0
  }
  this.delete = this.delete.bind(this);
}

//METHODS
changinginput=(input)=>{
  this.setState({
    userinput: input
  })
};

addtolist=(input)=>{
  if (this.state.userinput === '') {
    alert('empty input')
  }
  else{
  var newitems = this.state.items;
  newitems.push(input);

  this.setState({
    items: newitems,
    userinput: ''
  })
 }
}


delete=(indexp)=>{
  var newarray = this.state.items.filter((item, index)=> index !== indexp);
  this.setState({
    items: newarray
    })
  }

deletedone=(indexp)=>{
    var newarray = this.state.done.filter((item, index)=> index !== indexp);
    this.setState({
      done: newarray
    });
  }

addToDone=(e)=>{
  var donelist = this.state.done;
  donelist.push(e)
   this.setState({
     done: donelist
   });
   if (this.state.items.length===1) {
     alert("Good job!", "You clicked the button!", "success");
   }
}

handleKeyPress = (event, ) => {
  if(event.key == 'Enter'){
    this.addtolist(this.state.userinput);
  }
}


  render(){
    return(
      <div id='app'>
    <SimpleStorage parent={this} />
      <div className='container'>
        <h1>{this.state.time}</h1>
        <div className = 'userinput'>
          <input  onKeyPress={this.handleKeyPress} placeholder='ENTER TASK' onChange={(e)=>this.changinginput(e.target.value)} value={this.state.userinput} type='text'></input>
          <div className = 'addbutton' onClick={()=>this.addtolist(this.state.userinput)}>ADD</div>
        </div>
        <ul>
          <h1 className = 'todo'>TO DO</h1>
          {this.state.items.map((item, index)=><li onClick={(e)=>this.delete(index)} key={index}>{item}<button className='left'  onClick={(e)=>this.addToDone(item)}>DONE</button> </li>)}
        </ul>
        <ul>
          <h1 className = 'done'>DONE</h1>
          {this.state.done.map((item, index)=><li onClick={(e)=>this.deletedone(index)}  key={index}>{item}    <span>✔</span></li>)}
        </ul>
      </div>
    </div>
    )
  }
}

export default App
