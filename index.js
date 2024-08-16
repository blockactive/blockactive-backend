const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const Moralis = require("moralis").default;

require("dotenv").config({ path: ".env" });

app.use(express.json());

//MORALIS
const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

app.get("/moralisaddress", async (req, res) => {
  try {
    const { query } = req;
    const { address, chain } = query;

    if (!address || !chain) {
      return res.status(400).json({ error: "Missing address or chain parameter" });
    }

    const response = await Moralis.EvmApi.transaction.getWalletTransactions({
      address,
      chain,
    });

    return res.status(200).json(response);
  } catch (e) {
    console.log(`Something went wrong: ${e}`);
    return res.status(400).json({ error: "An error occurred", details: e.message });
  }
});

Moralis.start({
  apiKey: MORALIS_API_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls on port ${port}`);
  });
});
