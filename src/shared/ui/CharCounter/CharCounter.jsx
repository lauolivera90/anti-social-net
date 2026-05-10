export function CharCounter({condition, text}) {
    const charCountColor = !condition ? 'text-danger' : 'text-white';

    return (
        <span className={`me-3 small ${charCountColor}`}>
          {text.length > 0 && (!condition ? `-${text.length - 240}` : text.length)}
        </span>
    );
}