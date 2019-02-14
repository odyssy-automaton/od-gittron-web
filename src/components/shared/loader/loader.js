import React from 'react';

function Loader() {
  return (
    <div className="Loader">
      <div className="Loader__Contents">
        <h1>Loading ...</h1>
        <p>Check Metamask to see if there's a transaction to confirm.</p>
        <p>If you've already confirmed the transaction, then it is likely processing.</p>
      </div>
    </div>
  );
}

export default Loader;
