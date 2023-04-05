```
██████╗ ██╗████████╗██████╗ ██╗   ██╗██████╗ ███╗   ██╗███████╗██████╗ 
██╔══██╗██║╚══██╔══╝██╔══██╗██║   ██║██╔══██╗████╗  ██║██╔════╝██╔══██╗
██████╔╝██║   ██║   ██████╔╝██║   ██║██████╔╝██╔██╗ ██║█████╗  ██████╔╝
██╔══██╗██║   ██║   ██╔══██╗██║   ██║██╔══██╗██║╚██╗██║██╔══╝  ██╔══██╗
██████╔╝██║   ██║   ██████╔╝╚██████╔╝██║  ██║██║ ╚████║███████╗██║  ██║
╚═════╝ ╚═╝   ╚═╝   ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
```

# Bitburner
Collection of scripts for the amazing programming game, Bitburner ([Steam](https://store.steampowered.com/app/1812820/Bitburner/), [Web](https://danielyxie.github.io/bitburner/))

Be warned! I'm very inconsistent with semicolons, good luck 😅

## [contractor.js](https://raw.githubusercontent.com/xsoc/Bitburner/main/contractor.js)
It searches all servers for coding contracts and attempts to solve what it can.
Currently it has solutions for:
- Algorithmic Stock Trader I
- Compression I: RLE Compression
- Encryption I: Caesar Cipher
- Encryption II: Vigenère Cipher
- Spiralize Matrix

I plan to slowly add coding contract solutions as I find them. It seems likely this will be broken up into multiple scripts in the future for RAM and editing sanity considerations.

## [dump-contract-types.js](https://raw.githubusercontent.com/xsoc/Bitburner/main/dump-contract-types.js)
Creates a dummy contract of every type available and dumps the contents to the terminal. For your convenience, [dump-contract-types.txt](https://raw.githubusercontent.com/xsoc/Bitburner/main/dump-contract-types.txt) contains full output.

Sample output:
```
dump-contract-types.js: Merge Overlapping Intervals
dump-contract-types.js: Given the following array of arrays of numbers representing a list of intervals, merge all overlapping intervals.

 [[2,7],[4,9],[25,28],[5,11],[11,19],[2,3],[14,16],[17,18],[21,29],[16,25],[6,15],[22,26]]

 Example:

 [[1, 3], [8, 10], [2, 6], [10, 16]]

 would merge into [[1, 6], [8, 16]].

 The intervals must be returned in ASCENDING order. You can assume that in an interval, the first number will always be smaller than the second.
dump-contract-types.js: [[2,7],[4,9],[25,28],[5,11],[11,19],[2,3],[14,16],[17,18],[21,29],[16,25],[6,15],[22,26]]
...
```

## [extract.js](https://raw.githubusercontent.com/xsoc/Bitburner/main/extract.js)
Skip this for now, it is literally the example script `early-hack-template` from the games documentation. I hope to change this later, but it does the job for me right now. It's only here because you need a script titled `extract.js` which takes the target server name as arg[0] to run the `spider.js` below :)

## [indexer.js](https://raw.githubusercontent.com/xsoc/Bitburner/main/indexer.js)
It traverses *every* server and displays some vital stats in a table format.

Sample output:
```
HOSTNAME             | HACK LVL |       MAX $$ |      CASH $$ |      RAM |     ROOT
---------            |  ------- |       ------ |      ------- |  ------- |  -------
.                    |      515 |      $ 0.00  |      $ 0.00  |       16 |       No
4sigma               |    1,177 |    $ 32.00 b |     $ 6.40 b |        0 |       No
CSEC                 |       56 |      $ 0.00  |      $ 0.00  |        8 |      Yes
I.I.I.I              |      341 |      $ 0.00  |      $ 0.00  |       16 |       No
The-Cave             |      925 |      $ 0.00  |      $ 0.00  |        0 |       No
aerocorp             |      867 |     $ 2.12 b |   $ 423.02 m |        0 |       No
aevum-police         |      416 |   $ 789.90 m |   $ 157.98 m |       16 |       No
alpha-ent            |      517 |     $ 1.40 b |   $ 280.55 m |       64 |       No
applied-energetics   |      791 |     $ 1.63 b |   $ 325.15 m |        0 |       No
...
```

## [networth.js](https://raw.githubusercontent.com/xsoc/Bitburner/main/networth.js)
If you're a stock market fiend, this will give you a floating tail window that will tell you your total $$$, ie. stock market value + cash, but _not_ counting the stock market transaction fees.

## [sellallstocks.js](https://raw.githubusercontent.com/xsoc/Bitburner/main/sellallstocks.js)
It sells all your stocks - Good for buying augmentations or trying out a new stock trading script.

## [spider.js](https://raw.githubusercontent.com/xsoc/Bitburner/main/spider.js)
This script will continually search for servers to pwn. Once you meet all the criteria then it will hack the server automatically, copy `execute.js` from home, and, if the hacked server has available RAM, automatically execute `run extract.js servername` with as many threads as available RAM will allow.

## [stocks.js](https://raw.githubusercontent.com/xsoc/Bitburner/main/stocks.js)
A pretty basic (and very messy) automatated stock trading script, but it makes reasonable $$$ for now.

## [tree](https://raw.githubusercontent.com/xsoc/Bitburner/main/tree.js)
Displays the entire network tree layout with home as the root node. Think minimalist scan-analyse.

Sample output:
```
...
tree.js:      --silver-helix
tree.js:      ---the-hub
tree.js:      ---crush-fitness
tree.js:      ----zb-institute
tree.js:      ----I.I.I.I
tree.js:      --omega-net
tree.js:      ---computek
tree.js:      ----syscore
tree.js:      -----lexo-corp
tree.js:      ------galactic-cyber
tree.js:      -------omnia
tree.js:      -----alpha-ent
tree.js:      ------aerocorp
tree.js:      ------global-pharm
...
```
