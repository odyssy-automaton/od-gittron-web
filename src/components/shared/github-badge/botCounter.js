const Web3 = require('web3');
const express = require('express');
const app = express();
const port = 3000;
const rpc = process.env.RPCADDRESS
const contractAddress = '0x162d3e80d51f96240ae0a44ab3a5b1ea23920ce4'
const web3 = new Web3(rpc);
var abi = require('./abi');
const contract = new web3.eth.Contract(abi,contractAddress);

app.get('/*',(req,res)=> {
    console.log(req.url);
    badgeBuilder(req.url).then(result => res.send(result));
})
app.listen(port, () => console.log('App listening on port 3000'));

async function badgeBuilder(botArg){
    botId = botArg.replace('/','');
    var botCount = 0;
    botCount = await getBotCount(botId);
    console.log(botCount.toString());

    return(200, {
        subject: 'Support Bots',
        status: botCount.toString(),
        color: 'green'
    })
}

async function getBotCount(botId){
    console.log('trying to get bot count for ' + botId);
    console.log('contract address is:'+ contractAddress);
    return await contract.methods.totalNormal(botId).call();
}
