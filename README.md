# Bitburner
Collection of scripts for the amazing programming game, Bitburner ([Steam](https://store.steampowered.com/app/1812820/Bitburner/), [Web](https://danielyxie.github.io/bitburner/))

## [contractor.js](https://raw.githubusercontent.com/xsoc/Bitburner/main/contractor.js)
It searches all servers for coding contracts and attempts to solve what it can. Currently it is only solving "Algorithmic Stock Trader I" and "Encryption I: Caesar Cipher", I plan to slowly add coding contract solutions as I find them. It seems likely this will be broken up into multiple scripts in the future for RAM and editing sanity considerations.

## [dump-contract-types.js](https://raw.githubusercontent.com/xsoc/Bitburner/main/dump-contract-types.js)
Creates a dummy contract of every type available and dumps the contents to the terminal. For your convenience, [dump-contract-types.txt](https://raw.githubusercontent.com/xsoc/Bitburner/main/dump-contract-types.txt) contains sample output.

## [extract.js](https://raw.githubusercontent.com/xsoc/Bitburner/main/extract.js)
Skip this for now, it is literally the example script 'early-hack-template' from the games documentation. I hope to change this later, but it does the job for me right now. It's only here because you need a script titled extract.js to run the spider.js below :)

## [indexer.js](https://raw.githubusercontent.com/xsoc/Bitburner/main/indexer.js)
It's scan-analyze, but it traverses *every* server.

## [networth.js](https://raw.githubusercontent.com/xsoc/Bitburner/main/networth.js)
If you're a stock market fiend, this will give you a floating tail window that will tell you your total $$$, ie. stock market value + cash

## [sellallstocks.js](https://raw.githubusercontent.com/xsoc/Bitburner/main/sellallstocks.js)
It sells all your stocks - Good for buying augmentations or trying out a new stock trading script.

## [spider.js](https://raw.githubusercontent.com/xsoc/Bitburner/main/spider.js)
Think thrice before looking at this script if you haven't already solved this out on your own... It's not a hard problem but it is satisfying to figure out :)

This script will continually search for servers to pwn. Once your hacking level is high enough and you have sufficient expliots avilable, then bam it will hack the server automatically, copy all your .js scripts from home, and, if the hacked server has available RAM, automatically run *extract.js servername* with as many threads as possbile.

## [stocks.js](https://raw.githubusercontent.com/xsoc/Bitburner/main/stocks.js)
A pretty basic (and very messy) automatated stock trading script, but it makes reasonable $$$ for now.
