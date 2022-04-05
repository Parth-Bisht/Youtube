const container = document.getElementById('searchresults');

const searchVideos = async () => {

    try {
        let inp = document.getElementById('search').value;
        localStorage.setItem("search", JSON.stringify(inp));
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${inp}&key=AIzaSyD3-DqUNFWb2Sgq5E5NlGKfPr1zRs5qo2o&maxResults=20`);
        let data = await res.json();
        let videos = data.items;
        console.log(videos);
        appendVideos(videos);
        // return videos;

    }
    catch (err) {
        console.log(err);
    }

};

const appendVideos = (data) => {
    container.innerHTML = "";
    data.forEach(({ id, snippet, snippet: { title }, snippet: { thumbnails: { medium } }, snippet: { channelTitle }, snippet: { description } }) => {
        let div = document.createElement('div');
        div.addEventListener("click", () => {
            const videodata = [{ id, ...snippet }];
            tolocal(videodata)
            // console.log(videodata);
        })

        let infoDiv = document.createElement('div');
        infoDiv.setAttribute("id", "infodiv")
        let p = document.createElement('p');
        p.innerText = title;
        let channel = document.createElement('p');
        channel.innerText = channelTitle;
        let desc = document.createElement('p');
        desc.innerText = description;
        infoDiv.append(p, channel, desc);

        let thumbnailDiv = document.createElement('div');
        let iframe = document.createElement('img');
        iframe.src = medium.url;
        // iframe.allow = 'fullscreen';
        thumbnailDiv.append(iframe);
        div.append(thumbnailDiv, infoDiv);
        container.append(div);
    });
};

// url-https://www.youtube.com/embed/QXhV148EryQ
function tolocal(videoData) {
    localStorage.setItem("video", JSON.stringify(videoData));
    window.location.href = "player.html";
    console.log(videoData);
}

const search = JSON.parse(localStorage.getItem("search"));
// console.log(search);

async function show() {
    try {
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${search}&key=AIzaSyD3-DqUNFWb2Sgq5E5NlGKfPr1zRs5qo2o&maxResults=20`);
        let data = await res.json();
        let videos = data.items;
        console.log(videos);
        appendVideos(videos);
        // return videos;

    }
    catch (err) {
        console.log(err);
    }
}
show();