const { getImage, delImage} = require('./fileService')

class GfsClass {

    constructor() {

        if (!!GfsClass.instance) {
            return GfsClass.instance;
        }

        GfsClass.instance = this;

        this.images = [];

        return this;
    }

    async bufferImage(doc, imageField) {
        const filename = doc[imageField]
        this.images = [...this.images, {filename, imageData: await getImage(doc, imageField)} ] ;
        console.log(this.images)
    }

    getImage(doc, imageField) {
        const filename = doc[imageField]
        return this.images.find(item => item.filename == filename).imageData
    }
}

module.exports = new GfsClass()