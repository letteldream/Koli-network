// initialize lavaRPC connection here
const { namespaceWrapper } = require('./namespaceWrapper.js');
const contractAddress = "0x5c6db88b0da718c4871cC52D2AA698242B5a92EE";
const lavaRPC = {}; // TODO

// process.env.lavaToken can contain lava token


const nftGate = {
    requestHandler : async (req, res) => {
        let payload = req.body;
        let keypair = await namespaceWrapper.getSubmitterAccount();
      
        // first verify the payload format and that the payload is for this node
        if ( !payload.address || !payload.signature || !payload.targetNode || ( payload.targetNode != node_address ) ) {
          return res.status(400).send({ error : "invalid payload" })
        }
      
        const db = await namespaceWrapper.getDb();

        // now we will verify that the eth signature matches the address 
        let signatureMatches = web3js.verifySignature() // TODO
      
        // if this signature is valid, then we should store the payload including it's signature in a database of proofs for the current round
        if (signatureMatches) {
            await db.insert(payload)
        
            // now we will ping the eth RPC service and fetch the contract state to check the address's balance
            let balance = await lavaRPC.callContractFunction("balanceOf", contractAddress) // TODO - completely replace, this is pseudocode
        
            // fetch the balance of payload.address in the contract 0x5c6db88b0da718c4871cC52D2AA698242B5a92EE
        
            // if the balance is > 0 -> return true
            if ( balance > 0 ) {
                res.status(200).send(signPayload({result : true}))
            } else {
        
                // otherwise return false
                res.status(200).send(signPayload({result : false}))
            }
            
        
            // in either case, sign the return payload with the local key of the node operator
      
         

            
        
        }
    }
}

module.exports = nftGate;

async function signPayload (json) {
    return {
        payload : json,
        address : await namespaceWrapper.getMainAccountPubkey(),
        signature : await namespaceWrapper.payloadSigning(json)
    }
}