(() => {
  let widthHeight;
  // создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let coupleTitle = document.createElement('h2');
    coupleTitle.classList.add('title')
    coupleTitle.innerHTML = title;
    return coupleTitle

  };

  function createCoupleList() {
    let list = document.createElement('ul');
    list.classList.add('list', 'list-group', 'list-group-horizontal-xl');
    return list;
  };



  function startWindow() {
    const startTitle = document.createElement('h1')
    const containerForm = document.createElement('div');
    const form = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');
    startTitle.classList.add('start-title')
    form.classList.add('form__start');
    input.classList.add('form__start__input');
    button.classList.add('form__start__button');
    button.setAttribute('disabled', true);
    input.placeholder = 'Количество карточек по вертикали/горизонтали';
    button.textContent = 'Начать игру'
    startTitle.innerHTML = 'Игра в пары'

    container.append(containerForm);
    containerForm.append(startTitle)
    containerForm.append(form);
    form.append(input, button);
    containerForm.classList.add('container__form__start');
    // Проверяем на наличие текста в инпутах
    input.addEventListener('input', () => {
      if (input.value.length === 0) {
        button.setAttribute('disabled', true);

      } else if (input.value.length > 0) {
        button.removeAttribute('disabled', true);
      };
    });

    form.addEventListener('submit', function(e) {
      // эта строчка необходима, чтоюы предотвратить стандартное действие браузера
      // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
      e.preventDefault();
      if (input.value <= 10 && ((Number(input.value) % 2) === 0)) {
        widthHeight = Number(input.value)
        createCoupleApp(widthHeight);
        containerForm.remove();
      } else {
        createCoupleApp(4);
        containerForm.remove();
      }
    })
  }
  startWindow();

  function createCoupleItem(arr, quantityCardHorizontal) {
    let item = document.createElement('li');
    let text = document.createElement('p');
    item.append(text);
    text.textContent = arr;

    if (quantityCardHorizontal === 4) {

      item.classList.add('list__item-four');
    } else if (quantityCardHorizontal === 2) {
      item.classList.add('list__item-two');
    } else if (quantityCardHorizontal === 6) {
      item.classList.add('list__item-six');
    } else if (quantityCardHorizontal === 8) {
      item.classList.add('list__item-eight');
    } else if (quantityCardHorizontal === 10) {
      item.classList.add('list__item-ten');
    }
    text.classList.add('card-closed', 'list__card')
    return {
      item,
      text
    };
  };
  // Создаем таймер
  function createTimer() {

    let timer = document.createElement('div')
    timer.classList.add('timer');
    timer.textContent = '60'
    return timer
  }




  function createCoupleApp(horizontalAndVertiсalCard) {
    let data = [];
    const resultsArray = [];
    let counter = 0;
    let timeStart = 0;
    let intervalID;


    const amounth = horizontalAndVertiсalCard * horizontalAndVertiсalCard / 2;
    let coupleTitle = createAppTitle('Пары');
    let coupleList = createCoupleList();
    let timerWin = createTimer();
    let containerTitleAndTimerWin = document.createElement('div');
    containerTitleAndTimerWin.classList.add('container-title-timer')
    container.append(containerTitleAndTimerWin);
    containerTitleAndTimerWin.append(coupleTitle);
    containerTitleAndTimerWin.append(timerWin)
    container.append(coupleList);
    // Создаем массив
    function createData() {
      for (i = 1; i <= amounth; ++i) {
        data.push(i);
        data.push(i);
      }
    };
    createData()
    shuffle(data);

    function shuffle(array) {
      let currentIndex = array.length,
        temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    };
    // ФУНКЦИЯ создания карточек из элементов массива Data
    function addCard() {
      for (const el of data) {
        let card = createCoupleItem(el, horizontalAndVertiсalCard);
        coupleList.append(card.item);
        card.text.dataset.view = "card";
        card.text.dataset.item = el;
        openCard(card);
        startTimer(card)
      }
    }
    addCard();





    function startTimer(clickStartTimer) {


      clickStartTimer.item.addEventListener('click', () => {
        if (timeStart === 0) {
          timeStart = 1;
          intervalID = setInterval(start, 1000);
        }
      })

      function start() {
        if (timerWin.textContent > 0) {
          return timerWin.textContent -= 1;
        } else {
          intervalID = clearInterval(intervalID);
          const itemsAll = document.querySelectorAll('.list__card');
          win(true)
          for (let i = (itemsAll.length - 1); i >= 0; i--) {
            itemsAll[i].className = 'card-open';

          }

        }
      }
    };



    // Функция работы с карточками
    function openCard(clickElement) {

      clickElement.item.addEventListener('click', () => {

        if (clickElement.text.className !== 'card-open' && clickElement.text.className !== 'correct') {

          clickElement.text.classList.add('card-open');
          clickElement.text.classList.remove('card-closed');

          const result = clickElement.text.dataset.item;

          resultsArray.push(result);

          if (resultsArray.length > 1) {

            if (resultsArray[0] === resultsArray[1]) {
              resultsArray.splice(0, 2);
              check('correct');
              counter++;
              win();

            } else {
              resultsArray.splice(0, 2);
              check('card-closed')

            }
          }

        }

      })
    }


    // Фукнция подсчета очков
    function win(gameOver = false) {

      if (counter === amounth || gameOver) {
        intervalID = clearInterval(intervalID);
        const container = document.getElementById('container');
        const winButtonGroup = document.createElement('div');
        const resultTime = document.createElement('div')
        const buttonReset = document.createElement('button');
        const buttonMenu = document.createElement('button');
        buttonReset.classList.add('button-win');
        buttonMenu.classList.add('button-win');

        winButtonGroup.classList.add('button-win__group');
        container.append(winButtonGroup);
        winButtonGroup.append(buttonReset);
        winButtonGroup.append(buttonMenu);
        winButtonGroup.append(resultTime);
        buttonReset.textContent = 'Начать начала';
        buttonMenu.textContent = 'Выбрать колличество сначала';
        if (gameOver) {
          resultTime.textContent = 'Вы не справились за 1 мин';
        } else {
          resultTime.textContent = 'Вы справились за' + '\n' + (60 - timerWin.textContent) + '\n' + 'секунды';
        }

        buttonReset.addEventListener('click', () => {

          coupleTitle.remove();
          coupleList.remove();
          buttonReset.remove();
          buttonMenu.remove();
          timerWin.remove();
          resultTime.remove();
          createCoupleApp(horizontalAndVertiсalCard);
        });
        buttonMenu.addEventListener('click', () => {
          coupleTitle.remove();
          coupleList.remove();
          buttonReset.remove();
          buttonMenu.remove();
          timerWin.remove();
          resultTime.remove();
          startWindow();
        })
      }
    };

    // Функцуя проверки совпадения
    let check = function(className) {
      const x = document.getElementsByClassName("card-open");
      setTimeout(function() {
        for (let i = (x.length - 1); i >= 0; i--) {
          x[i].className = className;
        }
      }, 200);
    };

  }







})();
