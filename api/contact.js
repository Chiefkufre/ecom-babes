import axios from 'axios';
const hubspotAPIUrl = 'https://api.hubapi.com/crm/v3/objects/contacts/';
const idProperty = 'email';

export default async function handler(req, res) {
  const { email } = req.body; 

  const accessToken = process.env.token;

  if (!email || !accessToken) {
    return res.status(400).json({ message: 'Missing email or access token' });
  }
  const url = `${hubspotAPIUrl}${email}?idProperty=${idProperty}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching contact data' });
  }
}
