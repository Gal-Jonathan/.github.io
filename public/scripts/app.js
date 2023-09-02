var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dqtyj8zwp/upload';
var CLONDINARY_UPLOAD_PRESET = 'wps8scvk';
var imgPreview = document.getElementById('img-preview');
var fileUpload = document.getElementById('file-upload');
fileUpload.addEventListener('change', function(event) {
    var formData = new FormData();
    var labelUpload = document.getElementById('labelUpload');
    var isMoreThen3Sec = false;
    labelUpload.innerText = 'איזה כייף! חכה רגע, אנחנו מעלים את התמונה'
    labelUpload.style = 'font-size: 0.65em';
    var images = event.target.files;
    for (var index=0; index < images.length; index++) {
        var image = images[index]
        formData.append('file', image);
    }
    formData.append('upload_preset', CLONDINARY_UPLOAD_PRESET);

    setTimeout(function() {
        isMoreThen3Sec = true;
    }, 3000);

    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:  formData
    }).then(function(res) {
        if (!isMoreThen3Sec) {
            setTimeout(function() {
                labelUpload.innerText = '?תודה רבה! עוד תמונה'
                labelUpload.style = 'font-size: 1em';
            }, 1000);
        } else {
            labelUpload.innerText = '?תודה רבה! עוד תמונה'
        }
        console.log(res);
    }).catch(function(err) {
        labelUpload.innerText = 'משהו השתבש :( נסה שוב או פנה למנהל'
        console.error(err);
    });
});