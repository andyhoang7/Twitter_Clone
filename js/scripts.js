console.log("Twitter-Clone");

document.getElementById("userInput").focus();

var input = document.getElementById("userInput");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    addTweet();
  }
});

// const tweets = [
//   {
//     body: "This is Thien  post signed in!",
//     likeCount: 0,
//    reTweets: [],
//     createdAt: "2019-08-01T04:02:07.096Z",
//     userName: "datloiboi@gmail.com"
//   },
//   {
//     body: "This is Phuong  post signed in!",
//     likeCount: 0,
//    reTweets: [],
//     createdAt: "2019-08-01T04:02:07.096Z",
//     userName: "datloiboi@gmail.com"
//   },
//   {
//     body: "This is Hang  post signed in!",
//     likeCount: 0,
//    reTweets: [],
//     createdAt: "2019-08-01T04:02:07.096Z",
//     userName: "datloiboi@gmail.com"
//   }
// ];

let tweets = JSON.parse(localStorage.getItem("tweets")) || [];
// console.log("line37", tweets);
let currentUser = "CoderSchool";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (i = 0; i < length; i++) {
    result += characters.charAt(getRandomIntInclusive(1, charactersLength));
  }
  return result;
}

function createTwitterObject() {
  return {
    body: document.getElementById("userInput").value,
    likeCount: 0,
    retweetCount: 0,
    createdAt: new Date(),
    userName: currentUser,
    isRetweet: false,
    originalTweetId: null,
    tweetId: makeId(6)
  };
}

function storeTweetsToLocalStorage(tweets) {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function addTweet() {
  newTweet = createTwitterObject();
  tweets.unshift(newTweet);
  // console.log("", newTweet);
  renderTweets(tweets);
  document.getElementById("userInput").focus();
  document.getElementById("userInput").value = "";
  storeTweetsToLocalStorage(tweets);
}

function createRetweetObject(tweet) {
  return {
    body: tweet.body,
    // likeCount: ,
    // retweets: [],
    createdAt: tweet.createdAt,
    likeCount: tweet.likeCount,
    userName: tweet.userName
  };
}
function addRetweet(idx) {
  newTweet = createTwitterObject();
  newTweet.body = createRetweetbodyHtml(tweets[idx]);
  newTweet.isRetweet = true;
  newTweet.originalTweetId = tweets[idx].tweetId;
  // tweets.unshift(newTweet);
  tweets.splice(idx + 1, 0, newTweet);
  console.log("newTweet from AddRetwee 80", newTweet);
  renderTweets(tweets);
  // document.getElementById("userInput").focus();
  document.getElementById("userInput").value = "";
  storeTweetsToLocalStorage(tweets);
}

function removeRetweetWhenOriginalTweetDeleted(originalTweetId) {
  tweets.map((el, idx) => {
    if (el.originalTweetId === originalTweetId) {
      console.log(`tweetID-110-, ${el.tweetId} Idx:${idx}`);
      tweets.splice(idx, 1);
    }
  });
}

function removeTweet(idx) {
  console.log("user delete tweets number", idx);
  let originalTweetId = tweets[idx].tweetId;
  console.log(`originalTweetId ${originalTweetId}`);
  removeRetweetWhenOriginalTweetDeleted(originalTweetId);
  tweets.splice(idx, 1);
  removeRetweetWhenOriginalTweetDeleted(originalTweetId);
  renderTweets(tweets);
  storeTweetsToLocalStorage(tweets);
}

function renderTweets(tweets) {
  const liHtmls = tweets.map((el, idx) => {
    return createtweetHtml(el, idx);
  });
  document.getElementById("tweetList").innerHTML = liHtmls.join("");
}

function createtweetHtml(el, idx) {
  return ` <div class="post-bar">
<div class="post_topbar">
  <div class="usy-dt">
    <img src="images/resources/us-pic.png" alt="">
    <div class="usy-name">
      <h3>${el.userName}</h3>
      <span><img src="images/clock.png" alt="">${el.createdAt}
      
      </span>
    </div>
  </div>
  <div class="ed-opts">
    <a href="#" title="" class="ed-opts-open"><i class="la la-ellipsis-v"></i></a>
    <ul class="ed-options">
      <li><a href="#" title="">Edit Post</a></li>
      <li><a href="#" title="">Unsaved</a></li>
      <li><a href="#" title="">Unbid</a></li>
      <li><a href="#" title="">Close</a></li>
      <li><a href="#" title="">Hide</a></li>
    </ul>
  </div>
</div>
<div class="epi-sec">
  <ul class="descp">
    <li><img src="images/icon8.png" alt=""><span>Epic Coder</span></li>
    <li><img src="images/icon9.png" alt=""><span>India</span></li>
  </ul>
  <ul class="bk-links">
    <li><a href="#" title=""><i class="la la-bookmark"></i></a></li>
    <li><a href="#" title=""><i class="la la-envelope"></i></a></li>
  </ul>
</div>
<div class="job_descp">

  <p>${el.body}</p>
  <ul class="skill-tags">
    <li><a href="#" title="">HTML</a></li>
    <li><a href="#" title="">PHP</a></li>
    <li><a href="#" title="">CSS</a></li>
    <li><a href="#" title="">Javascript</a></li>
    <li><a href="#" title="">Wordpress</a></li> 	
  </ul>
</div>
<div class="job-status-bar">
  <ul class="like-com">
    <li>
      <a href="#"><i onclick="myFunction(this)" class="fa fa-heart"></i>
      </a>
      <img src="images/liked-img.png" alt="">
      <span>${el.likeCount}</span>
    </li> 
    <li><a onclick="retweetClick(${idx})" title="" class="com"><img src="images/shareSmall.png" alt="">Retweets: ${
    el.retweetCount
  }</a></li>
  </ul>
  <a onclick="removeTweet(${idx})"><i class="la la-eye"></i>Delete</a>
</div>
</div> `;
}

function myFunction(x) {
  x.classList.toggle("fa-heart-o");
  // var z = document.getElementById("likeToggle");
  // if (z.innerHTML === "Like") {
  //   zx.innerHTML = "Unlike";
  // } else {
  //   z.innerHTML = "Like";
}

function retweetClick(idx) {
  console.log(`line-147 Tweet[idx]]: ${idx}`);
  tweets[idx].retweetCount += 1;
  addRetweet(idx);
  // renderTweets(tweets);
}

function createRetweetbodyHtml(tweet) {
  const el = createRetweetObject(tweet);
  return `
<div class="post-bar">
<div class="post_topbar">
  <div class="usy-dt">
    <img src="images/resources/us-pic.png" alt="">
    <div class="usy-name">
      <h3>${el.userName}</h3>
      <span><img src="images/clock.png" alt="">${el.createdAt}
      </span>
    </div>
  </div>
  <div class="ed-opts">
    <a href="#" title="" class="ed-opts-open"><i class="la la-ellipsis-v"></i></a>
    <ul class="ed-options">
      <li><a href="#" title="">Edit Post</a></li>
      <li><a href="#" title="">Unsaved</a></li>
      <li><a href="#" title="">Unbid</a></li>
      <li><a href="#" title="">Close</a></li>
      <li><a href="#" title="">Hide</a></li>
      <li><a href="#" title="" onclick="goToOriginalTweet(${
        el.tweetId
      })">Go To Tweet</a></li>
    </ul>
  </div>
</div>
<div class="job_descp">
  <p>${el.body}</p>
  <ul class="skill-tags">
    <li><a href="#" title="">More</a></li>	
  </ul>
</div>
</div> 
`;
}
function goToOriginalTweet(tweetId) {
  console.log("user click goto original tweetID", tweetId);
}

function retweetAtweetHtmlTemplate(el, idx) {
  return `
  <div class="post-bar">
  <div class="post_topbar">
    <div class="usy-dt">
      <img src="images/resources/us-pic.png" alt="">
      <div class="usy-name">
        <h3>${el.userName}</h3>
        <span><img src="images/clock.png" alt="">${el.createdAt}
        
        </span>
      </div>
    </div>
    <div class="ed-opts">
      <a href="#" title="" class="ed-opts-open"><i class="la la-ellipsis-v"></i></a>
      <ul class="ed-options">
        <li><a href="#" title="">Edit Post</a></li>
        <li><a href="#" title="">Unsaved</a></li>
        <li><a href="#" title="">Unbid</a></li>
        <li><a href="#" title="">Close</a></li>
        <li><a href="#" title="">Hide</a></li>
      </ul>
    </div>
  </div>
  <div class="epi-sec">
    <ul class="descp">
      <li><img src="images/icon8.png" alt=""><span>Epic Coder</span></li>
      <li><img src="images/icon9.png" alt=""><span>India</span></li>
    </ul>
    <ul class="bk-links">
      <li><a href="#" title=""><i class="la la-bookmark"></i></a></li>
      <li><a href="#" title=""><i class="la la-envelope"></i></a></li>
    </ul>
  </div>
  <div class="job_descp">
  
    <!-- <p>${el.body}</p> -->

      <!-- endbodylarge -->
    <ul class="skill-tags">
      <li><a href="#" title="">HTML</a></li>
      <li><a href="#" title="">PHP</a></li>
      <li><a href="#" title="">CSS</a></li>
      <li><a href="#" title="">Javascript</a></li>
      <li><a href="#" title="">Wordpress</a></li> 	
    </ul>
  </div>
  <div class="job-status-bar">
    <ul class="like-com">
      <li>
        <a href="#"><i class="la la-heart"></i> Like</a>
        <img src="images/liked-img.png" alt="">
        <span>${el.likeCount}</span>
      </li> 
      <li><a onclick="retweetClick(${idx})" title="" class="com"><img src="images/shareSmall.png" alt="">Retweets: ${
    el.retweetCount
  }</a></li>
    </ul>
    <a onclick="removeTweet(${idx})"><i class="la la-eye"></i>Delete</a>
  </div>
  </div>
  `;
}
renderTweets(tweets);

//count character
document.getElementById("userInput").onkeyup = function() {
  document.getElementById("count").innerHTML =
    "Characters left: " + (140 - this.value.length);
};
