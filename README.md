## Environment:
 Node v8.9.0 NPM 6.8.0
Valid User(name/password)
* Joey/12345
* Jenny/12345
* Admin/admin


## Usage
1. Download the repo
	git clone https://github.com/goforu/angular-login-page.git
2. Install all the dependencies
	npm install
3. Hot load frontend source files
	ng serve -o
4. Start up nodeJs sever
	node app.js

## How it works

	    The backend is built on Express using NodeJs to handle XHR requests. Port 3000 from Node sever is proxied to Angular hot load server to avoid cross domain issue. 
	    The key idea of Login Page is that a unique sessionId has been used to make identity connection between backend and frontend. Server would generate a sessionId in the backend once a user logged in and send it back to the browser. The browser would possess this sessionId either in cookies or local storage ( cookies at this time) as an authentication.  
	    Multi login has been prevented because if user logged in from another end, server would generate a new sessionId. Then the old one would be no longer valid.
	    In the frontend, I used HttpIntercepter to check the login state whenever user sending a request. Once logged out state detected, it would redirect to the login page. 