export default (text, maxLength) => {
  maxLength = maxLength || 100;
  if (text.length > maxLength) {
    const
      spacePosition = text.lastIndexOf(" ", maxLength - 3),
      finallyLength = spacePosition >= maxLength * 0.9 ? spacePosition : maxLength - 3;
    return text.substr(0, finallyLength - 3).trim() + '...';
  }
  return text;
}
