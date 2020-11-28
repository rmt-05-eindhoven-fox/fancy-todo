const formatDate = (date, setter) => {
  if (setter) {
    date.setDate(new Date().getDate() + setter);
    return date.toISOString().split('T')[0];
  } else {
    return date.toISOString().split('T')[0];
  }
}

module.exports = formatDate