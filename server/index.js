'use strict'

const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 




let connections=[];
let posts = [];


// serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));



//  new post modal
function post(id, name, post){
	return {
		id: id,
		name: name,
		post: post,
		comments: [],
		timeStamp: new Date().getTime()
	}
}

//submit post
app.post('/submitPost', (req, res) => {
	let obj = post(posts.length,req.body.name,req.body.post);
	posts.push(obj);
	console.log(posts);
	io.sockets.emit('receive_all_posts', posts);
  	res.status(200).send({});
});

// always return the main index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});










// socket io connection 
io.sockets.on('connection', (socket) => {
	connections.push(socket);
	console.log('connection established....');
	console.log('total number of connections', connections.length);

	socket.on('disconnect',(data) => {
		connections.splice(connections.indexOf(socket),1);
		console.log('disconnected ....');
		console.log('total number of connections', connections.length);
	});

	socket.on('get_all_posts', (cb) => {
		console.log('sending all posts');
		cb(posts);
	});

	socket.on('post_comment',(data) => {
		let {id, name, comment} = data;

		posts.forEach((post) => {
			if(post.id == id){
				post.comments.push({
					id: post.comments.length,
					name: name,
					comment: comment,
					reply:[],
					timeStamp: new Date().getTime()
				})
			}
		})
		io.sockets.emit('receive_all_posts', posts);
		console.log(JSON.stringify(posts));
	});
	socket.on('post_reply',(data) => {
		let {postId, commentId, name, reply} = data;

		posts.forEach((post) => {
			if(post.id == postId){
				post.comments.forEach((comment)=>{
					if(comment.id == commentId){
						comment.reply.push({
							id: comment.reply.length,
							name: name,
							reply: reply,
							timeStamp: new Date().getTime()
						})
					}
				})
			}
		})
		io.sockets.emit('receive_all_posts', posts);
		console.log(JSON.stringify(posts));
	});
	setInterval(() => {
		console.log('pushed event after 1 sec');
		io.sockets.emit('receive_all_posts', posts);
	}, 60000);
})

// starting server
const PORT = process.env.PORT || 3000;
server.listen(PORT);
console.log('server is running on port 3000 ....')