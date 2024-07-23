const path_regex =
    /^(\/|\.\/|\.\.\/|\w:\\)?([^.]+(?:\/|\\))?([^./]+)(?:\.(\w+))?$/;

export function parse_filepath(path_string) {
    if (path_regex.test(path_string)) {
        const [, root, components_string, name, ext] =
            path_regex.exec(path_string);
        const components = components_string
            ?.split(/\/|\\/)
            .filter((i) => i.length > 0);

        return { root, components, name, ext };
    } else {
        throw "경로에 오류가 있습니다.";
    }
}
