/**
 * select google sheet must have required structure
 */

let idGoogleSheetList = "1Z_rZRF8ROOIFelcHWJMouJKNAB4uWyzn9Q_GCUelJDk";
let listBlock = "listBlock";
let listContent = "listContent";
let nameSite = "Gestalt";
let recordSite = "gestalt education";
let styleSite = {
    bgColorNavBar: "dark",
    colorButtonNavBar: "dark",
    bgColorButtonNavBar: "light",
    colorNameSite: "light",
    colorFooterRecord: "light",
    colorButtonFooter: "dark",
    bgColorFooter: "dark",
    bgColorButtonFooter: "light",
    bgColorBody: "",
};



/**
*  bg-colors

 "primary" blue,
 "secondary" grey,
 "success" green,
 "info" blue-sky,
 "warning": yellow, 
 "danger" red, 
 "light" light grey, 
 "dark" black
*/

/**
 * type
 * 
 * 
 * accardionClose,
 * accardionOpen,
 * table
 */

let content = new RequestGoogleSheet(
    idGoogleSheetList,
    listBlock,
    listContent,
    nameSite,
    recordSite,
    styleSite);

content.answer();

