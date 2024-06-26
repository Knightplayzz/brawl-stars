<div align="center">
 <img src="https://static.wikia.nocookie.net/supercell-fankit/images/f/ff/Brawl_Stars_Smile_Logo.png/revision/latest/scale-to-width-down/250?cb=20201119180831" height="200px"  alt="Brawl Stars"/>
 <br>
 <p>A light-weight module that makes <a href="https://developer.brawlstars.com/">Brawl Stars API</a> become easy.</p>
 <a href=""><img src="https://app.travis-ci.com/Knightplayzz/brawl-stars.svg?branch=main"></a>
 <a href='https://coveralls.io/github/Knightplayzz/brawl-stars?branch=main'><img src='https://coveralls.io/repos/github/Knightplayzz/brawl-stars/badge.svg?branch=main' alt='Coverage Status' /></a>
 <a href="https://www.npmjs.com/package/brawl-stars-node"><img src="https://img.shields.io/npm/dt/brawl-stars-node.svg?maxAge=3600"></a>

<a href="https://www.npmjs.com/package/brawl-stars-node"><img src="https://img.shields.io/npm/v/brawl-stars-node" alt="Install size"></a>
 <a href="https://packagephobia.now.sh/result?p=brawl-stars-node"><img src="https://packagephobia.com/badge?p=brawl-stars-node" alt="Current version"></a>
 </div>

# Introduction

Provides an easy way to get started with the [Brawl Stars API](https://developer.brawlstars.com/)
For more information about the responses please check [Official Brawl Stars Dev Website](https://developer.brawlstars.com/#/documentation).
Not releated to Supercell.
Created By: Philippe Smeets

## Installation

`npm install brawl-stars-node`

## Usage

All fetches return a promise using [request-promise](https://www.npmjs.com/package/request-promise)

## Instantiation

In order to get started with Brawl Stars API, you need to create an account at [developer.brawlstars.com](https://developer.brawlstars.com). Then go "My Account" and press on "Create New Key". Fill in the name, description and IP address and copy the key. This is the key that we are later going to use to authenticate you.

Once you get your token and have installed the module. Require the package into you file using ``require()`` and call the login function.

Example:

```javascript
const client = require('brawl-stars-node');
await client.login('YOUR-TOKEN-HERE');
```

Remember that the ``client.login()`` is an asynchronised function.

# Documentation

## Authentication

### Login

|  Function  | Parameter | Description |
|------------|-----------|-------------|
| ``#login`` |   auth    | Logs the user in |

```javascript
await client.login('YOUR-TOKEN-HERE');
```

## INPUT

| Name      | Type    | Required | Description     |
|-----------|---------|----------|-----------------|
| auth      | string  |   True   | The Authentication Token granted by [developer.clashofclans.com](https://developer.clashofclans.com/)
| clubTag   | string  |   True   | The tag of the club. |
| playerTag | string  |   True   | The tag of a player. Found in player's profile.  |
| seasonId  | string  |   True   | The id of that season. ``client.getRankingsPowerplaySeasons()`` will show all possible id's. |

## OUTPUT

| Name     | Type    | Optional | Description     |
|----------|---------|----------|-----------------|

## MORE OUTPUT DATA

For more output data please check the [Official Brawl Stars Dev Website](https://developer.brawlstars.com/#/documentation).

### Disclaimer

> This content is not affiliated with, endorsed, sponsored, or specifically approved by Supercell and Supercell is not responsible for it. For more information see Supercell's Fan Content Policy: <www.supercell.com/en/fan-content-policy/>
