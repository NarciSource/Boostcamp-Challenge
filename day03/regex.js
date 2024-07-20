exports.regex = {
    comment: /<!.*>/g,
    prolog: /<\?([^>?]+)\?>/,
    eol: /[\r\n]+/g,
    split: /(^\w+) (.*)/,
    attributes: /(\w+)="(.*?)"/g,
    tag: /<(\/)?([^>/\s]+)([^>]*?)(\/)?>/,
    tokenize: /\s*((?:<[^>?]+>)|(?:[^<>]+))\s*/g,
};
