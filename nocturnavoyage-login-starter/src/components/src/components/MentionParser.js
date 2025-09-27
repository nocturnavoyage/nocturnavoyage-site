export function parseMentions(text) {
  const mentionRegex = /@([a-zA-Z0-9_]+)/g;
  return text.split(mentionRegex).map((part, index) => {
    if (index % 2 === 1) {
      return (
        <span key={index} className="text-blue-400 hover:underline">
          @{part}
        </span>
      );
    }
    return part;
  });
}