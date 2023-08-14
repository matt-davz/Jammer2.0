const clientId = '868195f0bf0e479e98c8bc76070a3438'; // Insert client ID here.
const redirectUri = 'http://golden-gnome-e17ac1.netlify.app'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;
let userId;

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
      // window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else { 
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`; 
      window.location = accessUrl; // sets window location to the access url 
    }
  },

  search(term,offset) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}&offset=${offset}`, {
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

  getUserId() {
    if (userId) {
        return userId;
      }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

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
         return jsonResponse.id;})
  },

  async savePlaylist(name, trackUris) {
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
         return jsonResponse}).then(() => {
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
            
  },
  async getUserPlaylist() {
    try {
      const accessToken = Spotify.getAccessToken();
      const headers = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      };
  
      const response = await fetch('https://api.spotify.com/v1/me', headers);
      const jsonResponse = await response.json();
      
      const userId = jsonResponse.id;
  
      const request = {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      };
  
      const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, request);
  
      if (!playlistResponse.ok) {
        throw new Error(`Request failed with status: ${playlistResponse.status}`);
      }
  
      const playlistJsonResponse = await playlistResponse.json();
      const playlists = playlistJsonResponse.items.map(playlist => {
        const playlistData = {
          name: playlist.name,
          playlist_uri: playlist.uri,
          numOfTracks: playlist.tracks.total,
          tracks: playlist.tracks.href,
          id: playlist.id,
          snapShotId: playlist.snapshot_id
        };
      
        if (playlist.images.length > 0) {
          playlistData.img = playlist.images[0].url;
        } else {
            playlist.img = './monke.jpeg'
        }
      
        return playlistData;
      });
  
      return playlists;
    } catch (error) {
      console.error('Error in getUserPlaylist:', error, error.message);
      return [];
    }
  },

  async getPlayListSongs(playlistId){
    try {

        const accessToken = Spotify.getAccessToken()
        const request = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        }
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`

        const response = await fetch(url, request);
        const jsonResponse = await response.json();

        const playlistTracks = await jsonResponse;
        const trackArrays = []
        const tracks = []
        
        playlistTracks.items.map(trackArray => (
            trackArrays.push(trackArray)
        ))
    

        trackArrays.map(track => ( tracks.push({
            name:track.track.name,
            artist:track.track.artists[0].name,
            album: track.track.album.name,
            uri: track.track.uri,
            preview_url: track.track.preview_url,
            img:track.track.album.images[0].url,
            id:track.track.id
        })
        ))

        return tracks
    } catch(error){
        console.error('Error in getUserPlaylist:', error, error.message);
        return []
    }

    },
    async addSong(uris, playlistId) {
      try {
          const accessToken = Spotify.getAccessToken();
          const headers = {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
          };
  
          const body = JSON.stringify({
              uris: uris,
              position: 0
          });
  
          const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
              method: 'POST',
              headers: headers,
              body: body
          });
  
          if (response.ok) {
              const data = await response.json();
              return data;
          } else {
              const errorData = await response.json();
              throw new Error(`Request failed with status: ${response.status}, ${errorData.error.message}`);
          }
      } catch (error) {
          console.error(error);
          throw error;
      }
  },
  async removeSong(uris,playlistId,snapShotId){
    try{
    const accessToken = Spotify.getAccessToken();
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
  
    const body = JSON.stringify({
      uris: uris,
      snapshot_id: snapShotId
    } )

    const response = await fetch (`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'DELETE',
      headers: headers,
      body: body
    })

    if(response.okay){
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      throw new Error(`Request failed with status: ${response.status}, ${response.message}`)
    }

    } catch (error) {
      console.log(error)
    }
  }
  
  
  

  
  

  
};



export default Spotify;
