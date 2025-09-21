const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

const getFirstName = (fullName) => {
  if (!fullName) return '';
  return fullName.trim().split(' ')[0];
};

const formatTranslation = (template, params) => {
  let result = template;
  Object.keys(params).forEach(key => {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), params[key]);
  });
  
  if (params.count !== undefined) {
    const plural = params.count === 1 ? '' : 's';
    result = result.replace(/{{plural}}/g, plural);
  }
  
  return result;
};

export { showFormattedDate, getFirstName, formatTranslation };
