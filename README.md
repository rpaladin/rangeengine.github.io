[web_website]: https://rangeengine.tech
[file_localhostCommand]: /run_localhost.bat
[file_localhostNode]: /localhost.js
[file_navbar]: /templates/navbar.html
[file_footer]: /templates/footer.html
[file_about]: /templates/about.html
[file_about_host]: /about.html
[dir_templates]: /templates

![](GitHub_Readme.png)

## Range Engine Site
Official [Range Engine][web_website] Website.

## How To Test Locally
* Download and extract the files in this repository.
* Simply run [localhost.bat][file_localhostCommand].
* Open a browser and enter _**"localhost"**_ as your URL address.
  * If this doesn't work, try _**localhost:80**__ instead. The _**80**_ stands for port 80, which is the default port for HTTP traffic on most computers.
    * If the port is already in use by another other service, change the port value by opening [localhost.js][file_localhostNode] and setting the _**PORT**_ variable  to a different port value.

## How To Develop
* _**Do not**_ edit the webpages in the root repository directory.
  * These webpages are automatically compiled by the [localhost][file_localhostNode] and are used for _**hosting only**_.
* [/templates/][dir_templates] is a component folder, filled with individual webpages.
* Any changes to [/templates/navbar][file_navbar] or [/templates/footer][file_footer] webpages will be injected into the other _**hosting only**_ webpages.
* Any other componenet webpage files in [/templates][dir_templates] will likewise be compiled, but only for their own same filename, webpage. For example, [/templates/about][file_about] will be compiled into [/about][file_about_host], along with [/templates/navbar][file_navbar] and [/templates/footer][file_footer].