import _ from 'lodash'
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTsearch from 'youtube-api-v3-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video-list'
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDibDQhDmWAT5ft4ZfHPxONDSrkIVwdbWM';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
       this.videoSearch('')
    }
    videoSearch(term) {
        YTsearch(API_KEY, {q:term} , (err,result) => {
            this.setState({videos : result.items,
                selectedVideo:result.items[0]});
        });
    }
    render() {
        const videoSearch =_.debounce((term) => {this.videoSearch(term)},1000);
        return (
            <div>
                <SearchBar onSearchTermChange = {videoSearch}/>
                <VideoDetail video = {this.state.selectedVideo}/>
                <VideoList onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
                    videos = {this.state.videos}/>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.querySelector('.container'));