export const generateMessageToEmail = (
  clientName = '',
  contact = '',
  phone = '',
  email = '',
  comment = '',
) => `
  Клиент: ${clientName}
  Контакт: ${contact}
  Телефон: ${phone}
  Email: ${email}
  Комментарий: ${comment}
  `;
