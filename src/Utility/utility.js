const client_id = "868195f0bf0e479e98c8bc76070a3438";
const redirectUri = 'http://localhost:3000/';
const client_secret = 'd91dc264ebae42d495e3e1b57f050075';

const Spotify = {
  getAccessToken() {
    const authHeader = 'Basic ' + btoa(`${client_id}:${client_secret}`);
    const authOptions = {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    };

    return fetch('https://accounts.spotify.com/api/token', authOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Request failed with status:', response.status);
        }
        return response.json();
      })
      .then(data => {
        const token = data.access_token;
        return token;
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  },

  search(term) {
    return this.getAccessToken().then(accessToken => {
      return fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
        .then(response => {
          return response.json();
        })
        .then(jsonResponse => {
          if (!jsonResponse) {
            return [];
          } else {
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                track: track.name,
                artist: track.artists[0].name,
                album: track.album.name
            }))
          }
        });
    });
  },

  savePlaylist(name,tracks,userID) {
    
  }
};



export default Spotify