// eslint-disable-next-line max-classes-per-file
import { getType } from 'indify';

class TrieNode {
  constructor(char) {
    if (typeof char !== 'string' && char !== null) {
      throw new Error(`Ошибка про создании нода трие. В конструктор необходимо \
       передать строку! Вместо этого был получен следующий тип данных:\
        ${getType(char)}`);
    }
    if (char && char.length !== 1) {
      throw new Error('Ошибка про создании нода трие. Длина переданной строки должна быть равна 1!');
    }
    this.char = char;
    this.children = {};
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }

  addWords(words) {
    const type = getType(words);
    if (type === 'Array') {
      return words.forEach(word => this.addWord(word));
    }
    if (type === 'String') {
      this.addWord(words);
    }
    throw new Error('Ошибка при попытке добавить несколько слов в Трие. Слова не были переданы или вместо него было передано значение некорректного типа!');
  }

  addWord(word) {
    if (getType(word) !== 'String') {
      throw new Error('Ошибка при попытке добавить слово в Трие. Слово не было передано или вместо него было передано значение некорректного типа!');
    }
    let current = this.root;
    let i = 0;
    while (i < word.length) {
      const { children } = current;
      const char = word[i]?.toLowerCase();
      if (!children[char]) {
        children[char] = new TrieNode(char);
      }
      current = children[char];
      i++;
    }
    current.children.end = true;
  }

  findRelevant(part) {
    if (!part) return '';
    let current = this.root;
    let i = 0;
    let word = '';
    while (current) {
      const { children } = current;
      let char = part[i]?.toLowerCase();
      if (!char) {
        if (children?.end) return word;
        const keys = Object.keys(children);
        if (keys.length === 0) return word;
        const [key] = keys;
        if (key === 'end') return word;
        char = children[key].char;
      }
      if (!char && current.end) return word;
      word += char;
      current = children[char];
      i++;
    }
    return word;
  }
}
export default Trie;
