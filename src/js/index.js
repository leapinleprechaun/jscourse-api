// List of posts
var appInfo = {
	allPostIds: [],
	getPosts : function() {
			document.getElementById('listing').innerHTML = ''; //empty the list
			var wrapper = document.createElement('ul'); // create the list wrapper
			axios.get('http://localhost:3000/posts') //fetch the posts list
			.then(function(response){
				// loop through the returned information & populate the list
				_.each(response.data, function(post) {
					let listItem = document.createElement('li');
					listItem.appendChild(document.createTextNode(post.title))
					wrapper.appendChild(listItem);
					appInfo.allPostIds.push(post.id); // added so we can remove later
				}, this)

				document.getElementById('listing').appendChild(wrapper);
			}.bind(this))
			.catch(function (error) {
			    console.log(error);
			 });
		}
}

window.onload = appInfo.getPosts.bind(appInfo);

// Display a Single post
// axios.get('http://localhost:3000/posts/1')
// .then(function(response){
// 	document.getElementById('listing').innerHTML = response.data.title;
// });

// Add a post
document.getElementById('addItem').onclick = function(e){
	var myRandomID = _.random(0,3000);
	appInfo.allPostIds.push(myRandomID);
	axios.post('http://localhost:3000/posts', {id: myRandomID, title: 'test ' + myRandomID, author:'Gillian'})
	.then(function () {
		appInfo.getPosts.call(appInfo);
	})
	.catch(function (err) {
		console.log(err);		
	})
}

// Remove a post
document.getElementById('removeItem').onclick = function(e){
	var lastPostId = appInfo.allPostIds.pop(); //removes the last item & gives you back the last in the array of IDs
	axios.delete('http://localhost:3000/posts/'+lastPostId) //send a request to delete
	.then(function () {
		appInfo.getPosts.call(appInfo);
	})
	.catch(function (err) {
		console.log(err);
	})
}



