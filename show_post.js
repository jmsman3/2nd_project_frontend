

// part-2
// Function to fetch and display posts
async function fetchAndDisplayPosts() {
    try {
        const userId = localStorage.getItem("user_id");
        console.log("Show the User ID:", userId);

        // Fetch posts from the API
        const response = await fetch('https://social-2nd-project-backend.vercel.app/crud/posts/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`  // Include token for authenticated requests
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.statusText}`);
        }

        const posts = await response.json();
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '';

        posts.forEach(post => {
            console.log(post);  // Check if post.user_id exists
            console.log("Post image URL:", post.image);
            console.log("Post Video here URL:", post.video);


            const postElement = document.createElement('div');
            postElement.classList.add('bg-white', 'shadow-md', 'rounded-md', 'p-6', 'mb-4');

            const postImage = post.image ? post.image : 'images/LOLER-inspections-1.jpg'; // Default image

            // post.user_id to get the user ID for the profile redirection
            const postUserId = post.user_id;
            console.log("Redirecting to profile of user ID:", postUserId);

            let postContent = `
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-full bg-gray-300">
                           
       
                     <img class="post-image-click w-16 h-10 rounded-full object-cover" 
                                            data-user-id="${post.user_id}" 
                                            src="${post.profile_image}" 
                                            alt="Post Image">

                        </div>
                        <div>
                            
                            <div class="flex justify-between items-center gap-1">
                                <p class="font-semibold post-name-click" data-user-id="${post.user_id}">${post.post_creator}</p>
                                <p class="font-semibold text-blue-600 post-creator" data-user-id="${post.user_id}">View Profile</p>
                            </div>

                            
                            <p class="text-sm text-gray-500">${new Date(post.created_at).toLocaleString()}</p>
                        </div>
                    </div>
                    <div>
                        <button class="text-gray-500 hover:text-gray-700 toggle-btn">
                            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h18M3 12h18m-9 6h9"></path>
                            </svg>
                            <span class="sr-only">More options</span>
                        </button>
                        <div class="edit-delete-buttons hidden flex-col space-y-2 mt-2">
                            <button class="text-xs bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 delete-btn" data-post-id="${post.id}">Delete</button>
                        </div>
                    </div>
                </div>
            `;
            if (post.caption) {
                postContent += `<p class="text-gray-800 mt-2">${post.caption}</p>`;
            }
            if (post.image) {
                postContent += `<img src="${post.image}" alt="Post Image" class="w-full max-w-[1080px] max-h-[1080px] object-cover aspect-[1/1] rounded mb-4">`;
            }
            if (post.video) {
                postContent += `<video controls class="w-full max-w-[1080px] max-h-[1080px] object-cover aspect-[1/1] rounded mb-4"><source src="${post.video}" type="video/mp4">Your browser does not support the video tag.</video>`;
            }
           

            postContent += `
                <div class="flex justify-between items-center mb-4">
                    <button class="flex items-center space-x-2 text-gray-500 hover:text-gray-700 like-button" data-post-id="${post.id}" data-liked="${post.user_liked}">
                        <span class="text-lg">${post.user_liked ? "❤️" : "🤍"}</span>
                        <span>${post.user_liked ? "Unlike" : "Like"} (${post.likes_count})</span>
                    </button>

                    <button class="flex items-center space-x-2 text-gray-500 hover:text-gray-700 comment-button" data-post-id="${post.id}">
                         
                        <span><button class="toggle-comments" data-post-id="${post.id}">Comments</button></span>
                    </button>
                </div>
              
                <div class="space-y-8 comments-container" data-post-id="${post.id}">
                    <form class="flex items-center space-x-2 mt-4 comment-form" data-post-id="${post.id}">
                        <textarea class="w-full p-2 border rounded" placeholder="Add a comment..." rows="2"></textarea>
                        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Send</button>
                    </form>
                </div>
            `;

            postElement.innerHTML = postContent;
            
            postsContainer.appendChild(postElement);
            // aita holo name e click korbe
            // Event listener for redirecting to detail_profile.html
            const postCreatorElement = postElement.querySelector('.post-creator');
            postCreatorElement.addEventListener('click', () => {
                const userId = postCreatorElement.getAttribute('data-user-id');
                console.log("Redirecting to profile of user ID:", userId);
                // Redirect to the profile detail page with userId
                window.location.href = `Detail_Profile.html?user_id=${userId}`; // Adjust the URL structure according to your Django routing
            });
            
           
            // r aita view profile text e click korbe
            // Event listener for post creator's name click
                const postCreatorNameElement = postElement.querySelector('.post-name-click');
                postCreatorNameElement.addEventListener('click', () => {
                    const userId = postCreatorNameElement.getAttribute('data-user-id');
                    console.log("Redirecting to profile of user ID:", userId);
                    window.location.href = `Detail_Profile.html?user_id=${userId}`;
                });
            

            // Event listener for post creator's image click
                const postCreatorImageElement = postElement.querySelector('.post-image-click');
                postCreatorImageElement.addEventListener('click', () => {
                    const userId = postCreatorImageElement.getAttribute('data-user-id');
                    console.log("Redirecting to profile of user ID:", userId);
                    window.location.href = `Detail_Profile.html?user_id=${userId}`;
                });


            // For Comment

            const commentButton = postElement.querySelector('.toggle-comments');
            commentButton.addEventListener('click', () => toggleComments(post.id));

            // Attach event listener for the like button
            const likeButton = postElement.querySelector('.like-button');
            likeButton.addEventListener('click', async (event) => {
                const postId = likeButton.getAttribute('data-post-id');
                const isLiked = likeButton.getAttribute('data-liked') === 'true';

                // Update UI before making the API call
                const heart = likeButton.querySelector('span.text-lg');
                const likeCountText = likeButton.querySelector('span:last-child');
                const currentLikeCount = parseInt(likeCountText.textContent.match(/\d+/)?.[0] || '0');

                if (isLiked) {
                    // Unlike the post
                    heart.innerHTML = "🤍"; // Toggle heart
                    likeCountText.innerHTML = `Like (${currentLikeCount - 1})`;
                    likeButton.setAttribute('data-liked', 'false');
                    await unlikePost(postId); // Call the function to actually unlike the post
                } else {
                    // Like the post
                    heart.innerHTML = "❤️"; // Toggle heart
                    likeCountText.innerHTML = `Unlike (${currentLikeCount + 1})`;
                    likeButton.setAttribute('data-liked', 'true');
                    await likePost(postId); // Call the function to actually like the post
                }
            });

            // Add event listener for the comment form submission with console logging
            const commentForm = postElement.querySelector('.comment-form');
            commentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const commentInput = commentForm.querySelector('textarea');
                const commentText = commentInput.value;
                console.log(`User ${userId} commented "${commentText}" on Post ${post.id}`);
                addComment(post.id, commentText);
                commentInput.value = '';
            });

            // DELETE PROCESS START HERE
            const toggleButton = postElement.querySelector('.toggle-btn');
            const editDeleteButtons = postElement.querySelector('.edit-delete-buttons');

            toggleButton.addEventListener('click', () => {
                editDeleteButtons.classList.toggle('hidden');
            });

            const deleteButton = postElement.querySelector('.delete-btn');
            deleteButton.addEventListener('click', async () => {
                const postId = deleteButton.getAttribute('data-post-id');
                try {
                    const deleteResponse = await fetch(`https://social-2nd-project-backend.vercel.app/crud/posts/${postId}/`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Token ${localStorage.getItem('token')}`
                        }
                    });

                    if (!deleteResponse.ok) {
                        throw new Error(`Error deleting post: ${deleteResponse.statusText}`);
                    }

                    postElement.remove();
                    console.log(`Post ${postId} deleted successfully`);
                } catch (error) {
                    console.error(`Error deleting post ${postId}:`, error);
                }
            });
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }

    
}

fetchAndDisplayPosts();


// Function to like/unlike a post with console logging
let likedPosts = new Set(); // Maintain a set of liked post IDs

async function likePost(postId) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(` http://127.0.0.1:8000/crud/posts/${postId}/like/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: localStorage.getItem('user_id') }) // Send the user ID with the like request
        });

        if (!response.ok) {
            throw new Error(`Error liking post: ${response.statusText}`);
        }
        likedPosts.add(postId); // Add the post to the liked set
        console.log(`Post ${postId} liked successfully.`);
    } catch (error) {
        console.error(`Error liking post ${postId}:`, error);
    }
}

async function unlikePost(postId) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(` http://127.0.0.1:8000/crud/posts/${postId}/like/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: localStorage.getItem('user_id') }) // Send the user ID with the unlike request
        });

        if (!response.ok) {
            throw new Error(`Error unliking post: ${response.statusText}`);
        }
        likedPosts.delete(postId); // Remove the post from the liked set
        console.log(`Post ${postId} unliked successfully.`);
    } catch (error) {
        console.error(`Error unliking post ${postId}:`, error);
    }
}

// Function to add a comment with logging
async function toggleComments(postId) {
    const commentsContainer = document.querySelector(`.comments-container[data-post-id="${postId}"]`);
    commentsContainer.classList.toggle('hidden');

    if (!commentsContainer.classList.contains('hidden') && commentsContainer.children.length === 0) {
        await fetchComments(postId);
    }
}

async function fetchComments(postId) {
    console.log(`Fetching comments for post ID: ${postId}`);
    try {
        const response = await fetch(` http://127.0.0.1:8000/crud/posts/${postId}/comments/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching comments: ${response.statusText}`);
        }

        const comments = await response.json();
        console.log(`Comments fetched for post ID ${postId}:`, comments);
        const commentsContainer = document.querySelector(`.comments-container[data-post-id="${postId}"]`);
        commentsContainer.innerHTML = '';

        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('flex', 'items-start', 'space-x-3', 'p-3', 'bg-gray-50', 'rounded-lg');
            commentElement.innerHTML = `
                <img src="/placeholder.svg?height=40&width=40" alt="User Avatar" class="w-10 h-10 rounded-full">
                <div class="flex-grow">
                    <p class="font-semibold">${comment.user}</p>
                    <p class="text-sm text-gray-600">${comment.text}</p>
                    <div class="flex items-center space-x-2 mt-1">
                        <button class="text-xs text-gray-500 hover:text-gray-700 edit-comment-btn" data-comment-id="${comment.id}">Edit</button>
                        <button class="text-xs text-gray-500 hover:text-gray-700 delete-comment-btn" data-comment-id="${comment.id}">Delete</button>
                    </div>
                </div>
            `;
            commentsContainer.appendChild(commentElement);

            // Add event listeners for edit and delete buttons
            const editBtn = commentElement.querySelector('.edit-comment-btn');
            editBtn.addEventListener('click', () => editComment(comment.id, comment.text));

            const deleteBtn = commentElement.querySelector('.delete-comment-btn');
            deleteBtn.addEventListener('click', () => deleteComment(comment.id));
        });

        // Add comment form
        const commentForm = document.createElement('form');
        commentForm.classList.add('mt-4', 'flex', 'items-center', 'space-x-2');
        commentForm.innerHTML = `
            <textarea class="w-full p-2 border rounded" placeholder="Add a comment..." rows="2"></textarea>
            <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Send</button>
        `;
        commentsContainer.appendChild(commentForm);

        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const commentText = commentForm.querySelector('textarea').value;
            console.log(`Submitting comment for post ID ${postId}: ${commentText}`);
            addComment(postId, commentText);
            commentForm.querySelector('textarea').value = '';
        });
    } catch (error) {
        console.error(`Error fetching comments for post ${postId}:`, error);
    }
}

async function addComment(postId, commentText) {
    console.log(`Adding comment to post ID ${postId}: ${commentText}`);
    try {
        const response = await fetch(` http://127.0.0.1:8000/crud/posts/${postId}/comments/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: localStorage.getItem('user_id'), text: commentText })
        });

        if (!response.ok) {
            throw new Error(`Error adding comment: ${response.statusText}`);
        }

        console.log(`Comment added to Post ${postId}: ${commentText}`);
        await fetchComments(postId); // Refresh comments
    } catch (error) {
        console.error(`Error adding comment to Post ${postId}:`, error);
    }
}

async function editComment(commentId, currentText) {
    const newText = prompt("Edit your comment:", currentText);
    if (newText && newText !== currentText) {
        console.log(`Editing comment ID ${commentId} to new text: ${newText}`);
        try {
            const response = await fetch(` http://127.0.0.1:8000/crud/comments/${commentId}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: newText })
            });

            if (!response.ok) {
                throw new Error(`Error editing comment: ${response.statusText}`);
            }

            console.log(`Comment ${commentId} edited: ${newText}`);
            // Refresh comments after editing
            const postId = commentId.split('-')[0]; // Extracting postId from commentId format "postId-commentId"
            await fetchComments(postId);
        } catch (error) {
            console.error(`Error editing comment ${commentId}:`, error);
        }
    }
}

async function deleteComment(commentId) {
    if (confirm("Are you sure you want to delete this comment?")) {
        console.log(`Deleting comment ID ${commentId}`);
        try {
            const response = await fetch(` http://127.0.0.1:8000/crud/comments/${commentId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error deleting comment: ${response.statusText}`);
            }

            console.log(`Comment ${commentId} deleted successfully.`);
            // Refresh comments after deleting
            const postId = commentId.split('-')[0]; // Extracting postId from commentId format "postId-commentId"
            await fetchComments(postId);
        } catch (error) {
            console.error(`Error deleting comment ${commentId}:`, error);
        }
    }
}

// Call the function to fetch and display posts when the script loads
console.log("Script loaded, fetching posts...");
fetchAndDisplayPosts();

// Part one js
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
  
    if (token && userId) {
      const apiUrl = `https://social-2nd-project-backend.vercel.app/user/user_details/${userId}/`;
  
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Get  profile fields
          document.getElementById("profile-image-left").src =
            data.image || "images/LOLER-inspections-1.jpg";

         document.getElementById("profile-user-name-left").textContent = `@${data.user}`;
  
  
          document.getElementById(
            "profile-name-left"
          ).textContent = `${data.first_name} ${data.last_name}`;
  
          
          document.getElementById("profile-bio-left").innerHTML = `<b>Bio-</b> ${
            data.bio || "No bio available."
          }`;
  
          document.getElementById(
            "profile-location-left"
          ).innerHTML = `<b>Location-</b> ${
            data.location || "No Location available."
          }`;
  
          document.getElementById("profile-phone-left").innerHTML = `<b>Mobile-</b> ${
            data.mobile_no || "No Mobile number available."
          }`;
  
          const currentDate = new Date();
          const options = { year: "numeric", month: "long", day: "numeric" };
          const formattedDate = currentDate.toLocaleDateString("en-US", options);
          document.getElementById(
            "join-date"
          ).textContent = `Joined on ${formattedDate}`;
        })
        .catch((error) => console.error("Error fetching profile data:", error));
    } else {
      console.error("Token or User ID not found. Redirecting to login.");
      window.location.href = "signup.html";
    }
  });