import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class Search extends Component {

    state={

        text:''

    };

     onChange=(e)=>

    this.setState({[e.target.name]:e.target.value})

    static propTypes={

        searchUsers:PropTypes.func.isRequired,
        clearUsers:PropTypes.func.isRequired,
        ShowClear:PropTypes.bool.isRequired
    }
    
    onSubmit=(e)=>
    {
        e.preventDefault()
        if(this.state.text==='')
        {
            this.props.SetAlert('Please enter something','light');

        }
        else
        {
            this.props.searchUsers(this.state.text);
            this.setState({text:''})

        }
       

    };
    

    render() {


const {clearUsers, ShowClear}=this.props

        return (
            <div>
                <form  className="form" onSubmit={this.onSubmit}>
                  <input type="text"
                   name ="text"
                    placeholder="SearchUsers"
                    value={this.state.text}
                    onChange={this.onChange}
                    />
                  <input type="submit" value="Search" className ="btn btn-dark btn-block"/>  

                </form>
                
                  {ShowClear && ( <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button> )}
                
                

                
            </div>
        )
    }
}

export default Search
