**Development Environment**

1 - Docker Desktop

1. https://www.docker.com/products/docker-desktop
1. You will need to enable WSL inside of settings.


2 - WSL2 - *Windows Users Only*

1. https://docs.microsoft.com/en-us/windows/wsl/install-win10
1. Distro Ubuntu 18.04 - Bionic Beaver
1. https://www.microsoft.com/en-us/p/ubuntu-1804-lts/9n9tngvndl3q?activetab=pivot:overviewtab

3 - VSCode

1. https://code.visualstudio.com/download
Extensions
    1. https://code.visualstudio.com/docs/remote/wsl
    1. https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack
2. Sync Settings - optional 
    1. https://code.visualstudio.com/docs/editor/settings-sync


4 - Gitlab setup in vscode

https://newbedev.com/shell-how-to-change-git-credentials-in-vscode-code-example

1. Disable 2FA on Gitlab if you have it enabled 
2. Clone using HTTPS vscode should ask for username and pw
3. Open VSCode Terminal and navigate to the git directory /home/path_to_repo/Spring2021_Final Iteration.
```
    git config --global user.email "you@example.com"
    git config --global user.name "Your Name"
```
4. Use the command below with your personal credentials
```git remote set-url origin https://<USERNAME>:<PASSWORD>@gitlab.com/yang_SacState/spring2021_final-iteration.git```

:exclamation: remove the <> <>

**Once you have a working Linux environment setup and can access it from within VSCode**

0 - Open an New WSL Terminal windows

In VSCode Type

```ctrl+shift+p```

Select

```New WSL Window using Distro```

Choose 

```Ubuntu 18.04```

Run the following command 

```-uname -srvo ```

You need to get the following output to confirm you are in the correct env 

:white_check_mark: ``` > Linux 5.4.72-microsoft-standard-WSL2 #1 SMP Wed Oct 28 23:40:43 UTC 2020 GNU/Linux``` 

1 - Docker 

```docker -v```

:white_check_mark: ``` > Docker version 20.10.8, build 3967b7d``` 

2 - Docker Compose

https://docs.docker.com/compose/install/

```sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose```

```sudo chmod +x /usr/local/bin/docker-compose```

```docker-compose --version```

:white_check_mark: ```> docker-compose version 1.29.2, build 5becea4c ```  

3 - Node JS 
https://github.com/nodesource/distributions/blob/master/README.md#deb

```curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -```

```sudo apt-get install -y nodejs```

```sudo npm install -g npm```

```npm version```

:white_check_mark:

```json
{
  npm: '7.21.1',
  node: '16.8.0',
  v8: '9.2.230.21-node.20',
  uv: '1.42.0',
  zlib: '1.2.11',
  brotli: '1.0.9',
  ares: '1.17.2',
  modules: '93',
  nghttp2: '1.42.0',
  napi: '8',
  llhttp: '6.0.2',
  openssl: '1.1.1k+quic',
  cldr: '39.0',
  icu: '69.1',
  tz: '2021a',
  unicode: '13.0',
  ngtcp2: '0.1.0-DEV',
  nghttp3: '0.1.0-DEV'
}
```

4 - Kubernetes install 

https://minikube.sigs.k8s.io/docs/start/


inside of a new WSL terminal 

```curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64```

```sudo install minikube-linux-amd64 /usr/local/bin/minikube```

```minikube version```

:white_check_mark:


```
> minikube version: v1.22.0
> commit: a03fbcf166e6f74ef224d4a63be4277d017bb62e

```

** Tools I highly Recommend **

Microsoft Terminal 

Mongo DB Compass

MobaXterm

Sublime Text 4

Greenshot

Bitvise
