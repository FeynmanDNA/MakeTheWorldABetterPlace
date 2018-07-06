# FeynmanDNA Linode VPS for Nginx/ufw/Gunicorn/Flask Guide

## 1. Useful commands

`hostnamectl`
```
  Operating System: Debian GNU/Linux 9 (stretch)
            Kernel: Linux 4.9.0-6-amd64
      Architecture: x86-64
```

`lscpu`
```
Architecture:          x86_64
CPU op-mode(s):        32-bit, 64-bit
Byte Order:            Little Endian
CPU(s):                1
Model name:            Intel(R) Xeon(R) CPU E5-2697 v4 @ 2.30GHz
CPU MHz:               2299.968

```

### Compress an Entire Directory or a Single File

```tar -czvf name-of-archive.tar.gz /path/to/directory-or-file```
Here’s what those switches actually mean:

* `-c`: Create an archive.
* `-z`: Compress the archive with gzip.
* `-v`: Display progress in the terminal while creating the archive, also known as “verbose” mode. The v is always optional in these commands, but it’s helpful.
* `-f`: Allows you to specify the filename of the archive.

### Extract an Archive
```tar -xzvf archive.tar.gz```

### Upgrade pip3
`sudo -H pip3 install --upgrade setuptools pip`

## 2. Firefall config (ufw)

`sudo apt-get install ufw` for debian. UFW is included in Ubuntu by default but must be installed in Arch and Debian. Debian will start UFW’s systemd unit automatically and enable it to start on reboots. Then `sudo ufw enable` => 'Firewall is active and enabled on system startup'

first allow for ssh(22/tcp):
`sudo ufw allow ssh`

and normalize the defaults:
```
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

Perform `sudo ufw status verbose` to see if you're even logging in the first place.
If you're not, perform `sudo ufw logging on` if it isn't.
If you are logging, but there are no `/var/log/ufw*` files, check to see if `rsyslog` is running: `sudo service rsyslog status`
ufw logging file (need sudo to view content):
`/var/log/ufw.log`

To see the list of apps ufw knows about and can use:
`sudo ufw app list`
The app profiles should be stored in `/etc/ufw/applications.d`
create a `nginx` file, and write (if you do not see the `Ngin *` in the `app list` in ufw:
```
[Nginx HTTP]
title=Web Server (Nginx, HTTP)
description=Small, but very powerful and efficient web server
ports=80/tcp
```
then the `ufw app list` will display an entry:
`Nginx HTTP`

Enable Nginx in ufw by typing:
`sudo ufw allow 'Nginx HTTP'`

after the edit:
`sudo ufw --force enable`

to delete ufw rules:
`sudo ufw delete allow ssh`

for the yjg-calculator, need to open port 7717:
`sudo ufw allow 7717`

generally, port 22 (ssh), 80 (http) and 443 (https).

in a typical ufw.log:
- TOS, for Type of service,
- DST is destination ip,
- SRC is source ip
- TTL is time to live, a small counter decremented each time a packet is passed through another router (so if there is a loop, the package destroy itself once to 0)
- DF is "don't fragment" bit, asking to packet to not be fragmented when sent
- PROTO is the protocol (mostly TCP and UDP)
- SPT is the source port
- DPT is the destination port

## 3. NGINX config

All NGINX configuration files are located in the `/etc/nginx/` directory. The **primary** configuration file is `/etc/nginx/nginx.conf`.

first preserve the default `nginx.conf` file so you have something to restore to if your customizations get so convoluted that NGINX breaks.
`sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup-original`

Now let's look at the main `nginx.conf`:

```
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
```
Usual way of Nginx configuration is to have one worker per CPU core. For a basic virtual private server (VPS), the default value of 1 is a good choice.

the `warn` in `error_log` indicates the minimal severity to enter the log

**Gzip**

gzip on; - enables gzip compression
gzip_vary on: - tells proxies to cache both gzipped and regular versions of a resource
gzip_min_length 1024; - informs NGINX to not compress anything smaller than the defined size
gzip_proxied - compress data even for clients that are connecting via proxies (here we're enabling compression if: a response header includes the "expired", "no-cache", "no-store", "private", and "Authorization" parameters)
gzip_types - enables the types of files that can be compressed, NOTE: do not compress images, as they are usually already compressed
gzip_disable "MSIE [1-6]\."; - disable compression for Internet Explorer versions 1-6

---

Multiple site configuration files should be stored in `/etc/nginx/conf.d/` as `example.com.conf`, or `example.com.disabled`. Do not add server blocks directly to `/etc/nginx/nginx.conf`

*Virtual Host* is an Apache term, *Server Block* is the NGINX equivalent.

NGINX **site-specific** configuration files are kept in `/etc/nginx/conf.d/`. Generally you will want a separate file in this directory for each domain or subdomain you will be hosting.

**Gunicorn+Flask**

Nginx pass web requests to Gunicorn.
Open a `server block`, use this block for requests for our server's domain name or IP address, and pass the `proxy-params` to a `location block` in the `server block`.

*Proxy Setups*
If you deploy your application using one of these servers behind an HTTP proxy you will need to rewrite a few headers in order for the application to work. The two problematic values in the `WSGI` environment usually are `REMOTE_ADDR` and `HTTP_HOST`. You can configure your httpd to pass these headers, or you can fix them in middleware. Here we will configure the Nginx httpd to provide these Headers.
**Note: httpd = http daemon**
**Note: daemon is Greek myth, a good or benevolent "supernatural beings between mortals and gods"; demon is Christian myth, a bad spirit thing. Daemon, not demon!**

For the flask+gunicorn app, change the config in the conf.d's site:
```
server {
    listen       80;
    server_name  your_public_dnsname_here;
    # do not use the default root for site data, as it will be removed during nginx upgrade
    root filepath_here;

    # added the proxy_pass so the nginx listens for port N for the flask app
	# added the proxy_set_header for IP and HOST
	# Proxy pass directive must be the same port on which the gunicorn process is listening.
	location / {
        proxy_pass         http://127.0.0.1:Port_GUNICORN;
        proxy_redirect     off;

        # Redefine the header fields that NGINX sends to the upstream server
        proxy_set_header   Host                 $host;
        proxy_set_header   X-Real-IP            $remote_addr;
        proxy_set_header   X-Forwarded-For      $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto    $scheme;
    }

    location /static {
        # handle static files directly, without forwarding
        alias /home/N/app/static;
        expires 30d;
    }

}
```
In Nginx, `$host` vs `$http_host`:
`$host` is equal to line Host in the header of request or name of the server processing the request if the Host header is not available, or your `server_name` in the `server block`.

`location` block serves the routes.
Do not use `root` inside Location Block, use `alias`.

The `try_files` directive exists for an amazing reason: It tries files in a specific order. NGINX can first try to serve the static content, and if it can’t, it moves on.
```
    location / {
        try_files $uri $uri/ /index.php;
    }
```

**React-webpack-build**
In order for webpack's index.html to work, the parameters to `try_files` should be URIs and not pathnames. This will tell nginx to forward other requests to the index.html file too:
```
location / {
  try_files $uri $uri/ /index.html;
}
```

Besides the Gzip, you can also Configuring Browser Caching:
```
location ~*  \.(jpg|jpeg|png|gif|ico|css|js|pdf)$ {
    expires 7d; # or 30 days for long-term build
}
```

Restart the nginx web server.
`sudo nginx -t`
`sudo service nginx restart`

---

Test Nginx configuration for errors:
`sudo nginx -t`

check if Nginx is running:
`systemctl status nginx`

To stop your web server, you can type:
`sudo systemctl stop nginx`

To start the web server when it is stopped, type:
`sudo systemctl start nginx`

To stop and then start the service again, type:
`sudo systemctl restart nginx`

**NOTE!**
- in order for nginx config to take effect, restart it by calling `sudo service nginx restart` - if there are errors in the config, they will be brought up at this step
- so many people don't restart the nginx service and wonder why nothing has taken effect - don't fall for it, restart it alway

We can make sure that our web server will restart automatically when the server is rebooted by typing:
`sudo systemctl enable nginx`

See Server Logs
`/var/log/nginx/`


## 4. Gunicorn/Flask

`sudo pip3 install gunicorn flask`

Gunicorn is a pure python production-level server. Flask is for fast development.

To start the flask under Gunicorn:
`gunicorn -b localhost:7717 -w 4 <module that contains the application>:<name of this gunicorn app>`
`-b` option gunicorn listen for requests at port N
`-w` option configures how many workers gunicorn will run. Having four workers allows the application to handle up to four clients concurrently.

Number of workers in Gunicorn, usually 4 is enough.
```
def number_of_workers():
    return (multiprocessing.cpu_count() * 2) + 1
```
We will not run Gunicorn/Flask from the command-line. We will have it under constant monitoring, and launch with `Supervisor`.

After flask/gunicorn is changed, do:
`sudo service supervisor restart`
to see the changes implemented
OR for the gunicorn/flask app specifically:
```
sudo supervisorctl stop yjg_calculator_app     # stop the current server
sudo supervisorctl start yjg_calculator_webapp    # start a new server
```

## 5. Supervisor

`sudo apt-get install supervisor`

the configuration for Supervisor is in `/etc/supervisor/conf.d/`
create a new `calculatorapp.conf`
```
[program:yjg_calculator_webapp]
command=gunicorn -b localhost:8000 -w 4 flask:app
directory=/home/deploy/webapp
user=<user name>
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
```

To enable the configuration, run the following commands:
`sudo supervisorctl reread`
then `sudo service supervisor restart`

This should start a new process. To check the status of all monitored apps:
`sudo supervisorctl status`

## References:
1. https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-xvii-deployment-on-linux
2. http://flask.pocoo.org/docs/1.0/deploying/wsgi-standalone/#gunicorn
3. https://www.linode.com/docs/web-servers/nginx/nginx-installation-and-basic-setup/
4. https://www.linode.com/docs/web-servers/nginx/slightly-more-advanced-configurations-for-nginx/
5. https://www.techrepublic.com/article/how-to-configure-gzip-compression-with-nginx/
6. https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-gunicorn-and-nginx-on-ubuntu-14-0
