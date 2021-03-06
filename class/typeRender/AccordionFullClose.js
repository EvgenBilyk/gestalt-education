class AccordionFullClose {
    constructor(content, category, style) {
        this.block = content.block;
        this.content = content.content;
        this.category = category; //array for category ['closes','shoes',...]
        this.style = style;
    }
    render() {
        /**
        * get all ContentID for category
        */
        let listContentID = [];

        this.block.map(elem => {
            if (!listContentID.includes(elem.contentID) && elem.category === this.category) {
                listContentID.push(elem.contentID)
            }
        })

        /**
         * create block for category
         */

        let contentBlock = "";

        this.block.map(elem => {
            if (+elem.show && elem.category === this.category) {
                contentBlock += `
                    <div class="col flex-item">
                        <div class=" p-2">
                            <h5 class="card-title text-start merriweather text-dark fs-5 fw-bold"><u>${elem.tema}</u></h5>
                            <p class="card-text text-start fw-light merriweather fst-italic text-secondary">${elem.tema_discription}</p>  
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge bg-info text-dark">${elem.category}</span>
                            <div class="btn-group">
                                <button type="button" id="${elem.contentID}_btn"  class="btn btn-sm btn-outline-dark">розгорнути</button>
                            </div>                  
                        </div> 
                        <div  class="hide" id=${elem.contentID}></div>
                    </div>`;
            }
        })

        document.querySelector(`#outBlock_${this.category}`).innerHTML = contentBlock;



        /**
         * create accordion for block
         */

        let contentList = {};
        listContentID.map(elem => {

            let oneBlockList = [];
            this.content.map(item => {
                if (elem === item.contentID) {
                    oneBlockList.push(item);
                }
            })
            contentList[elem] = oneBlockList;
        })

        let content = {};


        /**
         * create list accardion for a few type
         */

        Object.entries(contentList).map(item => {
            let itemAccordion = "";
            item[1].map((elem, index) => {
                switch (elem.type) {


                    case "text": itemAccordion += `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading${elem.contentID + index}">
                        <button class="accordion-button collapsed merriweather" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse${elem.contentID + index}" aria-expanded="false" aria-controls="collapse${elem.contentID + index}">
                            ${elem.key}
                        </button>
                    </h2>
                    <div id="collapse${elem.contentID + index}" class="accordion-collapse collapse" aria-labelledby="heading${elem.contentID + index}"
                        data-bs-parent="#${elem.contentID}">
                        <div class="accordion-body">
                            <div class="p-3 mb-2 bgGreenOne text-start text-dark">${elem.value}</div>
                        </div>
                    </div>
                </div>
                    `;
                        break;


                    case "img": itemAccordion += `
                    <div class="accordion-item">
                    <h2 class="accordion-header" id="heading${elem.contentID + index}">
                        <button class="accordion-button collapsed merriweather" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse${elem.contentID + index}" aria-expanded="false" aria-controls="collapse${elem.contentID + index}">
                            ${elem.key}
                        </button>
                    </h2>
                    <div id="collapse${elem.contentID + index}" class="accordion-collapse collapse" aria-labelledby="heading${elem.contentID + index}"
                        data-bs-parent="#${elem.contentID}">
                        <div class="accordion-body">
                            <img class="img-fluid mx-auto" src=${elem.value} alt="picture">
                        </div>
                    </div>
                </div>
                    `;
                        break;


                    case "link": itemAccordion += `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading${elem.contentID + index}">
                        <button class="accordion-button collapsed merriweather" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse${elem.contentID + index}" aria-expanded="false" aria-controls="collapse${elem.contentID + index}">
                            ${elem.key}
                        </button>
                    </h2>
                    <div id="collapse${elem.contentID + index}" class="accordion-collapse collapse" aria-labelledby="heading${elem.contentID + index}"
                        data-bs-parent="#${elem.contentID}">
                        <div class="accordion-body">
                            <p class="text-start"><a class="text-start"  target='_blank' href=${elem.value}>link ${elem.key}</a></p>  
                        </div>
                    </div>
                </div>
                    `;
                        break;


                    case "youtube":
                        let videoLink = elem.value;
                        let find = videoLink.indexOf('=');
                        let keyVideo = "";

                        if (find > 0) {
                            keyVideo = videoLink.slice(find + 1, videoLink.length);
                        } else if (find === -1) {
                            let neStandart = videoLink.split('').reverse().join('');
                            let findNew = neStandart.indexOf('/');
                            keyVideo = neStandart.slice(0, findNew).split('').reverse().join('');
                        }

                        let tegVideo = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${keyVideo}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                        itemAccordion += `
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading${elem.contentID + index}">
                            <button class="accordion-button collapsed merriweather" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapse${elem.contentID + index}" aria-expanded="false" aria-controls="collapse${elem.contentID + index}">
                                ${elem.key}
                            </button>
                        </h2>
                        <div id="collapse${elem.contentID + index}" class="accordion-collapse collapse" aria-labelledby="heading${elem.contentID + index}"
                            data-bs-parent="#${elem.contentID}">
                            <div class="accordion-body">
                                <div class="frame_blc">${tegVideo}</div>    
                            </div>
                        </div>
                    </div>
                    `;
                }
            })
            content[item[0]] = `<div class="accordion mt-1 mb-2" id="${item[0]}">${itemAccordion}</div>`;
        });

        let showAccardion = this.block.filter(elem => {
            if (content[elem.contentID] !== undefined && elem.show !== 0) {
                return true
            }
        });


        /**
         * insert accordion in block and create event for btn "show"
         */
        showAccardion.map(elem => {
            for (let key in content) {
                if (elem.contentID == key) {
                    let idBtn = `#${elem.contentID}_btn`;
                    let idBlock = `#${elem.contentID} `;
                    document.querySelector(idBlock).innerHTML = content[key];

                    if (document.querySelector(idBtn)) {
                        document.querySelector(idBtn).onclick = () => {
                            document.querySelector(idBlock).classList.toggle('hide');
                        }
                    }
                }
            }
        });

    }
}