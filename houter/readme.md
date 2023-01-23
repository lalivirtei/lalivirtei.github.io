# Houter
Лэндинг о недвижимости.     
Субъективная сложность - средняя.

## Установка
1. `npm i` - Установка пакетов
2. `gulp`  Запуск сборки

Собирает папку build и стартует localhost:3000. Возможно понадобится глобальный browser-sync, но это не точно.

## Сложности
TL;DR: я все еще в поиске лучших решений для каждой сложности. 

- Нестандартный фон на всей длине макета
  - `проблема` он был сделан градиентом по всей длине макета. background не может быть больше родителя, а ставить <img> для фона - не семантично.
  - `решение` после долгих мучений принял решение собрать градиенты в один .svg и задать фон всему body. Не очень, потому что на мобильном это будет совсем не то.
- Видео с кастомной кнопкой с youtube
  - `проблема` не воспроизводится на мобильном, даже если у iframe &mute=1
  - `решение` на мобильном сделал стандартный iframe. Возможно надо пробовать имитировать клик, но мне не нравится эта идея. 

## Как бы поступил на проекте?
Хотелось бы связаться с дизайнером для того, чтобы достать некоторые градиентные фоны и сделать их CSS, а не .svg, а также - уточнить: что должна делать кнопка SignUp, если это лендинг, может есть смысл переименовать некоторое... 

Раза 3 за вёрстку хотелось обратиться к более опытным ребятам:
2 раза описаны в "Сложности" и 1 раз спорный о том, надо ли совмещать картинки из макета в один фон, или стоит верстать отдельными элементами, потому что из макета не ясен замысел этого, но удлиняет процесс верстки на 1.5 часа (элемент в секции blocks/subscriber)