import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ContextProvider from "./context/appContext";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { Web3Modal } from "@web3modal/react";
import { modalConnectors, walletConnectProvider } from "@web3modal/ethereum";
import { EthereumClient } from "@web3modal/ethereum";
import { polygonMumbai } from "wagmi/chains";
const chains = [polygonMumbai];

// Wagmi client
const { provider } = configureChains(
  [polygonMumbai],
  [walletConnectProvider({ projectId: "2f1f53444758c9a32897f70a77b810ef" })]
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "Test", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <ContextProvider>
        <App />
      </ContextProvider>
      <Web3Modal
        projectId="a2427e0c1e47f2fdf878366cb31eaf25"
        ethereumClient={ethereumClient}
      />
    </WagmiConfig>
  </React.StrictMode>
);
