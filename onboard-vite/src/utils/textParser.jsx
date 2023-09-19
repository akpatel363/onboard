const boldRegex = /\*(.+?)\*/gim;
const italicRegex = /_(.+?)_/gim;
const blockQuoteRegex = /`(.+?)`/gim;

const spaceRegex = /&nbsp;/gi;
const boldTagRegex = /<b>(.+?)<\/b>/gim;
const italicTagRegex = /<i>(.+?)<\/i>/gim;
const blockQuoteTagRegex = /<span(.*?)>(.+?)<\/span>/gim;

export const textParser = (text) => {
  return text
    .replace(boldRegex, "<b>$1</b>&nbsp;")
    .replace(italicRegex, "<i>$1</i>&nbsp;")
    .replace(blockQuoteRegex, '<span class="bq">$1</span>&nbsp;');
};

export const textEncoder = (text) => {
  return text
    .trim()
    .replace(spaceRegex, " ")
    .replace(boldTagRegex, "*$1*")
    .replace(italicTagRegex, "_$1_")
    .replace(blockQuoteTagRegex, "`$2`");
};

console.log(textEncoder(""));
