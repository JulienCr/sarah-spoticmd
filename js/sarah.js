require([
    '$api/models',
    '$api/search#Search'
    ], function(models, Search) {

    models.application.load('arguments').done(init);
    models.application.addEventListener('arguments', init);

    function init(){
        var args = models.application.arguments;

        var action = args[0];

        console.log(models.session)

        switch(action) {
            case 'play':
            models.player.play();
            break;

            case 'pause':
            models.player.pause();
            break;

            case 'setPlaylist':
            var playlist = models.Playlist.fromURI('spotify:user:@:playlist:'+args[1]);
            models.player.playContext(playlist);
            models.application.openURI('spotify:user:@:playlist:'+args[1]);
            break;

            case 'next':
            models.player.skipToNextTrack();
            break;

            case 'prev':
            models.player.skipToPrevTrack();
            break;

            case 'playTrack':
            var mySearch = Search.search(args[1]);
            mySearch.tracks.snapshot(0, 1).done(function(a){
                var uri = a.get(0).uri
                models.player.playTrack( models.Track.fromURI(uri) );
            })
            break;

            case 'playArtist':
            var mySearch = Search.search(args[1]);
            mySearch.artists.snapshot(0, 1).done(function(a){
                var uri = a.get(0).uri
                models.player.playContext( models.Track.fromURI(uri) );
                models.application.openURI(uri);
            })
            break;

            default:
            break;
        }
    }

}); // require
