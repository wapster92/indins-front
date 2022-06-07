import { slugify } from 'transliteration';

export default {
  methods: {
    generateUrl(model, translatableField, resultField) {
      this[model][resultField] = `${slugify(this[model][translatableField])}`.toLowerCase().replace(/ /ig, '-');
    },
  },
};
