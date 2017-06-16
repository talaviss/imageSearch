import React from 'react';
import SearchWidget from './components/SearchWidget';
import ImageList from './components/ImageList';
import Superagent from 'superagent';
import './styles/App.css';

const key = '9685535eedbb6ad9e9ff36630cd62098';
const flicker_base = `https://api.flickr.com/services/rest/?api_key=${key}&format=rest&format=json&nojsoncallback=1`;
const pixabay_key = '5648887-ddc59b3aa5dda2aba059467bd';
const pixabay_base = `https://pixabay.com/api/?key=${pixabay_key}&image_type=photo&per_page=10&page=1&pretty=false`;


class App extends React.Component {
   constructor() {
      super();

      this.state = {
          images: []
        };

       this.handleSearch = this.handleSearch.bind(this);

    }


    getFlickrPhotoUrl(image, i) {
        return {
            id: `image.id`,
            url: `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`,
            alt: image.alt
        }
    }

    getPixabayPhotoUrl(image) {
        return {
            id: image.id,
            url: image.webformatURL,
            alt: image.tags
        }
    }

    handleSearch(searchText) {
        searchText = searchText.replace(/\s/g, '+');
        console.log(searchText);

        this.setState({
            images: []
        });
       Superagent.get(`${flicker_base}&method=flickr.photos.search&text=${searchText}&per_page=1&page=1`)

            .end((err, res) => {
                if(err){
                    console.error('something went wrong with flicker api', err);
                }
                if (res && res.status === 200 && res.body.photos) {
                    this.setState({
                        images: this.state.images.concat(res.body.photos.photo.map(this.getFlickrPhotoUrl))
                    });
                } else {
                    console.error('received bad status from flicker api' + res.status, err);

                }
            });

        console.log(`${pixabay_base}&q=${searchText}`);
        Superagent.get(`${pixabay_base}&q=${searchText}`)


            .end((err, res) => {
                console.dir(res);
                if (err || !res.ok) {
                    alert('request to pixabay encountered an error');
                }

                if (res && res.status === 200 && res.text) {
                    const jsonObj = JSON.parse(res.text);
                    this.setState({
                        images: this.state.images.concat(jsonObj.hits.map(this.getPixabayPhotoUrl))
                    });
                } else {
                    console.error('received bad status from pixabay api' + res.status, err);
                }
            });


    }

    render() {
        return (
          <div>
              <SearchWidget onTermChange={this.handleSearch} />
              <ImageList images={this.state.images} />
          </div>
        );
    }
}


export default App;
