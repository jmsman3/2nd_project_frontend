// async function fetchUserData() {
//     let userId; // Declare a variable to store the userId

//     try {
//         // Fetch posts from the API
//         const response = await fetch(' http://127.0.0.1:8000/crud/posts/', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Token ${localStorage.getItem('token')}`  // Include token for authenticated requests
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`Error fetching posts: ${response.statusText}`);
//         }

//         const posts = await response.json();

//         // Assume the user ID is the same for all posts
//         if (posts.length > 0) {
//             userId = posts[0].user_id; // Get the user ID from the first post
//             console.log("Redirecting to profile of user ID:", userId);
//         } else {
//             console.warn("No posts found.");
//             return; // Exit if no posts are available
//         }

//         // Fetch particular user data using the obtained userId
//         const token = localStorage.getItem("token");
//         const apiUrl = ` http://127.0.0.1:8000/crud/particular_user/${userId}/`;

//         const userResponse = await fetch(apiUrl, {
//             method: "GET",
//             headers: {
//                 Authorization: `Token ${token}`,
//                 "Content-Type": "application/json",
//             },
//         });

//         const userData = await userResponse.json();
//         console.log("Particular user data:", userData);

//         // Update the HTML with dynamic data
//         document.getElementById('user-name-particular').textContent = `${userData.profile.first_name} ${userData.profile.last_name}`;
//         document.getElementById('user-handle-particular').textContent = `@${userData.profile.username}`;
//         document.getElementById('user-bio-particular').textContent = userData['More Bio-Data'].bio;
//         document.getElementById('user-location-particular').textContent = userData['More Bio-Data'].location;
//         document.getElementById('user-mobile-particular').textContent = userData['More Bio-Data'].mobile;

//         // Assuming join date is a field in the profile data
//         document.getElementById('join-date-particular').textContent = `Joined: ${new Date(userData.profile.created_at).toLocaleDateString()}`;

//         // Update profile picture if available
//         if (userData.profile.profile_picture) {
//             document.getElementById('profile-pic-particular').src = userData.profile.profile_picture;
//         } else {
//             document.getElementById('profile-pic-particular').src = 'images/LOLER-inspections-1.jpg'; // fallback image
//         }

//     } catch (error) {
//         console.error("Error in fetchUserData:", error);
//     }
// }


// Call the function to fetch user data
// document.addEventListener("DOMContentLoaded", fetchUserData);

//   document.addEventListener("DOMContentLoaded", function () {
//     // Fetching userId and token from localStorage
//     // const userId = localStorage.getItem("user_id");
//     const token = localStorage.getItem("token");

//     // Check if userId and token are present
//     if (!userId || !token) {
//         console.error("User ID or Token not found in localStorage");
//         return;
//     }

//     console.log("User ID:", userId, "Token:", token);

//     // Fetch and display user posts
//     fetchAndDisplayUser_all_Posts(userId, token);
// });
// part 3
// async function fetchAndDisplayUser_all_Posts(userId, token) {
//     try {
//         console.log("Fetching posts for User ID:", userId);

//         const apiUrl = ` http://127.0.0.1:8000/crud/particular_user/${userId}/`;
//         const response = await fetch(apiUrl, {
//             method: "GET",
//             headers: {
//                 Authorization: `Token ${token}`,
//                 "Content-Type": "application/json",
//             },
//         });

//         console.log("Response Status:", response.status);

//         const responseText = await response.text(); // Raw response
//         // console.log("Raw Response:", responseText); // Log raw response for debugging

//         if (!response.ok) {
//             throw new Error(`Error fetching posts: ${response.statusText}`);
//         }

//         const posts = JSON.parse(responseText); // Parse JSON
//         console.log("Fetched posts:", posts); // Log fetched posts

//         // Verify that posts is an array
//         if (!Array.isArray(posts)) {
//             throw new Error("Fetched posts is not an array");
//         }

//         const postsContainer = document.getElementById("posts-container-particular-user");
//         console.log("Posts Container:", postsContainer); // Log the posts container element

//         // Check if posts-container exists in the DOM
//         if (!postsContainer) {
//             throw new Error("Posts container element not found");
//         }

//         postsContainer.innerHTML = ""; // Clear any existing content

//         // Iterate over posts and generate HTML for each post
//         posts.forEach((post) => {
//             console.log("Processing post:", post); // Log each post being processed

//             const postElement = document.createElement("div");
//             postElement.classList.add(
//                 "bg-white",
//                 "shadow-md",
//                 "rounded-md",
//                 "p-6",
//                 "mb-4",
//                 "w-full", // Full width on small screens
//                 "md:w-6/12", // 6/12 width on medium screens and above
//                 "mx-auto" // Center horizontally with auto margin
//             );

//             // Check if post image exists, if not, use a default image
//             const postImage = post.image ? post.image : 'images/LOLER-inspections-1.jpg'; // Default image path

//             let postContent = `
//                 <div class="flex justify-between items-start mb-4">
//                     <div class="flex items-center space-x-3">
//                         <div class="w-10 h-10 rounded-full bg-gray-300"> 
//                             <img src="${postImage}" alt="Post Image" class="w-full h-full object-cover rounded-full">
//                         </div>
//                         <div>
//                             <p class="font-semibold">${post.post_creator}</p>
//                             <p class="text-sm text-gray-500">${new Date(post.created_at).toLocaleString()}</p>
//                         </div>
//                     </div>
//                     <div>
//                         <button class="text-gray-500 hover:text-gray-700 toggle-btn">
//                             <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h18M3 12h18m-9 6h9"></path>
//                             </svg>
//                             <span class="sr-only">More options</span>
//                         </button>
//                         <div class="edit-delete-buttons hidden flex-col space-y-2 mt-2">
//                             <!-- Removed delete button here -->
//                         </div>
//                     </div>
//                 </div>`;

//             // Include post image if available
//             if (post.image) {
//                 postContent += `<img src="${post.image}" alt="Post Image" class="w-full h-auto rounded mb-4">`;
//             }
//             // Include video if available
//             if (post.video) {
//                 postContent += `<video controls class="w-full h-auto rounded mb-4"><source src="${post.video}" type="video/mp4">Your browser does not support the video tag.</video>`;
//             }
//             // Include caption if available
//             if (post.caption) {
//                 postContent += `<p class="text-gray-800 mt-2">${post.caption}</p>`;
//             }

//             postElement.innerHTML = postContent; // Set the post element's inner HTML
//             postsContainer.appendChild(postElement); // Append post element to the container

//             // Add functionality for toggling edit-delete buttons
//             const toggleButton = postElement.querySelector(".toggle-btn");
//             const editDeleteButtons = postElement.querySelector(".edit-delete-buttons");

//             toggleButton.addEventListener("click", () => {
//                 editDeleteButtons.classList.toggle("hidden"); // Toggle visibility
//             });
//         });
//     } catch (error) {
//         console.error("Error fetching posts:", error); // Log error
//     }
// }




document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');

    if (userId) {
        fetchUserData(userId);
        const token = localStorage.getItem("token");
        fetchAndDisplayUserPosts(userId, token); // Added function call to fetch and display user posts
    } else {
        console.error("User ID not found in URL.");
    }
});

// Aita shudhu user er porifle er data show koranor jonno
async function fetchUserData(userId) {
    try {
        const token = localStorage.getItem("token");

        const apiUrl = `https://social-2nd-project-backend.vercel.app/crud/particular_user/${userId}/`;
        const userResponse = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!userResponse.ok) {
            throw new Error(`Error fetching user data: ${userResponse.statusText}`);
        }

        const userData = await userResponse.json();
        console.log("Particular user sobgula data:", userData);

        document.getElementById('user-name-particular').textContent = `${userData.profile.first_name} ${userData.profile.last_name}`;
        document.getElementById('user-handle-particular').textContent = `@${userData.profile.username}`;
        document.getElementById('user-bio-particular').textContent = userData['More Bio-Data'].bio;
        document.getElementById('user-location-particular').textContent = userData['More Bio-Data'].location;
        document.getElementById('user-mobile-particular').textContent = userData['More Bio-Data'].mobile;
        // document.getElementById('join-date-particular').textContent = `Joined: ${new Date(userData.profile.created_at).toLocaleDateString()}`;

        if (userData['More Bio-Data'].profile_photo) {
            document.getElementById('profile-pic-particular').src = userData['More Bio-Data'].profile_photo;
        } else {
            document.getElementById('profile-pic-particular').src = 'images/LOLER-inspections-1.jpg';
        }
    } catch (error) {
        console.error("Error in fetchUserData:", error);
    }
}

// aita holo , oi user e jotogula post korche , sob post gula show koranor jonn


// async function fetchAndDisplayUserPosts(userId, token) {
//     try {
//         // Log userId and token to ensure they are being passed correctly
//         console.log("Fetching posts for User ID:", userId);
//         console.log("Token being used:", token);

//         const apiUrl = ` http://127.0.0.1:8000/crud/particular_user/${userId}/`;
//         console.log("API URL:", apiUrl); // Log the API URL being used

//         const response = await fetch(apiUrl, {
//             method: "GET",
//             headers: {
//                 Authorization: `Token ${token}`,
//                 "Content-Type": "application/json",
//             },
//         });

//         // Log the response status
//         console.log("Response status:", response.status);

//         if (!response.ok) {
//             throw new Error(`Error fetching posts: ${response.statusText}`);
//         }

//         // Log the full response object
//         const posts = await response.json();
//         console.log("Fetched posts data:", posts);

//         const postsContainer = document.getElementById("posts-container-particular-user");

//         // Log the container to ensure it is being selected correctly
//         console.log("Posts container element:", postsContainer);

//         postsContainer.innerHTML = "";

//         posts.forEach((post, index) => {
//             console.log(`Processing post ${index + 1}:`, post); // Log each post object

//             const postElement = document.createElement("div");
//             postElement.classList.add("bg-white","shadow-md","rounded-md","p-6","mb-4","w-full","md:w-6/12","mx-auto");

//             const postImage = post.image ? post.image : 'images/LOLER-inspections-1.jpg';
//             console.log("Post image URL:", postImage); // Log the image URL being used

//             postElement.innerHTML = `
//                 <div class="flex justify-between items-start mb-4">
//                     <div class="flex items-center space-x-3">
//                         <div class="w-10 h-10 rounded-full bg-gray-300">
//                             <img src="${postImage}" alt="Post Image" class="w-full h-full object-cover rounded-full">
//                         </div>
//                         <div>
//                             <p class="font-semibold">${post.post_creator}</p>
//                             <p class="text-sm text-gray-500">${new Date(post.created_at).toLocaleString()}</p>
//                         </div>
//                     </div>
//                 </div>
//                 <p>${post.content}</p>`;

//             // Log the newly created post element
//             console.log("Created post element:", postElement);

//             postsContainer.appendChild(postElement);
//         });

//         // Log the final result after appending all posts
//         console.log("All posts have been added to the DOM.");

//     } catch (error) {
//         console.error("Error fetching user posts:", error);
//     }
// }

async function fetchAndDisplayUserPosts(userId, token) {
    try {
        console.log("Fetching posts for User ID:", userId);

        const apiUrl = `https://social-2nd-project-backend.vercel.app/crud/particular_user/${userId}/`;
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Response Status:", response.status);

        const responseText = await response.text();

        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.statusText}`);
        }

        const data = JSON.parse(responseText); // Parse the JSON response
        const posts = data.posts; // Extract the posts array
        console.log("Fetched posts:", posts);

        // Verify that posts is an array
        if (!Array.isArray(posts)) {
            throw new Error("Fetched posts is not an array");
        }
         

        const postsContainer = document.getElementById("posts-container-particular-user");
        // console.log("Posts Container:", postsContainer); 

        // Check if posts-container exists in the DOM
        if (!postsContainer) {
            throw new Error("Posts container element not found");
        }

        postsContainer.innerHTML = ""; // Clear any existing content

        // Iterate over posts and generate HTML for each post
        posts.forEach((post) => {
            console.log("Processing post:", post); 

            const postElement = document.createElement("div");
            postElement.classList.add(
                "bg-white",
                "shadow-md",
                "rounded-md",
                "p-6",
                "mb-4",
                "w-full", // Full width on small screens
                "md:w-6/12", // 6/12 width on medium screens and above
                "mx-auto" // Center horizontally with auto margin
            );

            // Default image or use a specific post image
            const postImage = post.image ? post.image : 'images/LOLER-inspections-1.jpg'; // Default image path

            let postContent = `
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-full bg-gray-300"> 
                            <img src="${post.profile_image}" alt="Post Image" class="w-full h-full object-cover rounded-full">
                        </div>
                        <div>
                            <p class="font-semibold">${post.post_creator}</p>
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
                </div>`;

            // Include post media (image/video) and caption
            if (post.caption) {
                postContent += `<p class="text-gray-800 mt-2">${post.caption}</p>`;
            }

            if (post.image) {
                postContent += `<img src="${post.image}" alt="Post Image" class="w-full h-auto rounded mb-4">`;
            }
            if (post.video) {
                postContent += `<video controls class="w-full h-auto rounded mb-4"><source src="${post.video}" type="video/mp4">Your browser does not support the video tag.</video>`;
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

            postElement.innerHTML = postContent; // Set the post element's inner HTML
            postsContainer.appendChild(postElement); // Append post element to the container

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
        console.error("Error fetching posts:", error);
    }
}

// Function to like/unlike a post with console logging
let likedPosts = new Set(); // Maintain a set of liked post IDs

async function likePost(postId) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`https://social-2nd-project-backend.vercel.app/crud/posts/${postId}/like/`, {
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
        const response = await fetch(`https://social-2nd-project-backend.vercel.app/crud/posts/${postId}/unlike/`, {
            method: 'POST',
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
        const response = await fetch(`https://social-2nd-project-backend.vercel.app/crud/posts/${postId}/comments/`, {
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
        const response = await fetch(`https://social-2nd-project-backend.vercel.app/crud/posts/${postId}/comments/`, {
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
            const response = await fetch(`https://social-2nd-project-backend.vercel.app/crud/comments/${commentId}/`, {
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
            const response = await fetch(`https://social-2nd-project-backend.vercel.app/crud/comments/${commentId}/`, {
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


