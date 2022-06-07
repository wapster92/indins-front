import path from 'path';
import breadcrumbsModule from "core-nuxt-breadcrumbs";
import settingsStorage from "core-nuxt-settings";
import textCutterFunc from "../src/helpers/textCutter";
import deepMergeFunc from "../src/helpers/deepMerge";
import deepCloneFunc from "../src/helpers/deepClone";

export const textCutter = textCutterFunc;
export const deepMerge = deepMergeFunc;
export const deepClone = deepCloneFunc;
export * from "../src/helpers";
export * from "../src/helpers/decorators";
export * from "../src/components/subsidiary";

export default function (moduleOptions) {
  // Настройки
  const options = deepMerge({
    theme: {
      // Тема светлая (стандарт)
      light: {
        primary: "#F3F5F8",
        secondary: "#3D3D3D",
        accent: "#019D80",
        error: "#D44942",
        info: "#416FC8",
        success: "#FDC353",
        warning: "#BA97E8",
        "dark-secondary": "#1F1F1F",
        "light-accent": "#DADADA",
        "light2-accent": "#C1C1C1",
        "extra-light-accent": "#EEE",
        "light-error": "#FCF1F0",
        "light-info": "#E6F6FC",
        "placeholder-color": "#7A7A7A",
      },
    },
    breadcrumbs: {
      auto: true
    },
    settings: {
      storage: {},
      defaultStorage: 'local'
    },
    autotitle: true
  }, this.options.indify, moduleOptions);

  // Модуль XHR запросов
  if (!this.options.modules.includes('core-xhr')) {
    throw new Error('Для работы indify необходимо подключить модуль «core-xhr»!');
  }
  // Плагин получения типов значений переменных
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/getType.js'),
    fileName: path.join('indify', 'getType.js')
  });
  // Плагин масок для инпутов и просто отображения
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/applyMask.js'),
    fileName: path.join('indify', 'applyMask.js')
  });
  // Плагин для работы с полями объектов по их названию
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/fieldResolver.js'),
    fileName: path.join('indify', 'fieldResolver.js')
  });
  // Плагин вывода ошибок
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/showError.js'),
    fileName: path.join('indify', 'showError.js')
  });

  // Плагин для скачивания ссылок
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/downloadByURL.js'),
    fileName: path.join('indify', 'downloadByURL.js')
  });
  // Библиотека vuetify
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/vuetify.js'),
    fileName: path.join('indify', 'vuetify.js'),
    options: options.theme
  });
  // Библиотека наших компонентов
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/indify.js'),
    fileName: path.join('indify', 'indify.js')
  });
  // Layout и компонент ошибки
  this.options.layouts.errorLayout = path.resolve(__dirname, '../src/layouts/errorLayout.vue');
  this.options.ErrorPage = path.resolve(__dirname, '../src/layouts/error.vue');
  // EventBus
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/eventBus.js'),
    fileName: path.join('indify', 'eventBus.js')
  });
  // Снеки
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/snack.js'),
    fileName: path.join('indify', 'snack.js')
  });
  // Прелоадер
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/preloader.js'),
    fileName: path.join('indify', 'preloader.js')
  });
  // включаем store для snack
  if (!this.options.features.store || !this.options.store) {
    this.options.features.store = true;
    this.options.store = true;
  };
  // Аудио плеер
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/audioPlayer.js'),
    fileName: path.join('indify', 'audioPlayer.js')
  });
  // Default core configs.
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/defaultConfigs.js'),
    fileName: path.join('indify', 'defaultConfigs.js')
  });

  // Стор для корректной работы ScrollComponent.
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/scrollManagement.js'),
    fileName: path.join('indify', 'scrollManagement.js')
  });

  // Стор для панели автосохранения.
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/autosaveStore.js'),
    fileName: path.join('indify', 'autosaveStore.js')
  });

  // Инициализируем middleware роутера
  if (this.options.router.middleware === undefined) {
    this.options.router.middleware = [];
  }
  // Генератор заголовка страницы
  if (options.autotitle) {
    this.addPlugin({
      src: path.resolve(__dirname, 'plugins/autotitle.js'),
      fileName: path.join('indify', 'autotitle.js')
    });
    this.options.router.middleware.push('autotitle');
  }

  // Подключение хлебных крошек
  breadcrumbsModule.call(this,options.breadcrumbs);

  // Подключение настроек
  settingsStorage.call(this,options.settings);

  // Основные стили
  this.options.css.push('indify/src/styles/main.styl');
}