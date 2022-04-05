// url-https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&key=AIzaSyBr2h-qWIX107kalwd71KsN9RxToOD5D_Y
async function showTrending() {
    try {
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&key=AIzaSyBr2h-qWIX107kalwd71KsN9RxToOD5D_Y&maxResults=40`);
        let data = await res.json();
        console.log(data.items);
        append(data.items)
    }
    catch (err) {
        console.log(err);
    }

}
showTrending();
const container = document.getElementById('trending');
function append(data) {
    data.forEach(({ id, snippet, snippet: { title }, snippet: { thumbnails: { medium } }, snippet: { channelTitle } }) => {
        let mainDiv = document.createElement('div');
        mainDiv.addEventListener("click", () => {
            const videodata = [{ id, ...snippet }];
            tolocal(videodata);
            console.log(videodata);
        })

        let thumbnail = document.createElement('img');
        thumbnail.src = medium.url;

        let name = document.createElement('p');
        name.innerText = title;
        let channel = document.createElement('p');
        channel.innerText = channelTitle;

        mainDiv.append(thumbnail, name, channel);
        container.append(mainDiv);
    });
}

function tolocal(videoData) {
    localStorage.setItem("video", JSON.stringify(videoData));
    window.location.href = "player.html";
    console.log(videoData);
}
function searchVideos() {
    const input = document.getElementById("search").value;
    console.log(input);
    localStorage.setItem("search", JSON.stringify(input));
    window.location.href = "search.html"

}