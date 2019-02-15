import React from 'react';

function About() {
  return (
    <div className="Page">
      <div className="PageHeader">
        <div className="PageHeader__Contents">
          <h1>The year is 3369 and, throughout the universe, all biological life has been decimated. All that's left are Prime Bots that Humans sent to explore space. It's up to the Prime Bots to buidl their own future. They'll need help from the Worker and Support Bots in order to survive.</h1>
        </div>
      </div>
      <div className="Block Columns Contain">
        <div className="Columns__Column--33">
          <h2>Prime Bots</h2>
          <p>If you manage or own a repo, you can generate a unique Prime Bot.</p>
        </div>
        <div className="Columns__Column--33">
          <h2>Worker Bots</h2>
          <p>Once a Prime Bot is generated, owners can clone their bot as a Worker Bot and distribute to their contributors.</p>
        </div>
        <div className="Columns__Column--33">
          <h2>Support Bots</h2>
          <p>Non-coders or just folks who want to support an open source project, can clone a Prime Bot as a Support Bot, generating a unique version of that repo's Prime Bot. Funds go directly to the owner of the repo.</p>
        </div>
      </div>
      <div className="Block">
        <div className="Block__Contents">
          <h2>Prime Bots</h2>
          <p>If you manage or own a repo, you can generate a unique Prime Bot.</p>
        </div>
      </div>
      <div className="Block">
        <div className="Block__Contents">
          <h2>Worker Bots</h2>
          <p>Once a Prime Bot is generated, owners can clone their bot as a Worker Bot and distribute to their contributors.</p>
        </div>
      </div>
      <div className="Block">
        <div className="Block__Contents">
          <h2>Support Bots</h2>
          <p>Non-coders or just folks who want to support an open source project, can clone a Prime Bot as a Support Bot, generating a unique version that repo's Prime Bot. Funds go directly to the owner of the repo.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
