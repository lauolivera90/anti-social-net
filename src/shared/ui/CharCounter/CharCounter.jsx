export function CharCounter({ text, max = 240 }) {
    const count = text.trim().length;
    const isOverLimit = count > max;
    const charCountColor = isOverLimit ? 'text-danger' : 'text-white';

    return (
        <span className={`small ${charCountColor}`}>
          {count > 0 && (isOverLimit ? `-${count - max}` : count)}
        </span>
    );
}