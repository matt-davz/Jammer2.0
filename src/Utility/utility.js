const clientId = '868195f0bf0e479e98c8bc76070a3438'; // Insert client ID here.
const redirectUri = 'http://localhost:3000/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/); //checks if access token is in url //this happens because spotify needs an access token to get requests 
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/); // checks if there is an expire token from spotifity 
    if (accessTokenMatch && expiresInMatch) { // if no access token in window location (url)
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else { 
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`; 
      window.location = accessUrl; // sets window location to the access url 
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        preview_url: track.preview_url,
        img: track.album.images[0].url
      }));
    });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    fetch('https://api.spotify.com/v1/me', {
        headers: headers,
      }).then(response => {
          if (!response.ok) {
            throw new Error('Request failed with status:', response.status);
          }
          return response.json();
        })
        .then(jsonResponse => {
          userId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ name: name })
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Request failed with status:', response.status);
              }
              return response.json();
            })
            .then(jsonResponse => {
              console.log(trackUris);
              const playlistId = jsonResponse.id;
              return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ uris: trackUris })
              });
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Request failed with status:', response.status);
              }
              return response.json();
            })
            .then(jsonResponse => {
              console.log(jsonResponse);
            })
            .catch(error => {
              console.error('Error:', error.message);
            });
        })
        .catch(error => {
          console.error('Error:', error.message);
        });
      
  }
};

export default Spotify;
