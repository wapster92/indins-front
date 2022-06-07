export default {
  methods: {
    getStyle(index) {
      // eslint-disable-next-line no-param-reassign
      index++;
      const repeatItems = 12;
      const element = index % repeatItems;
      switch (element) {
        case 1: {
          return { style: 'grid-column: 1 / span 2; grid-row: auto / span 1;', class: 'portfolio-item--long' };
        }
        case 2: {
          return { style: 'grid-column: 3 / span 1; grid-row: auto / span 1;', class: 'portfolio-item--square' };
        }
        case 3: {
          return { style: 'grid-column: 1 / span 1; grid-row: auto / span 1;', class: 'portfolio-item--square' };
        }
        case 4: {
          return { style: 'grid-column: 2 / span 2; grid-row: auto / span 1;', class: 'portfolio-item--long' };
        }
        case 5: {
          return { style: 'grid-column: 1 / span 1; grid-row: auto / span 2;', class: 'portfolio-item--tall' };
        }
        case 6: {
          return { style: 'grid-column: 2 / span 1; grid-row: auto / span 1;', class: 'portfolio-item--square' };
        }
        case 7: {
          return { style: 'grid-column: 3 / span 1; grid-row: auto / span 1;', class: 'portfolio-item--square' };
        }
        case 8: {
          return { style: 'grid-column: 2 / span 2; grid-row: auto / span 1;', class: 'portfolio-item--long' };
        }
        case 9: {
          return { style: 'grid-column: 1 / span 2; grid-row: auto / span 1;', class: 'portfolio-item--long' };
        }
        case 10: {
          return { style: 'grid-column: 3 / span 1; grid-row: auto / span 2;', class: 'portfolio-item--tall' };
        }
        case 11: {
          return { style: 'grid-column: 1 / span 1; grid-row: auto / span 1;', class: 'portfolio-item--square' };
        }
        case 12: {
          return { style: 'grid-column: 2 / span 1; grid-row: auto / span 1;', class: 'portfolio-item--square' };
        }
        default: {
          return { style: 'grid-column: 2 / span 1; grid-row: auto / span 1;', class: 'portfolio-item--square' };
        }
      }
    },
  },
};
