document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('post-button').addEventListener('click', async (event) => {
        event.preventDefault(); 
     
        const content = document.getElementById('post-content').value;
        const imageFile = document.getElementById('post-image').files[0];
        const videoFile = document.getElementById('post-video').files[0];
        // http://127.0.0.1:8000/
        // https://social-2nd-project-backend.vercel.app
        const token = localStorage.getItem('token');
        console.log('Retrieved token:', token);

        const data = {
            caption: content,
        };

       
        if (imageFile) {
            const imageUrl = await uploadImageToImgBB(imageFile);
            data.image = imageUrl;
        }
        if (videoFile) {
            const videoUrl = await uploadFile(videoFile);
            data.video = videoUrl;
        }

        try {
            const response = await fetch('https://social-2nd-project-backend.vercel.app/crud/posts/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            console.log('Response status:', response.status); 

            if (response.ok) {
                console.log('Post created successfully:', responseData);
                
            } else {
                console.error('Error creating post:', responseData);
                console.error('Full response:', response);
               
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    });

    // image upload er jonno
    async function uploadImageToImgBB(imageFile) {
        const imgFormData = new FormData();
        imgFormData.append('image', imageFile);

        console.log("Image file detected, uploading to ImgBB");

        try {
            const response = await fetch('https://api.imgbb.com/1/upload?key=59c029e1206724ae1f2e3c30d278d10f', {
                method: 'POST',
                body: imgFormData
            });

            if (!response.ok) {
                throw new Error(`Error uploading image: ${response.statusText}`);
            }

            const imgData = await response.json();
            console.log("Image uploaded successfully, Image URL:", imgData.data.url);
            return imgData.data.url; // Return the image URL
        } catch (error) {
            console.error("Error during image upload:", error);
            return null; // Return null if upload fails
        }
    }

    async function uploadFile(videoFile) {
        console.log("Uploading video file:", videoFile); // Log the video file
    
        const formData = new FormData();
        formData.append('file', videoFile); // 'file' is the key for the video file
        formData.append('upload_preset', 'jubaer_done_preset_here'); // Your actual upload preset
    
        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/doxrbnaqy/video/upload', { 
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                const errorDetails = await response.json(); // Get detailed error message
                throw new Error(`Error uploading video: ${errorDetails.message || response.statusText}`);
            }
    
            const videoData = await response.json();
            console.log("Video uploaded successfully, Video URL:", videoData.secure_url); 
            return videoData.secure_url; 
        } catch (error) {
            console.error("Error during video upload:", error);
            return null; 
        }
    }
    
    
    
});


// Function to upload image to ImgBB
// async function uploadImageToImgBB(imageFile) {
//     const imgFormData = new FormData();
//     imgFormData.append('image', imageFile);

//     console.log("Image file detected, uploading to ImgBB");

//     try {
//         const response = await fetch('https://api.imgbb.com/1/upload?key=59c029e1206724ae1f2e3c30d278d10f', {
//             method: 'POST',
//             body: imgFormData
//         });

//         if (!response.ok) {
//             throw new Error(`Error uploading image: ${response.statusText}`);
//         }

//         const imgData = await response.json();
//         console.log("Image uploaded successfully, Image URL:", imgData.data.url);
//         return imgData.data.url; // Return the image URL
//     } catch (error) {
//         console.error("Error during image upload:", error);
//         return null; // Return null if upload fails
//     }
// }