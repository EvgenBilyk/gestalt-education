class RequestGoogleSheet {
    constructor(idSheet, nameListBlock, nameListContent, nameSite, recordSite, styleSite, type) {
        this.idSheet = idSheet;
        this.nameListBlock = nameListBlock;
        this.nameListContent = nameListContent;
        this.nameSite = nameSite;
        this.recordSite = recordSite;
        this.styleSite = styleSite;
        this.type = type;
        this._linkApp = "https://script.google.com/macros/s/AKfycbxTmL3s4uBH-b77G34Tgf3ohjmQN7DW3tHUehSn50h7L_lDgI4xVck5tEHkTz-qZMhx9g/exec";
    }

    answer() {//вывод ответа по АПИ в консоль

        let linkRequestBlock = `${this._linkApp}?nameList=${this.nameListBlock}&idSheet=${this.idSheet}`;
        let linkRequestContent = `${this._linkApp}?nameList=${this.nameListContent}&idSheet=${this.idSheet}`;


        let listBlock = new Promise((resolve, reject) => {
            fetch(linkRequestBlock)
                .then(data => {
                    return (data.text());
                })
                .then(data => {
                    let arr = JSON.parse(data);
                    resolve(arr[0].values);
                });
        });

        let listContent = new Promise((resolve, reject) => {
            fetch(linkRequestContent)
                .then(data => {
                    return (data.text());
                })
                .then(data => {
                    let arr = JSON.parse(data);
                    resolve(arr[0].values);
                });
        });

        Promise.all([listBlock, listContent]).then(value => {
            let block = value[0];
            let content = value[1];
            let result = {
                block: block,
                content: content
            };

            let renderSite = new RenderSite(result, this.nameSite, this.recordSite, this.styleSite, this.type)
            renderSite.render();
            renderSite.temaButtonHandler();
            renderSite.showButtonHandler();
        });
    }
}