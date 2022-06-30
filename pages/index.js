import React, { useEffect, useState } from "react";
import CreateProduct from "../components/CreateProduct";
import Product from "../components/Product";
import HeadComponent from "../components/Head";
// import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";


// Constants
const TWITTER_HANDLE = "rachelalmonte_";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // This will fetch the users' public key (wallet address) from any wallet we support
  const { publicKey } = useWallet();
  const isOwner = publicKey
    ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY
    : false;
  const [creating, setCreating] = useState(false);
  const [products, setProducts] = useState([]);

  const renderNotConnectedContainer = () => (
    <div>
      <img
        className="connect-img"
        src="https://media0.giphy.com/media/ByosNNpZJ5GHUvqGF4/giphy.gif?cid=ecf05e470hmdccfwgl7vqu1c1w288npcyffqxfpx063gzpqi&rid=giphy.gif&ct=g"
        alt="tupac"
        
      />
      <div className="button-container">
        <WalletMultiButton className="cta-button connect-wallet-button" />
      </div>
    </div>
  );

  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          console.log("Products", data);
        });
    }
  }, [publicKey]);

  const renderItemBuyContainer = () => (
    <div className="products-container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );

  return (
    <div className="App">
      <HeadComponent />
      <div className="container">
        <header className="header-container">
       

          <p className="header"> Rachel NBA Store 🇩🇴 </p>
          <p className="sub-text"> Si quieres, compras 👇 </p>

          {/* Make form public  */}
          {/* {isOwner && (
            <button
              className="create-product-button"
              onClick={() => setCreating(!creating)}
            >
              {creating ? "Close" : "Create Product"}
            </button>
          )} */}

          {publicKey && (
            <button
              className="create-product-button"
              onClick={() => setCreating(!creating)}
            >
              {creating ? "Close" : "Create Product"}
            </button>
          )}
        </header>

        <main>
          {creating && <CreateProduct />}
          {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
        </main>

        <div className="footer-container">
          <img
            alt="Twitter Logo"
            className="twitter-logo"
            src="twitter-logo.svg"
          />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;