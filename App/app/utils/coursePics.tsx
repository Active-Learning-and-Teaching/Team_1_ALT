export const CoursePics = (imageNumber: any) => {
    let url = ""

    // printing type of imageNumber
    console.log('Type: ', typeof imageNumber);

    switch (imageNumber) {
        case 1:
            url = require('../../assets/1.jpeg');
            break;
        case 2:
            url = require('../../assets/2.jpeg');
            break;
        case 3:
            url = require('../../assets/3.jpeg');
            break;
        case 4:
            url = require('../../assets/4.jpeg');
            break;
        case 5:
            url = require('../../assets/1.jpeg');
            break;
        case 6:
            url = require('../../assets/2.jpeg');
            break;
        case 7:
            url = require('../../assets/3.jpeg');
            break;
        case 8:
            url = require('../../assets/4.jpeg');
            break;
        default:
            url = require('../../assets/2.jpeg');
    }

    console.log('URL: ', url);
    return url
}
