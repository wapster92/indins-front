* [TableListing](#tablelisting)
* [Ячейки листинга](#ячейки-таблицы)
    * [Текстовая ячейка (TextColumn)](#textcolumn)
    * [Ячейка действий (ActionColumn)](#actioncolumn)
    * [Булевая ячейка (BoolColumn)](#boolcolumn)
    * [Ячейка статуса (ChipColumn)](#chipcolumn)
    * [Ячейка с датой (DateColumn)](#datecolumn)
    * [Ячейка файлов (FileColumn)](#filecolumn)
    * [Функциональная ячейка (FuncColumn)](#funccolumn)
    * [Ячейка с иконкой (IconColumn)](#iconcolumn)
    * [Ячейка списка (ListColumn)](#listcolumn)
    * [Ячейка с телефоном (PhoneColumn)](#phonecolumn)
    * [Ячейка связи (RelationColumn)](#relationcolumn)
    * [Гибкая ячейка (SlotColumn)](#slotcolumn)
    * [Ячейка ввода текста (InputTextColumn)](#inputtextcolumn)
    * [Ячейка ввода с выпадающим списком (SearchSelectColumn)](#searchselectcolumn)
* [Действия над одним элементом](#действия-над-одним-элементом)
    * [Кнопка редактирования (EditItem)](#edititem)
    * [Кнопка удаления (DeleteItem)](#deleteitem)
    * [Скрытые кнопки в ряду (ActionItemList)](#actionitemlist)
    * [Кнопка действия (ClickAction)](#clickaction)
    * [Кнопка перенаправления (RedirectAction)](#redirectaction)
* [Действия над несколькими выбранными элементами](#действия-над-несколькими-выбранными-элементами)
    * [Кнопка множественного действия (MassiveActionButton)](#massiveactionbutton)
    * [Множественное удаление (DeleteMultiple)](#deletemultiple)
    * [Множественное восстановление (RestoreMultiple)](#restoremultiple)


[Вернуться к документации листинга](/src/components/listing#dynamiclisting)

[Вернуться к содержанию](/README.md#содержание)

## TableListing
Интерактивная таблица, которую можно передавать в дефолтный слот DynamicListing, а также использовать отдельно при необходимости. Позволяет выбирать элементы переданного списка и совершать действия над ними. Доступна возможность расширять колонки таблицы.

### Свойства
* **name** (String) - название компонента. Используется для view-types свойства компонента DynamicListing, чтобы он мог идентифицировать этот компонент. Свойство используется для идентификации таблицы в системе. Конкретнее - по значение свойства используется для сохранения размеров колонок и в компоненте ColumnToggler. Старайтесь передавать уникальные названия (внутри проекта). Обязательно к заполнению.
* **list** (Array) - список элементов таблицы. Передавайте сюда list из DynamicListing, если он используется. По-умолчанию равно [].
* **headers** (Array) - заголовки колонок таблицы. Свойство работает только на табличный вариант листинга. Принимает массив объектов вида:
  ```
  {
      name: 'ID', // текст заголовка колонки таблицы.
      field: 'id', // поле сущности, которому соответствует эта колонка.
      space: 250, // изначальная ширина колонки.
      minSpace: 150, // минимальная ширина колонки.
      grow: false, // запретить колонке растягиваться, когда есть свободное место и не включено ручное изменение ширины колонок.
      noSort: true, // запрет сортировки по полю колонки.
      sortField: 'createdAt', // указать, по каком полю сортировать колонку. Если не указать, будет использовано значение поля field.
  }
  ```
  > Учтите, что информацию о колонке действий тоже необходимо передавать, иначе сетка таблицы будет работать криво. Пример объекта шапки для колонки действий:
  ```
    // name не обязательно, так как колонка обычно безымянная. Но на случай его можно добавить.
    // noSort и sortField передавать бесполезно, так как по этой колонки не происходит сортировки.
    { field: 'special:listing-actions', space: 70, minSpace: 70 }
  ```
* **massive-actions** (Boolean) - определяет, можно ли выбирать элементы таблицы и совершать действия над несколькими элементами сразу. При включении перед первым столбцом элементов появляется столбец с чекбоксами. Значение по умолчанию - false.
* **row-color** (Function, null) - функция для определения цвета рядов таблицы. Функция должна возвращать валидный css3 цвет ("#ff90ff", "rgba(245, 89, 17, 0.5)" и т.д.). По-умолчанию - null.
* **sort-multiple** (Boolean) - управляет сортировкой таблицы. При значении true позволяет сортировать по нескольким колонкам. По-умолчанию равно false - при сортировке по одной из колонок все сортировки других колонок сбрасываются.
* **hide-empty-table** (Boolean) - скрывает/отображает таблицу, если она пуста. По-умолчанию равно false.
* **hide-headers** (Boolean) - скрывает/отображает заголовки колонок таблицы. По-умолчанию равно false.
* **hide-bottom** (Boolean, Function, null) - свойство позволяет скрыть нижнюю часть таблицы, если она по какой-либо причине не нужна. По-умолчанию равно null.
> Если ничего не передать, будет равно null - в этом случае блок будет скрываться когда в списке нет элементов.
> Если передать true или false, то блок будет всегда скрыт или видим соответственно.
> Если передать функция, то при изменении кол-ва элементов в списке таблицы или в списке выбранных элементов, она будет вызываться, принимая первым аргументом массив видимых элементов списка, а вторым - массив выбранных элементов. Функция должна возвращать Boolean.
* **orders** (Array) - массив объектов вида { field: "name", direction: "ASC" }. Это поле необходимо для добавления в таблицу сортировок по полям, которые не используются в таблице. В field указываем поле, а в direction - "ASC" для сортировки по возрастанию или "DESC" для сортировки по убыванию.
* **resizableColumns** (Boolean) - свойство отвечает за возможность изменения ширины колонок пользователем. Если компонент обернут в другой компонент, который предоставляет (через provide) свойство listingName, то это свойство будет использовано при сохранении размеров колонок на компьютере пользователя. По-умолчанию равно false.
* **allow-pagination** (Boolean) - включает пагинацию таблицы (работает только если передан запрос в props query в DynamicListing). Если уже была произведена бесконечная прокрутка, то клик по элементу пагинации сбросит ее. По-умолчанию равно false.
* **allow-items-per-page** (Boolean) - включает селект для выбора кол-ва элементов на одной странице листинга, а также кол-во элементов, загружаемых при каждой активации бесконечной прокрутки. По-умолчанию равно false - в этом случае таблица всегда загружает по 100 элементов.

### События
* **item-click** (Object) - событие вызывается при клике по элементу таблицы. Событие передает объект вида: { item: {...}, field: 'fieldName', event: MouseEvent }, где item - это элемент, по которому был совершен клик, а field - это колонка, по которой был совершен клик. На основе этой информации можно совершать разнообразные действия - перенаправления, звонки и пр.
* **selection-change** (Array) - событие вызывается при любом изменении списка выбранных элементов. Передает массив всех выбранных элементов.
* **page-change** (Object) - событие вызывается при изменении страницы в пагинации таблицы. Передает часть информации о пагинации в виде объекта { currentPage: 3 }.
* **bottom-reached** - событие, которое вызывается, когда таблица была проскроллена по вертикали достаточно, чтобы активировать бесконечную прокрутку. Используется для подгрузки следующей страницы.
* **top-reached** - аналог *bottom-reached*, но используется для получения предыдущей страницы.

### Слоты
* **columns** - слот для ячеек табличного вида листинга. Каждая переданная ячейка - это компонент, который должен был быть создан по определенным правилам. Подробнее см. в разделе "Ячейки". Экспортирует свойство *item* - текущий элемент таблицы.
* **empty-table-warning** - слот для замены внешнего вида таблицы, когда она пустая.
* **bottom-slot** - слот, содержимое которого отображается справа от навигации таблицы, но слева от массовых действий. Экспортирует свойства:
> 1) **list** (Array) - массив элементов таблицы.
> 2) **selected** (Array) - массив элементов таблицы, которые были выделены галками.
> 3) **clearSelection** (Function) - функция для сброса выбора галками. Вызывается без аргументов.
* **massive-actions** - слот для компонентов, с помощью которые совершаются действия над несколькими выбранными элементами листинга. Экпортирует массив selected, в котором находится список выбранных элементов таблицы. Отображается только если свойство massive-actions листинга равно true. Экспортирует те же свойства, что и *bottom-slot*.
  > Для стабильноcти мобильной версии рекомендуется для создания кнопок массовых действий использовать компонент MassiveActionButton. Иначе придется верстать каждую кнопку отдельно, чтобы она соответствовала внешнему виду других кнопок на мобильной версии.
  ```
  // Пример использования слота massive-actions.
  <template #massive-actions="{ selected }">
    <DeleteMultiple :selected="selected" />
  </template>
  ```


## Ячейки таблицы
Компоненты которые используются для построения элементов табличного листинга.

## TextColumn
Выводит текст какого-либо поля сущности. Если указать поле, ссылающееся не на строку, значение будет преобразовано к строке. Если необходимо вывести поле, вложенной сущности, используйте RelationColumn.

### Свойства:
* **field** (String) - поле, значение которого необходимо вывести. Обязательное свойство.
* **empty** (String) - значение, которое необходимо выводить при пустой ячейке. По-умолчанию равно "-".
* **clickable-group** (String, null) - свойство отвечающее за выделение колонок при наведении на них. Если значения этого свойства у двух разных колонок равны друг другу и при этом не равны null, то при наведении курсора на эти колонки, эффект наведения сработает у обеих. По-умолчанию равно null.
  ```
  // Пример использования
  <TextColumn field="name" empty="Не указано" />
  ```

## ActionColumn
Специальная колонка, которая выводит любое кол-во переданных в него кнопок действий. Основной слот этого компонента экспортирует объект item - элемент, над которым кнопки в этой колонке будут совершать действия. Нет свойств, но есть дефолтный слот.
  ```
  // Пример использования - добавляем кнопку удаления. 
  // Можно добавить любой другой компонент, но лучше ограничиться 
  // небольшими кнопками с иконками или текстом, чтобы не ломать верстку.
  <ActionColumn v-slot="{ item }">
    <DeleteItem :item="item" />
  </ActionColumn>

  // Можно использовать item из слота columns.
  <template #columns={ item }>
    <ActionColumn>
      <DeleteItem :item="item" />
    </ActionColumn>
  </template>
  ```

## BoolColumn
Колонка для булевых полей. Отображает значение свойства true-text, если в указаном поле true значение. В противном случае выводит значение свойства false-text.

### Свойства:
* **field** (String) - поле, значение которого необходимо вывести. Чтобы обратиться к вложенному поле, необходимо передать поля, разделенные точками: "user.surname". Обязательное свойство.
* **true-text** (String) - текст, который выводится, если значение поля равно true. По-умолчанию равно "Да".
* **false-text** (String) - текст, который выводится, если значение поля равно false. По-умолчанию равно "Нет".
* **clickable-group** (String, null) - свойство отвечающее за выделение колонок при наведении на них. Если значения этого свойства у двух разных колонок равны друг другу и при этом не равны null, то при наведении курсора на эти колонки, эффект наведения сработает у обеих. По-умолчанию равно null.

## ChipColumn
Колонка для отображения данных внутри v-chip компонента.

### Свойства:
* **field** (String) - поле, значение которого необходимо вывести. Чтобы обратиться к вложенному поле, необходимо передать поля, разделенные точками: "status.name". Обязательное свойство.
* **empty** (String) - значение, которое необходимо вывести, если в указанном поле нет значения. По-умолчанию равно "".
* **color-field** (String, null) - поле, в котором находится цвет, который необходимо использовать в v-chip. Если такого поля нет, но цвет нужен не дефолтный, воспользуйтесь свойством chip-props. По-умолчанию равно null.
* **chip-props** (Object) - поле для настройки внешнего вида v-chip. В качестве объекта передайте все свойства, который вы обычно писали бы на самом компоненте, при его вызове. По-умолчанию равно {}.
* **clickable-group** (String, null) - свойство отвечающее за выделение колонок при наведении на них. Если значения этого свойства у двух разных колонок равны друг другу и при этом не равны null, то при наведении курсора на эти колонки, эффект наведения сработает у обеих. По-умолчанию равно null.

## DateColumn
Колонка для вывода отформатированных дат.

### Свойства:
* **field** (String) - поле, значение которого необходимо вывести. Чтобы обратиться к вложенному поле, необходимо передать поля, разделенные точками: "request.createdAt". Обязательное свойство.
* **empty** (String) - значение, которое необходимо вывести, если в указанном поле нет значения. По-умолчанию равно "-".
* **format** (String) - свойство, управляющее форматом отображения даты. Принимает те же значения, что и format метод библиотеки moment.js. По-умолчанию равно "DD.MM.YYYY".
* **input-format** (String) - свойство, определяющее, в каком формате компонент ожидает получить дату из элемента списка. Принимает те же значения, что и format метод библиотеки moment.js. По-умолчанию равно "YYYY-MM-DD HH:mm:ss".
* **clickable-group** (String, null) - свойство отвечающее за выделение колонок при наведении на них. Если значения этого свойства у двух разных колонок равны друг другу и при этом не равны null, то при наведении курсора на эти колонки, эффект наведения сработает у обеих. По-умолчанию равно null.

## FileColumn
Колонка взаимодействия с файлами, связанными с сущностью.

### Свойства:
* **field** (String) - поле, значение которого необходимо вывести. Чтобы обратиться к вложенному поле, необходимо передать поля, разделенные точками: "project.files.name". Обязательное свойство.
> Однако в этой колонке у field есть один нюанс. Внутри для поиска файлов используется не getObjectField функция, а findArray. Это означает, что поиск нужного поля происходит по-другим правилам. Функция findArray разбивает запрос переданный в field свойство на куски по точкам (т.е. наш пример будет разбит на массив строк ["project" "files" "name"]). Затем функция рекурсивно проходится по объекту сущности и по очереди ищет поля из получившего массива. Как только в одном из полей окажется массив, функция прекратит вызывать себя и вернет этот массив и остаток запроса (в нашем случае - массив, лежавший в поле files и остаток запроса - "name"). В массиве должны находится сущности файлов (либо он должен быть пуст), иначе компонент не будет работать как надо. В сущности файла должно быть поле с ссылкой на файл, поле с именем файла и поле с MIME-типом файла. Остаток запроса будет проигнорирован.
* **empty** (String) - значение, которое необходимо вывести, если в указанном поле нет значения. По-умолчанию равно "".
* **url-field** (String) - поле *сущности файла*, в которой находится ссылка на файл. По-умолчанию равно "url".
* **name-field** (String) - поле *сущности файла*, в которой находится название файла. По-умолчанию равно "name".
* **mime-field** (String) - поле *сущности файла*, в которой находится MIME-тип файла. Он используется для определения иконки, которая отображается рядом с названием файла. По-умолчанию равно "MIME".
* **download-icon** (String, Function) - иконка кнопки загрузки файлов, справа от названия. Используются те же значения, которые принимает компонент v-icon. По-умолчанию равно "cloud_download".
* **name-length** (Number, String) - как много символов имени отображать в каждом элементе файла в колонке. По-умолчанию равно 3. Необходимо передавать числа, либо строки, преобразующиеся в числа.
* **hide-extensions** (Boolean) - управляет отображением иконок типов файла - если включено, иконки скрываются и нет необходимости указывать свойство mime-field. По-умолчанию равно false.
* **files-in-a-row** (Number, String) - определяет, как много файлов показывать до кнопки "Еще". По-умолчанию равно 3.
* **method** (String) - принимает одно из двух значений: "GET" или "POST". Колонка использует метод downloadFile пакета core-xhr, и значение этого свойство используется для этого метода. По-умолчанию равно "POST".
* **request-handler** (Function, null) - если метод downloadFile не нужен в данной ситуации, необходимо воспользоваться этой пропой. Переданная функция должна самостоятельно обработать данные о файле и сделать запрос (или что-то еще, в зависимости от требований к колонке). Первым аргументом получает сущность файла, а вторым - элемент листинга, к которому эта колонка принадлежит. По-умолчанию равно null.
* **use-file-breaker** (Boolean) - свойство определяет, переносить ли файлы, которые показываются после "Еще" на новую строку, даже если в колонке еще есть место. По-умолчанию равно false.
* **clickable-group** (String, null) - свойство отвечающее за выделение колонок при наведении на них. Если значения этого свойства у двух разных колонок равны друг другу и при этом не равны null, то при наведении курсора на эти колонки, эффект наведения сработает у обеих. По-умолчанию равно null.

## FuncColumn
Колонка для случаев, когда остальные колонки не покажут нужную информацию, но вывести нужно только текст.

### Свойства:
* **field** (String) - поле, по которому нужно будет вести сортировку (чтобы в headers свойстве листинга в шапке этой колонке не писать sortField). Можно передать поля, разделенные точками: "project.name". Обязательное свойство.
* **func** (Function, null) - функция, которая будет использована для расчета значения на основе объекта элемента списка. Первым аргументом получает элемент списка. Функция должна вернуть строку - строка будет отображена в колонке. По-умолчанию равно null.
* **max-value-length** (String, Number) - максимальное кол-во символов, которые отобразятся в колонке. Если передать 0, то ограничения нет. Передавать нужно либо число, либо строку, которая преобразуется к числу. По-умолчанию равно 0.
* **clickable-group** (String, null) - свойство отвечающее за выделение колонок при наведении на них. Если значения этого свойства у двух разных колонок равны друг другу и при этом не равны null, то при наведении курсора на эти колонки, эффект наведения сработает у обеих. По-умолчанию равно null.

## IconColumn
Колонка для отображения иконок. Внутри используется компонент v-icon, так что колонка работает со всеми значениями, с которыми работает v-icon.

### Свойства:
* **field** (String) - поле, по которому нужно будет вести сортировку (чтобы в headers свойстве листинга в шапке этой колонке не писать sortField). Можно передать поля, разделенные точками: "request.manager.surname". Обязательное свойство.
* **getIcon** (Function) - функция, которая будет использована для расчета значения на основе объекта элемента списка. Первым аргументом получает элемент списка. Функция должна вернуть строку - строка будет использована в компонент v-icon. Обязательное свойство.
* **getText** (Function, null) - функция для получения текста, отображаемого рядом с иконкой, если он нужен. Первым аргументом получает элемент списка.
* **color** (String) - свойство, определяющее цвет иконки. Принимает валидные css3 цвета. Если цвет не указан, будет использоват стандартный цвет приложения. По-умолчанию равно "";
* **icon-props** (Object, Function) - свойство для более гибкой настройки компонента v-icon - все свойства этого объекта будут переданы в компонент как пропы. Если передать функцию, то она должна вернуть объект и получает первым аргументом элемент списка. По-умолчанию равно {};
* **clickable-group** (String, null) - свойство отвечающее за выделение колонок при наведении на них. Если значения этого свойства у двух разных колонок равны друг другу и при этом не равны null, то при наведении курсора на эти колонки, эффект наведения сработает у обеих. По-умолчанию равно null.

## ListColumn
Колонка для отображения данных из списков.

### Свойства:
* **field** (String) - поле, значение которого необходимо вывести. Чтобы обратиться к вложенному поле, необходимо передать поля, разделенные точками: "user.roles.name". Обязательное свойство.
> Однако в этой колонке у field есть один нюанс. Внутри для поиска файлов используется не getObjectField функция, а findArray. Это означает, что поиск нужного поля происходит по-другим правилам. Функция findArray разбивает запрос переданный в field свойство на куски по точкам (т.е. наш пример будет разбит на массив строк ["user" "roles" "name"]). Затем функция рекурсивно проходится по объекту сущности и по очереди ищет поля из получившего массива. Как только в одном из полей окажется массив, функция прекратит вызывать себя и вернет этот массив и остаток запроса (в нашем случае - массив, лежавший в поле roles и остаток запроса - "name"). В массиве должны находится объекты (либо он должен быть пуст), иначе компонент не будет работать как надо. Остаток запроса будет использован, чтобы находить поля для вывода в каждом из объектов списка. Если остатка запроса нет, то для этой цели будет использоваться свойство item-text.
* **item-text** (String) - поле объектов внутри массива (относительно самих объектов), которое будет использоваться на вывода данных в колонке. Используется только если field указал на массив. По-умолчанию равно "name".
* **empty** (String) - значение, которое необходимо выводить в колонке, если массив пуст. По-умолчанию равно "-".
* **chips** (Boolean) - свойство, отвечающее за использование для вывода данных компонента v-chip. По-умолчанию равно false - выключено.
* **chip-color-field** (String, Function, null) - поле, из которого необходимо брать цвет для v-chip компонента. Работает только если свойство chips равно true. Если передать функцию, то она должна возвращать какой-то цвет или пустую строку - первым аргументов функция получает отдельный элемент массива, а вторым - элемент таблицы, из которого массив берется. По-умолчанию равно null.
* **chip-props** (Object) - свойство для более гибкой настройки компонента v-chip. Все свойства переданного объекта будут переданы в v-chip в качестве проп. По-умолчанию равно {};
* **clickable-group** (String, null) - свойство отвечающее за выделение колонок при наведении на них. Если значения этого свойства у двух разных колонок равны друг другу и при этом не равны null, то при наведении курсора на эти колонки, эффект наведения сработает у обеих. По-умолчанию равно null.

## PhoneColumn
Колонка для вывода телефонов.

### Свойства:
* **field** (String) - поле, значение которого необходимо вывести. Чтобы обратиться к вложенному поле, необходимо передать поля, разделенные точками: "manager.phone". Обязательное свойство.
* **empty** (String) - значение, которое необходимо вывести, если в указанном в field поле нет значения. По-умолчанию равно "-".
* **clickable-group** (String, null) - свойство отвечающее за выделение колонок при наведении на них. Если значения этого свойства у двух разных колонок равны друг другу и при этом не равны null, то при наведении курсора на эти колонки, эффект наведения сработает у обеих. По-умолчанию равно null.

## RelationColumn
Аналог TextColumn, но с поддержкой вложенных полей.

### Свойства:
* **field** (String) - поле, значение которого необходимо вывести. Чтобы обратиться к вложенному поле, необходимо передать поля, разделенные точками: "request.project.number". Обязательное свойство.
* **empty** (String) - значение, которое необходимо вывести, если в указанном в field поле нет значения. По-умолчанию равно "-".
* **clickable-group** (String, null) - свойство отвечающее за выделение колонок при наведении на них. Если значения этого свойства у двух разных колонок равны друг другу и при этом не равны null, то при наведении курсора на эти колонки, эффект наведения сработает у обеих. По-умолчанию равно null.

## SlotColumn
Полностью кастомизируемая колонка. В основной слот принимает содержимое колонки, в основном слоте экспортирует value (полученное значение) и item (элемент списка).

### Свойства:
* **field** (String) - поле, значение которого необходимо вывести. Чтобы обратиться к вложенному поле, необходимо передать поля, разделенные точками: "request.project.number". Обязательное свойство.
* **empty** (String) - в value будет значение этого свойства, если в поле, указанном в field свойстве, нет значения. По-умолчанию равно "-".
* **clickable-group** (String, null) - свойство отвечающее за выделение колонок при наведении на них. Если значения этого свойства у двух разных колонок равны друг другу и при этом не равны null, то при наведении курсора на эти колонки, эффект наведения сработает у обеих. По-умолчанию равно null.

> **О создании компонентов действий над элементами листинга**.
> Такой компонент должен принимать свойство item (см. пример ниже). Если необходимо создать кнопку, открывающую всплывающее окно, выносите это окно в отдельный компонент, а затем общайтесь с ним с помощью $eventBus.

  ```
  // Компонент действия. Имя вызываемого события может быть любым.
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    methods: {
      openPopup() {
        this.$eventBus.emit('any-event', this.item);
      }
    },
  },

  // Компонент попапа.
  mounted() {
    this.$eventBus.on('delete-popup', this.openPopup);
  },
  ```
> **О создании компонентов ячеек листинга**.
> Компоненты обязательно должны иметь свойство field, в котором указывается поле сущности, которое используется внутри ячейки. Чтобы получить элемент сущности внутри компонента, необходимо обращаться к родителю этого компонента, у которого есть свойство item. Также старайтесь не создавать лишние html элементы, потому что колонки создаются по 1 разу за каждый элемент списка и лишние html элементы повышают нагрузку на DOM браузера.
  ```
  // Пример получения элемента списка из колонки.
  computed: {
    item() {
      return this.$parent.item;
    },
  }
  ```
## InputTextColumn
Колонка отображения данных и ввода новых значений. Привязана к апи. Есть маски по номеру телефона, целому числу, числу с дробной частью, валюте, дате.

### Свойства:
* **field** (String) - поле, значение которого необходимо вывести. Обязательное свойство. Может работать с вложенными сущностями.
* **readonly** (Boolean) - ячейка становится доступна только для чтения.
* **empty** (String) - значение, которое необходимо выводить при пустой ячейке. По-умолчанию равно "-".
* **save-query** (String) - строка, которую необходимо передать в конструктор Put библиотеки core-xhr для перезаписи данных при вводе. Обязательное свойство.
* **progress** (Object) - Объект с настройками для бегущей строки, которая отображается после ввода данных на время сохранения в базу данных. Имеет два ключа:
  **minTime** - минимальное время отображения, указывается в милисекундах, по умолчанию - 200;
  **color** - цвет бегущей строки, по умолчанию - '#f4f8fd'.
* **input** (Object) - Объект с настройками для поля ввода текста. Имеет три ключа:
  **maxLength** - максимальное количество символов, которое можно ввести, по умолчанию - 100. при применении масок расчитывается автоматически;
  **type** - тип поля ввода, по умолчанию - text;
  **debounceTime** - время задержки отправки запроса Put библиотеки core-xhr для перезаписи значений в базу данных при вводе данных в поисковую строку. Указывается в милисекундах. По умолчанию - 800.
* **mode** (String) - Тип применяемой к полю ввода маски. По умолчанию - null, т.е. любой текст. Маски:
  **phone** - телефон в формате +7 (999) 555-44-33. в базу данных записывается в формате 79995554433;
  **integer** - только целые числа;
  **float** - числа с дробной частью в формате 12233,456. в базу данных записывается в формате 12233.456;
  **currency** - валюта в формате 10 023 378,56 ₽ в базу данных записывается в формате 10023378.56;
  **date** - дата в формате 10.12.2021. в базу данных записывается как дата со временем 23:59:59;
* **precision** (Number) - Работает вместе с mode="float". Указывает точность округления чисел после запятой. В mode="currency" автоматически равна 2. По умолчанию - null,
* **delimiter** (String) - разделитель целой и дробной части чисел и валюты. По умолчанию - ','.
* **currency-sign** (String) - знак валюты. По умолчанию - '₽'.



## SearchSelectColumn
Колонка отображения данных и выбора новых значений из выпадающего списка. Есть возможность отображения данных внутри v-chip компонента. Привязана к апи. Есть поиск по выпадающему списку.

### Свойства:
* **field** (String) - поле, значение которого необходимо вывести. Обязательное свойство. Может работать с вложенными сущностями.
* **readonly** (Boolean) - ячейка становится доступна только для чтения.
* **empty** (String) - значение, которое необходимо выводить при пустой ячейке. По-умолчанию равно "-".
* **save-query** (String) - строка, которую необходимо передать в конструктор Put библиотеки core-xhr для перезаписи данных при выборе из списка. Обязательное свойство.
* **query** (String) - строка, которую необходимо передать в конструктор Get библиотеки core-xhr для получения значений выпадающего списка. Обязательное свойство.
* **item-text** (String) - название поле, из которого берется значения, для отображения в выпадающем списке. По умолчанию - name.
* **hide-search** (Boolean) - Если true, убирает строку поиска при открытии выпадающего списка. По умолчанию - false.
* **search-debounce-time** (Number) - Время задержки отправки запроса Get библиотеки core-xhr для получения значений выпадающего списка при вводе данных в поисковую строку. Указывается в милисекундах. По умолчанию - 300.
* **allow-deleted** (Boolean) - Если true, в выпадающем списке отсутствует фильтр по удаленным данным. По умолчанию - false.
* **progress** (Object) - Объект с настройками для бегущей строки, которая отображается после выбора значения из выпадающего списка на время сохранения в базу данных. Имеет два ключа:
  **minTime** - минимальное время отображения, указывается в милисекундах, по умолчанию - 200; 
  **color** - цвет бегущей строки, по умолчанию - '#f4f8fd'.
* **colored-chip** (Boolean) - Если, true, то оборачивает отображаемые в колонке данные в v-chip.
* **color-field** (String, null) - поле, в котором находится цвет, который необходимо использовать в v-chip.
* **chip-props** (Object) - поле для настройки внешнего вида v-chip. В качестве объекта передайте все свойства, который вы обычно писали бы на самом компоненте, при его вызове. По-умолчанию равно {}.

## Действия над одним элементом
Кнопки, которые отображаются в каждом элементе таблицы. Имеют доступ к конкретному элементу таблицы, что позволяет сделать запрос на изменение соответствующей сущности или совершить какое-либо действие на основе этого элемента.

## EditItem
Компонент для перенаправление на карточку редактирования сущности.

### Свойства:
* **item** (Object, null) - элемент списка. По-умолчанию равно null.
* **route-to** (String, Object, null) - роут, на который будет совершен переход. По-умолчанию равно null.
* **entity-param** (String) - используется только если не передать пропу route-to. В этом случае компонент попытается самостоятельно собрать новый роут - к name текущего роута добавится значение "-" и значение свойства entity-param. В params роута добавится запись *значение entity-param*: значение одноименного поля в item. Сделано чисто для ускорения создания рутинных разделов.

## DeleteItem
Компонент для открытия попапа удаления. Связывается с попапом с помощью свойства listing-key и передает туда информацию о элементе списка, на котором эта кнопка находится.

### Свойства:
* **item** (Object, null) - элемент списка. По-умолчанию равно null.
* **url-key** (String) - название запроса в ConfigService, на который нужно делать запрос удаления или восстановления. По-умолчанию равно "".
* **listing-key** (String) - идентификатор для связи с DeletePopup. По-умолчанию равен null.
* **no-restore** (Boolean) - свойство, отключающее кнопку восстановления, когда элемент списка удален. По-умолчанию равно false.

## ActionItemList
Компонент для скрытия дополнительных действий. Нужен, когда действий слишком много и часть из них необходимо скрыть. При клике по кнопке все скрытые действия будут видны в выпадающем списке. Не имеет свойств.

### Слоты:
* *default* - содержимое выпадающего списка прокидывается в основной слот компонента. Оборачивате кнопки в v-list-item, для более красивого внешнего вида. Пример:
```
  <v-list-item dense>
    <DeleteItem url-key="users" listing-key="usersDelete" :item="item" />
  </v-list-item>
```

## ClickAction
Компонент-кнопка с иконкой внутри, который выглядит как и другие дефолтные компоненты действий. Нужен, чтобы не верстать по-новой каждый раз.

### Свойства:
* **icon** (String) - название иконки из material библиотеки, которую необходимо отобразить. Обязательное свойство.
* **icon-size** (String, Number) - размер иконки. Передается в v-icon. По-умолчанию равно 20.

## RedirectAction
Компонент-кнопка с иконкой внутри, который перенаправляет пользователя на указанный роут. Если роут не указать, попробует собрать роут самостоятельно.

### Свойства:
* **icon** (String) - название иконки из material библиотеки, которую необходимо отобразить. По-умолчанию равно 'create'.
* **item** (Object, null) - свойство для передачи элемента таблицы, если это необходимо. Используется для автоматической сборки роута, если *route-to* свойство не было передано. По-умолчанию равно null.
* **route-to** (String, Object) - свойство, в которое передается валидный VueRouter роут. Если свойство не передано, компонент попытается собрать роут сам. По-умолчанию равно ''.
```
// Пример автоматической сборки роута.
// Мы находимся на роуте /users. Компонент объявлен вот так:
<ActionColumn v-slot="{ item }">
    <RedirectAction :item="item" />
</ActionColumn>
/* В этом случае перенаправление будет вести на роут {
    name: 'users-id',
    params: { id: item.id },
}
*/
```

## Действия над несколькими выбранными элементами
Компоненты, отображающиеся в нижней части таблицы, справа от пагинации. Позволяют совершить действия над выбранными элементами таблицы или отображать на их основе информацию.

## MassiveActionButton
Компонент кнопок для блока множественных действий. Рекомендуется использовать его вместо обычных кнопок, чтобы мобильная версия приложения соответствовала мобильному дизайну интерфейсов.

### Свойства:
* **tooltip** (String) - текст подсказки при наведении на кнопку. По-умолчанию равно ''.
* **text** (String) - название кнопки. По-умолчанию равно ''.
* **selected** (Array) - массив выбранных элементом. По-умолчанию равен [].


## DeleteMultiple
Компонент для удаления нескольких элементов списка.

### Свойства:
* **selected** (Array) - список выбранных элементов. По-умолчанию равен [].
* **query** (Object, String, null) - объект запроса из core-xhr типа Delete. Если передать строку, она будет использована при вызове соответствующего конструктора. По-умолчанию равен null.
* **popup-title** (String) - заголовок попапа удаления. По-умолчанию равен "Удаление записей".
* **popup-message** (String) - текст попапа удаления. По-умолчанию равен "Удалить все выбранные записи?".
* **popup-confirm** (String) - названия кнопки подтверждения в попапе удаления. По-умолчанию равно "Удалить".
* **button-props** (Object) - свойства для передачи в SimpleButton компонент. По-умолчанию равно {}.
* **clear-selection** (Function, null) - функция для очистки выбранных элементов после успешного запроса на удаление элементов. По-умолчанию равно null.

## RestoreMultiple
Компонент для восстановления нескольких элементов списка.

### Свойства:
* **selected** (Array) - список выбранных элементов. По-умолчанию равен [].
* **query** (Object, String null) - объект запроса из core-xhr типа Put. Если передать строку, она будет использована при вызове соответствующего конструктора. По-умолчанию равен null.
* **popup-title** (String) - заголовок попапа восстановления. По-умолчанию равен "Восстановление записей".
* **popup-message** (String) - текст попапа восстановления. По-умолчанию равен "Восстановить все выбранные записи?".
* **popup-confirm** (String) - названия кнопки подтверждения в попапе восстановления. По-умолчанию равно "Восстановить".
* **button-props** (Object) - свойства для передачи в SimpleButton компонент. По-умолчанию равно {}.
* **clear-selection** (Function, null) - функция для очистки выбранных элементов после успешного запроса на восстановление элементов. По-умолчанию равно null.