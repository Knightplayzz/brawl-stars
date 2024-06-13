<div align="center">
 <img src="https://static.wikia.nocookie.net/supercell-fankit/images/f/ff/Brawl_Stars_Smile_Logo.png/revision/latest/scale-to-width-down/250?cb=20201119180831" height="200px"  alt="Brawl Stars"/>
 <br>
 <p>A light-weight module that makes <a href="https://developer.brawlstars.com/">Brawl Stars API</a> become easy.</p>
 <a href=""><img src="https://app.travis-ci.com/Knightplayzz/brawl-stars.svg?branch=main"></a>
 <a href='https://coveralls.io/github/Knightplayzz/brawl-stars?branch=main'><img src='https://coveralls.io/repos/github/Knightplayzz/brawl-stars-node/badge.svg?branch=main' alt='Coverage Status' /></a>
 <a href="https://www.npmjs.com/package/brawl-stars-node"><img src="https://img.shields.io/npm/dt/brawl-stars-node.svg?maxAge=3600"></a>

<a href="https://www.npmjs.com/package/brawl-stars-node"><img src="https://img.shields.io/npm/v/brawl-stars-node" alt="Install size"></a>
 <a href="https://packagephobia.now.sh/result?p=brawl-stars-node"><img src="https://badgen.net/packagephobia/install/brawl-stars-node" alt="Current version"></a>
 </div>

# Introduction

Provides an easy way to get started with the [Brawl Stars API](https://developer.brawlstars.com/)
For more information about the responses please check [Official Brawl Stars Dev Website](https://developer.brawlstars.com/#/documentation).
Not releated to Supercell.
Created By: Philippe Smeets

## Installation

`npm install brawl-stars-node`

## Links

- [Documentation](https://github.com/Knightplayzz/brawl-stars/blob/main/documentation.md)
- [Brawl Stars Developer Website](https://developer.brawlstars.com/#/documentation)

## Example

```javascript
const client = require('brawl-stars-node');
async function myFunction() {
    await client.login('YOUR-TOKEN-HERE');
    const player = await client.getPlayer('PLAYER-TAG-HERE');
    console.log(`${player.name} (${player.tag})`);
}
myFunction();
```

### Disclaimer

> This content is not affiliated with, endorsed, sponsored, or specifically approved by Supercell and Supercell is not responsible for it. For more information see Supercell's Fan Content Policy: <www.supercell.com/en/fan-content-policy/>
