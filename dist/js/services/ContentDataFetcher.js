export class ContentDataFetcher {
    constructor(getData) {
        this.getData = getData;
    }
    fetchContent(type, termo) {
        return this.getData(type, termo);
    }
}
