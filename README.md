# Fb Live Post and Comment


### Install project dependencies
```
npm install
```

### Run The Application
```
npm run build
npm start


USE NEWER VERSION OF NPM WHILE RUNNING SERVER, SINCE I HAVE USED OBJECT DESTRUCTURING
AND OTHER STUFF ON SERVER SIDE WHICH IS NOT SUPPORTED IN THE OLDER VERSIONS, 

I HAVE DEVELOPED ON NODE VERSION 9
```

### Things Covered
```
1. A landing page having post funcionality 
		This page is having a userName inputbox and a Write Post textarea.
		Both the fields are mandatory to fill to proceed.
2. As soon as user clicks on POST button, it will post and 
   will take the user to Timeline Page
3. A socket connection will get established as soon as user lands to Timeline Page

4. Automatic Updated of time every minute is handled,
	<1 min is displayed as 'just now'
	1 mins - 60 mins is displayed as '{minutes} mins'
	>60 mins is displayed as '{hour} hours'

5. "Comment button" and "Reply button" inside comment are functional.

6. Having support of multiple users interacting at the same time - used socket.io for the same

7. having Support for Submit Post, Comment on a post and Reply on a Comment

8. Saving the UserName with every action he takes, to support who actually has submitted
   the post, comment or reply.


```
### In Case of Any Queries, please call me.