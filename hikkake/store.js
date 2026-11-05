const KEY = 'keisetsu-hikkake-confirm-lines-v1';
let memory = [];

const clean = value => String(value ?? '').replace(/\s+/g, ' ').trim();

export function loadLines() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) memory = parsed.map(clean).filter(Boolean);
    }
  } catch {  }
  return [...memory];
}

export function saveLines(lines) {
  memory = lines.map(clean).filter(Boolean);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(memory));
    return true;
  } catch {
    return false;
  }
}

export function addLine(value) {
  const line = clean(value);
  if (!line) return 'empty';
  const lines = loadLines();
  if (lines.includes(line)) return 'duplicate';
  lines.push(line);
  saveLines(lines);
  return 'added';
}
