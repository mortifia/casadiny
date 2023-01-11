https://github.com/nuxt/nuxt.js/issues/5550#issuecomment-653906083


- create wsl distro
- run :
    ```sh
    sudo groupadd docker
    sudo usermod -aG docker $USER
    ```
- logout and login
in docker-desktop settings, enable wsl integration for distro
- !!! it's working now
