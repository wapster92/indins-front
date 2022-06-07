[Вернуться к содержанию](/README.md#содержание)
# SimpleWysiwyg:

### Установка
Импортируем напрямую из indify

```import SimpleWysiwyg from 'indify/src/components/subsidiary/SimpleWysiwyg.vue';```

Компонент использует глобальный объект window, обязательно оборачивать в компонент client-only

```
<client-only>
    <SimpleWysiwyg v-model=".../>
</client-only>
```
Если видите в консоле сообщение ```Установите пакет @blowstack/ckeditor-nuxt```, то выполните установку
пакет [@blowstack/ckeditor-nuxt](https://github.com/blowstack/ckeditor-nuxt)

### Свойства
* **value** (String) - нужен для работы v-model
* **tag-name** (String) - HTML тэг, который будет использовать компонент. По-умолчанию ```div```
* **disabled** (Boolean) - Отвечает за отключение ввода пользователем