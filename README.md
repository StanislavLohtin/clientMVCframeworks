# clientMVCframeworks

In order to use this software following is necessary:
  1) IDE should be installed (I used WebStorm - https://www.jetbrains.com/webstorm/)
  2) node.js(https://nodejs.org/), express(https://expressjs.com/) and mongoDB(https://www.mongodb.com/) should be installed
  3) The contents of node_modules folder should contain all the items from the file modules_list.txt
  4) mongoDB server should be started with this console command:
        mongod --dbpath <path-to-database>
  6) For server render:
        * node.js server should be started (server/serverSide.js) either with IDE Run or with the command line command: "node serverSide.js"
  7) For angularJS:
        * node.js server should be started (server/server.js) either with IDE Run or with the command line command: "node server.js"
        * angular/index.html should be started with IDE Run
  7) For backboneJS:
        * node.js server should be started (server/server.js) either with IDE Run or with the command line command: "node server.js"
        * backbone/index.html should be started with IDE Run
  8) For emberJS:
        * EmberJS should be installed and
        * The contents of node_modules folder should contain all the items from the file ember_modules_list.txt
        * node.js server should be started (server/server.js) either with IDE Run or with the command line command: "node server.js"
        * ember server should be started with "ember s" command