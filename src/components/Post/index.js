import React from "react";
import './style.css';
import Comment from '../Comment';

export default class Post extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isShowCommentBox : false,
			comment:''
		}
	}

	showCommentBox(){
		this.setState(() => {
			return {
				isShowCommentBox: true
			}
		})
	}
	changeComment(e){
		let value = e.target.value;
		this.setState(() => {
			return {
				comment: value
			}
		})
	}
	getParamValue(){
		let vars = {};
	    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars[key] = value;
	    });
	    return vars;
	}
	getTime(time){
		var currentTime = new Date().getTime();
		var diff = currentTime - time;
		var seconds = diff/1000;
		var returnedText = 'just now';
		var minutes = Math.floor(seconds/60);

		if(minutes>0) {
			returnedText = minutes + ' mins ago';
		}
		if(minutes>60) {
			returnedText = Math.floor(minutes/60) + ' hours ago';
		}
		return returnedText;
	}
	postComment(e){
		if(e.key=='Enter'){
			let reqObj = {
				id: this.props.id,
				name: decodeURIComponent(this.getParamValue().name),
				comment: this.state.comment
			}
			this.setState(() => {
				return {
					isShowCommentBox : false,
					comment:''
				}
			})
	        this.props.postComment(reqObj);
		}
	}
    render(){
    	let props = this.props;
    	let isShowCommentBox = this.state.isShowCommentBox;
    	let comment = this.state.comment;
        return(
            <div id="single-post">
            	<div id="post-content">
	            	<div id="head" className="padding-10">
	            		<img src="../../../favicon.ico"/>
						<div className="meta">
	            			<div className="name">{props.name}</div>
	            			<div className="time">{this.getTime(props.timeStamp)}</div>
						</div>
	            	</div>
	            	<hr/>
	            	<div id="content" className="padding-10">
	            		{props.post}
	            	</div>
	            	<div id="buttons" className="strip">
	            		<span value={comment} onClick={() => this.showCommentBox()}>Comment</span>
	            	</div>
	            	{
	            		isShowCommentBox ? (
	            				<input type="text" placeholder="Write a comment..." 
	            					onChange={(e) => this.changeComment(e)} value={comment} onKeyPress={(e) => this.postComment(e)}/>)
	            				 : ''
	            	}
	            </div>
	            {
	            	props.comments.map((comment)=>{
	            		return (
	            			<Comment key={comment.id} postId={props.id} {...comment} postReply={this.props.postReply}/>
	            		)
	            	})
	            }
            </div>
        )
    }
}