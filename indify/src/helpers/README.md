# Вспомогательные функции и свойства

1. [Импортируемые функции](#импортируемые-функции)
    * [Получение типа данных (getType)](#gettype)
    * [Получение поля объекта или вложенного объекта (getObjectField)](#getobjectfield)
    * [Назначение поля объекта или вложенного объекта (setObjectField)](#setobjectfield)
    * [Поиск массива (findArray)](#findarray)
    * [Контраст цвета (contrastTextColor)](#contrasttextcolor)
    * [Дебаунсинг (debounce)](#debounce)
    * [Троттлинг (throttle)](#throttle)
    * [Глубокое клонирование объектов и массивов (deepClone)](#deepclone)
    * [Глубокое слияние объектов (deepMerge)](#deepmerge)
    * [Обрезание текста (textCutter)](#textcutter)
2. [Глобальные методы и свойства компонентов](#глобальные-методы-и-свойства-компонентов)
    * [Автобус событий ($eventBus)](#eventbus)
    * [Декоратор отображение ошибки ($showError)](#showerror)
    * [Функция для скачивания файлов по ссылке ($downloadByURL)](#downloadByURL)
    * [Функция для применения масок к значениям ($applyMask)](#applyMask)
    * [Объект с функциями для работы со значениями полей по их названию ($fieldResolver)](#fieldResolver)
    * [Дефолтный конфиг ($defaultConfig)](#$defaultConfig)

## Импортируемые функции

### getType
```
(item: any) -> String.
```
Функция возвращающая тип данных, которые в нее передали. Отличается от typeof оператора тем, что возвращает более точные значения.
Примеры:
```
import { getType } from 'indify';

// Вызов_функции(переданные, аргументы) -> возвращаемое значение
getType('some string') -> "String"
getType(43) -> "Number"
getType(NaN) -> "NaN"
getType({ name: 'User' }) -> "Object"
getType(null) -> "Null"
getType(undefined) -> "Undefined"
getType([1, 4, 5, 6, 9]) -> "Array"
getType(new Set([2, 32, 5])) -> "Set"
getType(new Map()) -> "Map"
getType(() => console.log('wow')) -> "Function"
getType(function(){}) -> "Function"
getType(async function(){}) -> "AsyncFunction"

// также доступен без импортирования внутри любого компонента:
this.$getType(false) -> "Boolean"
```

### getObjectField
```
(item: Object, query: String || Array) -> any
```
Функция, которая ищет в объекте нужное поле и возвращает его значение или undefined, если поле не было найдено. Вернет undefined, если передать не объект в качестве первого аргумента. В качестве второго аргумента можно передавать строку вида "some.deeply.hidden.prop" либо массив строк.
Примеры:
```
import { getObjectField } from 'indify';

let user = {
    name: 'Валера',
    position: {
        id: 2,
        name: 'Грузчик',
        city: {
            id: 17,
            name: 'Владивосток'
        },
    },
};
getObjectField(user, 'name') -> "Валера"
getObjectField(user, 'position.name') -> "Грузчик"
getObjectField(user, 'position.city.id) -> 17
getObjectField(user, ['position', 'id'] -> 2
getObjectField(user, ['fullName']) -> undefined
getObjectField(null, 'name') -> undefined
```

### setObjectField
```
(item: Object, query: String || Array, value: any, force: Boolean) -> Boolean
```
(Доступно с 3.0.8) Функция, записывающая переданное значение в какое-то поле объекта или его вложенных объектов. Примеры:
```
import { setObjectField } from 'indify';

let user = {
    name: 'Валера',
    position: {
        id: 2,
        name: 'Грузчик',
        city: {
            id: 17,
            name: 'Владивосток'
        },
    },
};
// Меняем имя юзера на 'Слава'.
setObjectField(user, 'name', 'Слава') -> true

// Назначаем пользователю новое поле isBlocked.
setObjectField(user, 'isBlocked', false) -> true

// Нельзя обращаться к полям вложенных объектов, если вложенного объекта
// по указанному запросу нет...
setObjectField(user, 'not_existing.field', 1488) -> false

// ... но можно, если передать в четверты аргумент true.
// В этом случае если вложенного объекта нет, он будет создан.
setObjectField(user, 'not_existing.field', 1488, true) -> true

// Не работает не с объектами.
setObjectField([user], 'position', null) -> false

// В качестве запроса можно передавать массив.
setObjectField(user, ['position', 'city], null) -> true
```

### findArray
```
(item: Object, query: String || Array) -> { item: any, query: Array } || null
```
Функция, которая ищет в объекте массив и возвращает объект вида { item: someArray, query: ['остатки', 'запроса']}. Если в ходе поиска на одном из полей функция находит массив, она сразу же вернет его и остаток запроса.
Примеры:
```
import { findArray } from 'indify';

let user = {
    name: 'Валера',
    position: {
        id: 2,
        name: 'Грузчик',
        city: {
            id: 17,
            name: 'Владивосток'
        },
    },
    roles: [
        { id: 1, keyword: 'ADMINISTRATOR' },
        { id: 2, keyword: 'MANAGER' },
        { id: 3, keyword: 'GUEST' },
    ],
};

findArray(user, 'user.roles') -> {
    item: [
        { id: 1, keyword: 'ADMINISTRATOR' },
        { id: 2, keyword: 'MANAGER' },
        { id: 3, keyword: 'GUEST' },
    ],
    query: [],
}

// Когда находит массив раньше
findArray(user, 'user.roles.some.field') -> {
    item: [
        { id: 1, keyword: 'ADMINISTRATOR' },
        { id: 2, keyword: 'MANAGER' },
        { id: 3, keyword: 'GUEST' },
    ],
    query: ['some', 'field'],
}

// Если натыкается на что-то, что не объект или массив:
findArray(user, 'user.position.id') -> null
```

### contrastTextColor
```
(color: String) -> String
```
Функция для получения цвета, который будет контрастировать с переданным. Если передать темный цвет, вернет белый цвет, а если передать светлый цвет - черный.
Примеры:
```
import { contrastTextColor } from 'indify';

// Принимает rgb или 16-ричный варианты записи цветов.
contrastTextColor('rgb(102, 255, 102)') -> #000000
contrastTextColor('#6666ff') -> #ffffff
```

### debounce
```
(func: Function || AsyncFunction, ms: Number) -> Function
```
Декоратор, не позволяющий функции выполняться, пока после последнего ее вызова не пройдет указанное во втором аргументе время. Используется, чтобы только один раз вызывать функцию, которая используется в качестве обработчика какого-либо часто вызываемого события (например, скролл страницы).
Пример:
```
import { debounce } from 'indify';

// Пример использования в компонентах.
export default {
    name: 'ScrolledElement',
    data() {
        return {
            fullScrollsCount: 0,
        };
    },
    created() {
        // Перезаписываем метод с помощью debounce, функция выполнится после 1 секунды.
        this.scrollHandler = debounce(this.scrollHandler, 1000)
        // Используем стрелочную функцию, чтобы не потерять this.
        this.$el.addEventListener('scroll', () => this.scrollHandler);
    },
    methods: {
        // Если не использовать debounce, то каунтер будет увеличиваться каждый раз,
        // когда вызывается событие прокрутки - то есть очень быстро.
        // При использовании же debounce каунтер будет увеличиваться на 1 только
        // через какое-то время ПОСЛЕ того как функцию перестали вызывать.
        scrollHandler() {
            this.fullScrollsCount += 1;
        },
    },
}
```

### throttle
```
(func: Function || AsyncFunction, ms: Number) -> Function
```
Декоратор, который не позволяет переданной в первом аргументе функции вызываться чаще, чем раз в промежуток времени, который передали во второй аргумент. Используется, чтобы сократить кол-во вызовов функции, которая используется в качестве обработчика какого-либо часто вызываемого события (например, скролл страницы).
Пример:
```
import { throttle } from 'indify';

// Пример использования в компонентах.
export default {
    name: 'ScrolledElement',
    data() {
        return {
            fullScrollsCount: 0,
        };
    },
    created() {
        // Перезаписываем метод с помощью debounce, функция выполнится после 1 секунды.
        this.scrollHandler = throttle(this.scrollHandler, 1000)
        // Используем стрелочную функцию, чтобы не потерять this.
        this.$el.addEventListener('scroll', () => this.scrollHandler);
    },
    methods: {
        // Если не использовать throttle, то каунтер будет увеличиваться каждый раз,
        // когда вызывается событие прокрутки - то есть очень быстро.
        // При использовании же throttle каунтер будет увеличиваться на 1 каждую
        // секунду, пока пользователь продолжает прокрутку.
        scrollHandler() {
            this.fullScrollsCount += 1;
        },
    },
}
```

### deepClone
```
(element: any) -> Function
```
Функция для глубокого клонирования объектов - возвращает новый объект, и все вложенные объекты, массивы, функции и даты будут скопированы не по ссылке, а целиком.
Примеры не требуются - просто передайте в первый аргумент массив или объект. Имейте ввиду, что Map, WeakMap, Set и WeakSet будут скопированны по ссылке.

### deepMerge
```
(target: Object, source1: Object, source2, ..., source99) -> target
```
Функция для слияния нескольких объектов в один. Все объекты рекурсивно будут слиты в тот, который передан в первый аргумент.
Примеры не требуются - просто передайте любое кол-во объектов в качестве аргументов функции.

### textCutter
```
(text: String, maxLength: Number) -> String
```
Функция, обрезающая строку, если ее длина больше maxLength - в этом случае в конец строки добавляется 3 точки.
Пример:
```
import { textCutter } from 'indify';

// Строка обрывается на (maxLength - 3) позиции, после чего добавляются 3 точки. 
textCutter('Very long string!', 8) -> 'Very...'
```

## Глобальные методы и свойства компонентов

### $eventBus
Экземпляр component-emitter доступный из любого компонента. Позволяет компонентам общаться друг с другом, даже если они никак не связаны. Использование:
```
// Где-то внутри компонента...
mounted() {
    // Слушаем событие chat-message.
    this.$eventBus.on('chat-message', this.getMessage);
},
beforeDestroy() {
    // Очищаем обработчики событий перед уничтожением компонента, чтобы
    // они не дублировались при повторном маунте компонента.
    this.$eventBus.off('chat-message', this.getMessage);
},
methods: {
    sendChatMessage() {
        // Отправляем событие chat-message. Все обработчики повешенные на
        // это событие через on метод будут выполнены - в их первый аргумент попадет
        // те же данные, что были переданы во второй аргумент метода emit.
        this.$eventBust.emit('chat-message', { text: 'Wow', author: 'Steven' });
    }
}

// on(event: String, handler: Function || AsyncFunction) -> undefined
// off(event: String, handler: Function || AsyncFunction) -> undefined
// emit(event: String, data: any) -> undefined
```
> Используйте с осторожностью. Частое использование этой конструкции может привести
> к жесткому связыванию компонентов. В случаях, когда два общающихся компонента связаны
> (например родитель и ребенок или пра-пра-пра-родитель и внук и т.д.), то лучше
> использовать props или provide/inject.

### $showError
```
(message: String) -> Function 
```
Метод, который возвращает функцию, которая изнутри выглядит вот так:
```
(err) => {
    console.error(err);
    this.$store.dispatch('snack/error', message);
}
```
Нужен для того, чтобы сократить кол-во кода, который пишется при обработке ошибок запросов.
Пример:
```
// Где-то в компоненте...
.catch(err => {
    console.error(err);
    this.$store.dispatch(
        'snack/error',
        'Не удалось получить список пользователей',
    );
});
// ... а с $showError, мы пишем вот так:
.catch(this.$showError('Не удалось получить список пользователей!'));
// И получаем тот же эффект.
```
> Использование данного метода не обязательно, особенно, если вы по-другому обрабатываете
> ошибки. Он создан просто для удобства.


### $downloadByURL
Метод, который получает на вход ссылку и скачивает её. Вторым аргументом можно передать название скачиваемого файла
```
this.$downloadByURL(url) или this.$downloadByURL(url, name)
```


### $applyMask
Метод, который применяет маску к передаваемому в него значению и возвращает обработанное. Работает со статическими данными и в инпутах.
Принимает объект {mode, val, precision, delimiter, currencySign}, где mode - тип маски, val - значение для обработки
Типы масок:
   * 'phone' - возвращает телефон в формате +7 (666) 666-66-13, принимает только числа
   * 'integer' - целое число, в том числе отрицательное
   * 'positive-integer' - целое число, только положительное
   * 'float' - число с плавающей точкой, в маску требуется передать 
     precision - кол-во знаков после запятой (number, null)
     delimiter - разделитель целой и дробной частей, например ','
   * 'currency' - финансовые значения в формате 12 037 336,54 ₽, в маску требуется передать
     delimiter - разделитель целой и дробной частей, например ','
     currencySign - знак валюты, например '₽'
   * 'date' - возвращает дату в формате 10.03.2022, принимает только числа;
```
this.$applyMask({mode, val, precision, delimiter, currencySign})
```


### $fieldResolver
Объект с методами для работы с полями объектов по их названию. 
Понимает строки с вложенными полями, разделение только точкой. (например 'user' или 'user.role.name')
Методы:
   * getFieldValue(item, field) - возвращает значение в виде строки последнего поля строки field из объекта item. 
     (т.е. для 'user.role.name' вернет значение поля name)
   * getFieldObj(item, field) - возвращает объект последнего поля строки field из объекта item. 
     (т.е. для 'user.role.name' вернет объект name или {})
   * getFieldKey(item, field) - возвращает ключ в виде строки последнего поля строки field из объекта item.
     (т.е. для 'user.role.name' вернет 'name')
   * getFieldParent(item, field) - возвращает родительский объект последнего поля строки field из объекта item.
     (т.е. для 'user.role.name' вернет объект role или {})
   * getFieldParentId(item, field) - возвращает id родительского объекта последнего поля строки field из объекта item.
     (т.е. для 'user.role.name' вернет значение role.id или null)
   * setFieldValue(field, val) - собирает объект из строки field и записывает последнему полю строки field значение val.
     (т.е. для field 'user.role.name' и val 'Администратор' вернет { user: { role: { name: 'Администратор' }}} )
```
this.$fieldResolver.getFieldValue(obj, 'user.role.name')
```


### $defaultConfig
Свойство, в котором лежат некоторые дефолтные настройки. На данный момент там лежат:
```
    {
        color: '#416FC8',
        mimeTypes: {
            "application/msword": {
                ext: "doc",
                color: "#5F6EBA",
            },
            // ... и так далее.
        }
    }
```
* color - дефолтный цвет приложения.
* mimeTypes - матрица MIME типов файлов, в которой описаны расширения файлов и их цвета для компонентов, которые работают с файлами.
