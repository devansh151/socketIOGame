import React from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom'

import './style.css';

class WritePost extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			name: '',
			post: ''
		}
	}
	submitPost(){
		let name = this.state.name;
		let post = this.state.post;
		if(!name || !post){
			return;
		}
		axios.post('/submitPost', {
			name: name,
			post: post
		})
		.then((data) => {
			this.props.history.push(`/timeline?name=${name}`);
			console.log('successfully posted');
		})
		.catch((err) => {
			console.log(err);
		});
	}
	handleEnter(e){
		if(e.key=='Enter'){
			this.submitPost();
		}
	}
	update(e,type){
		let value = e.target.value
		this.setState((prevState, props) => {
			return {
				[type] : value
			}
		});
	}
    render(){
    	let name = this.state.name;
    	let post = this.state.post;
    	let buttonClasses = '';
    	if(!name || !post){
    		buttonClasses = 'disabled'
    	}
        return(
            <div id="write-post">
            	<input placeholder="Enter your name here ..." value={name} onChange={(e) => this.update(e,'name')}></input>
            	<textarea rows="4" placeholder="Write Something here..." value={post} 
            		onChange={(e) => this.update(e,'post')} onKeyPress={(e) => this.handleEnter(e)}></textarea>
            	<button onClick={() => this.submitPost()} className={buttonClasses}> Post </button>
            </div>
        )
    }
}

export default withRouter(WritePost);