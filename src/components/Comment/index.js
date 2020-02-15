import React from "react";
import './style.css';

export default class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShowReplyBox: false,
            reply:''
        }
    }

    showReplyBox(){
        this.setState(()=>{
            return {
                isShowReplyBox: true
            }
        })
    }
    changeReply(e){
        let value = e.target.value;
        this.setState(()=>{
            return {
                reply: value
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
    postReply(e){
        if(e.key=='Enter'){
            let value = e.target.value;
            let reqObj = {
                postId: this.props.postId,
                name: decodeURIComponent(this.getParamValue().name),
                commentId: this.props.id,
                reply: value
            }
            this.setState(() => {
                return {
                    isShowReplyBox : false,
                    reply:''
                }
            })
            this.props.postReply(reqObj);
        }
    }
    render(){
        let props = this.props;
        let isShowReplyBox = this.state.isShowReplyBox;
        let reply = this.state.reply;
        return(
            <div id="comment" className="strip">
            	<img src="../../../favicon.ico"/>
            	<b>{props.name}</b> {props.comment}
            	<div id="buttons" className="strip">
            		<span className="blue" onClick={() => this.showReplyBox()}>Reply</span>
            	</div>
                {
                    (isShowReplyBox || props.reply.length) ? (
                        <div id="block">
                            {
                                props.reply.map((item)=>{
                                    return (
                                        <div id="reply" key={item.id}>
                                            <img src="../../../favicon.ico"/>
                                            <b>{item.name}</b> {item.reply}
                                        </div>
                                    )
                                })
                            }
                            {
                                isShowReplyBox? (
                                    <div id="reply">
                                        <img src="../../../favicon.ico" class="top-7"/>
                                        <input type="text" placeholder="Write a reply..." value={reply}
                                            onChange={(e) => this.changeReply(e)} onKeyPress={(e) => this.postReply(e)}/>
                                    </div>
                                ): ''
                            }
                            
                        </div>
                    ):''

                }
            	
            </div>
        )
    }
}