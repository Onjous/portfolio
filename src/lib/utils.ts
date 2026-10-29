/** Splits a project name into display lines, keeping "&" with the word before it. */
export function titleLines(name: string) {
  return name.split(" ").reduce<string[]>((lines, word) => {
    if (word === "&" && lines.length) lines[lines.length - 1] += " &";
    else lines.push(word);
    return lines;
  }, []);
}
