export const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'sql', label: 'SQL' },
];

export const DEFAULT_CODE_SNIPPET = `function factorial(n) {
  if (n == 0)
    return 1;
  var i = n;
  var result = 1;
  while(i > 0) {
    result = result * i;
    i = i - 1;
  }
  return result;
}`;
