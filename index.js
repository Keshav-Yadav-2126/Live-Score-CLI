#!/usr/bin/env node

import { getLiveScore } from "./gpt.js";
import { intro } from "./intro.js";

(async function(){
    console.log(await intro())
    await getLiveScore()
})()