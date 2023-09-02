var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dqtyj8zwp/upload';
var CLONDINARY_UPLOAD_PRESET = 'wps8scvk';
var imgPreview = document.getElementById('img-preview');
var fileUpload = document.getElementById('file-upload');
fileUpload.addEventListener('change', function(event) {
    var file = event.target.files[0];
    var formData = new FormData();
    var labelUpload = document.getElementById('labelUpload');
    var isMoreThen3Sec = false;
    setTimeout(function() {
        isMoreThen3Sec = true;
    }, 3000);
    labelUpload.innerText = 'איזה כייף! חכה רגע, אנחנו מעלים את התמונה'
    formData.append('file', file);
    formData.append('upload_preset', CLONDINARY_UPLOAD_PRESET);
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
            }, 1000);
        } else {
            labelUpload.innerText = 'תודה רבה! :)עוד תמונה?'
        }
        console.log(res);
    }).catch(function(err) {
        labelUpload.innerText = 'משהו השתבש :( נסה שוב או פנה למנהל'
        console.error(err);
    });
});