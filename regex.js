exports.regex = {
    comment: /<!.*>/g,
    prolog: /<\?([^>?]+)\?>/,
    eol: /[\r\n]+/g,
    split: /(^\w+) (.*)/,
    attributes: /(\w+)="(.*?)"/g,
    tag: /<(\/)?([^>/\s]+)([^>]*?)(\/)?>/,
    distinction: /\s*((?:<[^>?]+>)|(?:[^<>]+))\s*/g,
};
