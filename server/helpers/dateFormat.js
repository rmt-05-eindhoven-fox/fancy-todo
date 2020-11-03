const dateFormat = (date, daymodifier) => {
  if (daymodifier) {
    date.setDate(new Date().getDate() + daymodifier);
    return date.toISOString().split('T')[0];
  } else {
    return date.toISOString().split('T')[0];
  }
}

module.exports = dateFormat;