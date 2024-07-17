const regex = require("./regex.js").regex;

exports.delete_comment = (xml) => xml.replaceAll(regex.comment, "");
exports.delete_end_of_line = (xml) => xml.replaceAll(regex.eol, "");
