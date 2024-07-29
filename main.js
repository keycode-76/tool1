import "/style.scss";

document.getElementById("file").addEventListener("change", (event) => {
    const fileInput = event.target;
    const fileUploadContainer = document.querySelector(".file-upload-container");

    const loaderContainer = document.querySelector(".loader-container");
    const resizeImageContainer = document.querySelector('.resize-image');
    const uploadedImage = document.getElementById('uploadedImage');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onloadstart = function () {
            loaderContainer.style.display = "flex";
            fileUploadContainer.style.display = "none";
        };
        reader.onload = function (e) {
            setTimeout(function () {
                loaderContainer.style.display = 'none';
                resizeImageContainer.style.display = "flex"; // also can display=""
            }, 2000);

            uploadedImage.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
});

const downloadButton = document.getElementById('downloadImage');
downloadButton.addEventListener('click', function () {
    
    // canvas.width = parseInt(document.getElementById('imageWidth').value) || resizedImage.width;
    // canvas.height = parseInt(document.getElementById('imageHeight').value) || resizedImage.height;
    // ctx.drawImage(resizedImage, 0, 0, canvas.width, canvas.height);
    // const downloadLink = document.createElement('a');
    // downloadLink.href = canvas.toDataURL('image/png');
    // downloadLink.download = 'resized_image.png';
    // downloadLink.click();
    // renderGodotIcon();
    renderTauriIcon();
});
const renderGodotIcon = () => {
    const resizedImage = document.getElementById('uploadedImage');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const godotSize = [256,128,64,48,32,16];
    for(let i = 0; i < godotSize.length; i++) {
        canvas.width = godotSize[i]
        canvas.height = godotSize[i]
        ctx.drawImage(resizedImage, 0, 0, canvas.width, canvas.height);
        const downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = `${godotSize[i]}x${godotSize[i]}.png`;
        downloadLink.click();
    }
};
const renderTauriIcon = () => {
    const resizedImage = document.getElementById('uploadedImage');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const tauriSize = [
        [32, "32x32"],
        [128, "128x128"],
        [256, "128x128@2x"],
        [512, "icon"],
        [30, "Square30x30Logo"],
        [44, "Square44x44Logo"],
        [71, "Square71x71Logo"],
        [89, "Square89x89Logo"],
        [107, "Square107x107Logo"],
        [142, "Square142x142Logo"],
        [150, "Square150x150Logo"],
        [284, "Square284x284Logo"],
        [310, "Square310x310Logo"],
        [50, "StoreLogo"],
    ];
    for (let i = 0; i < tauriSize.length; i++) {
        const [size, name] = tauriSize[i];
        canvas.width = size;
        canvas.height = size;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布
        ctx.drawImage(resizedImage, 0, 0, canvas.width, canvas.height);
        const downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = `${name}.png`;
        downloadLink.click();
    }
    // 生成並下載 ICO 文件
    canvas.width = 256;
    canvas.height = 256;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布
    ctx.drawImage(resizedImage, 0, 0, canvas.width, canvas.height);
    const downloadLinkIco = document.createElement('a');
    downloadLinkIco.href = canvas.toDataURL('image/x-icon'); // 修改 MIME 類型為 ICO
    downloadLinkIco.download = `icon.ico`;
    downloadLinkIco.click();
};


