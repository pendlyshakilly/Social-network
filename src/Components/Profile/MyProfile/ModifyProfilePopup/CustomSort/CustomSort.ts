import React from "react";

const customSort = (arr: string[], priorityLetters: string[]): string[] =>  {
    return arr.sort((a, b) => {
        const indexA = priorityLetters.indexOf(a.charAt(0));
        const indexB = priorityLetters.indexOf(b.charAt(0));

        if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
        }
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;

        return a.localeCompare(b);
    });
}

export default customSort