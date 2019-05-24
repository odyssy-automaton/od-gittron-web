export default class HubspotApi {
  constructor() {
    this.baseUrl = 'https://api.hsforms.com/submissions/v3/integration/submit';
    this.portalId = '5292269';
    this.formGuid = '4981bb86-18c1-41f1-85da-e01fdd465ae0';
  }

  addContact = (formData) => {
    const postData = {
      fields: [
        {
          name: 'email',
          value: formData.email,
        },
        {
          name: 'wallet_address',
          value: formData.walletAddress,
        },
        {
          name: 'gittron_preference_indapp',
          value: formData.inDappPref,
        },
        {
          name: 'gittron_preference_marketing',
          value: formData.marketingPref,
        },
        {
          name: 'gittron_contact',
          value: true,
        },
      ],
    };

    return fetch(`${this.baseUrl}/${this.portalId}/${this.formGuid}`, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => response)
      .catch((error) => {
        console.error('Error:', error);
        return error;
      });
  };
}
