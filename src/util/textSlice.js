const sliceText = (text, size) => {
    if (text.length > size) {
      return text.slice(0, size) + "...";
    } else {
      return text;
    }
  };

  export {sliceText}