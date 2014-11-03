This is the web showing page of the movie list

To active it, you need to have nodejs and npm and bower installed, my current version is v0.10.25 for nodejs, 1.3.24 for npm, 1.3.3 for bower. You also need to have nginx set up. Because this webpage calls the api rest service, thus you need to have api service ready, to install api service, please refer to https://github.com/jiahuidestroytheworld/movielist

1. clone the project to you local (e.g. C:\moviepage)

2. open the command prompt and go to the folder location (e.g. cd C:\moviepage)

3. run npm install in the prompt, it will download the npm modules (e.g. npm install)

4. run bower install to download the dependencies (e.g. bower install)

5. the moviepage is set up, now we need to config the nginx, go to your nginx location and open the config file with text editor (e.g. C:\nginx\conf\nginx.conf)

6. add following line to the http section, like this
	http	{
		server {		
			listen 8888;
			server_name localhost;
			root C:\moviepage;
			index index.html;
			# set client body size to 2M #
			client_max_body_size 10M;
			location /api/ {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_http_version 1.1;
                proxy_set_header Host  $http_host;
                proxy_set_header X-Forwarded-Proto  $scheme;
                proxy_set_header X-NginX-Proxy true;
                proxy_pass http://127.0.0.1:8080/;
                proxy_redirect off;
			}
		}
	}
	
7. I have set up the page to listen at port 8888, you can change it to any port as you like. after save the change, start nginx (e.g. start nginx.exe)

8. open any browser and go to the port (e.g. http://localhost:8888)

9. it takes serveral seconds for the service to get the response, after spinning, it will show the page of movie title and average age of the casts.