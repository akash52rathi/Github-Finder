import React, { Component } from 'react'
import './App.css';
import Navbar from './component/layout/Navbar'
import Users from './component/users/Users'
import Search from './component/users/Search'
import axios from 'axios'
import Alert from './component/layout/Alert'

const github = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 1000,
  headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN }
})

class  App extends Component {
  
state={

  users:[],
  loading:false,
  alert:null
};

// async componentDidMount()
// {
//   this.setState({ loading:true })

//   const res = await axios.get('https://api.github.com/users?client_id=$process.env.REACT_APP_GITHUB_CLIENT_ID&secret_id=$process.env.REACT_APP_GITHUB_CLIENT_SECRET')
//   //console.log(res.data)

//   this.setState({ users:res.data,loading:false })
//   //this.setState({users:res.data})
// }

searchUsers = async text => {
  this.setState({loading:true});
  const res = await github.get(`/search/users?q=${text}`)
  this.setState({users: res.data.items, loading: false});
  }

 
  clearUsers =()=>{
    this.setState({ users:[],loading:false })
  }

  SetAlert=(msg,type)=>{
    this.setState({alert:{msg,type}})

    setTimeout(()=>{this.setState({alert:null})},4000);

  }

  render(){

    const {users,loading}=this.state


  return (
    <div className="App">

    <Navbar />
    <Alert alert ={this.state.alert}/>
    <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} 
    ShowClear={users.length > 0 ? true:false }
    SetAlert ={this.SetAlert }/>

    <div className ='container' >
    <Users loading ={loading} users = {users } 
      /> 
    
    </div>
     
    </div>
  );
  }
}



export default App;
