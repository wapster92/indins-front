import { Filter, Get } from 'core-xhr';

export const getPetData = async ($xhr, itemId, store, error = () => {}) => {
  const FEMALE_ID = 2;
  const MALE_ID = 1;
  const WFA_CHAMPION_TYPE_ID = 3;

  const isClub = store.getters['auth/getData'].roles.every(el => el === 'CLUB');

  const petRequest = (new Get(isClub ? 'pet-club' : 'pet'))
    .entity()
    .addFilter(new Filter('id', 'eq', itemId));
  if (isClub) {
    petRequest.addFilter(new Filter('shelter.club.id', 'eq', store.getters['auth/getData'].clubId));
  }

  const [data, documentList] = await Promise.all([
    await $xhr
      .send(
        petRequest,
      )
      .then(response => response.data.data.result),
    await $xhr
      .send(new Get('documentTypes'))
      .then(response => response.data.data.result),
  ])
    .catch(
      reason => console.error(reason) ^ error(reason.message || reason.error),
    );
  const {
    name,
    gender,
    breedingNumber,
    breedingNumberIndex,
    dateOfBirth,
    breed,
    color,
    oldNumber,
    chipNumber,
    titles,
    fullNameOfOwner,
    phoneOfOwner,
    nurseryOfOwner,
    addressOfOwner,
    fullNameOfBreeder,
    phoneOfBreeder,
    parents,
    documentMap,
    pdfDocumentMap,
    titleMap,
    files,
    shelter,
  } = data;

  return {
    itemId,
    pet: {
      name,
      gender,
      breedingNumber,
      breedingNumberIndex,
      dateOfBirth,
      breed,
      color,
      oldNumber,
      chipNumber,
      titles,
    },
    petOwner: {
      fullNameOfOwner,
      phoneOfOwner,
      nurseryOfOwner,
      addressOfOwner,
      shelter,
    },
    petBreeder: {
      fullNameOfBreeder,
      phoneOfBreeder,
    },
    petParents: {
      mother: parents?.reverse()?.find(pet => pet.gender?.id === FEMALE_ID),
      father: parents?.reverse()?.find(pet => pet.gender?.id === MALE_ID),
    },
    documentMap,
    pdfDocumentMap,
    titleMap,
    documentList: documentList?.map(el => {
      if (el.id === WFA_CHAMPION_TYPE_ID) {
        if (!titles) {
          return [];
        }
        return (titles || []).map(title => ({
          ...title,
          id: WFA_CHAMPION_TYPE_ID,
          titleId: title.id,
        }));
      }
      return el;
    })?.flat(),
    files: files.filter(el => !el.isPdf),
    pdfFiles: files.filter(el => el.isPdf),
    club: (shelter || {}).club,
    shelter,
  };
};
