// TODO

1. Set up an RPC Connection in init.js
  -> get sample code from lava
  -> define an env var name for the lava key
  -> add the lava key var name to config-task.yml
  -> configure the RPC connection object in init.js setup function
  -> add sample code for fetch contract state in init.js POST endpoint

2. Set up a proofs db 
  -> add entries indexed by round for each call to POST endpoint
  -> pull entries for each round by round_id during fetchSubmissions() in corelogic.js

3. Copy signature verification code from tests/test_ethSignature.js 
  -> Add signature verification to POST endpoint
  -> Add signature verification to audit flow in coreLogic.js 
