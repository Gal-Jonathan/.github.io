var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dqtyj8zwp/upload';
var CLOUDINARY_URL_VIDEO = 'https://api.cloudinary.com/v1_1/dqtyj8zwp/video/upload';
var CLONDINARY_UPLOAD_PRESET = 'wps8scvk';
var imgPreview = document.getElementById('img-preview');
var fileUpload = document.getElementById('file-upload');
fileUpload.addEventListener('change', function(event) {
    var formData = new FormData();
    var labelUpload = document.getElementById('labelUpload');
    var isMoreThen3Sec = false;
    labelUpload.innerText = ' יש! לא לסגור אותי עדיין, אני מעלה את התמונות'
    labelUpload.style = 'font-size: 0.65em';
    var images = event.target.files;
    fileUpload.disabled = true;

    setTimeout(function() {
        isMoreThen3Sec = true;
    }, 3000);

    for (var index=0; index < images.length; index++) {
        var asset = images[index]
        var urlByTypeAsset = "";
        formData.append('file', asset);
        formData.append('upload_preset', CLONDINARY_UPLOAD_PRESET);
        if (file.type.startsWith('image/')) {
            urlByTypeAsset = CLOUDINARY_URL;
        } else if (asset.type.startsWith('video/')) {
            // Handle video file
            urlByTypeAsset = CLOUDINARY_URL_VIDEO;
        } else {
            console.log('This file is neither an image nor a video:', file);
            // Handle other file types
        }
        axios({
            url: urlByTypeAsset,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:  formData
        }).then(function(res) {
            if (images.length > index){
                return;
            }
            if (!isMoreThen3Sec) {
                setTimeout(function() {
                    labelUpload.innerText = '?תודה רבה! עוד תמונה'
                    labelUpload.style = 'font-size: 1em';
                    fileUpload.disabled = false;
                }, 1000);
            } else {
                labelUpload.innerText = '?זהו סיימתי:)  עוד תמונה'
                labelUpload.style = 'font-size: 1em';
                fileUpload.disabled = false;
            }
            console.log(res);
        }).catch(function(err) {
            labelUpload.innerText = 'משהו השתבש :( נסה שוב או פנה למנהל'
            console.error(err);
            fileUpload.disabled = false;
        });
    }




});
