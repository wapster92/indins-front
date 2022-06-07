/*eslint-disable*/
export const state = () => ({
  phone: {
    text: '8 (812) 500-51-16',
    text7: '+7 (812) 500-51-16',
    link: '+78125005116',
  },
  address: 'г. Санкт-Петербург, пл. Карла Фаберже, 8 Б, БЦ «Золотая долина», оф. 406',
});

export const getters = {
  phoneText: state => state.phone.text,
  phoneText7: state => state.phone.text7,
  phoneLink: state => state.phone.link,
  address: state => state.address,
};
