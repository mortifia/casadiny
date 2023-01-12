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

## cert

_data/certbot/conf/live/casadiny.ovh is the folder where the cert is stored

to create a first cert, you need to stop 443 conf in nginx or nginx will not start and certbot challenge will fail

- test creation
  > `docker compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ --dry-run -d casadiny.ovh,www.casadiny.ovh,api.casadiny.ovh,www.api.casadiny.ovh`
- creation (remove `--dry-run`)
  > `docker compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d casadiny.ovh,www.casadiny.ovh,api.casadiny.ovh,www.api.casadiny.ovh`
- renewal
  > `docker compose run --rm  certbot renew`
