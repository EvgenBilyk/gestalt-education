class RenderSite {
    constructor(content, nameSite, recordSite, styleSite, type) {
        this.content = content;
        this.nameSite = nameSite;
        this.recordSite = recordSite;
        this.styleSite = styleSite;
    }
    render() {

        /**
         * record title site
         */
        document.querySelector("title").innerHTML = this.nameSite;

        /**
         * create navbar & footer
         */
        let category = [];
        let categoryArr = [];
        this.content.block.map(elem => {
            if (!categoryArr.includes(elem.category)) {
                category.push({ "category": elem.category, "type": elem.type });
                categoryArr.push(elem.category);
            }
        });

        let button = `
                <div class="btn-group-sm" role="group" aria-label="Basic radio toggle button group">
                    ${category.map(elem => elem = `
                    <input type="radio" class="btn-check switch-tema" data-block="#outBlock_${elem.category}" name="btnradio"
                        id="${elem.category}-btn" autocomplete="off">
                    <label class="btn btn-outline-light  text-${this.styleSite.colorButtonNavBar} bg-${this.styleSite.bgColorButtonNavBar}" for="${elem.category}-btn">${elem.category}</label>
                    `).join("")}
                </div>`;
        let navBar = `
                <header class="fixed-top">
                    <div class="navbar navbar-dark bg-${this.styleSite.bgColorNavBar} shadow-sm">
                        <div class="container">
                                <a href="#" class="navbar-brand d-flex align-items-center text-${this.styleSite.colorNameSite}">
                                    <strong>${this.nameSite}</strong>
                                </a>
                                ${button}
                        </div>
                    </div>
                </header>`;

        let blokOut = "";
        category.map(elem => {
            switch (elem.type) {
                case "accordionClose":
                    blokOut += `<div class="row row-cols-1 row-cols-md-3 g-4 outBlock hide" id="outBlock_${elem.category}">${elem.category}</div>`;
                    break;
                case "accordionOpen":
                    blokOut += `<div class="row row-cols-1 row-cols-md-3 g-4 outBlock hide" id="outBlock_${elem.category}">${elem.category}</div>`;
                    break;
                case "accordionFullOpen":
                    blokOut += `<div class="row row-cols-1 g-4 outBlock hide" id="outBlock_${elem.category}">${elem.category}</div>`;
                    break;
                case "accordionFullClose":
                    blokOut += `<div class="row row-cols-1 g-4 outBlock hide" id="outBlock_${elem.category}">${elem.category}</div>`;
                    break;
            }
        })

        let content = `
                    <main>
                        <div class="album py-5 bg-${this.styleSite.bgColorBody} mt-4">
                            <div class="container">${blokOut}</div>
                        </div>
                    </main>`;

        let footer = `
        <footer class="text-muted py-3 bg-${this.styleSite.bgColorFooter} fixed-bottom">
            <div class="container">
                <p class="float-end mb-1">
                    <a class="btn btn-${this.colorSite} btn-sm mx-3 text-${this.styleSite.colorButtonFooter} bg-${this.styleSite.bgColorButtonFooter}" href="#" role="button">
                        Back to top
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-arrow-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                        </svg>
                    </a>       
                </p>
                <p class="mb-1 text-${this.styleSite.colorFooterRecord}">${this.recordSite}</p>
            </div>
        </footer>
        `;
        document.querySelector("body").innerHTML = navBar + content + footer;

        category.map(elem => {
            let contentList
            switch (elem.type) {
                case "accordionClose":
                    contentList = new AccordionClose(this.content, elem.category, this.styleSite);
                    contentList.render();
                    break;
                case "accordionOpen":
                    contentList = new AccordionOpen(this.content, elem.category, this.styleSite);
                    contentList.render();
                    break;
                case "accordionFullOpen":
                    contentList = new AccordionFullOpen(this.content, elem.category, this.styleSite);
                    contentList.render();
                    break;
                case "accordionFullClose":
                    contentList = new AccordionFullClose(this.content, elem.category, this.styleSite);
                    contentList.render();
                    break;
            }
        })
    }

    /**
     * event for button show category 
     */


    showButtonHandler() {
        this.content.block.map(elem => {
            if (+elem.show) {
                let idBtn = `#${elem.contentID}_btn`;
                let idBlock = `#${elem.contentID}`;


                if (document.querySelector(idBtn)) {
                    document.querySelector(idBtn).onclick = () => {
                        document.querySelector(idBlock).classList.toggle('hide');
                    }
                }
            }
        });
        //open first category
        document.querySelector(".outBlock").classList.remove("hide");
    }

    /**
     * show picture in category
     */

    showPicture() {
        this.content.block.map(elem => {

            if (+elem.showImg && +elem.show) {
                let idImg = `#${elem.category + "__" + elem.order}`;
                document.querySelector(idImg).classList.remove('hide');
            }
        });
    }

    /**
     * event for nav-bar button (hide - look out)
     */
    temaButtonHandler() {
        let tema = document.querySelectorAll('.switch-tema');
        for (let i = 0; i < tema.length; i++) {
            tema[i].onchange = () => {
                for (let k = 0; k < tema.length; k++) {

                    if (tema[k].checked === true) {
                        if (document.querySelector(tema[k].dataset.block).classList.contains('hide')) {
                            document.querySelector(tema[k].dataset.block).classList.remove('hide');
                        }

                    } else {
                        if (!document.querySelector(tema[k].dataset.block).classList.contains('hide')) {
                            document.querySelector(tema[k].dataset.block).classList.add('hide');
                        }
                    }
                }
            }
        }
    }
}