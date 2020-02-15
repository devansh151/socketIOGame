import React from "react";
import io from 'socket.io-client';
import Post from "../../components/Post";


export default class Timeline extends React.Component{
    constructor(props){
        super(props);
        this.socket = io.connect();
        this.state = {
            posts : [],
            socket: ''
        }
    }

  	componentDidMount(){
  		//let socket = io.connect();
        this.socket.emit('get_all_posts', (data) => {
            this.setState((prevState, props) => {
                return {
                    posts : data
                }
            });
        })
        this.socket.on('receive_all_posts', (data) =>{
            this.setState((prevState, props) => {
                return {
                    posts : data
                }
            });
        })
  	}
    postComment(reqObj){
        this.socket.emit('post_comment',reqObj)
    }
    postReply(reqObj){
        this.socket.emit('post_reply',reqObj)
    }

    render(){
        let posts = this.state.posts;
        return(
           	<div>
           		{
                    posts.map((post) => {
                        return (
                            <Post key={post.id} {...post} postComment={this.postComment.bind(this)} postReply={this.postReply.bind(this)}/>
                        )
                    })
                }
           	</div>
        )
    }
}