console.log("Twitter-Clone");

document.getElementById("userInput").focus();

// expanding the img automatically
// check URL
function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

var input = document.getElementById("userInput");
input.addEventListener("keyup", e => {
  let words = e.target.value
  words = words.split(' ')
  words.map(word => {
    if (validURL(word)) {
      document.getElementById('preview').innerHTML = `<image src="${word}" style="height: 100px; width: 100px"></image>`
    } else {
      document.getElementById('preview').innerHTML = ''
    }
  })
  e.key === "Enter" && addTweet()
  
});




// var input = document.getElementById("userInput");
// input.addEventListener("keyup", function(event) {
//   if (event.keyCode === 13) {
//     addTweet();
//   }
// });

// const tweets = [
//   {
//     body: "This is Thien  post signed in!",
//     likeCount: 1,
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
let isLogin = true;

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
  const input = document.getElementById("userInput").value
  let id = makeId(6);
  return {
    body: startWithAt(input),
    likeCount: 0,
    like: false,
    retweetCount: 0,
    createdAt: new Date(),
    userName: currentUser,
    isRetweet: false,
    tweetId: id,
    originalTweetId: id
  };
}

function storeTweetsToLocalStorage(tweets) {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}


//mention  a user

function startWithAt(newTweet){
  console.log(newTweet)
  const words = newTweet.split(' ')
  console.log(words)

   const go = words.map((word, idx)=>{
    // console.log(word)
    return word.charAt(0) === '@' ?  `<a href="phuong-profile.html" style="color:">${word}</a>` : word
  }).join(' ')
  console.log(go)

  return go
}

function addTweet() {
  newTweet = createTwitterObject();
  tweets.unshift(newTweet);
  // console.log("", newTweet);
  // startWithAt(newTweet.body)
  renderTweets(tweets)
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
    tweetId: tweet.tweetId,
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
  console.log("newTweet from AddRetweet() 104", newTweet);
  renderTweets(tweets);
  // document.getElementById("userInput").focus();
  document.getElementById("userInput").value = "";
  storeTweetsToLocalStorage(tweets);
}

function removeTweetAndItsRetweet(originalTweetId) {
  return tweets.filter(tweet => {
    return tweet.originalTweetId !== originalTweetId;
  });
  // tweets.map((el, idx) => {
  //   if (el.originalTweetId === originalTweetId) {
  //     console.log(`tweetID-110-, ${el.tweetId} Idx:${idx}`);
  //     tweets.splice(idx, 1);
  //   }
  // });
}

function removeTweet(idx) {
  console.log("user delete tweets number", idx);
  let tweet = tweets[idx];
  if (tweet.isRetweet) {
    decreaseRetweetCount(tweet.originalTweetId);
    tweets.splice(idx, 1);
  } else {
    tweets = removeTweetAndItsRetweet(tweet.tweetId);
    console.log(`and all its retweets`);
  }

  renderTweets(tweets);
  storeTweetsToLocalStorage(tweets);
}

function decreaseRetweetCount(originalTweetId) {
  tweets.map(el => {
    if (el.tweetId === originalTweetId) {
      console.log(`found original tweets`);
      el.retweetCount -= 1;
    }
  });
}

function renderTweets(tweets) {
  const liHtmls = tweets.map((el, idx) => {
    return createtweetHtml(el, idx);
  });
  document.getElementById("tweetList").innerHTML = liHtmls.join("");
  document.getElementById('preview').innerHTML = ''
}

function createtweetHtml(el, idx) {
<<<<<<< HEAD
  return ` <div id="${el.tweetId}" class="post-bar">
=======
  // console.log('fire function', startWithAt(el.body))
  return ` <div class="post-bar">
>>>>>>> 89676b9e44271f9159323d21c8af23f0ab29bc81
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
      <a href="#" onclick="countLike(${idx})">${
    el.likeCount > 0
      ? "<i class='fa fa-heart' style='color:#e44d3a' > Like</i>"
      : "<i class='fa fa-heart-o'> Unlike</i>"
  }</i>
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

function countLike(idx) {
  tweets[idx].like = !tweets[idx].like;
  if (tweets[idx].like === false) {
    tweets[idx].likeCount = 1;
    // tweets[idx].like === true
  } else {
    tweets[idx].likeCount = 0;
  }
  // toggleHeart(onclick());
  renderTweets(tweets);
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
    </ul>
  </div>
</div>
<div class="job_descp">
  <p>${el.body}</p>
  <ul class="skill-tags">
  <li><a href="#" title="" onclick="goToOriginalTweet(${
    el.tweetId
  })">More</a></li>	
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




addTweet();